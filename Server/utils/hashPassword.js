const crypto = require('crypto');

module.exports = (passwordText, salt, iterations) =>
    crypto.pbkdf2Sync(passwordText, salt, iterations, 512, 'sha512').toString('hex');