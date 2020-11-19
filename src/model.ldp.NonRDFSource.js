module.exports = ({
                      'definedBy': definedBy,
                      'prefix':    prefix
                  }) => {

    const
        fs       = require("fs"),
        path     = require("path"),
        model    = fua['model'],
        IM       = model['IM'],
        Resource = model[prefix]['Resource']
    ; // const

    const ___content_empty___ = Symbol(42);

    //region fn
    function get_content(node, parameter) {
        return function () {
            return new Promise((resolve, reject) => {
                try {
                    if (!parameter['cache_content'] || (parameter['cache_content'] && parameter['content'] === ___content_empty___)) {

                        fs['readFile'](parameter['absolute_path'], "utf8", (err, data) => {
                            if (err) {
                                console.log(data); // file content
                                reject(err);
                            } else {
                                fs['stat'](parameter['absolute_path'], (stat_err, stats) => {
                                    if (stat_err)
                                        throw stat_err;

                                    if (parameter['cache_content']) {
                                        parameter['content'] = data;
                                    } // if ()
                                    node['$nv']       = stats['mtime'].valueOf();
                                    parameter['vts']  = hrt();
                                    parameter['size'] = stats['size'];
                                    resolve(data);
                                }); // fs['stat'](
                            } // if ()
                        }); // fs['readFile']()
                    } else {
                        resolve(parameter['content']);
                    } // if ()
                } catch (jex) {
                    reject(jex);
                } // try
            }); // return new Promise()
        }; // return

    } // get_content()
    //endregion

    function NonRDFSource(node, parameter = {}) {

        let parsed;

        try {

            // error first
            if (!parameter['content'] && !parameter['absolute_path'])
                throw new Error(`fua.model.ldp.NonRDFSource : 'absolute path to resource is missing.`);

            parameter['content']       = (parameter['content'] || ___content_empty___);
            parameter['size']          = undefined;
            parameter['cache_content'] = (parameter['cache_content'] || false);

            if (parameter['content'] === ___content_empty___) {
                parsed                 = path['parse'](parameter['absolute_path']);
                parameter['file_name'] = parsed['name'];
                //this.#file_extension = parsed['ext'];
                //parameter['file_extension'] = ((parsed['ext'] !== "") ? parsed['ext'] : parsed['base']);
                parameter['file_extension'] = ((parsed['ext'] !== "") ? parsed['ext'] : undefined);
            } else {
            } // if ()

            "TODO: coming from NonRDFSeource itself";
            parameter['$vts'] = hrt();

            node['$nv']   = false;
            node['@type'] = IM['$build_type'](node['@type'], "ldp:NonRDFSource");

            node = Resource(node, parameter);

            Object.defineProperties(node, {
                'absolutePath':  {
                    'get': () => parameter['absolute_path']
                },
                'fileExtension': {
                    'get': () => parameter['file_extension']
                },
                'fileName':      {
                    'get': () => parameter['file_name']
                },
                'cacheContent':  {
                    'get': () => parameter['cache_content']
                },
                'sts':           {
                    'get': () => node['$nv']
                },
                'vts':           {
                    'get': () => parameter['$vts']
                },
                'content':       {value: get_content(node, parameter)}
                ,
                '$serialize':    {
                    'value': IM['$serialize'](NonRDFSource, node)
                }
            });

            return node;

        } catch (jex) {
            // TODO: jex;
            return null;
        } // try

    } // function NonRDFSource()

    Object.defineProperties(NonRDFSource, {
        '@id':             {value: `${prefix}:NonRDFSource`},
        '@type':           {value: "rdfs:Class"},
        'fua:targetClass': {'value': "ldp:NonRDFSource"},
        'rdfs:label':      {value: "LDP NonRDFSource"},
        'rdfs:comment':    {value: "A Linked Data Platform RDF Source (LDP-RS) that also conforms to additional patterns and conventions for managing membership. Readers should refer to the specification defining this ontology for the list of behaviors associated with it."},
        'rdfs:subClassOf': {value: [{'@id': `${prefix}:Resource`}]},
        //
        '$serialize':      {
            value: (instance, node) => {
                let node_ = IM['$class_serializer'](NonRDFSource, Resource)(instance, node);
                //if (true || (instance && instance['contains'].length > 0))
                //    node_['ldp:contains'] = instance['contains'];
                return node_;
            }
        }
    });

    model[prefix]['NonRDFSource'] = NonRDFSource;

    return NonRDFSource;

}; // module.export :: IM.ldp.NonRDFSource
