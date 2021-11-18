const
    util                  = require('./model.ldp.util.js'),
    model                 = require('./model.ldp.js'),
    Resource              = require('./model.ldp.Resource.js'),
    {join: joinPath}      = require('path'),
    {readFile, writeFile} = require('fs/promises');

module.exports = class NonRDFSource extends Resource {

    // TODO

}; // NonRDFSource
