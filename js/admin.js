const clientData = {
	1: "Abdulraheem Adebare ",
	2: "Saleem Ahmad Abimbola",
	3: "Khalilur Rahman Abimbola",
	4: "Hasbiyallah Oyebo",
	5: "Abdulbasit Abdulsalam",
	6: "Balogun Muhammed-Awwal",
	7: "Ibrahim Odusanya",
	8: "Abdullah Oladejo",
	9: "Abdullah Animashaun",
	10: "Qaanitah Oyekola",
	11: "Usman Afolayan",
	12: "Ahmadraza Danmole",
	13: "Abdultawwab Oladipupo",
	14: "Hussein Hanif",
	15: "Bushroh Ayelaagbe",
	16: "Faruq Tella",
	17: "Mamun Omolaja",
	18: "Haruna Abdulmalik",
	19: "Abdulazeez Shittu",
	20: "Tahir Bastu",
	22: "Olowofayokun Sherifdeen",
	23: "Adeoye Aisha",
	24: "Adekoya Yusuf",
};

const taskCountMap = {
	sweeping: 1,
	"washing-plate": 3,
	serving: 3,
	toilet: 1,
};

// Load names and populate the select element
let nameSelect = document.getElementById("name");
for (const clientId in clientData) {
	if (clientData.hasOwnProperty(clientId)) {
		const option = document.createElement("option");
		option.value = clientId;
		option.text = clientData[clientId];
		nameSelect.appendChild(option);
	}
}

// Add event listener to Add Task button
const addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", addTask);

function addTask() {

	const clientId = document.getElementById("name").value;
	const taskType = document.getElementById("task-type").value;
	// Validate input
	if (!clientId || !taskType) {
		alert("Please fill in all required fields.");
		return;
	}

	// Add task to local storage or database
	storeTask(clientId, taskType);

	// Update task list
	updateTaskList();
}

// Function to update task list dynamically
function updateTaskList() {
	const taskList = document.getElementById("task-list");
	taskList.innerHTML = ""; // Clear existing tasks

	// Retrieve tasks from storage (adjust for your storage mechanism)
	const tasks = retrieveTasks();

	// Filter tasks based on search input (if applicable)
	const searchInput = document.getElementById("name-search");
	const searchTerm = searchInput.value.toLowerCase();
	const filteredTasks = searchTerm
		? tasks.filter((task) => task.clientName.toLowerCase().includes(searchTerm))
		: tasks;
	// Generate and display task list items
	if (filteredTasks == null) {
		const paragraph = document.createElement("p");
		paragraph.innerText = "No record Found";
		taskList.appendChild(paragraph);
		return;
	}

    const taskTableBody = document.getElementById("task-list");

    const tasksByType = {};
    tasks.forEach(task => {
        if (!tasksByType[task.taskType]) {
            tasksByType[task.taskType] = [];
        }
        tasksByType[task.taskType].push(task);
    });

    Object.keys(tasksByType).forEach(taskType => {
        const tasksForType = tasksByType[taskType];
        tasksForType.forEach(task => {
            const row = taskTableBody.insertRow();
            const nameCell = row.insertCell();
            const taskCell = row.insertCell();
            nameCell.textContent = task.clientName;
            taskCell.textContent = task.taskType;
        });
    });
}

// Placeholder function to store tasks in your preferred storage mechanism
function storeTask(clientId, taskType) {
	const tasks = retrieveTasks() || []; // Get existing tasks or initialize an empty array
	let duplicate = false;
	tasks.forEach((element) => {
		console.log(element);
		if (element.clientName == clientData[clientId]) {
			duplicate = true;
		}
	});
	if (duplicate) {
		alert("This Person Has been Assigned a Task Already");
		return;
	}
	tasks.push({ clientName: clientData[clientId], taskType: taskType }); // Add new task
	localStorage.setItem("tasks", JSON.stringify(tasks)); // Store as JSON string
	console.log(`Adding task: ${clientId}, ${taskType}`);
}
// Function to retrieve tasks from local storage
function retrieveTasks() {
	const storedTasks = localStorage.getItem("tasks");
	return storedTasks ? JSON.parse(storedTasks) : null; // Parse JSON or return null
}

// Function to handle client search functionality
function search() {
	updateTaskList();
}



function captureTaskList() {
	const taskList = document.getElementById("task-table");
	html2canvas(taskList).then((canvas) => {
		const imgData = canvas.toDataURL("image/png");
		const downloadLink = document.createElement("a");
		downloadLink.href = imgData;
		downloadLink.download = "task-table.png";
		downloadLink.click();
	});
}

function logOut() {
    sessionStorage.setItem("authenticated", "false");
    window.location.href = "../index.html"
}
// Update task list on page load
updateTaskList();


//TODO:Reduce repitition of code switching to webpack