const
    util      = require('./model.ldp.util.js'),
    model     = require('./model.ldp.js'),
    RDFSource = require('./model.ldp.RDFSource.js');

/**
 * @alias fua.model.ldp.Container
 * @class
 * @extends {fua.model.ldp.RDFSource}
 */
module.exports = class Container extends RDFSource {

    async load() {
        await super.load();
        await this.node.load([
            util.iri.contains,
            util.iri.membershipResource,
            util.iri.hasMemberRelation,
            util.iri.isMemberOfRelation,
            util.iri.insertedContentRelation
        ]);

        const
            contains                = this.node.getNodes(util.iri.contains),
            membershipResource      = this.node.getNode(util.iri.membershipResource),
            hasMemberRelation       = this.node.getNode(util.iri.hasMemberRelation),
            isMemberOfRelation      = this.node.getNode(util.iri.isMemberOfRelation),
            insertedContentRelation = this.node.getNode(util.iri.insertedContentRelation);

        this[util.iri.contains] = await Promise.all(contains.map(node => model.build(node, this.param)));
        if (membershipResource) this[util.iri.membershipResource] = await model.build(membershipResource, this.param);
        if (hasMemberRelation) this[util.iri.hasMemberRelation] = await model.build(hasMemberRelation, this.param);
        if (isMemberOfRelation) this[util.iri.isMemberOfRelation] = await model.build(isMemberOfRelation, this.param);
        if (insertedContentRelation) this[util.iri.insertedContentRelation] = await model.build(insertedContentRelation, this.param);
    } // Container#load

    async save() {
        await super.save();

        if (this[util.iri.contains] && this[util.iri.contains].length > 0)
            this.node.setNodes(util.iri.contains, this[util.iri.contains]);
        else this.node.deleteNodes(util.iri.contains);

        if (this[util.iri.membershipResource])
            this.node.setNode(util.iri.membershipResource, this[util.iri.membershipResource]);
        else this.node.deleteNode(util.iri.membershipResource);

        if (this[util.iri.hasMemberRelation])
            this.node.setNode(util.iri.hasMemberRelation, this[util.iri.hasMemberRelation]);
        else this.node.deleteNode(util.iri.hasMemberRelation);

        if (this[util.iri.isMemberOfRelation])
            this.node.setNode(util.iri.isMemberOfRelation, this[util.iri.isMemberOfRelation]);
        else this.node.deleteNode(util.iri.isMemberOfRelation);

        if (this[util.iri.insertedContentRelation])
            this.node.setNode(util.iri.insertedContentRelation, this[util.iri.insertedContentRelation]);
        else this.node.deleteNode(util.iri.insertedContentRelation);

        await this.node.save([
            util.iri.contains,
            util.iri.membershipResource,
            util.iri.hasMemberRelation,
            util.iri.isMemberOfRelation,
            util.iri.insertedContentRelation
        ]);
    }// Container#save

}; // Container
