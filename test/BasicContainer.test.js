const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
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
        const resource = await builder('http://localhost/basic-bugs');
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:BasicContainer'));
    });

    test('BasicContainer should load', async function () {
        const resource = await builder('http://localhost/basic-bugs');
        await resource.load();
        console.log(resource);
    });

    test('BasicContainer should serialize', async function () {
        const resource = await builder('http://localhost/basic-bugs');
        await resource.load();
        console.log(await resource.serialize());
    });

});
