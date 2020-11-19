module.exports = ({
                      'prefix':    prefix = "ldp",
                      'definedBy': definedBy = "http://www.w3.org/ns/ldp#"
                  }) => {

    const
        model     = fua['model'],
        IM        = model['IM'],

        vocab     = ":"
    ;
    let
        ldp
    ;

    model[prefix] = {};

    class LDP extends IM['Ontology'] {

        #factory = [];

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
                'vann:preferredNamespacePrefix': {enumerable: false, value: prefix},
                // #
                'Resource':                      {
                    enumerable: false,
                    value:      require('./model.ldp.Resource.js')({
                        'definedBy': definedBy,
                        'prefix': prefix
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
                    'prefix': prefix,
                    'vocab':     vocab,
                    'Resource':  this['Resource']
                })
            });
            Object.defineProperty(this, 'NonRDFSource', {
                enumerable: true,
                value:      require('./model.ldp.NonRDFSource.js')({
                    'definedBy': definedBy,
                    'prefix': prefix,
                    'vocab':     vocab,
                    'Resource':  this['Resource']
                })
            });
            Object.defineProperty(this, 'Container', {
                enumerable: true,
                value:      require('./model.ldp.Container.js')({
                    'definedBy': definedBy,
                    'prefix': prefix,
                    'vocab':     vocab,
                    'RDFSource': this['RDFSource']
                })
            });
            Object.defineProperty(this, 'BasicContainer', {
                enumerable: true,
                value:      require('./model.ldp.BasicContainer.js')({
                    'definedBy': definedBy,
                    'prefix': prefix,
                    'vocab':     vocab,
                    'Container': this['Container']
                })
            });
            this.#factory = [
                this['Resource'],
                this['RDFSource'],
                this['NonRDFSource'],
                this['Container'],
                this['BasicContainer']
            ];
        } // constructor

        get $factory() {
            return this.#factory;
        }

    } // class LDP

    model['ldp'] = new LDP();

    return {'ldp': model['ldp']};

}; // module.export :: IM.ldp