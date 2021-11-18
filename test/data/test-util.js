const
    expect                 = require('expect'),
    path                   = require('path'),
    {Space}                = require('@nrd/fua.module.space'),
    context                = require('./context.json'),
    {DataFactory, Dataset} = require('@nrd/fua.module.persistence'),
    InmemoryStore          = require('@nrd/fua.module.persistence.inmemory'),
    {loadDataFiles}        = require('@nrd/fua.module.rdf');

exports.joinPath = path.join;

exports.createStore = async function (...ttlFiles) {
    const
        factory    = new DataFactory(context),
        store      = new InmemoryStore(null, factory),
        [dataFile] = await loadDataFiles(ttlFiles.map((filename) => ({
            'dct:format':     'text/turtle',
            'dct:identifier': path.join(__dirname, filename)
        })), factory);

    expect(dataFile?.dataset).toBeInstanceOf(Dataset);
    await store.add(dataFile.dataset);
    expect(await store.size()).toBeGreaterThan(0);

    function quadToString(quad) {
        const
            subjectId   = factory.termToId(quad.subject),
            predicateId = factory.termToId(quad.predicate),
            objectId    = factory.termToId(quad.object);
        return `(${subjectId})-[${predicateId}]->(${objectId})`;
    }

    store.on('added', quad => console.log('quad-added:', quadToString(quad)));
    store.on('deleted', quad => console.log('quad-deleted:', quadToString(quad)));
    store.on('error', err => console.error(err?.stack ?? err));

    return store;
}; // createStore

exports.createSpace = async function (...ttlFiles) {
    const
        store = await exports.createStore(...ttlFiles),
        space = new Space({store});

    space.on('node-created', node => console.log('node-created:', node.id));
    space.on('node-loaded', node => console.log('node-loaded:', node.id));
    space.on('node-saved', node => console.log('node-saved:', node.id));
    space.on('node-cleared', node => console.log('node-cleared:', node.id));
    space.on('node-cached', id => console.log('node-cached:', id));
    space.on('node-uncached', id => console.log('node-uncached:', id));

    return space;
}; // createSpace
