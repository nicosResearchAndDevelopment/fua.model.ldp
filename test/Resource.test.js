const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.Resource', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('Resource should be build', async function () {
        /** @type {fua.model.ldp.Resource} */
        const resource = await builder('http://localhost/');
        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:Resource'));
    });

    test('Resource should load', async function () {
        /** @type {fua.model.ldp.Resource} */
        const resource = await builder('http://localhost/');
        await resource.load();
        console.log(resource);
    });

    test('Resource should serialize as turtle', async function () {
        /** @type {fua.model.ldp.Resource} */
        const resource = await builder('http://localhost/');
        await resource.load();
        const turtle = await resource.serialize();
        expect(typeof turtle).toBe('string');
        console.log(turtle);
    });

});
