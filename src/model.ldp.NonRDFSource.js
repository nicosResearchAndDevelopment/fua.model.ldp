const
    util                  = require('./model.ldp.util.js'),
    model                 = require('./model.ldp.js'),
    Resource              = require('./model.ldp.Resource.js'),
    {join: joinPath}      = require('path'),
    {readFile, writeFile} = require('fs/promises');

/**
 * @alias fua.model.ldp.NonRDFSource
 * @class
 * @extends {fua.model.ldp.Resource}
 */
module.exports = class NonRDFSource extends Resource {

    async load() {
        await super.load();
        await this.node.load([
            util.iri.identifier,
            util.iri.format,
            util.iri.title,
            util.iri.alternative
        ]);

        const
            identifier  = this.node.getLiteral(util.iri.identifier),
            format      = this.node.getLiteral(util.iri.format),
            title       = this.node.getLiteral(util.iri.title),
            alternative = this.node.getLiteral(util.iri.alternative);

        if (identifier) this[util.iri.identifier] = identifier.value;
        if (format) this[util.iri.format] = format.value;
        if (title) this[util.iri.title] = title.value;
        if (alternative) this[util.iri.alternative] = alternative.value;
    } // NonRDFSource#load

    async save() {
        await super.save();

        if (this[util.iri.identifier])
            this.node.setLiteral(util.iri.identifier, this[util.iri.identifier]);
        else this.node.deleteLiteral(util.iri.identifier);

        if (this[util.iri.format])
            this.node.setLiteral(util.iri.format, this[util.iri.format]);
        else this.node.deleteLiteral(util.iri.format);

        if (this[util.iri.title])
            this.node.setLiteral(util.iri.title, this[util.iri.title]);
        else this.node.deleteLiteral(util.iri.title);

        if (this[util.iri.alternative])
            this.node.setLiteral(util.iri.alternative, this[util.iri.alternative]);
        else this.node.deleteLiteral(util.iri.alternative);

        await this.node.save([
            util.iri.identifier,
            util.iri.format,
            util.iri.title,
            util.iri.alternative
        ]);
    }// NonRDFSource#save

    async read() {
        util.assert(util.isString(this[util.iri.identifier]), 'TODO');
        const filePath = joinPath(this.param.basePath, this[util.iri.identifier]);
        return await readFile(filePath);
    } // NonRDFSource#read

    async write(data) {
        util.assert(util.isString(this[util.iri.identifier]), 'TODO');
        const filePath = joinPath(this.param.basePath, this[util.iri.identifier]);
        await writeFile(filePath, data);
    } // NonRDFSource#write

}; // NonRDFSource
