const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value;
    if (taskText === "") return;
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${taskText}</span>
        <button class="delete">削除</button>
        `;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveTasks();
    }
});

taskList.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox")) {
        const li = e.target.parentElement;
        li.classList.toggle("completed");
        saveTasks();
    }
});

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

window.addEventListener("load", loadTasks);

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

function getTasks() {
    return document.querySelectorAll("#taskList li");
}

allBtn.addEventListener("click", () => {
    getTasks().forEach(task => {
        task.style.display = "flex";
    });
});

activeBtn.addEventListener("click", () => {
    getTasks().forEach(task => {
        if (task.classList.contains("completed")) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
});

completedBtn.addEventListener("click", () => {
    getTasks().forEach(task => {
        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});