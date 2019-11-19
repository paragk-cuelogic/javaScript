let listItemCount = 0;

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

function loadToDo(){
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todoList = userData.todo;
    displayData(todoList);
}

function editTask(id){ 
    sessionStorage.setItem('editTask',id);
    location.assign('task.html');
}

function search(search){
    let searchKey = search.value;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if((todo[i].task).search(searchKey) > -1 || (todo[i].title).search(searchKey) > -1)
            searchArray.push(todo[i]);
    }
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    displayData(searchArray);
}

function categorySearch(search){
    let searchKey = search.value;
    if(searchKey == "All"){
        loadToDo();
        return;
    }
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if(todo[i].category == searchKey)
            searchArray.push(todo[i]);
    }
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    displayData(searchArray);
    search.options[0].selected = true;
}

function statusSearch(search){
    let searchKey = search.value;
    if(searchKey == "All"){
        loadToDo();
        return;
    }
    let status = 100;
    if(searchKey == 'pending')
        status = -1;
    else
        status = 10;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if(todo[i].status === status)
            searchArray.push(todo[i]);
    }
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    displayData(searchArray);
    search.options[0].selected = true;
}

function markDone(element, reLoad){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;

    for(let i = 0; i < todo.length; i++){
        if(todo[i].id == element){
            todo[i].status = 10;
            userData.todo.splice(i, 1, todo[i]);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad){
        loadToDo();
    }
}

function batchMarkDone(){
    let  items = document.getElementsByName("selectToDo");
		for(let i = 0; i < items.length; i++){
			if(items[i].checked == true)
				markDone(items[i].id, false);
    }
    loadToDo();
}

function deleteTask(element, reLoad){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    for(let i = 0; i < userData.todo.length; i++){
        if(userData.todo[i].id == element){
            userData.todo.splice(i, 1);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad){
        loadToDo();
    }
}

function batchDelete(){
    let  items = document.getElementsByName("selectToDo");
		for(let i = 0; i < items.length; i++){
			if(items[i].checked == true)
				deleteTask(items[i].id, false);
    }
    loadToDo();
}

function dateSearch(){
    let fromDate = document.getElementById('fromDate');
    let toDate = document.getElementById('toDate');
    let dateOne = new Date(fromDate.value);
    let dateTwo = new Date(toDate.value);
    let oldDate = 0;
    let newDate = 0;
    if(dateOne > dateTwo){
        newDate = dateOne;
        oldDate = dateTwo;
    }
    else{
        newDate = dateTwo;
        oldDate = dateOne;
    }
    searchByDate(oldDate, newDate);
}
function searchByDate(oldDate, newDate){
    
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let searchArray = [];
    
    for(let i = 0; i < todo.length; i++){
        let date = new Date(todo[i].dueDate)
        if(date >= oldDate && date <= newDate)
            searchArray.push(todo[i]);
            console.log(todo[i].title);
    }
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    displayData(searchArray);
}

function displayData(todoList){

    let categories = ['All','Home','School','Market','Test'];
    let selectCategory = document.getElementById('catSearch');
    selectCategory.innerHTML = "<option value=\"Sel\" selected disabled>Select Category</option>";
    for(let i = 0; i < categories.length; i++){
        let option = document.createElement('option');
        option.value = categories[i];
        option.textContent = categories[i];
        selectCategory.appendChild(option);
    }

    let ul = document.querySelector("ul");
    for (let i = 0; i < todoList.length; i++) {
        let listItem = document.createElement('li');  
        let checkbox = document.createElement('input');
        let status = document.createElement('span');
        let category = document.createElement('span');
        let title = document.createElement('span');
        let dueDate = document.createElement('span');
        let remind = document.createElement('span');
        let edit = document.createElement('div');
        let markDone = document.createElement('div');
        let deleteTask = document.createElement('div');
        let content = document.createElement('p');
        let isPublic = document.createElement('span');
        
        checkbox.type = "checkbox";
        checkbox.name = "selectToDo";
        checkbox.id = todoList[i].id;

        dueDate.textContent = todoList[i].dueDate;
        let dueDateColor = new Date(todoList[i].dueDate)
        if(todoList[i].status < 0){
            markDone.innerHTML = "<span id="+todoList[i].id+" onclick=\"markDone(this.id, true)\" > Mark Done<span>"
            edit.innerHTML = "<span id="+todoList[i].id+" onclick=\"editTask(this.id)\" >Edit<span>";
            if(new Date() > dueDateColor)
                status.style = "background-color:red";
            else
                status.style = "background-color:yellow";
        }   
        else
            status.style = "background-color:green";
       let publicTodo;
        if(todoList[i].isPublic == 'no')
            publicTodo = "Private";
        else
            publicTodo = "Public";

        deleteTask.innerHTML = "<span id="+todoList[i].id+" onclick=\"deleteTask(this.id, true)\" >Delete<span>";
        isPublic.innerHTML = publicTodo;
            
        category.textContent = todoList[i].category;
        title.textContent = todoList[i].title;
        remind.textContent = todoList[i].reminderDate;
        content.textContent = todoList[i].task;
        
        listItem.appendChild(checkbox);
        listItem.appendChild(status);
        listItem.appendChild(category);
        listItem.appendChild(dueDate);
        listItem.appendChild(title);
        listItem.appendChild(remind);
        listItem.appendChild(isPublic);
        listItem.appendChild(edit);
        listItem.appendChild(markDone);
        listItem.appendChild(deleteTask);
        listItem.appendChild(content);
        ul.appendChild(listItem);
        listItemCount++;
    }
}