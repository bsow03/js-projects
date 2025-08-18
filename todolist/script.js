/* Create a simple to-do list app that allows users to search, add, edit, and delete items.
Use local storage to store the data. */

let todos = [];
let list = document.getElementById("todo-list"); 
let input = document.getElementById("todo-input");
let addButton = document.getElementById("add-button"); 
let searchInput = document.getElementById("search-input"); // search field

// load functions
loadtodoList(); //any list that was saved in localStorage loads
renderList(todos); // render initial todos

// -- Local Storage, what saves your to-do list on the browser
function savetodoList() {
    localStorage.setItem("todos", JSON.stringify(todos)); // saves it to browser
}

function loadtodoList() { // loads any saved lists
    let stored = localStorage.getItem("todos");
    if(stored) {
        todos = JSON.parse(stored);
    }
}

// --- Function to create a todo item ---
function createTodoItem(todoText) {
    let newItem = document.createElement("li");
    newItem.className = "flex justify-between items-center bg-gray-900 text-white p-3 my-2 rounded-lg shadow-md hover:shadow-lg transition-shadow";

    let textSpan = document.createElement("span");
    textSpan.textContent = todoText;
    textSpan.className = "flex-1 font-medium"; // makes text take space

    let delButton = document.createElement("button");
    delButton.textContent = "🗑️";
    delButton.className = "ml-2 px-2 py-1 rounded hover:bg-red-600 transition-colors";

    let editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.className = "ml-2 px-2 py-1 rounded hover:bg-blue-600 transition-colors";

    newItem.appendChild(textSpan);
    newItem.appendChild(editButton);
    newItem.appendChild(delButton);

    // --- Delete ---
    delButton.addEventListener("click", function () {
        list.removeChild(newItem);
        todos = todos.filter(t => t !== todoText); // update array
        savetodoList();
    });

        // --- Edit ---
    editButton.addEventListener("click", function () {
        let newBox = document.createElement("input");
        newBox.value = textSpan.textContent; // start with current text
        newBox.placeholder = "Press the Enter key to submit any changes";
        newBox.className = "flex-1 bg-gray-800 text-white px-2 py-1 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500";

        newItem.replaceChild(newBox, textSpan); // allows the text to become editable
        newBox.focus(); // auto-focus the input

        newBox.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                let oldText = textSpan.textContent;
                textSpan.textContent = newBox.value; // updates text
                newItem.replaceChild(textSpan, newBox); // swaps back

                // update todos array
                let index = todos.indexOf(oldText);
                if (index !== -1) {
                    todos[index] = newBox.value; // updates text
                    savetodoList();
                }
            }
        });
    });

    return newItem;
}

// --- Render list function (used for filtering) ---
function renderList(listArray) {
    list.innerHTML = ""; // clear current list
    for (let item of listArray) {
        list.appendChild(createTodoItem(item));
    }
}

// --- Add new todo ---
addButton.addEventListener("click", function () {
    let todoText = input.value.trim();
    if (todoText === "") return; // ignore empty input
    todos.push(todoText); // add to array
    savetodoList();
    renderList(todos);
    input.value = ""; // clear input
});

// --- Search ---
searchInput.addEventListener("input", function () {
    let searchTerm = searchInput.value.toLowerCase();
    let filtered = todos.filter(item => item.toLowerCase().includes(searchTerm));
    renderList(filtered);
});

/* THINGS I LEARNED 

1) DOM Manipulation
2) Difference between for...of loops and for...in loops (for of loops access the actual value in array vs. for in returns index)
3) textContent is a property not a function so newItem.textContent = item NOT newItem.textContent(item)
4) the importance of id's for grabbing html elements in JS AND storing them in variables for use
5) event listeners
6) localStorage
7) Filtering arrays for search
8) .trim() ensures no extra spaces

*/
