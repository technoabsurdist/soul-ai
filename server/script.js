const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash('admin', saltRounds, function(err, hash) {
    console.log(hash);
});
