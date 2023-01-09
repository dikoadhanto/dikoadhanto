const STATE_REGIONAL = {
    opts: [{
            id: "DTT-fa100000",
            label: "ALL REGIONAL",
        }, {
            id: "DTT-fa200000",
            label: "REGIONAL JAWA TENGAH & DIY",
        },
        {
            id: "DTT-fb200000",
            label: "REGIONAL JAWA BARAT",
        },
        {
            id: "DTT-fc200000",
            label: "REGIONAL JAWA TIMUR",
        },
    ],
    selected: "DTT-fa100000"
}

const STATE_TYPE_SITE = {
    opts: [{
        id: 0,
        label: "Main PoP",
    }, {
        id: 1,
        label: "Secondary PoP",
    }, ],
    selected: null
}

const STATE_TAGS = {
    opts: [{
        id: 0,
        label: "BBM",
    }, {
        id: 1,
        label: "Suhu",
    }, ],
    selected: null
}

const STATE_WITEL = {
    opts: [{
        id: 1,
        label: "ALL WITEL",
    }, ],
    selected: 1
}

const STATE_FILTER_UNIT = {
    opts: [
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

const STATE_ORGANIZATION = {
    container: [{
        id: 'DTT-fa200000',
        parent_id: 'TLK-r4000000',
        name: 'WITEL PEKALONGAN',
        sname: null,
        level: 2,
        address: null,
        pic: null,
        phone_number: null,
        updated_at: null,
        created_at: null,
        created_by: null,
        updated_by: null,
        is_deleted: null
    }, {
        id: 'DTT-fb200000',
        parent_id: 'TLK-r4000000',
        name: 'WITEL PURWOREJO',
        sname: null,
        level: 2,
        address: null,
        pic: null,
        phone_number: null,
        updated_at: null,
        created_at: null,
        created_by: null,
        updated_by: null,
        is_deleted: null
    }, {
        id: 'DTT-fc200000',
        parent_id: 'TLK-r4000000',
        name: 'WITEL SEMARANG',
        sname: null,
        level: 2,
        address: null,
        pic: null,
        phone_number: null,
        updated_at: null,
        created_at: null,
        created_by: null,
        updated_by: null,
        is_deleted: null
    }, {
        id: 'TLK-r4000000',
        parent_id: 'TELKOM',
        name: 'DIVISI REGIONAL 4 JATENG & DIY',
        sname: null,
        level: 2,
        address: null,
        pic: null,
        phone_number: null,
        updated_at: null,
        created_at: null,
        created_by: null,
        updated_by: null,
        is_deleted: null
    }]
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

const STATE_REGIONAL_ERD = {
    container: [{
            id: 'TLK-r1000000',
            parent_id: '',
            name: 'DIVISI TELKOM REGIONAL I',
            sname: '',
            level: 100,
            address: '0.0.0.0',
            pic: 'USER1',
            phone_number: '08xxxxxx',
            updated_at: new Date(),
            created_at: new Date(),
            created_by: 'admin',
            updated_by: 'admin',
            is_deleted: 0
        },
        {
            id: 'TLK-r2000000',
            parent_id: '',
            name: 'DIVISI TELKOM REGIONAL II',
            sname: '',
            level: 100,
            address: '0.0.0.0',
            pic: 'USER1',
            phone_number: '08xxxxxx',
            updated_at: new Date(),
            created_at: new Date(),
            created_by: 'admin',
            updated_by: 'admin',
            is_deleted: 0
        },
        {
            id: 'TLK-r3000000',
            parent_id: '',
            name: 'DIVISI TELKOM REGIONAL III',
            sname: '',
            level: 100,
            address: '0.0.0.0',
            pic: 'USER1',
            phone_number: '08xxxxxx',
            updated_at: new Date(),
            created_at: new Date(),
            created_by: 'admin',
            updated_by: 'admin',
            is_deleted: 0
        }
    ]
}

const STATE_ORG_TEMP = {
    container: [{
        id: 0,
        name: 'REGIONAL JAWA BARAT',
        vals: 140,
        witels: [{
            id: 0,
            name: 'KARAWANG',
            vals: 80,
            locations: [{
                id: 0,
                name: 'KLARI',
                vals: 40
            }, {
                id: 1,
                name: 'PURWASARI',
                vals: 20
            }, {
                id: 2,
                name: 'PURWAKARTA',
                vals: 20,
            }]
        }, {
            id: 1,
            name: 'DKI JAKARTA',
            vals: 60,
            locations: [{
                id: 0,
                name: 'PALMERAH',
                vals: 30
            }, {
                id: 1,
                name: 'PONDOK INDAH',
                vals: 10
            }, {
                id: 2,
                name: 'PANCORAN',
                vals: 20,
            }]
        }],
    }, {
        id: 1,
        name: 'REGIONAL JAWA TENGAH',
        vals: 140,
        witels: [{
            id: 0,
            name: 'PURWOREJO',
            vals: 80,
            locations: [{
                id: 0,
                name: 'BAGELEN',
                vals: 40
            }, {
                id: 1,
                name: 'BANYUURIP',
                vals: 20
            }, {
                id: 2,
                name: 'BAYAN',
                vals: 20,
            }]
        }, {
            id: 1,
            name: 'MAGELANG',
            vals: 60,
            locations: [{
                id: 0,
                name: 'BANDONGAN',
                vals: 30
            }, {
                id: 1,
                name: 'BUROBUDUR',
                vals: 10
            }, {
                id: 2,
                name: 'CANDIMULYO',
                vals: 20,
            }]
        }],
    }, {
        id: 2,
        name: 'REGIONAL JAWA TIMUR',
        vals: 140,
        witels: [{
            id: 0,
            name: 'SURABAYA',
            vals: 80,
            locations: [{
                id: 0,
                name: 'KLARI',
                vals: 40
            }, {
                id: 1,
                name: 'PURWASARI',
                vals: 20
            }, {
                id: 2,
                name: 'PURWAKARTA',
                vals: 20,
            }]
        }, {
            id: 1,
            name: 'MALANG',
            vals: 60,
            locations: [{
                id: 0,
                name: 'BLIMBING',
                vals: 30
            }, {
                id: 1,
                name: 'KEDUNGKADANG',
                vals: 10
            }, {
                id: 2,
                name: 'KLOJEN',
                vals: 20,
            }]
        }],
    }]
}

export {
    STATE_REGIONAL,
    STATE_FILTER_UNIT,
    STATE_WITEL,
    STATE_TABLE_REGIONAL,
    STATE_TABLE_WITEL,
    STATE_TABLE_LOKASI,
    STATE_ORGANIZATION,
    STATE_ORG_TEMP,
    STATE_REGIONAL_ERD,
    STATE_TYPE_SITE,
    STATE_TAGS
}