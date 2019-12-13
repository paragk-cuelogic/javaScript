(function(){
    let userName = sessionStorage.getItem('activeUser');
    sessionStorage.removeItem('editTask');
    if(userName == null)
        location.assign('index.html');

    loadToDo();
    let today = new Date();
    let userData = JSON.parse(localStorage.getItem(userName));
    if(userData.userImage)
        document.getElementById("userImage").src = userData.userImage;

    today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    document.getElementById('toDate').value = today;
    document.getElementById('fromDate').value = today;
})();

function logout(){
    if(confirm(" Do You Want To Log Out ? ")){
        sessionStorage.removeItem('activeUser');
        sessionStorage.removeItem('displayPicture');
        location.assign('index.html');
    }
}

function editTask(id){ 
    sessionStorage.setItem('editTask',id);
    location.replace('task.html');
}

function getToDo(){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    return userData.todo;
}

function loadToDo(){
    let todoList = getToDo();
    displayData(todoList, todoList.length, todoList.length);
}

function search(search){
    let searchKey = search.value;
    let todo = getToDo();
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if((todo[i].task).search(searchKey) > -1 || (todo[i].title).search(searchKey) > -1)
            searchArray.push(todo[i]);
    }

    displayData(searchArray, searchArray.length, todo.length);
}

function categorySearch(search){
    let searchKey = search.value;
    if(searchKey == "All"){
        loadToDo();
        return;
    }
    let todo = getToDo();
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if(todo[i].category == searchKey)
            searchArray.push(todo[i]);
    }
    search.options[0].selected = true;
    displayData(searchArray, searchArray.length, todo.length);
}

function statusSearch(search){
    let searchKey = search.value;
    if(searchKey == "All"){
        loadToDo();
        return;
    }
    let status = 100;
    let pending = -1;
    let completed = 10;
    status = (searchKey == 'pending')?pending:completed;
    let todo = getToDo();;
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        if(todo[i].status === status)
            searchArray.push(todo[i]);
    }
    search.options[0].selected = true;
    displayData(searchArray, searchArray.length, todo.length);
}

function dateSearch(){
    let dateOne = new Date(document.getElementById('fromDate').value);
    let dateTwo = new Date(document.getElementById('toDate').value);
    let oldDate = dateOne;
    let newDate = dateTwo;
    if(dateOne > dateTwo){
        newDate = dateOne;
        oldDate = dateTwo;
    }
    searchByDate(oldDate, newDate);
}

function searchByDate(oldDate, newDate){
    let todo = getToDo();;
    let searchArray = [];
    for(let i = 0; i < todo.length; i++){
        let date = new Date(todo[i].dueDate)
        if(date >= oldDate && date <= newDate)
            searchArray.push(todo[i]);
    }
    displayData(searchArray, searchArray.length, todo.length);
}

function markDone(element, reLoad){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let taskCompleted = 10;
    for(let i = 0; i < todo.length; i++){
        if(todo[i].id == element){
            todo[i].status = taskCompleted;
            userData.todo.splice(i, 1, todo[i]);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad)
        loadToDo();
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
    if(reLoad)
        loadToDo();
}

function batchDelete(){
    let  items = document.getElementsByName("selectToDo");
		for(let i = 0; i < items.length; i++){
			if(items[i].checked == true)
				deleteTask(items[i].id, false);
    }
    loadToDo();
}

function displayData(todoList, result, total){

    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    document.getElementById('todoCount').innerHTML = "Showing "+result+" out of "+total;
    let categories = ['All','Home','School','Market','Test'];
    let selectCategory = document.getElementById('catSearch');
    selectCategory.innerHTML = "<option value=\"Sel\" selected disabled>Select Category</option>";
    for(let i = 0; i < categories.length; i++){
        let option = document.createElement('option');
        option.value = categories[i];
        option.textContent = categories[i];
        selectCategory.appendChild(option);
    }

    ul = document.querySelector("ul");
    for (let i = 0; i < todoList.length; i++) {
        let editButton = "", deleteButton = "", doneButton = "";
        let listItem = document.createElement('li');  
        let checkbox = document.createElement('input');
        let status = document.createElement('span');
        let category = document.createElement('span');
        let title = document.createElement('span');
        let dueDate = document.createElement('span');
        let remind = document.createElement('span');
        let content = document.createElement('p');
        let isPublic = document.createElement('span');
        let todoOption = document.createElement('div');

        checkbox.type = "checkbox";
        checkbox.name = "selectToDo";
        checkbox.id = todoList[i].id;

        dueDate.textContent = todoList[i].dueDate;
        let dueDateColor = new Date(todoList[i].dueDate)
        if(todoList[i].status < 0){
            doneButton = "<button id="+todoList[i].id+" onclick=\"markDone(this.id, true)\" name=\"todoOption\" > Mark Done</button>";
            editButton = "<button id="+todoList[i].id+" onclick=\"editTask(this.id)\" >Edit</button>";
            if(new Date() > dueDateColor)
                status.style = "background-color:red";
            else
                status.style = "background-color:yellow";
        }else
            status.style = "background-color:green";
            
       let publicTodo;
    
       if(todoList[i].isPublic == 'no')
            publicTodo = "Private";
        else
            publicTodo = "Public";

        deleteButton = "<button id="+todoList[i].id+" onclick=\"deleteTask(this.id, true)\" >Delete</button>";
        
        isPublic.innerHTML = publicTodo;
            
        todoOption.innerHTML = editButton+""+doneButton+""+deleteButton;
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
        listItem.appendChild(todoOption);
        listItem.appendChild(content);
        ul.appendChild(listItem);
    }
}