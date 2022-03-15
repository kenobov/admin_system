const TCmodel = {
    material: {
        total: 0,
        quantity: 1,

        width: 0,
        height: 0,
        density: 0,

        paper: {
            id: 0,
            name: 'Не выбрана',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        },

        pages: 0,

        proportion: "yes",
        refilling: 0,

        xq: 0,
        yq: 0,
        thickness: 0
    },

    print: {
        type: "none",
        machine: "2060",
        paints: {
            face: {
                cyan:  null,
                magenta: null,
                yellow:  null,
                black:  null,
                varnish:  null,
                pantone: []
            },
            back: {
                cyan:  null,
                magenta: null,
                yellow:  null,
                black:  null,
                varnish:  null,
                pantone: []
            }
        },
        complexity: 1,
        unique: 'no',

        plates: 0,
        master: 0,

        inkprints: 0,
        fitting: 0

    },

    lamination: {
        lamination: "no",
        lamination_paper: {
            id: 0,
            name: 'Не выбрана',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        },
        lamination_density: "32",
        lamination_type: 1,
        lamination_sides: 1,

        fitting: 0
    },

    numeration: {
        numeration: "no",
        numeration_start: '000001',
        numeration_end: '000002'
    },

    embossing: {
        embossing: "no",
        stamps: [],
        fitting: 0
    },

    creasing: {
        creasing_quantity: 0
    },

    perforation: {
        perforation_quantity : 0
    },

    stitching: {
        stitching: 'none',
        material: {
            id: 0,
            name: 'Не выбрана',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        },
        qpi: 2,
        notebooks: 1
    },

    captal: {
        captal: 'no',
        material: {
            id: 0,
            name: 'Не выбран',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        }
    },

    wire: {
        wire: 'no',
        perforations: 1,
        quantity: 1,
        type: 'top',
        material: {
            id: 0,
            name: 'Не выбран',
            unit: "",
            price: 0,
            quantity: 0
        }
    },

    gauze: {
        gauze: 'no',
        material: {
            id: 0,
            name: 'Не выбрана',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        }
    },

    ribbon: {
        ribbon: 'no',
        length: 0,
        material: {
            id: 0,
            name: 'Не выбран',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        }
    },

    fasten: {
        fasten: 'no',
        material: {
            id: 0,
            name: 'Не выбран',
            unit: "",
            price: 0,
            parameters: "{\"width\":\"0\",\"height\":\"0\"}",
            quantity: 0
        }
    },

    info: {
        cover: 'soft',
        material: 'paper',
        pages: '',
        firmware: 'no',
        orientation: 'portrait',
        middle: 'no'
    }

}

export default TCmodel;