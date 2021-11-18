const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@nrd/fua.module.space'),
    {createSpace, joinPath}      = require('./data/test-util.js'),
    {readFile, writeFile}        = require('fs/promises'),
    ldpModel                     = require('../src/model.ldp.js');

describe('model.ldp.NonRDFSource', function () {

    let space, builder;
    beforeEach('create a space and a builder', async function () {
        space   = await createSpace('ldp-example.ttl', 'ldp.ttl');
        builder = ldpModel.builder(space, {
            baseIRI:  'http://localhost/',
            basePath: joinPath(__dirname, 'data/resources')
        });
    });

    test('NonRDFSource should be build', async function () {
        /** @type {fua.model.ldp.NonRDFSource} */
        const resource = await builder('http://localhost/hello');
        expect(resource).toBeInstanceOf(Resource);
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:NonRDFSource'));
    });

    test('NonRDFSource should load', async function () {
        /** @type {fua.model.ldp.NonRDFSource} */
        const resource = await builder('http://localhost/hello');
        await resource.load();
        console.log(resource);
    });

    test('NonRDFSource should serialize as turtle', async function () {
        /** @type {fua.model.ldp.NonRDFSource} */
        const resource = await builder('http://localhost/hello');
        await resource.load();
        const turtle = await resource.serialize();
        expect(typeof turtle).toBe('string');
        console.log(turtle);
    });

    test('NonRDFSource should read actual file', async function () {
        /** @type {fua.model.ldp.NonRDFSource} */
        const resource = await builder('http://localhost/test/random');
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:NonRDFSource'));
        await resource.load();

        const random = Math.random().toString();
        await writeFile(joinPath(__dirname, 'data/resources/example-01/random.txt'), random);
        const content = await resource.read();
        expect(content).toBeInstanceOf(Buffer);
        expect(content.toString()).toBe(random);
    });

    test('NonRDFSource should write actual file', async function () {
        /** @type {fua.model.ldp.NonRDFSource} */
        const resource = await builder('http://localhost/test/random');
        expect(resource).toBeInstanceOf(ldpModel.get('ldp:NonRDFSource'));
        await resource.load();

        const random = Math.random().toString();
        await resource.write(random);
        const content = await readFile(joinPath(__dirname, 'data/resources/example-01/random.txt'));
        expect(content).toBeInstanceOf(Buffer);
        expect(content.toString()).toBe(random);
    });

});
