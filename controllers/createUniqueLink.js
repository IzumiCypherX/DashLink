const ShortUniqueId = require('short-unique-id');

function createUniqueLink() {
    const uid = new ShortUniqueId({ length: 10 });
    return uid.rnd();
}

module.exports = {
    createUniqueLink
}
