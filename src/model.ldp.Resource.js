module.exports = ({
                      'IM':        IM,
                      'definedBy': definedBy,
                      'namespace': namespace,
                      'vocab':     vocab,
                      'hrt':       hrt = () => Date.now() / 1000,
                      'uuid':      uuid,
                      'space':     space
                  }) => {

    const
        rdfs_Resource = space.get(`rdfs:Resource`)
    ; // const
    //error first
    if (!rdfs_Resource)
        throw new Error(`IM.ldp.Resource : 'rdfs:Resource is missing.`);

    function Resource(node, parameter) {
        node['@type'] = IM['$build_type'](node['@type'], "ldp:Resource");
        node          = rdfs_Resource(node, parameter);
        node          = IM['$instance_serializer'](node, Resource);
        return node;
    } // function Resource()

    Object.defineProperties(Resource, {
        '@id':             {value: `${namespace}${vocab}Resource`},
        '@type':           {value: "rdfs:Class"},
        'rdfs:label':      {value: "Resource"},
        'rdfs:comment':    {value: "A HTTP-addressable resource whose lifecycle is managed by a LDP server."},
        'rdfs:subClassOf': {value: [{'@id': "rdfs:Resource"}]}
        ,
        '$serialize':      {value: IM['$class_serializer'](rdfs_Resource, Resource)}
    }); // Object.defineProperties(Resource)

    //REM: if done here derived will be stopped...
    //Object.seal(Resource);

    return Resource;

}; // module.export :: IM.ldp.Resource