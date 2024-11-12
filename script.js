document.getElementById("addTaskButton").addEventListener("click", addTask);

// Load task from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a Task.");
    return;
  }
  const taskItem = createTaskElement(taskText, false);
  document.getElementById("taskList").appendChild(taskItem);
  saveTasks();

  taskInput.value = "";
}

function createTaskElement(text, completed) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  if (completed) {
    taskItem.classList.add("completed");
  }
  taskItem.innerText = text;

  //   create a complete button
  const completeButton = document.createElement("button");
  completeButton.className = "complete-button";
  completeButton.innerText = "✅";
  completeButton.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks();
  });

  //   create delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
  });

  //   append button to the task item
  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((taskItem) => {
    tasks.push({
      text: taskItem.firstChild.textContent,
      completed: taskItem.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const taskItem = createTaskElement(task.text, task.completed);
    document.getElementById("taskList").appendChild(taskItem);
  });
}

// set up filter and handle functionality
document.getElementById("searchInput").addEventListener("input", filterTasks);
document.getElementById("filterSelect").addEventListener("change", filterTasks);

function filterTasks() {
  const filterValue = document.getElementById("filterSelect").value;
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const taskItems = document.querySelectorAll(".task-item");

  taskItems.forEach((taskItem) => {
    const text = taskItem.firstChild.textContent.toLowerCase();
    const isCompleted = taskItem.classList.contains("completed");

    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "completed" && isCompleted) ||
      (filterValue === "incomplete" && !isCompleted);

    const matchesSearch = text.includes(searchQuery);

    if (matchesFilter && matchesSearch) {
      taskItem.style.display = "";
    } else {
      taskItem.style.display = "none";
    }
  });
}
