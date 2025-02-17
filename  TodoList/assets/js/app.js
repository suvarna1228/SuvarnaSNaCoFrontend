document.addEventListener("DOMContentLoaded", function () {
    let addItemButton = document.getElementById("addItem");
    let removeTaskButton = document.getElementById("removeTask");
    let moveRightButton = document.getElementById("moveRight");
    let moveLeftButton = document.getElementById("moveLeft");

    let lastDeletedItem = null;
    let lastDeletedFromList = null;

    addItemButton.addEventListener("click", addTaskToList);
    removeTaskButton.addEventListener("click", removeSelectedTasks);
    moveRightButton.addEventListener("click", () => moveTasks("todoList", "completedList"));
    moveLeftButton.addEventListener("click", () => moveTasks("completedList", "todoList"));
});

// Function to Add Task
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

// Function to Move Selected Items Between Lists
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

// Function to Remove Selected Tasks with Undo Feature
function removeSelectedTasks() {
    let todoList = document.getElementById("todoList");
    let completedList = document.getElementById("completedList");

    let selectedItems = [...todoList.getElementsByClassName("selected"), ...completedList.getElementsByClassName("selected")];

    if (selectedItems.length === 0) {
        showToast("No item selected!", "orange");
        return;
    }

    lastDeletedItem = selectedItems.map(item => ({
        text: item.textContent,
        parent: item.parentNode.id
    }));

    selectedItems.forEach(item => item.remove());

    showToast("Item removed successfully! Click to Undo", "gray", undoDelete);
    saveData();
}

// Function to Undo Delete
function undoDelete() {
    if (!lastDeletedItem) return;

    lastDeletedItem.forEach(({ text, parent }) => {
        let list = document.getElementById(parent);
        let li = document.createElement("li");
        li.textContent = text;
        li.onclick = function () {
            this.classList.toggle("selected");
        };
        list.appendChild(li);
    });

    lastDeletedItem = null;
    saveData();
}

// Function to Show Toaster Notification with Undo Button
function showToast(message, bgColor, undoCallback = null) {
    let toastContent = document.createElement("div");
    toastContent.innerHTML = `<span>${message}</span>`;
    
    if (undoCallback) {
        let undoButton = document.createElement("button");
        undoButton.textContent = "Undo";
        undoButton.style.marginLeft = "10px";
        undoButton.style.padding = "10px 10px";
        undoButton.style.border = "none";
        undoButton.style.backgroundColor = "black";
        undoButton.style.color = "white";
        undoButton.style.cursor = "pointer";
        undoButton.style.fontWeight = "bold";
        undoButton.onclick = () => {
            undoCallback();
            toast.hideToast();
        };

        toastContent.appendChild(undoButton);
    }

    let toast = Toastify({
        node: toastContent, // Use the custom content
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: bgColor,
        stopOnFocus: true,
        close: true,
    });

    toast.showToast();
}


// Function to Save Data in Local Storage
function saveData() {
    let todoList = [...document.getElementById("todoList").children].map(item => item.textContent);
    let completedList = [...document.getElementById("completedList").children].map(item => item.textContent);

    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
}

// Function to Load Data on Page Refresh
function loadData() {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    let completedList = JSON.parse(localStorage.getItem("completedList")) || [];

    let todoListElement = document.getElementById("todoList");
    let completedListElement = document.getElementById("completedList");

    todoList.forEach(text => addListItem(todoListElement, text));
    completedList.forEach(text => addListItem(completedListElement, text));
}

// Function to Add Item to List
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
