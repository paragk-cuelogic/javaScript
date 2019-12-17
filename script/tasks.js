    let title = document.getElementById('title');
    let task = document.getElementById('task');
    let category = document.getElementById('category');
    let dueDate = document.getElementById('DueDate');
    let reminderDate = document.getElementById('reminderDate');
    let saveButton = document.getElementById('saveTask');
    let addButton = document.getElementById('addTask');
    let editIndex = -1;
    let validTitle = false;
    let validContent = false;
    let errorMsg = document.getElementById('errorDiv');
    
(function(){
    if(!sessionStorage.getItem('activeUser'))
        location.replace('index.html');
    
    if(sessionStorage.getItem('editTask')){
        let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
        saveButton.style = "display:inline-block";
        addButton.style = "display:none";

        for(let i = 0; i < userData.todo.length; i++){
            if(userData.todo[i].id == sessionStorage.getItem('editTask')){
                editIndex = i;
                title.value = userData.todo[i].title;
                task.value = userData.todo[i].task;
                category.value = userData.todo[i].category;
                dueDate.value = userData.todo[i].dueDate;
                reminderDate.value = userData.todo[i].reminderDate;
                validTitle = true;
                validContent = true;
                break;
            }
        }
    }else{
        dueDate.value = dateConverter(new Date());
        setDueDateLimit();
    }        
})();

function showErrorMsg(msg){
    errorMsg.className = "show";
    errorMsg.innerText = msg;
    setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); }, 3000);
}

function dissmissMsg(){
    errorMsg.style.display = "none";
}

function isEmptyTitle(element){
    validTitle = false;
    if(element.value != ""){
        element.style = "background-color:green";
        validTitle = true;
    }else
        element.style = "background-color:red";
}

function isEmptyContent(element){
    validContent = false;
    if(element.value != ""){
        validContent = true;
        element.style = "background-color:green";
    }else
        element.style = "background-color:red"; 
}

function dateConverter(date){
    return ''+date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

function setDueDateLimit(){
    dueDate.setAttribute("min",dateConverter(new Date()));
}

function setReminderDateLimit(){
    reminderDate.setAttribute("min", dateConverter(new Date()));
    reminderDate.setAttribute("max", dueDate.value)
}

function toggleReminder(value){
    if(value){
        document.getElementById('reminderDiv').style = "display:block";
        reminderDate.value = dateConverter(new Date());
        setReminderDateLimit();
    }else{
        document.getElementById('reminderDiv').style = "display:none";
        document.getElementById('noReminder').checked = true;
    }
}

function checkDueDate(element){
    toggleReminder(false);
    if(element.value < dateConverter(new Date())){
        showErrorMsg("cannot Select Date from past");
        element.value = dateConverter(new Date());
    }
        
}

function checkReminderDate(element){
    if(element.value > dueDate.value || element.value < dateConverter(new Date())){
        
        showErrorMsg("You can only select date from Current Date to Due Date.");
        element.value = dateConverter(new Date());
    }
}

function addNewTask(isNew){

    let categoryList = ['Home','School','Market'];
    let categoryManipulated = true;

    for(let categoryType = 0; categoryType < categoryList.length; categoryType++){
        if(category.value == categoryList[categoryType])
            categoryManipulated = false;
    }

    if(categoryManipulated){
        alert("Policy Violation .. Category Manipulated .. Taking you to Dashboard.");
        location.assign('dashboard.html');
        return ;
    }
        
    if(validTitle && validContent)
        addTask(isNew);        
    else{
        showErrorMsg("Fill All the Details");
    }
    
}

function addTask(newTask){
    let isReminder = document.querySelector('input[name="reminder"]:checked').value;
    let isPublic = document.querySelector('input[name="public"]:checked').value;
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    obj = {
        status : -1,
        title : title.value,
        task : task.value,
        category : category.value,
        dueDate : dueDate.value,
        isReminder : isReminder,
        isPublic : isPublic
    };
    
    obj.user = sessionStorage.getItem('activeUser');
        
    if(isReminder == "yes")
        obj.reminderDate = reminderDate.value;
    else
        obj.reminderDate = "";

    if(newTask){
        userData.toDoId++;
        obj.id = userData.toDoId;
        userData.todo.push(obj);
    }else{
        obj.id = userData.toDoId;
        userData.todo.splice(editIndex,1,obj);
        editIndex = -1;
        sessionStorage.removeItem('editTask');
    }
    alert("saved successfully.");
    localStorage.setItem(sessionStorage.getItem('activeUser'),JSON.stringify(userData));
    location.replace('dashboard.html');
}