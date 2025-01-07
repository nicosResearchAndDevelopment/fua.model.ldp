const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@fua/module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.Container', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('Container should be build', async function () {
        /** @type {fua.model.ldp.Container} */
        const container = await builder('http://localhost/');
        expect(container).toBeInstanceOf(Resource);
        expect(container).toBeInstanceOf(ldpModel.get('ldp:Container'));
    });

    test('Container should load', async function () {
        /** @type {fua.model.ldp.Container} */
        const container = await builder('http://localhost/');
        await container.load();
        console.log(container);

        expect(container['ldp:contains']).toBeInstanceOf(Array);
        expect(container['ldp:contains']).toHaveLength(2);
    });

    test('Container should serialize as turtle', async function () {
        /** @type {fua.model.ldp.Container} */
        const container = await builder('http://localhost/');
        await container.load();
        const turtle = await container.serialize();
        expect(typeof turtle).toBe('string');
        console.log(turtle);
    });

});
