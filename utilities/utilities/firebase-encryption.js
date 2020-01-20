const fs = require('fs');
const path = require('path');

const crypto = require('crypto');
const data = JSON.stringify(require('../firebase-decrypted.json'));

try {
    const Cipher = crypto.createCipher('aes-192-cbc', process.env.FIREBASE_CREDENTIALS_DECRYPTION_KEY || require('../local.json').firebasePassword);
    let encrypted = Cipher.update(data, 'utf8', 'base64');
    encrypted += Cipher.final('base64');

    fs.writeFileSync(path.join(__dirname, '../', 'firebase-encrypted.txt'), encrypted);

    console.log('Encrypted and written succesfully');
}
catch(error) {
    console.error('Error', error);
}
