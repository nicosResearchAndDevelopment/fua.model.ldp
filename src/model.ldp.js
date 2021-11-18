const
    util  = require('./model.ldp.util.js'),
    space = require('@nrd/fua.module.space'),
    model = module.exports = new space.Model();

model.set(util.iris.Resource, require('./model.ldp.Resource.js'));
model.set(util.iris.RDFSource, require('./model.ldp.RDFSource.js'));
model.set(util.iris.NonRDFSource, require('./model.ldp.NonRDFSource.js'));
model.set(util.iris.Container, require('./model.ldp.Container.js'));
model.set(util.iris.BasicContainer, require('./model.ldp.BasicContainer.js'));
model.set(util.iris.DirectContainer, require('./model.ldp.DirectContainer.js'));
model.set(util.iris.IndirectContainer, require('./model.ldp.IndirectContainer.js'));

model.finish();
