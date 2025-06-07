const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(taskText, completed = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = taskText;

  li.appendChild(span);
  if (completed) li.classList.add("completed");

  // Toggle complete on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Right-click to delete
  li.addEventListener("contextmenu", e => {
    e.preventDefault();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    addTaskToDOM(task);
    saveTasks();
    taskInput.value = "";
  }
});

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", loadTasks);
