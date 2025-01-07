const
    util                       = require('./model.ldp.util.js'),
    model_ldp                  = require('./model.ldp.js'),
    {Resource: space_Resource} = require('@fua/module.space'),
    {serializeDataset}         = require('@fua/module.rdf');

/**
 * @alias fua.model.ldp.Resource
 * @class
 * @extends {fua.module.space.Resource}
 */
module.exports = class Resource extends space_Resource {

    #param = null;

    constructor(node, param) {
        util.assert(util.isObject(param), 'TODO', TypeError);
        util.assert(util.isString(param.baseIRI), 'TODO', TypeError);
        util.assert(util.isString(param.basePath), 'TODO', TypeError);
        super(node);
        this.#param = param;
    } // Resource#constructor

    get param() {
        return this.#param;
    } // Resource#param

    async load() {
        await this.node.load([
            '@type',
            util.iri.created,
            util.iri.modified,
            util.iri.constrainedBy,
            util.iri.member]
        );

        const
            created       = this.node.getLiteral(util.iri.created),
            modified      = this.node.getLiteral(util.iri.modified),
            constrainedBy = this.node.getNodes(util.iri.constrainedBy),
            member        = this.node.getNodes(util.iri.member);

        this['@type'] = this.node.type;
        if (created) this[util.iri.created] = created;
        if (modified) this[util.iri.modified] = modified;
        if (constrainedBy.length > 0) this[util.iri.constrainedBy] = await Promise.all(constrainedBy.map(node => model_ldp.build(node, this.param)));
        if (member.length > 0) this[util.iri.member] = await Promise.all(member.map(node => model_ldp.build(node, this.param)));
    } // Resource#load

    async save() {
        this.node.type = this['@type'];

        if (this[util.iri.created])
            this.node.setLiteral(util.iri.created, this[util.iri.created]);
        else this.node.deleteLiteral(util.iri.created);

        if (this[util.iri.modified])
            this.node.setLiteral(util.iri.modified, this[util.iri.modified]);
        else this.node.deleteLiteral(util.iri.modified);

        if (this[util.iri.constrainedBy] && this[util.iri.constrainedBy].length > 0)
            this.node.setNodes(util.iri.constrainedBy, this[util.iri.constrainedBy]);
        else this.node.deleteNodes(util.iri.constrainedBy);

        if (this[util.iri.member] && this[util.iri.member].length > 0)
            this.node.setNodes(util.iri.member, this[util.iri.member]);
        else this.node.deleteNodes(util.iri.member);

        await this.node.save([
            '@type',
            util.iri.created,
            util.iri.modified,
            util.iri.constrainedBy,
            util.iri.member
        ]);
    } // Resource#save

    async serialize(contentType = 'text/turtle') {
        const dataset = this.node.dataset();
        return await serializeDataset(dataset, contentType);
    } // Resource#serialize

}; // Resource
