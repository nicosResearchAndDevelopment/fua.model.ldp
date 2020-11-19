module.exports = ({
                      'definedBy': definedBy,
                      'prefix': prefix
                  }) => {

    const
        model         = fua['model'],
        IM            = model['IM'],
        rdfs_Resource = model['rdfs']['Resource']
    ; // const

    //error first
    if (!rdfs_Resource)
        throw new Error(`fua.model.ldp.Resource : 'rdfs:Resource' is missing.`);

    function Resource(node, parameter) {
        node['@type'] = IM['$build_type'](node['@type'], `${prefix}:Resource`);
        node          = rdfs_Resource(node, parameter);
        node          = IM['$instance_serializer'](node, Resource);
        return node;
    } // function Resource()

    Object.defineProperties(Resource, {
        '@id':             {value: `${prefix}:Resource`},
        '@type':           {value: "rdfs:Class"},
        'fua:targetClass': {value: "ldp:Resource"},
        'rdfs:label':      {value: "Resource"},
        'rdfs:comment':    {value: "A HTTP-addressable resource whose lifecycle is managed by a LDP server."},
        'rdfs:subClassOf': {value: [{'@id': "rdfs:Resource"}]}
        ,
        '$serialize':      {value: IM['$class_serializer'](rdfs_Resource, Resource)}
    }); // Object.defineProperties(Resource)

    //REM: if done here derived will be stopped...
    //Object.seal(Resource);

    model[prefix]['Resource'] = Resource;
    return Resource;

}; // module.export :: IM.ldp.Resource