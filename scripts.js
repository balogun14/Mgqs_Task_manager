
const clientData = {
        1:"Balogun Muhammed-Awwal",
        2:"AbdulSalam AbdulBasit"
};

const taskCountMap = {
    'sweeping': 1,
    'washing-plate': 3,
    'serving': 3,
    'toilet': 1
};

// Load client names and populate the select element
let clientSelect = document.getElementById('client-name');
for (const clientId in clientData) {
    if (clientData.hasOwnProperty(clientId)) {
        const option = document.createElement('option');
        option.value = clientId;
        option.text = clientData[clientId];
        clientSelect.appendChild(option);
    }
}

// Add event listener to Add Task button
const addTaskButton = document.getElementById('add-task-button');
addTaskButton.addEventListener('click', addTask);

function addTask() {
    const clientId = document.getElementById('client-name').value;
    const taskType = document.getElementById('task-type').value;
    const quantity = parseInt(document.getElementById('task-quantity').value);

    // Validate input
    if (!clientId || !taskType || quantity < 1) {
        alert('Please fill in all required fields.');
        return;
    }

    // Calculate total count based on task type
    const totalCount = quantity * taskCountMap[taskType];

    // Add task to local storage or database
    storeTask(clientId, taskType, totalCount);

    // Update task list
    updateTaskList();
}

// Function to update task list dynamically
function updateTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    // Retrieve tasks from storage (adjust for your storage mechanism)
    const tasks = retrieveTasks();

    // Filter tasks based on search input (if applicable)
    const searchInput = document.getElementById('client-search');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = searchTerm ? tasks.filter(task => task.clientName.toLowerCase().includes(searchTerm)) : tasks;

    // Generate and display task list items
    for (const task of filteredTasks) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${task.clientName}:</span> ${task.taskType} (${task.count})`;
        taskList.appendChild(listItem);
    }
}

// Placeholder function to store tasks in your preferred storage mechanism
function storeTask(clientId, taskType, count) {
    //TODO:ADD LOCAL STORAGE
    console.log(`Adding task: ${clientId}, ${taskType}, ${count}`);
}

// Placeholder function to retrieve tasks from your storage mechanism
function retrieveTasks() {
    //TODO:ADD LOCAL STORAGE
    return []; // Return an empty array for now
}

// Function to handle client search functionality
const clientSearchInput = document.getElementById('client-search');
clientSearchInput.addEventListener('keyup', updateTaskList);

// Update task list on page load
updateTaskList();
