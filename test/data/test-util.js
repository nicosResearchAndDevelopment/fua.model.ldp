const
    expect                 = require('expect'),
    path                   = require('path'),
    {Space}                = require('@nrd/fua.module.space'),
    context                = require('./context.json'),
    {DataFactory, Dataset} = require('@nrd/fua.module.persistence'),
    InmemoryStore          = require('@nrd/fua.module.persistence.inmemory'),
    {loadDataFiles}        = require('@nrd/fua.module.rdf');

exports.joinPath = path.join;

exports.createSpace = async function (...ttlFiles) {
    const
        factory    = new DataFactory(context),
        store      = new InmemoryStore(null, factory),
        space      = new Space({store}),
        [dataFile] = await loadDataFiles(ttlFiles.map((filename) => ({
            'dct:format':     'text/turtle',
            'dct:identifier': path.join(__dirname, filename)
        })), factory);

    expect(dataFile?.dataset).toBeInstanceOf(Dataset);
    await store.add(dataFile.dataset);
    expect(await store.size()).toBeGreaterThan(0);

    space.on('node-created', node => console.log('node-created:', node.id));
    space.on('node-loaded', node => console.log('node-loaded:', node.id));
    space.on('node-saved', node => console.log('node-saved:', node.id));
    space.on('node-cleared', node => console.log('node-cleared:', node.id));
    space.on('node-cached', id => console.log('node-cached:', id));
    space.on('node-uncached', id => console.log('node-uncached:', id));

    return space;
}; // createSpace
