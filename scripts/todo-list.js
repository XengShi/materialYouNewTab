/*
 * Material You NewTab
 * Copyright (c) 2023-2025 XengShi
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

// ----------------------------------- To Do List ----------------------------------------
// DOM Variables
const todoContainer = document.getElementById("todoContainer");
const todoListCont = document.getElementById("todoListCont");
const todoulList = document.getElementById("todoullist");
const todoAdd = document.getElementById("todoAdd");
const todoInput = document.getElementById("todoInput");
let todoList = {}; // Initialize todoList JSON
let suppressNextClick = false;
let suppressTimeout = null;

// Add event listeners for Add button click or Enter key press
todoAdd.addEventListener("click", addtodoItem);
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addtodoItem();
    }
});

// Utility function to sanitize input
function sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
}

// Function to add items to the TODO list
function addtodoItem() {
    const inputText = todoInput.value.trim();
    if (inputText === "") return;

    const t = "t" + Date.now(); // Generate a Unique ID
    const rawText = inputText;

    todoList[t] = { title: rawText, status: "pending", pinned: false }; // Add data to the JSON variable
    const li = createTodoItemDOM(t, rawText, "pending", false); // Create List item
    todoulList.appendChild(li); // Append the new item to the DOM immediately
    todoInput.value = ""; // Clear Input
    SaveToDoData(); // Save changes
}

function createTodoItemDOM(id, title, status, pinned) {
    let li = document.createElement("li");
    li.innerHTML = sanitizeInput(title); // Sanitize before rendering in DOM

    // Create and append edit button
    const editbtn = document.createElement("span");
    editbtn.setAttribute("class", "todoeditbtn");
    li.appendChild(editbtn);

    // Create and append remove button
    const removebtn = document.createElement("span");
    removebtn.setAttribute("class", "todoremovebtn");
    removebtn.textContent = "\u00d7";
    li.appendChild(removebtn);

    // Set base class and status
    li.setAttribute("class", "todolistitem");
    if (status === "completed") {
        li.classList.add("checked");
    }

    // Create and append pin button
    const pinbtn = document.createElement("span");
    pinbtn.setAttribute("class", "todopinbtn");
    li.appendChild(pinbtn);

    if (pinned) {
        li.classList.add("pinned");
    }

    li.setAttribute("data-todoitem", id); // Set a data attribute to the li so that we can uniquely identify which li has been modified or deleted
    return li; // Return the created `li` element
}

// Event delegation for task check and remove
todoulList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        if (suppressNextClick) return;  // Prevent misclick on LI
        event.target.classList.toggle("checked"); // Check the clicked LI tag
        let id = event.target.dataset.todoitem;
        todoList[id].status = ((todoList[id].status === "completed") ? "pending" : "completed"); // Update status
        SaveToDoData(); // Save Changes
    }
    else if (event.target.classList.contains("todoremovebtn")) {
        let id = event.target.parentElement.dataset.todoitem;
        event.target.parentElement.remove(); // Remove the clicked LI tag
        delete todoList[id]; // Remove the deleted List item data
        SaveToDoData(); // Save Changes
    }
    else if (event.target.classList.contains("todopinbtn")) {
        event.target.parentElement.classList.toggle("pinned"); // Check the clicked LI tag
        let id = event.target.parentElement.dataset.todoitem;
        todoList[id].pinned = (todoList[id].pinned !== true); // Update status
        SaveToDoData(); // Save Changes
    }
    else if (event.target.classList.contains("todoeditbtn")) {
        if (suppressNextClick) return;

        const li = event.target.parentElement;
        const id = li.dataset.todoitem;
        const todo = todoList[id];
        const previousTitle = todo.title;

        li.classList.toggle("edit");
        if (li.classList.contains("edit")) {
            suppressNextClick = true; // prevent mis-clicks on next action

            // Find the text node in the LI (the title)
            const titleNode = Array.from(li.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");

            //Safe check
            if (!titleNode) {
                console.warn("Title text node not found.");
                return;
            }

            const input = document.createElement("input");
            input.type = "text";
            input.className = "edit-input";
            input.value = previousTitle;
            li.insertBefore(input, titleNode);
            li.removeChild(titleNode);
            input.focus();

            // Save on blur or Enter
            function saveEdit() {
                const newTitle = input.value.trim();
                todo.title = (newTitle !== "") ? sanitizeInput(newTitle) : previousTitle;  //Check for empty title 
                const textNode = document.createTextNode(todo.title);
                li.insertBefore(textNode, input);
                li.removeChild(input);
                li.classList.remove("edit");
                SaveToDoData(); // Save changes

                // Delay resetting to allow click suppression
                clearTimeout(suppressTimeout);
                suppressTimeout = setTimeout(() => {
                    suppressNextClick = false;
                }, 500);
            }

            // Cancel function for escape key
            function cancelEdit() {
                // Remove the blur event to prevent saveEdit from running
                input.removeEventListener("blur", saveEdit);

                // Safe Check: Only remove input if it's still in the DOM
                if (li.contains(input)) {
                    const textNode = document.createTextNode(previousTitle);
                    li.insertBefore(textNode, input);
                    li.removeChild(input);
                    li.classList.remove("edit");

                    clearTimeout(suppressTimeout);
                    suppressTimeout = setTimeout(() => {
                        suppressNextClick = false;
                    }, 200);
                }
            }

            input.addEventListener("blur", saveEdit);
            input.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    input.blur(); // triggers saveEdit
                } else if (e.key === "Escape") {
                    cancelEdit();
                }
            });
        }
    }
});

// Save JSON to local Storage
function SaveToDoData() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Fetch saved JSON and create list items using it
function ShowToDoList() {
    try {
        todoList = JSON.parse(localStorage.getItem("todoList")) || {}; // Parse stored data or initialize empty
        const fragment = document.createDocumentFragment(); // Create a DocumentFragment

        for (let id in todoList) {
            const todo = todoList[id];
            const li = createTodoItemDOM(id, todo.title, todo.status, todo.pinned); // Create `li` elements
            fragment.appendChild(li); // Add `li` to the fragment
        }

        todoulList.appendChild(fragment); // Append all `li` to the `ul` at once
    } catch (error) {
        console.error("Error loading from localStorage:", error);
        localStorage.setItem("todoList", "{}"); // Reset corrupted data
    }
}

// Code to reset the List on the Next Day
let todoLastUpdateDate = localStorage.getItem("todoLastUpdateDate"); // Get the date of last update
let todoCurrentDate = new Date().toLocaleDateString(); // Get current date

if (todoLastUpdateDate === todoCurrentDate) {
    ShowToDoList();
} else {
    // Modify the list when last update date and the current date does not match
    localStorage.setItem("todoLastUpdateDate", todoCurrentDate);
    todoList = JSON.parse(localStorage.getItem("todoList")) || {};

    for (let id in todoList) {
        if (todoList[id].pinned === false) {
            if (todoList[id].status === "completed") {
                delete todoList[id]; // Remove the Unpinned and Completed list item data
            }
        } else {
            todoList[id].status = "pending"; // Reset status of pinned items
        }
    }

    SaveToDoData();
    ShowToDoList();
}

// Toggle menu and tooltip visibility
todoListCont.addEventListener("click", function (event) {
    const isMenuVisible = todoContainer.style.display === "grid";

    // Toggle menu visibility
    todoContainer.style.display = isMenuVisible ? "none" : "grid";

    // Add or remove the class to hide the tooltip
    if (!isMenuVisible) {
        todoListCont.classList.add("menu-open"); // Hide tooltip
        todoInput.focus(); // Auto focus on input box
    } else {
        todoListCont.classList.remove("menu-open"); // Restore tooltip
    }
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const isClickInside =
        todoContainer.contains(event.target) || todoListCont.contains(event.target) || event.target.classList.contains("todoremovebtn");

    if (!isClickInside && todoContainer.style.display === "grid") {
        todoContainer.style.display = "none"; // Hide menu
        todoListCont.classList.remove("menu-open"); // Restore tooltip
    }

    event.stopPropagation();
});

// ----------------------- To Do List Toggle -----------------------------
document.addEventListener("DOMContentLoaded", function () {
    const todoListCheckbox = document.getElementById("todoListCheckbox");

    todoListCheckbox.addEventListener("change", function () {
        saveCheckboxState("todoListCheckboxState", todoListCheckbox);
        if (todoListCheckbox.checked) {
            todoListCont.style.display = "flex";
            saveDisplayStatus("todoListDisplayStatus", "flex");
        } else {
            todoListCont.style.display = "none";
            saveDisplayStatus("todoListDisplayStatus", "none");
        }
    });

    loadCheckboxState("todoListCheckboxState", todoListCheckbox);
    loadDisplayStatus("todoListDisplayStatus", todoListCont);
});
