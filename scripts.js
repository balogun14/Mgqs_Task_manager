const clientData = {
    1: "Abdulraheem Adebare",
    2: "Saleem Ahmad Abimbola",
    3: "Khalilur Rahman Abimbola",
    4: "Hasbiyallah Oyebo",
    5: "Abdulbasit Abdulsalam",
    6: "Balogun Muhammed-Awwal",
    7: "Ibrahim Odusanya",
    8: "Abdullah Oladejo",
    9: "Dhulfikhar Animashaun",
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
    // runDailyTasksGeneration();
    updateTaskList();
    // loadAttendanceList(); // Load attendance list when the page is loaded
});




// function runDailyTasksGeneration() {
//     const storedDate = localStorage.getItem("tasksDate");
//     const currentDate = new Date().toDateString();

//     if (storedDate !== currentDate) {
//         autoAssignTasks();
//         localStorage.setItem("tasksDate", currentDate);
//     }
// }

function autoAssignTasks() {
    const tasks = [];
    // const currentDate = new Date();
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
        noRecordCell.colSpan = 3; 
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
            const attendanceCell = row.insertCell(); 
            nameCell.textContent = task.clientName;
            taskCell.textContent = task.taskType;
            const attendanceCheckbox = document.createElement('input');
            attendanceCheckbox.type = 'checkbox';
            attendanceCheckbox.dataset.clientId = task.clientId; 
            attendanceCheckbox.addEventListener('change', updateAttendance);
            attendanceCell.appendChild(attendanceCheckbox);
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

const attendanceForm = document.getElementById("attendance-form");
attendanceForm.addEventListener("submit", function (event) 
{
    event.preventDefault(); 
    updateAttendance(event); 
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



// function runDailyTasksGeneration() 
// {
//     const storedDate = localStorage.getItem("tasksDate");
//     const currentDate = new Date().toDateString();

//     if (storedDate !== currentDate) 
//     {
//         autoAssignTasks();
//         localStorage.setItem("tasksDate", currentDate);
//     }
// }



// function loadAttendanceList() 
// {
//     const attendanceList = JSON.parse(localStorage.getItem("attendanceList")) || {};
//     const taskTableBody = document.getElementById("task-list");
//     Object.keys(attendanceList).forEach(clientId => 
//     {
//         const attendance = attendanceList[clientId];
//         const checkbox = taskTableBody.querySelector(`input[data-client-id="${clientId}"]`);
//         if (checkbox) 
//         {
//             checkbox.checked = attendance;
//         }
//     });
// }


const captureButton = document.getElementById("convert-button");
captureButton.addEventListener("click", captureTaskList);

function captureTaskList() 
{
    const taskList = document.getElementById("task-table");
    html2canvas(taskList).then((canvas) => 
    {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download = "task-table.png";
        downloadLink.click();
    });
}


function updateAttendance(event) {
    const clientId = event.target.dataset.clientId;
    const attendance = event.target.checked;
    const attendanceList = JSON.parse(localStorage.getItem("attendanceList")) || {};
    attendanceList[clientId] = attendance;
    localStorage.setItem("attendanceList", JSON.stringify(attendanceList));

    if (!attendance) {
        const tasks = retrieveTasks();
        const updatedTasks = tasks.filter(task => task.clientId !== clientId);
        localStorage.setItem("tempAbsentTasks", JSON.stringify(updatedTasks));
    } else 
    {
        const tempAbsentTasks = JSON.parse(localStorage.getItem("tempAbsentTasks")) || [];
        const updatedTempAbsentTasks = tempAbsentTasks.filter(task => task.clientId !== clientId);
        localStorage.setItem("tempAbsentTasks", JSON.stringify(updatedTempAbsentTasks));
    }

    if (event.type === 'submit') {
       
        autoAssignTasks(); 
        updateTaskList(); 
    }
}





// function updateAttendance(event) 
// {
//     const clientId = event.target.dataset.clientId;
//     const attendance = event.target.checked;
//     const attendanceList = JSON.parse(localStorage.getItem("attendanceList")) || {};
//     attendanceList[clientId] = attendance;
//     localStorage.setItem("attendanceList", JSON.stringify(attendanceList));

//     if (attendance) 
//     {
        
//         const tempAbsentTasks = JSON.parse(localStorage.getItem("tempAbsentTasks")) || [];
//         const updatedTempAbsentTasks = tempAbsentTasks.filter(task => task.clientId !== clientId);
//         localStorage.setItem("tempAbsentTasks", JSON.stringify(updatedTempAbsentTasks));
//     } else 
//     {
//         const tasks = retrieveTasks();
//         const updatedTasks = tasks.filter(task => task.clientId !== clientId);
//         localStorage.setItem("tempAbsentTasks", JSON.stringify(updatedTasks));
//     }

//     if (event.type === 'submit') {
//         const tasks = retrieveTasks();
//         const presentClientIds = Object.keys(attendanceList).filter(clientId => attendanceList[clientId]);
//         const presentTasks = tasks.filter(task => presentClientIds.includes(task.clientId));
//         localStorage.setItem("tasks", JSON.stringify(presentTasks));
//         autoAssignTasks(); 
//         updateTaskList(); 
//     }
// }



// function retrieveTasks() 
// {
//     const tasks = JSON.parse(localStorage.getItem("tempAbsentTasks")) || [];
//     return tasks;
// }





function autenticateNormalUser(params) 
{
    //TODO: Add this to authenticate normal user
}
function authenticateAdminUser(params) 
{
    //TODO:Add this to Authenticate admin user
}