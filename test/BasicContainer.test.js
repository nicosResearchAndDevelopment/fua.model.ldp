const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.BasicContainer', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('BasicContainer should be build', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const resource = await builder('http://localhost/basic-bugs');
        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:BasicContainer'));
    });

    test('BasicContainer should load', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const resource = await builder('http://localhost/basic-bugs');
        await resource.load();
        console.log(resource);

        expect(container['ldp:contains']).toBeInstanceOf(Array);
    });

    test('BasicContainer should serialize', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const resource = await builder('http://localhost/basic-bugs');
        await resource.load();
        console.log(await resource.serialize());
    });

});
