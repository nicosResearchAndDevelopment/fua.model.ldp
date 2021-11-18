const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.RDFSource', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('RDFSource should be build', async function () {
        /** @type {fua.model.ldp.RDFSource} */
        const resource = await builder('http://localhost/person/jlangkau');
        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:RDFSource'));
    });

    test('RDFSource should load', async function () {
        /** @type {fua.model.ldp.RDFSource} */
        const resource = await builder('http://localhost/person/jlangkau');
        await resource.load();
        console.log(resource);
    });

    test('RDFSource should serialize', async function () {
        /** @type {fua.model.ldp.RDFSource} */
        const resource = await builder('http://localhost/person/jlangkau');
        await resource.load();
        console.log(await resource.serialize());
    });

});
