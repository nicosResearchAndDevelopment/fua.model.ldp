const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    {Resource}                   = require('@fua/module.space'),
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
        const container = await builder('http://localhost/basic-bugs');
        expect(container).toBeInstanceOf(Resource);
        expect(container).toBeInstanceOf(ldpModel.get('ldp:BasicContainer'));
    });

    test('BasicContainer should load', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const container = await builder('http://localhost/basic-bugs');
        await container.load();
        console.log(container);

        expect(container['ldp:contains']).toBeInstanceOf(Array);
    });

    test('BasicContainer should serialize as turtle', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const container = await builder('http://localhost/basic-bugs');
        await container.load();
        const turtle = await container.serialize();
        expect(typeof turtle).toBe('string');
        console.log(turtle);
    });

    test('BasicContainer should save updated containment tripels', async function () {
        /** @type {fua.model.ldp.BasicContainer} */
        const container = await builder('http://localhost/basic-bugs');
        await container.load();

        expect(container['ldp:contains']).toHaveLength(0);
        container['ldp:contains'].push({'@id': 'http://localhost/basic-bugs/example-bug'});
        await container.save();
        await container.node.clear();

        const container_2 = await builder('http://localhost/basic-bugs');
        await container_2.load();

        expect(container).not.toBe(container_2);
        expect(container_2['ldp:contains']).toHaveLength(1);
        expect(container_2['ldp:contains'][0]).toBeInstanceOf(Resource);
        expect(container_2['ldp:contains'][0]).toMatchObject({
            '@id': 'http://localhost/basic-bugs/example-bug'
        });
    });

});
