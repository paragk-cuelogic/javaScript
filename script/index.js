(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName != null)
        location.assign('dashboard.html');
})();

let userIndex = -1;

function checkUser(){
    
    let email = document.getElementById("email");

    if(window.confirm("Do You Want To SignUp?"))
        location.replace("index.html");

    let flag = false;
    let userData = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i < userData.emailId.length; i++){
        if(userData.emailId[i] == email.value || userData.userNames[i] == email.value){
            
            flag = true;
            let passwordDiv = document.getElementById("passwordDiv");
            email.disabled = true;
            passwordDiv.style = "display:block";
            let userImage =  localStorage.getItem(localStorage.getItem('userData'));
            document.getElementById()
            break;
        }
    }
    if(flag == false){
        if(window.confirm("Do You Want To SignUp?")){
            console.log("Inside");
            location.replace("index.html");
        }
    }
}


function authenticateUser(){
    let password = document.getElementById('password');
}

function signUp(){
    location.replace("index.html");
}

function validateUserName(elementId, showError){
    let userText = elementId.value;
    let userNamePattern = null;
    let emailPattern = /^[a-zA-z]{3,15}$/;
    
    if((userText.match(pattern)) || (userText == "")){
    document.getElementById(showError).innerHTML = "";
    return true;
    }else{
    document.getElementById(showError).innerHTML= "Should only have characters(atleast 3)!!";
    elementId.value="";
    elementId.focus();
    return false;
    }
}