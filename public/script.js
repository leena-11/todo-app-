const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

// Load tasks
async function loadTasks() {
  const res = await fetch("/tasks");
  const tasks = await res.json();

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.title}</span>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    `;
    list.appendChild(li);
  });
}

// Add task
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = input.value.trim();
  if (!task) return;

  await fetch("/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  input.value = "";
  loadTasks();
});

// Delete task
async function deleteTask(id) {
  if (!id) return;

  await fetch(`/delete/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// Initial load
loadTasks();
