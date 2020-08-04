module.exports = ({
                      'path':      path,
                      'fs':        fs
                      ,
                      'IM':        IM,
                      'hrt':       hrt = () => Date.now() / 1000,
                      'uuid':      uuid,
                      'space':     space,
                      'builder':   builder
                      ,
                      'namespace': namespace = "ldp",
                      'definedBy': definedBy = "http://www.w3.org/ns/ldp#",
                      'vocab':     vocab = ":",
                      'to_space':  to_space = true,
                      'container': container
                  }) => {

    let
        ldp
    ;

    //region fn

    //endregion fn

    //class LDP {
    //    constructor() {
    //        Object.defineProperties(this, {
    //            '@id': {value: namespace}
    //        });
    //    } // constructor
    //} // class LDP
    //
    //Object.defineProperties(LDP, {
    //    '@id':                           {value: namespace},
    //    '@type':                         {value: "owl:Ontology"},
    //    'rdfs:label':                    {value: "W3C Linked Data Platform (LDP)"},
    //    'rdfs:comment':                  {value: "This ontology provides an informal representation of the concepts and terms as defined in the LDP specification.  Consult the LDP specification for normative reference."},
    //    'rdfs:seeAlso':                  {
    //        value: [
    //            "http://www.w3.org/2012/ldp",
    //            "http://www.w3.org/TR/ldp-ucr/",
    //            "http://www.w3.org/TR/ldp/",
    //            "http://www.w3.org/TR/ldp-paging/",
    //            "http://www.w3.org/2011/09/LinkedData/"
    //        ]
    //    },
    //    'dcterms:title':                 {value: "The W3C Linked Data Platform (LDP) Vocabulary"},
    //    'vann:preferredNamespaceUri':    {value: "http://www.w3.org/ns/ldp#"},
    //    'vann:preferredNamespacePrefix': {value: "ldp"}
    //});

    class LDP extends IM['Ontology'] {
        constructor() {

            super({'prefix': namespace});

            Object.defineProperties(this, {
                '@id':                           {value: definedBy},
                //'@type':            {value: "owl:Ontology"},
                'rdfs:label':                    {value: "W3C Linked Data Platform (LDP)"},
                'rdfs:comment':                  {value: "This ontology provides an informal representation of the concepts and terms as defined in the LDP specification.  Consult the LDP specification for normative reference."},
                'rdfs:seeAlso':                  {
                    value: [
                        "http://www.w3.org/2012/ldp",
                        "http://www.w3.org/TR/ldp-ucr/",
                        "http://www.w3.org/TR/ldp/",
                        "http://www.w3.org/TR/ldp-paging/",
                        "http://www.w3.org/2011/09/LinkedData/"
                    ]
                },
                'dcterms:title':                 {value: "The W3C Linked Data Platform (LDP) Vocabulary"},
                'vann:preferredNamespaceUri':    {value: "http://www.w3.org/ns/ldp#"},
                'vann:preferredNamespacePrefix': {value: "ldp"},
                // #
                'Resource':                      {
                    value: require('./model.ldp.Resource.js')({
                        'IM':        IM,
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab,
                        'hrt':       hrt,
                        'uuid':      uuid,
                        'space':     space
                    })
                }
            });
            Object.defineProperties(this, {
                'RDFSource':    {
                    value: require('./model.ldp.RDFSource.js')({
                        'IM':        IM,
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab,
                        'hrt':       hrt,
                        'uuid':      uuid,
                        'space':     space
                        ,
                        'Resource':  this['Resource']
                    })
                },
                'NonRDFSource': {
                    value: require('./model.ldp.NonRDFSource.js')({
                        'path':      path,
                        'IM':        IM,
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab,
                        'hrt':       hrt,
                        'uuid':      uuid,
                        'space':     space
                        ,
                        'Resource':  this['Resource']
                    })
                }
            });
            Object.defineProperties(this, {
                'Container': {
                    value: require('./model.ldp.Container.js')({
                        'IM':        IM,
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab,
                        'hrt':       hrt,
                        'uuid':      uuid,
                        'space':     space
                        ,
                        'RDFSource': this['RDFSource']
                    })
                }
            });
            Object.defineProperties(this, {
                'BasicContainer': {
                    value: require('./model.ldp.BasicContainer.js')({
                        'IM':        IM,
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab,
                        'hrt':       hrt,
                        'uuid':      uuid,
                        'space':     space
                        ,
                        'Container': this['Container']
                    })
                }
            });
        } // constructor
    } // class RDF

    //Object.defineProperty(LDP, 'BasicContainer', {
    //    value: require('./IM.ldp.BasicContainer.js')({
    //        'IM':        IM,
    //        'definedBy': definedBy,
    //        'namespace': namespace,
    //        'vocab':     vocab,
    //        'hrt':       hrt,
    //        'uuid':      uuid,
    //        'space':     space
    //        ,
    //        'Container': LDP['Container']
    //    })
    //});
    //
    //Object.defineProperties(LDP, {});

    ldp = new LDP();

    if (to_space) {

        space.set(ldp);

        space.set(ldp['Resource']);
        space.set(ldp['RDFSource']);
        space.set(ldp['NonRDFSource']);
        space.set(ldp['Container']);
        space.set(ldp['BasicContainer']);

        //region TEST

        //console.warn(`IM.ldp : ldp.__proto__.constructor['BasicContainer'].$serialize() <${JSON.stringify(ldp.__proto__.constructor['BasicContainer'].$serialize(), "", "\t")}>`);
        //
        //let basicContainer      = ldp.__proto__.constructor['BasicContainer']({
        //    '@id':     "grunz",
        //    //'@type': ["ldp:BasicContainer"]
        //    'label':   "genau",
        //    'comment': "was geht?!?",
        //    '$nv':     true
        //}, /** parameter */ {});
        //basicContainer.contains = {};
        //basicContainer.member   = {};
        //let grunz               = basicContainer.contains.has(`grunz`);
        //basicContainer.member.add("mahlzeit");
        //grunz = basicContainer.member;
        ////console.warn(`IM.ldp : <${basicContainer.$serialize()}>`);
        //console.warn(`IM.ldp : basicContainer <${JSON.stringify(basicContainer.$serialize({'mode': "json"}), "", "\t")}>`);
        //throw new Error(`TEST`);

        //endregion TEST

        if (container) {
            container.push(ldp);
        } // if ()

    } // if ()

    return ldp;

}; // module.export :: IM.ldp