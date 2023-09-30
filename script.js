document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement("li");
            li.draggable = true;
            li.classList.add("slide-in");

            const taskTextElement = document.createElement("span");
            taskTextElement.textContent = taskText;

            const doneButton = document.createElement("button");
            doneButton.textContent = "Done";
            doneButton.classList.add("done-button");

            li.appendChild(taskTextElement);
            li.appendChild(doneButton);

            li.addEventListener("dragstart", function (e) {
                e.dataTransfer.setData("text/plain", taskText);
                e.currentTarget.classList.add("dragging");
            });

            li.addEventListener("dragend", function (e) {
                e.currentTarget.classList.remove("dragging");
            });

            doneButton.addEventListener("click", function () {
                taskTextElement.classList.toggle("completed");
                li.classList.toggle("completed-item");

                // Change the text to "Completed"
                doneButton.textContent = "Completed";

                // Change the button color to green
                doneButton.style.backgroundColor = "#4CAF50";
                doneButton.style.borderColor = "#4CAF50";

                // Make the item undraggable when done
                li.draggable = false;

                // Add a subtle scaling effect to the Done button when completed
                doneButton.style.transform = "scale(1.1)";

                // Move the completed item to the bottom of the list
                taskList.appendChild(li);

                // Disable dragging for the completed item
                li.draggable = false;
            });

            taskList.prepend(li); // Prepend to move newer inputs to the top
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    taskList.addEventListener("dragover", function (e) {
        e.preventDefault();
        const draggingElement = document.querySelector(".dragging");
        const targetElement = getDragAfterElement(taskList, e.clientY);

        if (targetElement === null) {
            taskList.appendChild(draggingElement);
        } else {
            taskList.insertBefore(draggingElement, targetElement);
        }
    });

    taskList.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("fade-out")) {
            e.target.remove();
        }
    });

    function getDragAfterElement(container, y) {
        const elements = [...container.querySelectorAll("li:not(.dragging)")];
        return elements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
