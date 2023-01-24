const fs = require('fs/promises');
const uniqid = require('uniqid')
//load and parse data file
//provide ability to:
//real all entries
//read single entry by id
//add new entry
//* get maching entries by search criteria
let data = {};

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'));
    } catch (err) {
        console.error('error reading db');
    }
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit
        };
        next();
    };
}

async function getAll(query) {
    let refs = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));
    //filter refs by request

    if (query.search) {
        refs = refs.filter(c => c.title.toLowerCase().includes(query.search.toLowerCase()))
    }

    return refs;
}

async function getById(id) {
    const ref = data[id];
    if (ref) {
        return Object.assign({}, { id }, ref);
    } else {
        return undefined;
    }

}

async function create(ref) {
    const id = uniqid();
    data[id] = ref;
    await persist();
}

async function edit(id, ref) {
    if (!data[id]) {
        throw new ReferenceError('no such ref in db')
    }
    data[id] = ref;
    await persist();
}

async function persist() {
    try {
        await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('error writing out db')
    }
}
module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
}