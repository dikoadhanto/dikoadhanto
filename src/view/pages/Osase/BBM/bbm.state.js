const STATE_REGIONAL = {
    opts: [
        // { value: null, text: 'Please select regional', disabled: true },
        { value: null, text: "All Regional" },
        { value: "a", text: "Regional 1" },
        { value: "b", text: "Regional 2" },
    ],
    selected: null
}

const STATE_WITEL = {
    opts: [
        // { value: null, text: 'Please select witel', disabled: true },
        { value: null, text: "ALL WITEL" },
        { value: "a", text: "KARAWANG" },
        { value: "b", text: "SUKABUMI" },
    ],
    selected: null
}

const STATE_FILTER_UNIT = {
    opts: [
        // { value: null, text: 'Please select unit', disabled: true },
        { value: null, text: "VOLUME (LITER)" },
        { value: "a", text: "PERSEN" },
        { value: "b", text: "SUPPORT OPERASIONAL" },
    ],
    selected: null
}

const STATE_TABLE_REGIONAL = {
    regionalData: [{
        id_organisasi: 1,
        name: 'REGIONAL 1',
        parent_id: 1,
        level: 120,
        address: 'KARAWANG',
        pic: 'User',
        phone_number: '0821xxxxxx',
        description: 'TEST',
        isDelete: 0,
        updated_date: new Date(),
        updated_by: 'User',
        colName: 'REGIONAL'
    }],
    colName: 'Regional'
}

const STATE_TABLE_WITEL = {
    witelData: [{
        id_organisasi: 1,
        name: 'KARAWANG',
        parent_id: 1,
        level: 120,
        address: 'KRW',
        pic: 'User',
        phone_number: '0821xxxxxx',
        description: 'TEST',
        isDelete: 0,
        updated_date: new Date(),
        updated_by: 'User',
    }, {
        id_organisasi: 1,
        name: 'JAKARTA',
        parent_id: 1,
        level: 100,
        address: 'JKT',
        pic: 'User',
        phone_number: '0821xxxxxx',
        description: 'TEST',
        isDelete: 0,
        updated_date: new Date(),
        updated_by: 'User',
        colName: 'WITEL'
    }, {
        id_organisasi: 1,
        name: 'BANDUNG',
        parent_id: 1,
        level: 100,
        address: 'BDG',
        pic: 'User',
        phone_number: '0821xxxxxx',
        description: 'TEST',
        isDelete: 0,
        updated_date: new Date(),
        updated_by: 'User',
    }],
    colName: 'Witel'
}

const STATE_TABLE_LOKASI = {
    locationData: [{
            site_id: 1,
            name: 'KLARI',
            area_id: 1,
            city: 'KARAWANG',
            address: 'KLR',
            latitude: '029303.203',
            longtitude: '029303.203',
            isDelete: 0,
            updated_time: new Date(),
            updated_by: 'User'
        },
        {
            site_id: 1,
            name: 'PURWASARI',
            area_id: 1,
            city: 'KARAWANG',
            address: 'PWR',
            latitude: '029303.203',
            longtitude: '029303.203',
            isDelete: 0,
            updated_time: new Date(),
            updated_by: 'User'
        },
    ],
    colName: 'Lokasi'
}

export {
    STATE_REGIONAL,
    STATE_FILTER_UNIT,
    STATE_WITEL,
    STATE_TABLE_REGIONAL,
    STATE_TABLE_WITEL,
    STATE_TABLE_LOKASI
}