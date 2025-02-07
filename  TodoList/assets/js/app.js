// Add Task
document.getElementById('addItem').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        alert("You Must Write Something!");
        return; // Stop further execution
    }

    addTaskToList(taskText, 'todoList');
    taskInput.value = "";
    saveData();
});


// Move Tasks Between Lists
document.getElementById('moveRight').addEventListener('click', function () {
    moveTasks('todoList', 'completedList');
});

document.getElementById('moveLeft').addEventListener('click', function () {
    moveTasks('completedList', 'todoList');
});

// Remove Selected Tasks
document.getElementById('removeTask').addEventListener('click', function () {
    removeSelectedTasks();
});

// Function to Move Selected Tasks
function moveTasks(fromListId, toListId) {
    let fromList = document.getElementById(fromListId);
    let toList = document.getElementById(toListId);

    let selectedItems = Array.from(fromList.getElementsByClassName('selected'));

    selectedItems.forEach(item => {
        item.classList.remove('selected');
        toList.appendChild(item);
    });

    saveData();
}

// Function to Remove Selected Tasks
function removeSelectedTasks() {
    let lists = [document.getElementById('todoList'), document.getElementById('completedList')];

    lists.forEach(list => {
        let selectedItems = Array.from(list.getElementsByClassName('selected'));
        selectedItems.forEach(item => item.remove());
    });

    saveData();
}

// Save Tasks to LocalStorage
function saveData() {
    let todoItems = Array.from(document.getElementById('todoList').children).map(item => item.textContent);
    let completedItems = Array.from(document.getElementById('completedList').children).map(item => item.textContent);

    localStorage.setItem('todoList', JSON.stringify(todoItems));
    localStorage.setItem('completedList', JSON.stringify(completedItems));
}

// Load Saved Tasks on Page Refresh
document.addEventListener('DOMContentLoaded', function () {
    let todoItems = JSON.parse(localStorage.getItem('todoList')) || [];
    let completedItems = JSON.parse(localStorage.getItem('completedList')) || [];

    todoItems.forEach(text => addTaskToList(text, 'todoList'));
    completedItems.forEach(text => addTaskToList(text, 'completedList'));
});

// Function to Add Task to a List
function addTaskToList(text, listId) {
    let li = document.createElement('li');
    li.textContent = text;

    li.onclick = function () {
        this.classList.toggle('selected');
    };

    document.getElementById(listId).appendChild(li);
}
