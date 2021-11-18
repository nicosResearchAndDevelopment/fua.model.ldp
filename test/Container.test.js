const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
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
        const resource = await builder('http://localhost/');
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:Container'));
    });

    test('Container should load', async function () {
        const resource = await builder('http://localhost/');
        await resource.load();
        console.log(resource);
    });

    test('Container should serialize', async function () {
        const resource = await builder('http://localhost/');
        await resource.load();
        console.log(await resource.serialize());
    });

});
