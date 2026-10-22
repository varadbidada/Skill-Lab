const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll("[data-filter]");

const countAll = document.querySelector("#count-all");
const countActive = document.querySelector("#count-active");
const countCompleted = document.querySelector("#count-completed");

const STORAGE_KEY = "web-lab-task-manager-v1";
let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Could not save tasks:", error);
    message.textContent = "Tasks work, but this browser could not save them.";
  }
}

function renderTasks() {
  list.replaceChildren();

  const visibleTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  countAll.textContent = tasks.length;
  countActive.textContent = tasks.filter((task) => !task.completed).length;
  countCompleted.textContent = tasks.filter((task) => task.completed).length;

  if (visibleTasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = tasks.length === 0
      ? "No tasks yet. Add one above."
      : `No ${currentFilter} tasks to show.`;
    list.appendChild(empty);
  } else {
    visibleTasks.forEach((task) => {
      const item = document.createElement("li");
      item.className = `task-item${task.completed ? " completed" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-check";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Mark "${task.title}" complete`);
      checkbox.addEventListener("change", () => toggleTask(task.id));

      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-btn";
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("aria-label", `Delete "${task.title}"`);
      deleteButton.addEventListener("click", () => deleteTask(task.id));

      item.append(checkbox, title, deleteButton);
      list.appendChild(item);
    });
  }

  message.textContent = tasks.length === 0
    ? "Add your first task to get started."
    : `${tasks.filter((task) => !task.completed).length} task(s) left to do.`;

  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === currentFilter;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  clearCompletedButton.disabled = !tasks.some((task) => task.completed);
  clearCompletedButton.style.opacity = clearCompletedButton.disabled ? "0.45" : "1";
}

function addTask(title) {
  tasks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    title,
    completed: false
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) {
    message.textContent = "Type a task before adding it.";
    input.focus();
    return;
  }
  addTask(title);
  input.value = "";
  input.focus();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
