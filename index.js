const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');


const tasks = document.querySelectorAll('.task');

let draggedTask = null;

tasks.forEach(task => {
    task.addEventListener("drag",() => {
        // console.log("dragging");
        draggedTask = task;
    })
})



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
    })
     
     

}


allowDrag(todo);
allowDrag(progress);
allowDrag(done);