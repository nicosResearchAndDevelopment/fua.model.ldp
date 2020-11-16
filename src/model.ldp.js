module.exports = ({

                      //'IM': IM,
                      //'hrt': hrt = () => Date.now() / 1000,
                      //'uuid': uuid,
                      //'space': space,
                      //'builder': builder
                      //,

                  }) => {

    const
        model     = fua['model'],
        IM        = model['IM'],
        prefix    = "ldp",
        definedBy = "http://www.w3.org/ns/ldp#",
        vocab     = ":"
    ;
    let
        ldp
    ;

    class LDP extends IM['Ontology'] {

        constructor() {

            super({'prefix': prefix});

            Object.defineProperties(this, {
                '@id':                           {
                    enumerable: false,
                    value:      definedBy
                },
                //'@type':            {value: "owl:Ontology"},
                'rdfs:label':                    {
                    enumerable: false,
                    value:      "W3C Linked Data Platform (LDP)"
                },
                'rdfs:comment':                  {
                    enumerable: false,
                    value:      "This ontology provides an informal representation of the concepts and terms as defined in the LDP specification.  Consult the LDP specification for normative reference."
                },
                'rdfs:seeAlso':                  {
                    enumerable: false, value: [
                        "http://www.w3.org/2012/ldp",
                        "http://www.w3.org/TR/ldp-ucr/",
                        "http://www.w3.org/TR/ldp/",
                        "http://www.w3.org/TR/ldp-paging/",
                        "http://www.w3.org/2011/09/LinkedData/"
                    ]
                },
                'dcterms:title':                 {
                    enumerable: false,
                    value:      "The W3C Linked Data Platform (LDP) Vocabulary"
                },
                'vann:preferredNamespaceUri':    {enumerable: false, value: definedBy},
                'vann:preferredNamespacePrefix': {enumerable: false, value: namespace},
                // #
                'Resource':                      {
                    enumerable: false,
                    value:      require('./model.ldp.Resource.js')({
                        'definedBy': definedBy,
                        'namespace': namespace,
                        'vocab':     vocab
                    })
                },
                'rdfs:isDefinedBy':              {
                    enumerable: false,
                    value:      definedBy
                }
            });
            Object.defineProperty(this, 'RDFSource', {
                enumerable: true,
                value:      require('./model.ldp.RDFSource.js')({
                    'definedBy': definedBy,
                    'namespace': namespace,
                    'vocab':     vocab,
                    'Resource':  this['Resource']
                })
            });
            Object.defineProperty(this, 'NonRDFSource', {
                enumerable: true,
                value:      require('./model.ldp.NonRDFSource.js')({
                    'definedBy': definedBy,
                    'namespace': namespace,
                    'vocab':     vocab,
                    'Resource':  this['Resource']
                })
            });
            Object.defineProperty(this, 'Container', {
                enumerable: true,
                value:      require('./model.ldp.Container.js')({
                    'definedBy': definedBy,
                    'namespace': namespace,
                    'vocab':     vocab,
                    'RDFSource': this['RDFSource']
                })
            });
            Object.defineProperty(this, 'BasicContainer', {
                enumerable: true,
                value:      require('./model.ldp.BasicContainer.js')({
                    'definedBy': definedBy,
                    'namespace': namespace,
                    'vocab':     vocab,
                    'Container': this['Container']
                })
            });

        } // constructor
    } // class RDF

    ldp = new LDP();

    return {'ldp': ldp};

}; // module.export :: IM.ldp