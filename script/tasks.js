    let title = document.getElementById('title');
    let task = document.getElementById('task');
    let category = document.getElementById('category');
    let dueDate = document.getElementById('DueDate');
    let reminderDate = document.getElementById('reminderDate');
    let saveButton = document.getElementById('saveTask');
    let addButton = document.getElementById('addTask');
    let errormsg = document.getElementById('errormsg');
    editIndex = -1;

    let validTitle = false;
    let validContent = false;
    let validDueDate = false;
    let validReminder = false;
    
(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName == null)
        location.assign('index.html');

    if(sessionStorage.getItem('editTask')){
        console.log(sessionStorage.getItem('editTask'));
        let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
        let index = sessionStorage.getItem('editTask');
        saveButton.style = "display:block";
        addButton.style = "display:none";

        for(let i = 0; i < userData.todo.length; i++){
            if(userData.todo[i].id == sessionStorage.getItem('editTask')){
                title.value = userData.todo[i].title;
                editIndex = i;
                validTitle = true;
                validContent = true;
                validDueDate = true;
                validReminder = true;
                task.value = userData.todo[i].task;
                category.value = userData.todo[i].category;
                dueDate.value = userData.todo[i].dueDate;
                reminderDate.value = userData.todo[i].reminderDate;
                break;
            }
        }
    }        
})();

function isEmptyTitle(element){
    validTitle = false;
    if(element.value != ""){
        element.style = "background-color:green";
        validTitle = true;
    }
    else{
        validTitle = false;
        element.style = "background-color:red";
    }    
}

function isEmptyContent(element){
    validContent = false;
    if(element.value != ""){
        validContent = true;
        element.style = "background-color:green";
    }
    else{
        validContent = false;
        element.style = "background-color:red";
    }    
}

function dueDateCheck(element){
    validDueDate = false;

    let date = new Date(element.value);
    let today = new Date();

    if( date < today){
        element.style = "background-color:red";
        validDueDate = false;
    }else{
        validDueDate = true;
        element.style = "background-color:green";
    }
}

function toggleReminder(value){
    if(value)
        document.getElementById('reminderDiv').style = "display:block";
    else
        document.getElementById('reminderDiv').style = "display:none";
}

function reminderChecker(element){
    let date = new Date(element.value);
    let today = new Date();
    let temp = document.getElementById('DueDate').value 
    let due = new Date(temp);

    if(validDueDate){
        validReminder = false;
        if(date < today || date > due){
            validReminder = false;
            element.style = "background-color:red";
        }
        else{
              validReminder = true;
              element.style = "background-color:green";
            }
    }else{
        validReminder = false;
        element.value = "";
        errormsg.innerHTML = "select Due Date First";
    }
}
function addNewTask(isNew){
    let isReminder = document.querySelector('input[name="reminder"]:checked').value;
    if(isReminder = "no")
        validReminder = true;

    if(validTitle && validContent && validDueDate && validReminder)
            addTask(isNew);        
    else
    errormsg.innerHTML = "Fill All the details";
}

function saveTask(){
    addNewTask(false);
}

function addTask(newTask){
    let isReminder = document.querySelector('input[name="reminder"]:checked').value;
    let isPublic = document.querySelector('input[name="public"]:checked').value;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    obj = {};

    if(newTask){
        userData.toDoId++;
        obj.user = sessionStorage.getItem('activeUser');
        obj.id = userData.toDoId;
    }else
        obj.id = userData.toDoId;

    obj.status = -1;
    obj.title = title.value;
    obj.task = task.value;
    obj.category = category.value;
    obj.dueDate = dueDate.value;
    obj.isReminder = isReminder;
    if(isReminder == "yes")
        obj.reminderDate = reminderDate.value;
    else
        obj.reminderDate = "";
    obj.isPublic = isPublic;

    if(newTask) 
        userData.todo.push(obj);
    else{
        userData.todo.splice(editIndex,1,obj);
        editIndex = -1;
        sessionStorage.removeItem('editTask');
    } 
    localStorage.setItem(sessionStorage.getItem('activeUser'),JSON.stringify(userData));
    location.assign('dashboard.html');
}




// function saveTask(){

//     addTask(false);
//     let isReminder = document.querySelector('input[name="reminder"]:checked').value;
//     let isPublic = document.querySelector('input[name="public"]:checked').value;
//     let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
//     obj = {};
//     obj.id = userData.toDoId;
//     obj.status = -1;
//     obj.title = title.value;
//     obj.task = task.value;
//     obj.category = category.value;
//     obj.dueDate = dueDate.value;
//     obj.isReminder = isReminder;
//     obj.reminderDate = reminderDate.value;
//     obj.isPublic = isPublic;
//     userData.todo.splice(editIndex,1,obj);
//     localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
//     editIndex = -1;
//     sessionStorage.removeItem('editTask');
//     location.assign('dashboard.html');
// }    

// function addNewTask(){

//     addTask(true);
//     let isReminder = document.querySelector('input[name="reminder"]:checked').value;
//     let isPublic = document.querySelector('input[name="public"]:checked').value;
//     let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
//     userData.toDoId++;
//     obj = {};
//     obj.user = sessionStorage.getItem('activeUser');
//     obj.id = userData.toDoId;
//     obj.status = -1;
//     obj.title = title.value;
//     obj.task = task.value;
//     obj.category = category.value;
//     obj.dueDate = dueDate.value;
//     obj.isReminder = isReminder;
//     obj.reminderDate = reminderDate.value;
//     obj.isPublic = isPublic;
//     userData.todo.push(obj);
//     localStorage.setItem(sessionStorage.getItem('activeUser'),JSON.stringify(userData));
//     location.assign('dashboard.html');
// 
// }