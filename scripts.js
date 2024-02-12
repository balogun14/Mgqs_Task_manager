const clientData = {
    1: "Abdulraheem Adebare",
    2: "Saleem Ahmad Abimbola",
    3: "Khalilur Rahman Abimbola",
    4: "Hasbiyallah Oyebo",
    5: "Abdulbasit Abdulsalam",
    6: "Balogun Muhammed-Awwal",
    7: "Ibrahim Odusanya",
    8: "Abdullah Oladejo",
    9: "Dhulfikkar Animashaun",
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
    sweeping: 3,
    serving: 9,
    toilet: 3,
    "washing-plate": 9,
};

document.addEventListener("DOMContentLoaded", function () {
    autoAssignTasks();
    updateTaskList();
});


function autoAssignTasks() {
    const tasks = [];
    const femaleIds = [23, 4, 10, 15];
    Object.entries(taskCountMap).forEach(([taskType, count]) => {
        const clientIds = Object.keys(clientData).filter(id => {
            if (taskType === 'toilet') {
                return !femaleIds.includes(Number(id)) && !tasks.find(task => task.clientId === id);
            }
            return !tasks.find(task => task.clientId === id);
        });
        
        const shuffledClients = shuffleArray(clientIds);
    
        for (let i = 0; i < count && i < shuffledClients.length; i++) {
            const clientId = shuffledClients[i];
            const clientName = clientData[clientId];
            tasks.push({ clientId, clientName, taskType });
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}




function updateTaskList() {
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

function retrieveTasks() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : null; 
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Add an event listener to the search input
document.getElementById("name-search").addEventListener("input", function () {
    search();
});

function search() {
    const searchInput = document.getElementById("name-search").value.trim().toLowerCase();
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
    const filteredTasks = tasks.filter(task => task.clientName.toLowerCase().includes(searchInput));

    if (filteredTasks.length === 0) {
        const noMatchRow = taskTableBody.insertRow();
        const noMatchCell = noMatchRow.insertCell();
        noMatchCell.colSpan = 2;
        noMatchCell.textContent = "No matches found.";
        return;
    }

    // Display filtered tasks
    filteredTasks.forEach(task => {
        const row = taskTableBody.insertRow();
        const nameCell = row.insertCell();
        const taskCell = row.insertCell();
        nameCell.textContent = task.clientName;
        taskCell.textContent = task.taskType;
    });
}



