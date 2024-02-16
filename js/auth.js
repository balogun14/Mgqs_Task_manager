//Hashed Password for Normal User
const nUsersha256 =
	"53dc7a5135e96bcb2ce66063c039c8029f08c92cabba746566d685d867f82bb4";
//HAshed Admin Password
const AdUserSha =
	"dc4aa707636ec734bb22a822b62592c85c668c511f10e98da810420c8d5d2181";

function authenticateNormalUserOrAdminUser() {
	const data = document.getElementById("pass").value;
	const hashbits = sjcl.hash.sha256.hash(data);
	const hashedData = sjcl.codec.hex.fromBits(hashbits);
	if (hashedData === nUsersha256) {
		sessionStorage.setItem("authenticated", "true");
		window.location.href = "pages/home.html";
	} else if (AdUserSha === hashedData) {
		window.location.href = "pages/admin.html";
	} else {
		alert("Incorrect password");
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const isAuthenticated = sessionStorage.getItem("authenticated");
	if (isAuthenticated === "true") {
		window.location.href = "pages/home.html";
	}
});
