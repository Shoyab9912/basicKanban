let tasksData = {}
let editing = null;
const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');
const columns = [todo, progress, done];


const tasks = document.querySelectorAll('.task');

let draggedTask = null;
let timerMap = new Map()



document.getElementById("undoBtn").addEventListener("click", () => {
    let id = undoBtn.dataset.id;
    console.log(id)
    let timerId = timerMap.get(id);
    clearTimeout(timerId)
    let task = document.querySelector(`[data-id="${id}"]`);
    task.style.display = 'block';
    timerMap.delete(id)
    document.querySelector("#toast").style.display = "none"
    document.querySelectorAll('.task button').forEach(btn => { btn.disabled = false; });

})



function disableButtons(tasks, val = true) {
    tasks.forEach(btn => btn.disabled = val)
}


function addTask(title, desc, col) {

    if (editing) {
        editing.querySelector('h3').innerText = title;
        editing.querySelector('p').innerText = desc;
        editing = null;
        return;
    }
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.dataset.id = crypto.randomUUID();
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = `
        <h3>${title}</h3>
        <p>${desc}</p>
        <div class="bottom-row">
        <button data-id=${newTask.getAttribute("data-id")}>Delete</button>
        <button class="edit">Edit</button>
        </div>

    `;
    col.appendChild(newTask);
    newTask.addEventListener("drag", () => {
        draggedTask = newTask;
    });

    const deleteBtn = newTask.querySelector("button");
    deleteBtn.addEventListener("click", () => {
        const tasks = document.querySelectorAll('.task button')
        disableButtons(tasks)
        deleteBtn.disabled = false;
        let del = deleteBtn.parentElement.parentElement;
        del.style.display = 'none';
        let toast = document.getElementById('toast')
        toast.style.display = 'block';
        toast.querySelector("#undoBtn").dataset.id = deleteBtn.dataset.id;
        let timerId = setTimeout(() => {
            newTask.remove();
            updateCounts();
            timerMap.delete(deleteBtn.getAttribute('data-id'))
            toast.style.display = 'none';
            disableButtons(tasks, false)
        }, 3000)
        timerMap.set(deleteBtn.getAttribute('data-id'), timerId)

    });





    const editBtn = newTask.querySelector(".edit");
    editBtn.addEventListener("click", (e) => {
        const modal = document.querySelector(".modal");
        const taskTitle = document.getElementById("task-title");
        const taskDesc = document.getElementById("task-desc");
        //  const addTaskBtn = document.getElementById("addTask")  ;
        taskTitle.value = newTask.querySelector('h3').innerText;
        taskDesc.value = newTask.querySelector('p').innerText;
        modal.classList.add("active");
        editing = newTask;
    })
}



function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelectorAll('.task');
        const countEl = col.querySelector('.right');
        tasksData[col.id] = Array.from(count).map(t => {
            return {
                title: t.querySelector('h3').innerText,
                desc: t.querySelector('p').innerText,
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasksData));
        countEl.textContent = count.length;
    })
}


tasks.forEach(task => {
    task.addEventListener("drag", () => {
        // console.log("dragging");
        draggedTask = task;
    })
})



if (localStorage.getItem('tasks')) {
    let data = JSON.parse(localStorage.getItem('tasks'));
    tasksData = data;
    for (let col in data) {
        const column = document.getElementById(col);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);

        })

        const allTasks = column.querySelectorAll('.task');
        const countEl = column.querySelector('.right');
        countEl.textContent = allTasks.length;

    }

}




function allowDrag(col) {
    col.addEventListener("dragenter", (e) => {
        col.classList.add("hover-over");
    })
    col.addEventListener("dragleave", (e) => {
        col.classList.remove("hover-over");
    })

    col.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    col.addEventListener("drop", (e) => {
        e.preventDefault();
        col.appendChild(draggedTask);
        col.classList.remove("hover-over");
        updateCounts();
    })



}


allowDrag(todo);
allowDrag(progress);
allowDrag(done);



const togglelModalBtn = document.querySelector(".toogle-modal");
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".modal .bg");
const addTaskBtn = document.getElementById("addTask");
const taskBtn = document.getElementById("addTask");

togglelModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
})

bgModal.addEventListener("click", () => {
    modal.classList.remove("active");
})


taskBtn.addEventListener("click", () => {
    let taskTitle = document.getElementById("task-title");
    let taskDesc = document.getElementById("task-desc");
    // if (taskTitle === "" || taskDesc === "") {
    //     alert("Please fill all the fields");
    //     return;
    // }

    addTask(taskTitle.value, taskDesc.value, todo);
    taskTitle.value = "";
    taskDesc.value = " ";
    updateCounts();
    // Add drag event listeners to the new tas
    modal.classList.remove("active");

})