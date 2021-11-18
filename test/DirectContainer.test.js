const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.DirectContainer', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('DirectContainer should be build', async function () {
        /** @type {fua.model.ldp.DirectContainer} */
        const resource = await builder('http://localhost/direct-bugs');
        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:DirectContainer'));
    });

    test('DirectContainer should load', async function () {
        /** @type {fua.model.ldp.DirectContainer} */
        const resource = await builder('http://localhost/direct-bugs');
        await resource.load();
        console.log(resource);

        expect(container['ldp:contains']).toBeInstanceOf(Array);
        expect(container['ldp:membershipResource']).toBeInstanceOf(Resource);
        expect(container['ldp:hasMemberRelation'] || container['ldp:isMemberOfRelation']).toBeInstanceOf(Resource);
    });

    test('DirectContainer should serialize', async function () {
        /** @type {fua.model.ldp.DirectContainer} */
        const resource = await builder('http://localhost/direct-bugs');
        await resource.load();
        console.log(await resource.serialize());
    });

});
