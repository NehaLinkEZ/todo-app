// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.name;

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

// Function to add a task
function addTask() {
  const input = document.getElementById("todo-input");
  const taskName = input.value.trim();

  if (taskName) {
    // Add task to the array
    tasks.push({ name: taskName });
    saveTasks(); // Save to local storage
    renderTasks(); // Re-render the list
    input.value = ""; // Clear input
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  saveTasks(); // Save updated tasks
  renderTasks(); // Re-render the list
}

// Function to save tasks to local storage as JSON
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Add event listener to the Add button
document.getElementById("add-button").addEventListener("click", addTask);

// Load tasks when the page loads
loadTasks();
