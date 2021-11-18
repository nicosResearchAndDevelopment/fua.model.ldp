const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
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
        const resource = await builder('http://localhost/indirect-bugs');
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:IndirectContainer'));
    });

    test('IndirectContainer should load', async function () {
        const resource = await builder('http://localhost/indirect-bugs');
        await resource.load();
        console.log(resource);
    });

    test('IndirectContainer should serialize', async function () {
        const resource = await builder('http://localhost/indirect-bugs');
        await resource.load();
        console.log(await resource.serialize());
    });

});
