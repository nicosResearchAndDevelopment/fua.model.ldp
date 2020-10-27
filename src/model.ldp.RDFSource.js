module.exports = ({
                      //'IM':        IM,
                      'definedBy': definedBy,
                      'namespace': namespace,
                      'vocab':     vocab,
                      //'hrt':       hrt = () => Date.now() / 1000,
                      //'uuid':      uuid,
                      //'space':     space,
                      'Resource':  Resource
                  }) => {

    const
        IM         = fua['model']['IM']
    ; // const

    let RDFSource = (node, parameter) => {

        node['@type'] = IM['$build_type'](node['@type'], "ldp:RDFSource");

        node = Resource(node, parameter);

        //Object.defineProperties(node, {
        //    '$serialize': {
        //        'configurable': true,
        //        'value':        IM['$serialize'](RDFSource, node)
        //    }
        //});
        node = IM['$instance_serializer'](node, RDFSource);

        return node;
    };

    Object.defineProperties(RDFSource, {
        '@id':             {'value': `${namespace}${vocab}RDFSource`},
        '@type':           {'value': "rdfs:Class"},
        'rdfs:label':      {'value': "RDFSource"},
        'rdfs:comment':    {'value': "A Linked Data Platform Resource (LDPR) whose state is represented as RDF."},
        'rdfs:subClassOf': {'value': [{'@id': "ldp:Resource"}]}
        ,
        '$serialize':      {'value': IM['$class_serializer'](Resource, RDFSource)}
    }); // Object.defineProperties(RDFSource)

    return RDFSource;

}; // module.export :: IM.ldp.RDFSource