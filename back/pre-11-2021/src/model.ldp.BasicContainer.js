module.exports = ({
                      'definedBy': definedBy,
                      'prefix':    prefix
                  }) => {

    const
        model     = fua['model'],
        IM        = model['IM'],
        Container = model[prefix]['Container']
    ; // const

    let BasicContainer = (node, parameter) => {
        node['@type'] = IM['$build_type'](node['@type'], `${prefix}:BasicContainer`);
        node          = Container(node, parameter);
        node          = IM['$instance_serializer'](node, BasicContainer);
        return node;
    } // function BasicContainer

    Object.defineProperties(BasicContainer, {
        '@id':              {'value': `${prefix}:BasicContainer`},
        // TODO: rdfs:Class, NOT owl:Class?!?
        '@type':            {'value': "rdfs:Class"},
        'rdfs:label':       {'value': "LDP Basic Container"},
        'fua:targetClass':  {'value': "ldp:BasicContainer"},
        'rdfs:comment':     {'value': "An LDPC that uses a predefined predicate to simply link to its contained resources."},
        'rdfs:subClassOf':  {'value': [{'@id': `${prefix}:Container`}]},
        "rdfs:isDefinedBy": {'value': [{"@id": "http://www.w3.org/ns/ldp#"}]}
        ,
        '$serialize':       {'value': IM['$class_serializer'](Container, BasicContainer)}
    });

    model[prefix]['BasicContainer'] = BasicContainer;

    return BasicContainer;

}; // module.export :: IM.ldp.BasicContainer