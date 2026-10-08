const inputField = document.getElementById("input-field")
const taskBtn = document.getElementById("task-btn")
const list = document.getElementById("list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function showTask(task) {
    let li = document.createElement("li")
    li.textContent = task.text
    if (task.done) li.classList.add("completed")

    li.addEventListener("click", function() {
        li.classList.toggle("completed")
        task.done = !task.done
        save()
    }) 

    let deleteBtn = document.createElement("button")
    deleteBtn.textContent = "DELETE"
    deleteBtn.classList.add("delete-btn")
    deleteBtn.addEventListener("click", function() {
        li.remove()
        tasks.splice(tasks.indexOf(task)), 1
        save()
    })

    li.append(deleteBtn)
    list.append(li)
}

function addTask() {
    let text = inputField.value
    if (text.trim() !== "") {
        let task = {text: text, done: false}
        tasks.push(task)
        save()
        showTask(task)
    }
}

taskBtn.addEventListener("click", function() {
    addTask()
    inputField.value = ""
})

tasks.forEach(showTask)