const todo = document.getElementById('todo');
const progress = document.getElementById('progress');
const done = document.getElementById('done');


const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag",() => {
        // console.log("dragging");
    })
})



function allowDrag(col) {
    col.addEventListener("dragenter",(e) => {
        e.preventDefault();
        col.classList.add("hover-over");        
    })

    col.addEventListener("dragleave",(e) => {
        e.preventDefault();
        col.classList.remove("hover-over");        
    })
}


allowDrag(todo);
allowDrag(progress);
allowDrag(done);