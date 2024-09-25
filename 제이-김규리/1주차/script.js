const newItemInput = document.getElementById("new-item-text");
const itemsContainer = document.getElementById("todo-items");
const completedItemsContainer = document.getElementById("completed-items");

newItemInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const newItemText = newItemInput.value.trim(); 

        if (newItemText !== "") {
            const newTodoItem = document.createElement("div");
            newTodoItem.classList.add("todo-item");

            const newLabel = document.createElement("label");
            newLabel.textContent = newItemText;

            const completeButton = document.createElement("button"); 
            completeButton.textContent = "완료";


            completeButton.addEventListener("click", () => {
                newTodoItem.removeChild(completeButton); 
                itemsContainer.removeChild(newTodoItem); 
                completedItemsContainer.appendChild(newTodoItem); 
            });

            newTodoItem.appendChild(newLabel);
            newTodoItem.appendChild(completeButton); 
            itemsContainer.appendChild(newTodoItem);

            newItemInput.value = ""; 
        } else {
            alert("할 일 내용을 입력하세요."); 
        }
    }
});