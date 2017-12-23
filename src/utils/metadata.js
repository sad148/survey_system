function metadataValues() {
    let metadata={}
    metadata.countries=[{
        id:'india',
        value:'India'},{
        id:'usa',
        value:'U.S.A'},{
        id:'china',
        value:'China'},{
        id:'france',
        value:'France'},{
        id:'england',
        value:'England'
    }]

    metadata.position=[{
        id:'position1',
        value:'Position 1'
    },{
        id:'position2',
        value:'Position 2'
    },{
        id:'position3',
        value:'Position 3'
    },{
        id:'position4',
        value:'Position 4'
    }]

    metadata.role=[{
        id:'role1',
        value:'Role 1'
    },{
        id:'role2',
        value:'Role 2'
    },{
        id:'role3',
        value:'Role 3'
    },{
        id:'role4',
        value:'Role 4'
    }]

    return metadata;
}

module.exports.metadatadataValues = metadataValues;