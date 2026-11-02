
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";


const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskCategoryInput = document.getElementById("task-category");
const taskList = document.getElementById("task-list");
const taskStats = document.getElementById("task-stats");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed-btn");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";


  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true; 
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<li style="text-align: center; color: var(--text-secondary); padding: 16px;">No tasks found.</li>`;
  } else {
    filteredTasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <div class="task-info">
          <input 
            type="checkbox" 
            class="task-checkbox" 
            ${task.completed ? "checked" : ""} 
            onchange="toggleTask(${task.id})"
          />
          <span class="task-title">${escapeHtml(task.title)}</span>
          <span class="badge ${task.category.toLowerCase()}">${task.category}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete task">&times;</button>
      `;

      taskList.appendChild(li);
    });
  }

  updateStats();
}


taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const category = taskCategoryInput.value;

  if (!title) return;

  const newTask = {
    id: Date.now(),
    title,
    category,
    completed: false,
  };

  tasks.unshift(newTask); 
  saveTasks();
  renderTasks();

  taskTitleInput.value = "";
  taskTitleInput.focus();
});

// Toggle completion status
window.toggleTask = function (id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
};


window.deleteTask = function (id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
};

clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});


filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});


function updateStats() {
  const pendingCount = tasks.filter((t) => !t.completed).length;
  taskStats.textContent = `${pendingCount} task${pendingCount === 1 ? "" : "s"} remaining`;
}


function escapeHtml(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}


renderTasks();
