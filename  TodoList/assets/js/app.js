document.addEventListener("DOMContentLoaded", function () {
    let addItemButton = document.getElementById("addItem");
    let removeTaskButton = document.getElementById("removeTask");
    let moveRightButton = document.getElementById("moveRight");
    let moveLeftButton = document.getElementById("moveLeft");

    addItemButton.addEventListener("click", addTaskToList);
    removeTaskButton.addEventListener("click", removeSelectedTasks);
    moveRightButton.addEventListener("click", () => moveTasks("todoList", "completedList"));
    moveLeftButton.addEventListener("click", () => moveTasks("completedList", "todoList"));
});

//  Function to Add Task 
function addTaskToList() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let todoList = document.getElementById("todoList");
    let completedList = document.getElementById("completedList");

    if (taskText === "") {
        showToast("Please enter an item!", "red");
        return;
    }

    // Check if item already exists in either list
    let isDuplicate = [...todoList.children, ...completedList.children].some(item => item.textContent === taskText);
    if (isDuplicate) {
        showToast("Item is already in the list!", "red");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskText;
    li.onclick = function () {
        this.classList.toggle("selected");
    };

    todoList.appendChild(li);
    showToast("Item added successfully!", "green");

    taskInput.value = ""; 
    saveData();
}

//  Function to Move Selected Items Between Lists
function moveTasks(fromListId, toListId) {
    let fromList = document.getElementById(fromListId);
    let toList = document.getElementById(toListId);

    let selectedItems = Array.from(fromList.getElementsByClassName("selected"));

    if (selectedItems.length === 0) {
        showToast("No item selected!", "orange");
        return;
    }

    selectedItems.forEach(item => {
        item.classList.remove("selected");
        toList.appendChild(item);
    });

    let message = (toListId === "completedList") ? "Item shifted to Completed List!" : "Item shifted to To-Do List!";
    showToast(message, "blue");

    saveData();
}

//  Function to Remove Selected Tasks
function removeSelectedTasks() {
    let lists = [document.getElementById("todoList"), document.getElementById("completedList")];

    let hasRemoved = false;
    lists.forEach(list => {
        let selectedItems = Array.from(list.getElementsByClassName("selected"));
        if (selectedItems.length > 0) {
            hasRemoved = true;
        }
        selectedItems.forEach(item => item.remove());
    });

    if (hasRemoved) {
        showToast("Item removed successfully!", "gray");
    } else {
        showToast("No item selected!", "orange");
    }

    saveData();
}

//  Function to Show Toaster Notification
function showToast(message, bgColor) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: bgColor,
    }).showToast();
}

//  Function to Save Data in Local Storage 
function saveData() {
    let todoList = [...document.getElementById("todoList").children].map(item => item.textContent);
    let completedList = [...document.getElementById("completedList").children].map(item => item.textContent);
    
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
}

//  Function to Load Data on Page Refresh
function loadData() {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let completedList = JSON.parse(localStorage.getItem("completedList")) || [];

    let todoListElement = document.getElementById("todoList");
    let completedListElement = document.getElementById("completedList");

    todoList.forEach(text => addListItem(todoListElement, text));
    completedList.forEach(text => addListItem(completedListElement, text));
}

//   Function to Add Item to List 
function addListItem(listElement, text) {
    let li = document.createElement("li");
    li.textContent = text;
    li.onclick = function () {
        this.classList.toggle("selected");
    };
    listElement.appendChild(li);
}

// Load saved data on page load
loadData();
