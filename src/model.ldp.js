const
    util  = require('./model.ldp.util.js'),
    space = require('@nrd/fua.module.space'),
    model = module.exports = new space.Model();

model.set(util.iri.Resource, require('./model.ldp.Resource.js'));
model.set(util.iri.RDFSource, require('./model.ldp.RDFSource.js'));
model.set(util.iri.NonRDFSource, require('./model.ldp.NonRDFSource.js'));
model.set(util.iri.Container, require('./model.ldp.Container.js'));
model.set(util.iri.BasicContainer, require('./model.ldp.BasicContainer.js'));
model.set(util.iri.DirectContainer, require('./model.ldp.DirectContainer.js'));
model.set(util.iri.IndirectContainer, require('./model.ldp.IndirectContainer.js'));

model.finish();
