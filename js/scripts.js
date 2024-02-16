class Student {
	constructor(name, isPresent) {
		this.name = name;
		this.isPresent = isPresent;
	}
}
window.taskCountMap = {
	sweeping: 3,
	serving: 9,
	toilet: 3,
	"washing-plate": 9,
};

window.clientData = {
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

window.autoAssignTasks = function () {
	const tasks = [];
	const femaleIds = [23, 4, 10, 15];
	Object.entries(taskCountMap).forEach(([taskType, count]) => {
		const clientIds = Object.keys(clientData).filter((id) => {
			if (taskType === "toilet") {
				return (
					!femaleIds.includes(Number(id)) &&
					!tasks.find((task) => task.clientId === id)
				);
			}
			return !tasks.find((task) => task.clientId === id);
		});

		const shuffledClients = shuffleArray(clientIds);

		for (let i = 0; i < count && i < shuffledClients.length; i++) {
			const clientId = shuffledClients[i];
			const clientName = clientData[clientId]["name"];
			tasks.push({ clientId, clientName, taskType });
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

window.runDailyTasksGeneration = function () {
	let lastRecordedDate = new Date().toLocaleDateString(); // Store initial date
	setInterval(() => {
		const currentDate = new Date().toLocaleDateString();
		if (currentDate !== lastRecordedDate) {
			autoAssignTasks();
			localStorage.setItem("tasksDate", currentDate);
			lastRecordedDate = currentDate;
		}
	}, 60 * 60 * 1000); //Checks for new date every hour
};

window.updateTaskList = function () {
	const taskTableBody = document.getElementById("task-list");
	taskTableBody.innerHTML = "";

	const tasks = retrieveTasks();
	if (!tasks || tasks.length === 0) {
		const noRecordRow = taskTableBody.insertRow();
		const noRecordCell = noRecordRow.insertCell();
		noRecordCell.colSpan = 2;
		noRecordCell.textContent = "No records found.";
		return;
	}
	const tasksByType = {};
	tasks.forEach((task) => {
		if (!tasksByType[task.taskType]) {
			tasksByType[task.taskType] = [];
		}
		tasksByType[task.taskType].push(task);
	});

	Object.keys(tasksByType).forEach((taskType) => {
		const tasksForType = tasksByType[taskType];
		tasksForType.forEach((task) => {
			const row = taskTableBody.insertRow();
			const nameCell = row.insertCell();
			const taskCell = row.insertCell();
			nameCell.textContent = task.clientName;
			taskCell.textContent = task.taskType;
		});
	});
};

window.retrieveTasks = function () {
	const storedTasks = localStorage.getItem("tasks");
	return storedTasks ? JSON.parse(storedTasks) : null;
};

window.shuffleArray = function (array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

// Add an event listener to the search input

window.search = function () {
	const searchInput = document
		.getElementById("name-search")
		.value.trim()
		.toLowerCase();
	const taskTableBody = document.getElementById("task-list");
	const tasks = retrieveTasks();

	// Clear the task list
	taskTableBody.innerHTML = "";

	if (!tasks || tasks.length === 0) {
		const noRecordRow = taskTableBody.insertRow();
		const noRecordCell = noRecordRow.insertCell();
		noRecordCell.colSpan = 2;
		noRecordCell.textContent = "No records found.";
		return;
	}

	// Filter tasks based on the search input
	const filteredTasks = tasks.filter((task) =>
		task.clientName.toLowerCase().includes(searchInput)
	);

	if (filteredTasks.length === 0) {
		const noMatchRow = taskTableBody.insertRow();
		const noMatchCell = noMatchRow.insertCell();
		noMatchCell.colSpan = 2;
		noMatchCell.textContent = "No matches found.";
		return;
	}

	// Display filtered tasks
	filteredTasks.forEach((task) => {
		const row = taskTableBody.insertRow();
		const nameCell = row.insertCell();
		const taskCell = row.insertCell();
		nameCell.textContent = task.clientName;
		taskCell.textContent = task.taskType;
	});
};

function captureTaskList() {
	const captureButton = document.getElementById("convert-button");
	captureButton.addEventListener("click", captureTaskList);
	const taskList = document.getElementById("task-table");
	html2canvas(taskList).then((canvas) => {
		const imgData = canvas.toDataURL("image/png");
		const downloadLink = document.createElement("a");
		downloadLink.href = imgData;
		downloadLink.download = "task-table.png";
		downloadLink.click();
	});
}

window.logOut = function () {
	sessionStorage.setItem("authenticated", "false");
	window.location.href = "../index.html";
};

autoAssignTasks();
runDailyTasksGeneration();
document.getElementById("name-search").addEventListener("input", function () {
	search();
});

document.addEventListener("DOMContentLoaded", function () {
	updateTaskList();
});
