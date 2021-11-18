const
    _util = require('@nrd/fua.core.util'),
    util  = {
        ..._util,
        assert: new _util.Assert('model.ldp')
    };

util.iris = Object.freeze({
    type:                    'rdf:type',
    identifier:              'dct:identifier',
    format:                  'dct:format',
    title:                   'dct:title',
    alternative:             'dct:alternative',
    requires:                'dct:requires',
    modified:                'dct:modified',
    created:                 'dct:created',
    creator:                 'dct:creator',
    date:                    'xsd:date',
    string:                  'xsd:string',
    decimal:                 'xsd:decimal',
    integer:                 'xsd:integer',
    float:                   'xsd:float',
    boolean:                 'xsd:boolean',
    Resource:                'ldp:Resource',
    RDFSource:               'ldp:RDFSource',
    NonRDFSource:            'ldp:NonRDFSource',
    Container:               'ldp:Container',
    BasicContainer:          'ldp:BasicContainer',
    DirectContainer:         'ldp:DirectContainer',
    IndirectContainer:       'ldp:IndirectContainer',
    contains:                'ldp:contains',
    member:                  'ldp:member',
    membershipResource:      'ldp:membershipResource',
    hasMemberRelation:       'ldp:hasMemberRelation',
    isMemberOfRelation:      'ldp:isMemberOfRelation',
    insertedContentRelation: 'ldp:insertedContentRelation',
    constrainedBy:           'ldp:constrainedBy'
});

module.exports = Object.freeze(util);
