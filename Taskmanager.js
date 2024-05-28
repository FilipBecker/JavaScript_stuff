function addTask() {
    let taskText = document.getElementById('newTask').value;

    if (taskText === "") {
        alert("Plese enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = taskText + ' <button onclick="removeTask(this)">Remove</button> <button onclick="markDone(this)">Done</button>';
    li.onclick = function(event) {
        if (event.target.tagName !== "BUTTON") {
            editTask(this);
        }
    }

    li.classList.add("notDone")
    document.getElementById('taskList').appendChild(li);
    document.getElementById('newTask').value = '';

    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(button) {
    let li = button.parentElement;
    li.parentElement.removeChild(li);

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let taskIndex = tasks.indexOf(li.textContent.slice(0, -12));
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function markDone(button) {
    let li = button.parentElement;
    li.style.textDecoration = "line-through";
    button.disabled = true;
    li.classList.remove("notDone")
    li.classList.add("done");
}

var r = document.querySelector(':root');

function showAll() {
    r.style.setProperty('--doneHide', 'block')
    r.style.setProperty('--notDoneHide', 'block')
    
}

function showDone() {
    r.style.setProperty('--doneHide', 'block')
    r.style.setProperty('--notDoneHide', 'none')
}

function showNotDone() {
    r.style.setProperty('--doneHide', 'none')
    r.style.setProperty('--notDoneHide', 'block')
}

function editTask(liElement) {
    let newText = prompt("Edit task:", liElement.textContent.slice(0, -12));
    
    if (newText !==null && newText !== "") {
        liElement.childNodes[0].nodeValue = newText;
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        let taskIndex = tasks.indexOf(liElement.textContent.slice(0, -12));
        tasks[taskIndex] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }
}

window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    for (let task of tasks) {
        let li = document.createElement("li");
        li.innerHTML = task + ' <button onclick="removeTask(this)">Remove</button> <button onclick="markDone(this)">Done</button>';
        li.onclick = function(event) {
            if (event.target.tagName !== "BUTTON") {
                editTask(this);
            }
        }
        document.getElementById('taskList').appendChild(li);
    }
}