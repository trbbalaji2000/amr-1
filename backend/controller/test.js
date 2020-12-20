const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'balaji';
const d='balaji10';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);

bcrypt.compare(myPlaintextPassword, d, function(err, result) {
    // result == true
console.log(result)

});});