const API_URL = "http://127.0.0.1:8000"


// SHOW LOGIN
function showLogin() {

    document.getElementById(
        "registerBox"
    ).style.display = "none"

    document.getElementById(
        "loginBox"
    ).style.display = "block"
}


// SHOW REGISTER
function showRegister() {

    document.getElementById(
        "loginBox"
    ).style.display = "none"

    document.getElementById(
        "registerBox"
    ).style.display = "block"
}


// REGISTER USER
async function registerUser() {

    const email = document.getElementById(
        "registerEmail"
    ).value

    const password = document.getElementById(
        "registerPassword"
    ).value

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        }
    )

    const data = await response.json()

    alert(data.message || data.detail)

    if (response.ok) {

        showLogin()
    }
}


// LOGIN USER
async function loginUser() {

    const email = document.getElementById(
        "loginEmail"
    ).value

    const password = document.getElementById(
        "loginPassword"
    ).value

    const formData = new URLSearchParams()

    formData.append("username", email)

    formData.append("password", password)

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            },

            body: formData
        }
    )

    const data = await response.json()

    if (!response.ok) {

        alert(data.detail)

        return
    }

    localStorage.setItem(
        "token",
        data.access_token
    )

    alert("Login successful")

    document.getElementById(
        "loginBox"
    ).style.display = "none"

    document.getElementById(
        "taskSection"
    ).style.display = "block"

    getTasks()
}


// CREATE TASK
async function createTask() {

    const title = document.getElementById(
        "taskTitle"
    ).value

    if (!title) {

        alert("Enter task title")

        return
    }

    const token = localStorage.getItem(
        "token"
    )

    const response = await fetch(
        `${API_URL}/tasks?title=${title}`,
        {
            method: "POST",

            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    )

    const data = await response.json()

    alert(data.message)

    document.getElementById(
        "taskTitle"
    ).value = ""

    getTasks()
}


// GET TASKS
async function getTasks() {

    const token = localStorage.getItem(
        "token"
    )

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    )

    const tasks = await response.json()

    const taskList = document.getElementById(
        "taskList"
    )

    taskList.innerHTML = ""

    tasks.forEach(task => {

        const li = document.createElement("li")

        li.innerHTML = `

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask(${task.id})"
                >

                <span class="
                    task-text
                    ${
                        task.completed
                        ? "task-completed"
                        : ""
                    }
                ">

                    ${task.title}

                </span>

            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                ×
            </button>
        `

        taskList.appendChild(li)
    })
}


// COMPLETE TASK
async function completeTask(taskId) {

    const token = localStorage.getItem(
        "token"
    )

    await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${token}`
            },

            body: JSON.stringify({})
        }
    )

    getTasks()
}


// DELETE TASK
async function deleteTask(taskId) {

    const token = localStorage.getItem(
        "token"
    )

    await fetch(
        `${API_URL}/tasks/${taskId}`,
        {
            method: "DELETE",

            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    )

    getTasks()
}


// LOGOUT
function logoutUser() {

    localStorage.removeItem("token")

    document.getElementById(
        "taskSection"
    ).style.display = "none"

    document.getElementById(
        "loginBox"
    ).style.display = "block"
}


// AUTO LOGIN
window.onload = function () {

    const token = localStorage.getItem(
        "token"
    )

    if (token) {

        document.getElementById(
            "registerBox"
        ).style.display = "none"

        document.getElementById(
            "loginBox"
        ).style.display = "none"

        document.getElementById(
            "taskSection"
        ).style.display = "block"

        getTasks()
    }
}