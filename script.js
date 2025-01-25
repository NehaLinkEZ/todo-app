// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    // Task details
    const details = document.createElement("div");
    details.className = "details";
    details.innerHTML = `
      <strong>${task.name}</strong>
      <p>Date: ${task.date}</p>
      <p>Est. Time: ${task.estimatedTime} hrs | Actual Time: ${task.actualTime} hrs</p>
    `;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);

    listItem.appendChild(details);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

// Function to add a task
function addTask() {
  const name = document.getElementById("todo-input").value.trim();
  const date = document.getElementById("todo-date").value;
  const estimatedTime = document.getElementById("todo-estimation").value;
  const actualTime = document.getElementById("todo-actual").value;

  if (name && date && estimatedTime && actualTime) {
    // Add task to the array
    tasks.push({
      name,
      date,
      estimatedTime: parseFloat(estimatedTime),
      actualTime: parseFloat(actualTime),
    });

    saveTasks(); // Save to local storage
    renderTasks(); // Re-render the list
    clearInputs(); // Clear input fields
  } else {
    alert("Please fill in all fields!");
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

// Function to clear input fields
function clearInputs() {
  document.getElementById("todo-input").value = "";
  document.getElementById("todo-date").value = "";
  document.getElementById("todo-estimation").value = "";
  document.getElementById("todo-actual").value = "";
}

// Add event listener to the Add button
document.getElementById("add-button").addEventListener("click", addTask);

// Load tasks when the page loads
loadTasks();
