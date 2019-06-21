const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = function() {
    const data = fs.readFileSync(path.join(__dirname, '../', 'firebase-encrypted.txt'), 'utf8');
    const Decipher = crypto.createDecipher('aes-192-cbc',  process.env.FIREBASE_CREDENTIALS_DECRYPTION_KEY || require('../local.json').firebasePassword);
    let decrypted = Decipher.update(data, 'base64', 'utf8');
    decrypted += Decipher.final('utf8');
    return JSON.parse(decrypted);
}