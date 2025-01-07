const
    util      = require('./model.ldp.util.js'),
    space     = require('@fua/module.space'),
    /** @type {fua.module.space.Model} */
    model_ldp = module.exports = new space.Model();

model_ldp.set(util.iri.Resource, require('./model.ldp.Resource.js'));
model_ldp.set(util.iri.RDFSource, require('./model.ldp.RDFSource.js'));
model_ldp.set(util.iri.NonRDFSource, require('./model.ldp.NonRDFSource.js'));
model_ldp.set(util.iri.Container, require('./model.ldp.Container.js'));
model_ldp.set(util.iri.BasicContainer, require('./model.ldp.BasicContainer.js'));
model_ldp.set(util.iri.DirectContainer, require('./model.ldp.DirectContainer.js'));
model_ldp.set(util.iri.IndirectContainer, require('./model.ldp.IndirectContainer.js'));

model_ldp.finish();
