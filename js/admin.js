import { myModule } from "./module";

var clientData = myModule.clientData;
console.log(clientData);
// Load names and populate the select element
let nameSelect = document.getElementById("name");
for (const clientId in window.clientData) {
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
		if (element.clientName == clientData[clientId]["name"]) {
			duplicate = true;
		}
	});
	if (duplicate) {
		alert("This Person Has been Assigned a Task Already");
		return;
	}
	tasks.push({ clientName: clientData[clientId], taskType: taskType });
	myModule.clientData = clientData; // Add new task
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
logOut = function () {
	sessionStorage.setItem("authenticated", "false");
	window.location.href = "../index.html";
};
// Update task list on page load

//TODO:Reduce repitition of code switching to webpack
