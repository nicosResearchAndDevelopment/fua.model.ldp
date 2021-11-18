const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.IndirectContainer', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('IndirectContainer should be build', async function () {
        /** @type {fua.model.ldp.IndirectContainer} */
        const container = await builder('http://localhost/indirect-bugs');
        expect(container).toBeInstanceOf(Resource);
        expect(container).toBeInstanceOf(ldpModel.get('ldp:IndirectContainer'));
    });

    test('IndirectContainer should load', async function () {
        /** @type {fua.model.ldp.IndirectContainer} */
        const container = await builder('http://localhost/indirect-bugs');
        await container.load();
        console.log(container);

        expect(container['ldp:contains']).toBeInstanceOf(Array);
        expect(container['ldp:membershipResource']).toBeInstanceOf(Resource);
        expect(container['ldp:hasMemberRelation'] || container['ldp:isMemberOfRelation']).toBeInstanceOf(Resource);
        expect(container['ldp:insertedContentRelation']).toBeInstanceOf(Resource);
    });

    test('IndirectContainer should serialize as turtle', async function () {
        /** @type {fua.model.ldp.IndirectContainer} */
        const container = await builder('http://localhost/indirect-bugs');
        await container.load();
        const turtle = await container.serialize();
        expect(typeof turtle).toBe('string');
        console.log(turtle);
    });

});
