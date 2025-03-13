// Function to load tasks from local storage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        addTaskToDOM(task.name, task.completed);
    });
}

// Function to add a task to the DOM
function addTaskToDOM(taskName, isCompleted) {
    var li = document.createElement("li");
    var t = document.createTextNode(taskName);
    li.appendChild(t);
    
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    if (isCompleted) {
        li.classList.add('checked'); // Add checked class if task is completed
    }

    document.getElementById("myUL").appendChild(li);
    
    // Add click event to close button
    span.onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        removeTaskFromStorage(taskName);
    }

    // Add click event to toggle checked class
    li.onclick = function() {
        li.classList.toggle('checked');
        updateTaskInStorage(taskName, li.classList.contains('checked'));
    }
}

// Function to remove a task from local storage
function removeTaskFromStorage(taskName) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(function(task) {
        return task.name !== taskName;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to update task completion status in local storage
function updateTaskInStorage(taskName, isCompleted) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        if (task.name === taskName) {
            task.completed = isCompleted;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        addTaskToDOM(inputValue, false);
        saveTaskToStorage(inputValue);
    }
    document.getElementById("myInput").value = "";
}

// Function to save a task to local storage
function saveTaskToStorage(taskName) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to filter tasks
function filterTasks(filter) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("myUL").innerHTML = ""; // Clear the current list

    tasks.forEach(function(task) {
        if (filter === "all" || (filter === "completed" && task.completed) || (filter === "active" && !task.completed)) {
            addTaskToDOM(task.name, task.completed);
        }
    });
}

// Load tasks from local storage when the page loads
window.onload = loadTasks;

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        newElement(); // Add task on Enter key
    } else if (event.key === '1') {
        filterTasks('all'); // Show all tasks on '1'
    } else if (event.key === '2') {
        filterTasks('completed'); // Show completed tasks on '2'
    } else if (event.key === '3') {
        filterTasks('active'); // Show active tasks on '3'
    }
});