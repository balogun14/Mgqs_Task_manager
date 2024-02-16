const myModule = (function () {
	const privateData = {
		1: new Student("Abdulraheem Adebare", false),
		2: new Student("Saleem Ahmad Abimbola", false),
		3: new Student("Khalilur Rahman Abimbola", false),
		4: new Student("Hasbiyallah Oyebo", false),
		5: new Student("Abdulbasit Abdulsalam", false),
		6: new Student("Balogun Muhammed-Awwal", false),
		7: new Student("Ibrahim Odusanya", false),
		8: new Student("Abdullah Oladejo", false),
		9: new Student("Dhulfikkar Animashaun", false),
		10: new Student("Qaanitah Oyekola", false),
		11: new Student("Usman Afolayan", false),
		12: new Student("Ahmadraza Danmole", false),
		13: new Student("Abdultawwab Oladipupo", false),
		14: new Student("Hussein Hanif", false),
		15: new Student("Bushroh Ayelaagbe", false),
		16: new Student("Faruq Tella", false),
		17: new Student("Mamun Omolaja", false),
		18: new Student("Haruna Abdulmalik", false),
		19: new Student("Abdulazeez Shittu", false),
		20: new Student("Tahir Bastu", false),
		22: new Student("Olowofayokun Sherifdeen", false),
		23: new Student("Adeoye Aisha", false),
		24: new Student("Adekoya Yusuf", false),
	};

	return {
		myMethod: function (data) {
			// ...
		},
		get clientData() {
			return privateData;
		},
		set clientData(value) {
			privateData = value;
		},
	};
})();
