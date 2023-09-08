document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <button class="complete-btn">Done</button>
            `;

            taskList.appendChild(li);
            taskInput.value = "";

            const completeBtn = li.querySelector(".complete-btn");
            completeBtn.addEventListener("click", function () {
                li.classList.toggle("completed");
                if (li.classList.contains("completed")) {
                    taskList.appendChild(li); // Move completed task to the bottom
                    completeBtn.remove()
                } else {
                    taskList.insertAfter(li, taskList.firstChild); // Move incomplete task to the top
                }
            });
        }
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
    });
});