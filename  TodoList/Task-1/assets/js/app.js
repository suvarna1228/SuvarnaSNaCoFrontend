// Add Task
document.getElementById('addItem').addEventListener('click', function () {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTaskToList(taskText, 'todoList');
        taskInput.value = "";
        saveData();
    }
});

// Move Tasks Between Lists
document.getElementById('moveRight').addEventListener('click', function () {
    moveTasks('todoList', 'completedList');
});

document.getElementById('moveLeft').addEventListener('click', function () {
    moveTasks('completedList', 'todoList');
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

// Function to Add Task to a List
function addTaskToList(text, listId) {
    let li = document.createElement('li');
    li.textContent = text;

    li.onclick = function () {
        this.classList.toggle('selected');
    };

    document.getElementById(listId).appendChild(li);
}
