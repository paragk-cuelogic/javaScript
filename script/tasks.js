    let title = document.getElementById('title');
    let task = document.getElementById('task');
    let category = document.getElementById('category');
    let dueDate = document.getElementById('DueDate');
    let reminderDate = document.getElementById('reminderDate');
    let saveButton = document.getElementById('saveTask');
    let addButton = document.getElementById('addTask');
    editIndex = -1;
    
(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName == null)
        location.assign('index.html');
    if(sessionStorage.getItem('editTask')){
        console.log(sessionStorage.getItem('editTask'));
        let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
        let index = sessionStorage.getItem('editTask');
        editIndex = index-1;
        let todo = userData.todo[index-1];
        saveButton.style = "display:block";
        addButton.style = "display:none";
        title.value = todo.title;
        task.value = todo.task;
        category.value = todo.category;
        dueDate.value = todo.dueDate;
        reminderDate.value = todo.reminderDate;
    }
        
})();

function saveTask(){
    let isReminder = document.querySelector('input[name="reminder"]:checked').value;
    let isPublic = document.querySelector('input[name="public"]:checked').value;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    obj = {};
    obj.id = userData.toDoId;
    obj.status = -1;
    obj.title = title.value;
    obj.task = task.value;
    obj.category = category.value;
    obj.dueDate = dueDate.value;
    obj.isReminder = isReminder;
    obj.reminderDate = reminderDate.value;
    obj.isPublic = isPublic;
    userData.todo.splice(editIndex,1,obj);
    console.log(userData.todo);
    localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
    sessionStorage.removeItem('editTask');
    location.assign('dashboard.html');
}    

function addNewTask(){
    let isReminder = document.querySelector('input[name="reminder"]:checked').value;
    let isPublic = document.querySelector('input[name="public"]:checked').value;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    userData.toDoId++;
    obj = {};
    obj.id = userData.toDoId;
    obj.status = -1;
    obj.title = title.value;
    obj.task = task.value;
    obj.category = category.value;
    obj.dueDate = dueDate.value;
    obj.isReminder = isReminder;
    obj.reminderDate = reminderDate.value;
    obj.isPublic = isPublic;
    userData.todo.push(obj);
    localStorage.setItem(sessionStorage.getItem('activeUser'),JSON.stringify(userData));
    location.assign('dashboard.html');
}