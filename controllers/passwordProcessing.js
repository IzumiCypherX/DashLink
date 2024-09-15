const bcrypt = require('bcryptjs');


function checkPasswordValidity(password) {
    // password must be at least 6 characters long and contain at least one number
    return password.length > 6 && /\d/.test(password);
}

// Bcrypt Functions 
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function validatePassword(password, hash) {
    const result = await bcrypt.compare(password, hash)
    return result
}

module.exports = {
    checkPasswordValidity,
    hashPassword,
    validatePassword
}