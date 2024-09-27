const input = document.querySelector('input');
const todoList = document.querySelector('.todoList');
const completedList = document.querySelector('.completedList');

// input에 입력한 텍스트를 해야 할 일에 추가하는 기능
input.addEventListener('keyup', (event) => {
    if(event.key === 'Enter' && input.value != ''){
        const newItem = document.createElement('div');
        newItem.classList.add('Item');
        const cmpButton = document.createElement("button");
        cmpButton.classList.add('Button');
        cmpButton.textContent = "완료";
        newItem.textContent = input.value.trim();
        newItem.appendChild(cmpButton);
        todoList.appendChild(newItem); 
        
        input.value = '';

        // 완료버튼을 누르면 해야 할 일에서 사라지고 해낸 일로 이동
        cmpButton.addEventListener('click', () => {
            todoList.removeChild(newItem);

            const cmpItem = document.createElement('div');
            cmpItem.classList.add('Item');
            const delButton = document.createElement("button");
            delButton.classList.add('Button');
            delButton.textContent = "삭제";
            cmpItem.textContent = newItem.textContent.slice(0, -2);
            cmpItem.appendChild(delButton);
            completedList.appendChild(cmpItem); 

            // 삭제버튼을 누르면 해낸 일에서 사라짐
            delButton.addEventListener('click', () => {
                completedList.removeChild(cmpItem);
            });
        });
    }
});

