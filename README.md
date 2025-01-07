# fua.model.ldp

Linked Data Platform

## Usage

```js
model   = require('@fua/model.ldp');    // require the model
param   = {
    baseIRI:  'http://localhost/',          // necessary but currently not used
    basePath: __dirname                     // necessary for path resolvement
};
builder = model.builder(space, param);      // create a builder

resource = builder('ex:hello');             // can be a string
resource = builder({'@id': 'ex:hello'});    // can be an object identifier
resource = builder(resource);               // can be another resource
resource = builder(resource.node);          // can be a space node
resource = builder(resource.node.term);     // can be a persistence term

resource = model.build(                     // a resource can also be build without a builder
    space.getNode('ex:hello'),              // then it needs a space node
    param                                   // and the necessary parameter
);

await resource.load();                      // only loads supported properties

console.log(resource.serialize());          // default: text/turtle
console.log(resource.node.toJSON());        // toJSON of the space node

await resource.save();                      // only saves supported properties
```
