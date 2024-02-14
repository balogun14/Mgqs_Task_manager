
function autenticateNormalUserOrAdminUser() {
	
}

// Your data to hash
const data = "This is some sensitive data";

// Convert data to bit array (optional, but recommended)
const dataBits = sjcl.codec.utf8String.toBits(data);

// Create a hashing object using SHA-256
const hash = sjcl.hash.sha256.create();

// Update the hash with the data
hash.update(dataBits);

// Finalize the hash and get the output
const hashedData = sjcl.codec.hex.fromBits(hash.finalize());

console.log("Hashed data:", hashedData);