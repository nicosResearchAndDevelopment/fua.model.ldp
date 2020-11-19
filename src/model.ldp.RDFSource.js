module.exports = ({
                      'definedBy': definedBy,
                      'prefix':    prefix
                  }) => {

    const
        model    = fua['model'],
        IM       = model['IM'],
        Resource = model[prefix]['Resource']
    ; // const

    let RDFSource = (node, parameter) => {

        node['@type'] = IM['$build_type'](node['@type'], `${prefix}:RDFSource`);

        node = Resource(node, parameter);

        //Object.defineProperties(node, {
        //    '$serialize': {
        //        'configurable': true,
        //        value:        IM['$serialize'](RDFSource, node)
        //    }
        //});
        node = IM['$instance_serializer'](node, RDFSource);

        return node;
    };

    Object.defineProperties(RDFSource, {
        '@id':             {value: `${prefix}:RDFSource`},
        '@type':           {value: "rdfs:Class"},
        'rdfs:label':      {value: "LDP RDFSource"},
        'fua:targetClass': {value: "ldp:RDFSource"},
        'rdfs:comment':    {value: "A Linked Data Platform Resource (LDPR) whose state is represented as RDF."},
        'rdfs:subClassOf': {value: [{'@id': `${prefix}:Resource`}]}
        ,
        '$serialize':      {value: IM['$class_serializer'](Resource, RDFSource)}
    }); // Object.defineProperties(RDFSource)

    model[prefix]['RDFSource'] = RDFSource;

    return RDFSource;

}; // module.export :: IM.ldp.RDFSource