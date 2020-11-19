module.exports = ({
                      'definedBy': definedBy,
                      'prefix':    prefix
                  }) => {
    const
        model     = fua['model'],
        IM        = model['IM'],
        RDFSource = model['ldp']['RDFSource']
    ; // const

    let Container = (node, parameter = {
        'contains_validator': IM['$default_validator']
    }) => {

        parameter['contains_validator'] = ((parameter['contains_validator']) ? parameter['contains_validator'] : IM['$default_validator']);
        node['@type']                   = IM['$build_type'](node['@type'], `${prefix}:Container`);
        node                            = RDFSource(node, parameter);
        node                            = IM['$add_array'](
            node,
            "ldp:contains",
            ((node['ldp:contains'] && node['ldp:contains'].length > 0) ? IM['$build_array'](node['ldp:contains']) : undefined),
            parameter['contains_validator']
        );
        node                            = IM['$instance_serializer'](node, Container);

        return node;

    } // Container

    Object.defineProperties(Container, {
        '@id':             {value: `${prefix}:Container`},
        '@type':           {value: "rdfs:Class"},
        'fua:targetClass': {'value': "ldp:Container"},
        'rdfs:label':      {value: "LDP Container"},
        'rdfs:comment':    {value: "A Linked Data Platform RDF Source (LDP-RS) that also conforms to additional patterns and conventions for managing membership. Readers should refer to the specification defining this ontology for the list of behaviors associated with it."},
        'rdfs:subClassOf': {value: [{'@id': "ldp:RDFSource"}]},
        //
        '$serialize':      {
            value: (instance, node) => {
                let node_ = IM['$class_serializer'](RDFSource, Container)(instance, node);
                if (true || (instance && instance['contains'].length > 0))
                    node_['ldp:contains'] = instance['contains'];
                return node_;
            }
        }
    });

    model[prefix]['Container'] = Container;

    return Container;

}; // module.export :: IM.ldp.Container
