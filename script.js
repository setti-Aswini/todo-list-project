const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
};

addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    createTask(taskText);
    taskInput.value = "";
  }
});

function createTask(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  li.classList.add("task-item");
  if (completed) li.classList.add("completed");

  // Click to mark complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Right-click to delete
  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(li => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
