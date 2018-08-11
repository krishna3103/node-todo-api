const bcrypt = require("bcryptjs");

var password = "123abc!";

bcrypt.genSalt(10, (err, salt) =>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(hash);
	});
});

var hashedPassword = "$2a$10$WWCYKiIWd/VWew5RC9JMm.68r3Fnv/nDdf3Hkj1EqH7W4kCCjPVwe";

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});