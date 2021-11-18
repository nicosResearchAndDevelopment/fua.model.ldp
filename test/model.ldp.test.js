const
    expect                       = require('expect'),
    {describe, test, beforeEach} = require('mocha'),
    LDP                          = require('../src/model.ldp.js');

describe('model.ldp', function () {

    test('should instantiate', function () {
        console.log(LDP);
    });

});
