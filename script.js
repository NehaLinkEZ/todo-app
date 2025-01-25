// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
  const tableBody = document.querySelector("#todo-table tbody");
  tableBody.innerHTML = ""; // Clear the table

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // Create table cells
    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td>${task.estimatedTime}</td>
      <td>${task.actualTime}</td>
      <td>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
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
    renderTasks(); // Re-render the table
    clearInputs(); // Clear input fields
  } else {
    alert("Please fill in all fields!");
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from array
  saveTasks(); // Save updated tasks
  renderTasks(); // Re-render the table
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];

  // Populate input fields with task data
  document.getElementById("todo-input").value = task.name;
  document.getElementById("todo-date").value = task.date;
  document.getElementById("todo-estimation").value = task.estimatedTime;
  document.getElementById("todo-actual").value = task.actualTime;

  // Update the "Add Task" button to "Save Changes"
  const addButton = document.getElementById("add-button");
  addButton.textContent = "Save Changes";

  // Add an event listener to save changes
  addButton.onclick = () => {
    task.name = document.getElementById("todo-input").value.trim();
    task.date = document.getElementById("todo-date").value;
    task.estimatedTime = parseFloat(document.getElementById("todo-estimation").value);
    task.actualTime = parseFloat(document.getElementById("todo-actual").value);

    // Save updated tasks and re-render the table
    saveTasks();
    renderTasks();
    clearInputs();

    // Revert the button to "Add Task"
    addButton.textContent = "Add Task";
    addButton.onclick = addTask;
  };
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
