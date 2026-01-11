 let tasksData = {}

const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');
const columns = [todo, progress, done];

const tasks = document.querySelectorAll('.task');

let draggedTask = null;






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



if(localStorage.getItem('tasks')) {
    let data = JSON.parse(localStorage.getItem('tasks'));
    tasksData = data;
    for(let col in data) {
      const column = document.getElementById(col);
       data[col].forEach(task => {
        const taskEl = document.createElement("div");
        taskEl.classList.add("task");
        taskEl.setAttribute("draggable", "true");
        taskEl.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.desc}</p>
            <button>Delete</button>
        `;
        column.appendChild(taskEl);
          taskEl.addEventListener("drag", () => {
            draggedTask = taskEl;
    });

       })

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

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.setAttribute("draggable", "true");
    newTask.innerHTML = `
        <h3>${taskTitle.value}</h3>
        <p>${taskDesc.value}</p>
        <button>Delete</button>
    `;
    todo.appendChild(newTask);
    taskTitle.value = "";
    taskDesc.value = " ";
    updateCounts();
    // Add drag event listeners to the new task
    newTask.addEventListener("drag", () => {
        draggedTask = newTask;
    });
    modal.classList.remove("active");

})