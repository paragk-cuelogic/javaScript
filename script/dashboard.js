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
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        if((todo[todoIndex].task).search(searchKey) > -1 || (todo[todoIndex].title).search(searchKey) > -1)
            searchArray.push(todo[todoIndex]);
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
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        if(todo[todoIndex].category == searchKey)
            searchArray.push(todo[todoIndex]);
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
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        if(todo[todoIndex].status === status)
            searchArray.push(todo[todoIndex]);
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
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        let date = new Date(todo[todoIndex].dueDate)
        if(date >= oldDate && date <= newDate)
            searchArray.push(todo[todoIndex]);
    }
    displayData(searchArray, searchArray.length, todo.length);
}

function markDone(element, reLoad){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    let todo = userData.todo;
    let taskCompleted = 10;
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        if(todo[todoIndex].id == element){
            todo[todoIndex].status = taskCompleted;
            userData.todo.splice(todoIndex, 1, todo[todoIndex]);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad)
        loadToDo();
    document.getElementById('selectAll').checked = false;
}

function deleteTask(element, reLoad){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    for(let todoIndex = 0; todoIndex < userData.todo.length; todoIndex++){
        if(userData.todo[todoIndex].id == element){
            userData.todo.splice(todoIndex, 1);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad)
        loadToDo();

        document.getElementById('selectAll').checked = false;
}

function batchOperation(markDone){
// if true then markDone 
// if false then Delete
}

function batchMarkDone(){
    let  checklist = document.getElementsByName("selectToDo");
    for(let item = 0; item < checklist.length; item++){
        if(checklist[item].checked == true)
            markDone(checklist[item].id, false);
    }
    loadToDo();
}

function markAll(element){
    let selectAll = false;
    if(element.checked)
        selectAll = true;

    let  checklist = document.getElementsByName("selectToDo");
    
    checklist.forEach(element => {
        element.checked = selectAll;
    });
}

function batchDelete(){
    let  checklist = document.getElementsByName("selectToDo");
		for(let item = 0; item < checklist.length; item++){
			if(checklist[item].checked == true)
				deleteTask(checklist[item].id, false);
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
    for(let category = 0; category < categories.length; category++){
        let option = document.createElement('option');
        option.value = categories[category];
        option.textContent = categories[category];
        selectCategory.appendChild(option);
    }

    ul = document.querySelector("ul");
    for (let todoIndex = 0; todoIndex < todoList.length; todoIndex++) {
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
        checkbox.id = todoList[todoIndex].id;

        dueDate.textContent = todoList[todoIndex].dueDate;
        let dueDateColor = new Date(todoList[todoIndex].dueDate)
        if(todoList[todoIndex].status < 0){
            doneButton = "<button id="+todoList[todoIndex].id+" onclick=\"markDone(this.id, true)\" name=\"todoOption\" > Mark Done</button>";
            editButton = "<button id="+todoList[todoIndex].id+" onclick=\"editTask(this.id)\" >Edit</button>";
            if(new Date() > dueDateColor)
                status.style = "background-color:red";
            else
                status.style = "background-color:yellow";
        }else
            status.style = "background-color:green";
            
       let publicTodo;
    
       if(todoList[todoIndex].isPublic == 'no')
            publicTodo = "Private";
        else
            publicTodo = "Public";

        deleteButton = "<button id="+todoList[todoIndex].id+" onclick=\"deleteTask(this.id, true)\" >Delete</button>";
        
        isPublic.innerHTML = publicTodo;
            
        todoOption.innerHTML = editButton+""+doneButton+""+deleteButton;
        category.textContent = todoList[todoIndex].category;
        title.textContent = todoList[todoIndex].title;
        remind.textContent = todoList[todoIndex].reminderDate;
        content.textContent = todoList[todoIndex].task;
        
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