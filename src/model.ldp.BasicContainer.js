module.exports = ({
                      //'IM':        IM,
                      'definedBy': definedBy,
                      'namespace': namespace,
                      'vocab':     vocab,
                      //'hrt':       hrt = () => Date.now() / 1000,
                      //'uuid':      uuid,
                      //'space':     space,
                      'Container': Container
                  }) => {

    const
        IM = fua['model']['IM']
    ; // const

    let BasicContainer = (node, parameter) => {
        node['@type'] = IM['$build_type'](node['@type'], "ldp:BasicContainer");
        node          = Container(node, parameter);
        node          = IM['$instance_serializer'](node, BasicContainer);
        return node;
    } // function BasicContainer

    Object.defineProperties(BasicContainer, {
        '@id':              {'value': `${namespace}${vocab}BasicContainer`},
        // TODO: rdfs:Class, NOT owl:Class?!?
        '@type':            {'value': "rdfs:Class"},
        'rdfs:label':       {'value': "Basic Container"},
        'rdfs:comment':     {'value': "An LDPC that uses a predefined predicate to simply link to its contained resources."},
        'rdfs:subClassOf':  {'value': [{'@id': "ldp:Container"}]},
        "rdfs:isDefinedBy": {'value': [{"@id": "http://www.w3.org/ns/ldp#"}]}
        ,
        '$serialize':       {'value': IM['$class_serializer'](Container, BasicContainer)}
    });

    return BasicContainer;

}; // module.export :: IM.ldp.BasicContainer