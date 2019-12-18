(function(){
    let userName = sessionStorage.getItem('activeUser');
    sessionStorage.removeItem('editTask');
    if(userName == null)
        location.assign('index.html');

    let userData = JSON.parse(localStorage.getItem(userName));
    let userIDs = JSON.parse(localStorage.getItem('users'));
    
    if(!userData){
        for(let userID = 0; userID < userIDs.userNames.length; userID++){
            if(userIDs.userNames[userID] == userName){
                userIDs.userNames.splice(userID,1);
                userIDs.emailId.splice(userID,1);
                localStorage.setItem('users',JSON.stringify(userIDs));
                alert("Something went wrong ... User Data is Deleted");
                break;
            }
        }
        sessionStorage.removeItem('activeUser');
        location.assign('index.html');
    }
    let userImage = document.getElementById("userImage");
    if(userData.userImage)
        userImage.src = userData.userImage;
    else if(userData.gender == "Male")
        userImage.src = "../images/maleUser.png";
    else if(userData.gender == "Female")
        userImage.src = "../images/femaleUser.png";

    loadToDo();
    document.getElementById('toDate').value = dateConverter(new Date());
    document.getElementById('fromDate').value = dateConverter(new Date());
})();


function showErrorMsg(msg) {
    let errorMsg = document.getElementById('errorDiv');
    errorMsg.className = "show";
    errorMsg.innerText = msg;
    setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); }, 3000);
}

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

function dateConverter(date){
    return ''+date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

function getToDo(){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    return userData.todo;
}

function loadToDo(){
    let todoList = getToDo();
    showErrorMsg("Showing All");
    displayData(todoList, todoList.length, todoList.length);
}

function search(search){
    let searchKey = search.value;
    let todo = getToDo();
    let searchArray = [];
    if(searchKey){
        for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
            if((todo[todoIndex].task).search(searchKey) > -1 || (todo[todoIndex].title).search(searchKey) > -1)
                searchArray.push(todo[todoIndex]);
        }
        showErrorMsg("search reult for "+searchKey);
        displayData(searchArray, searchArray.length, todo.length);
    }else
        loadToDo();   
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
    showErrorMsg("search reult for category : "+searchKey);
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
    showErrorMsg("search reult for status : "+searchKey);
    search.options[0].selected = true;
    displayData(searchArray, searchArray.length, todo.length);
}

function dateSearch(){
    let dateOne = document.getElementById('fromDate');
    let dateTwo = document.getElementById('toDate');
    if(dateOne.value == "" || dateTwo.value == "")
    {
        showErrorMsg("Must Set Both the dates");
        dateOne.value = dateConverter(new Date());
        dateTwo.value = dateConverter(new Date());
        return;
    }
    let oldDate = dateOne.value;
    let newDate = dateTwo.value;
    if(dateOne.value > dateTwo.value){
        newDate = dateOne;
        oldDate = dateTwo;
    }
    searchByDate(new Date(oldDate), new Date(newDate));
}

function searchByDate(oldDate, newDate){
    let todo = getToDo();
    let searchArray = [];
    for(let todoIndex = 0; todoIndex < todo.length; todoIndex++){
        let date = new Date(todo[todoIndex].dueDate)
        if(date >= oldDate && date <= newDate)
            searchArray.push(todo[todoIndex]);
    }
    oldDate = dateConverter(oldDate);
    newDate = dateConverter(newDate);
    showErrorMsg("showing from "+oldDate+" To "+newDate);
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
    if(reLoad){
        loadToDo();
        showErrorMsg("marked as done");
    }
        
    document.getElementById('selectAll').checked = false;
}


function deleteTask(element, reLoad, single){
    let userData = JSON.parse(localStorage.getItem(sessionStorage.getItem('activeUser')));
    for(let todoIndex = 0; todoIndex < userData.todo.length; todoIndex++){
        if(userData.todo[todoIndex].id == element){
            userData.todo.splice(todoIndex, 1);
            localStorage.setItem(sessionStorage.getItem('activeUser'), JSON.stringify(userData));
            break;
        }
    }
    if(reLoad){
        loadToDo();
        showErrorMsg("deleted Successfully");
    }

        document.getElementById('selectAll').checked = false;
}

function batchOperation(markDone){
// if true then markDone 
// if false then Delete
}

function batchMarkDone(){

    let  checklist = document.getElementsByName("selectToDo");
    let flag = false;
    for(let item = 0; item < checklist.length; item++){
        if(checklist[item].checked == true){
            flag = true;
            break;
        }
    }

    if(flag){
        if(confirm("Do you want to \"Mark as Done\" selected?")){
            for(let item = 0; item < checklist.length; item++){
                if(checklist[item].checked == true)
                markDone(checklist[item].id, false);
        }
        loadToDo();
        showErrorMsg("marked as done items Successfully");
        }
    }else
        showErrorMsg("Select Something first.");
}

function batchDelete(){
    let  checklist = document.getElementsByName("selectToDo");
    let flag = false;
    for(let item = 0; item < checklist.length; item++){
        if(checklist[item].checked == true){
            flag = true;
            break;
        }
    }

    if(flag){
        if(confirm("Do you want to \"Done\" selected?")){
            for(let item = 0; item < checklist.length; item++){
                if(checklist[item].checked == true)
                    deleteTask(checklist[item].id, false);
        }
        loadToDo();
        showErrorMsg("deleted selected items Successfully");
        }
    }else
        showErrorMsg("Select Something to delete.");
    
}

function markAll(element){
    let checked = false;
    if(element.checked)
        checked = true;
    let  checklist = document.getElementsByName("selectToDo");
    checklist.forEach(element => {
        element.checked = checked;
    });
}

// For Content Display
function showContent(element){
    if(element.name == "hiddenContent"){
        element.style = "height: auto; overflow: auto;"
        element.name = "showingContent";
    }else{
        element.style = "height: 62px; overflow: hidden;"
        element.name = "hiddenContent";
    }
}

function displayData(todoList, result, total){
    if(result == 0)
        document.getElementById('noRecords').style.display = "block";
    else
        document.getElementById('noRecords').style.display = "none";
    
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
            doneButton = "<button id="+todoList[todoIndex].id+" onclick=\"markDone(this.id, true, true)\" name=\"todoOption\" > Mark Done</button>";
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

        deleteButton = "<button id="+todoList[todoIndex].id+" onclick=\"deleteTask(this.id, true, true)\" >Delete</button>";
        
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
        listItem.setAttribute("onclick","showContent(this)");
        listItem.setAttribute("name","hiddenContent");
        ul.appendChild(listItem);
    }
}