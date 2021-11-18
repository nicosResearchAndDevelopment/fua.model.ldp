const
    util      = require('./model.ldp.util.js'),
    model     = require('./model.ldp.js'),
    Container = require('./model.ldp.Container.js');

/**
 * @alias fua.model.ldp.DirectContainer
 * @class
 * @extends {fua.model.ldp.Container}
 */
module.exports = class DirectContainer extends Container {

    // async load() {
    //     await super.load();
    //     if(this[util.iri.membershipResource] && this[util.iri.hasMemberRelation]) {
    //         await this[util.iri.membershipResource].node.load(this[util.iri.hasMemberRelation]);
    //     }
    //     // if (!this[util.iri.membershipResource])
    //     //     this[util.iri.membershipResource] = this;
    //     // if (!this[util.iri.hasMemberRelation] && !this[util.iri.isMemberOfRelation])
    //     //     this[util.iri.hasMemberRelation] = {'@id': util.iri.member};
    // } // LDP~DirectContainer#load

}; // DirectContainer
