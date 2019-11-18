(function(){
    let userName = sessionStorage.getItem('activeUser');
    sessionStorage.removeItem('editTask');
    if(userName == null)
        location.assign('index.html');
    loadToDo();
})();

function logout(){
    if(confirm(" Do You Want To Log Out ? ")){
        sessionStorage.removeItem('activeUser');
        location.assign('index.html');
    }
}

function editTask(id){ 
    sessionStorage.setItem('editTask',id);
    location.assign('task.html');
}

function search(search){
    let searchKey = search.value;

}

function loadToDo(){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todoList = userData.todo;
    displayData(todoList);
}

// isDone isPending categorySelection dateRange
function displayData(todoList){

    

    var ul = document.querySelector("ul");

    for (let i = 0; i < todoList.length; i++) {
        let listItem = document.createElement('li');  
        let checkbox = document.createElement('input');
        let status = document.createElement('span');
        let category = document.createElement('span');
        let title = document.createElement('span');
        let dueDate = document.createElement('span');
        let edit = document.createElement('div');
        let remind = document.createElement('span');
        let content = document.createElement('p');

        checkbox.type = "checkbox";
        checkbox.id = todoList[i].id;
        status.style = "color:yellow";
        category.textContent = todoList[i].category;
        title.textContent = todoList[i].title;
        dueDate.textContent = todoList[i].dueDate;
        remind.textContent = todoList[i].reminderDate;
        content.textContent = todoList[i].task;
        edit.innerHTML = "<span id="+todoList[i].id+" onclick=\"editTask(this.id)\" >Edit<span>";

        listItem.appendChild(checkbox);
        listItem.appendChild(status);
        listItem.appendChild(category);
        listItem.appendChild(dueDate);
        listItem.appendChild(title);
        listItem.appendChild(remind);
        listItem.appendChild(edit);
        listItem.appendChild(content);
        ul.appendChild(listItem);
    }

}
   