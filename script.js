function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    checkIfEmpty();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = "";

  // Remove "No tasks yet" message if it exists
  const emptyMsg = document.getElementById("emptyMessage");
  if (emptyMsg) emptyMsg.remove();
}

// Check if task list is empty and show message
function checkIfEmpty() {
  const taskList = document.getElementById("taskList");
  if (taskList.children.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.id = "emptyMessage";
    emptyMsg.textContent = "No tasks yet. Add something!";
    document.body.appendChild(emptyMsg);
  }
}
