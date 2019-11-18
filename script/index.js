(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName != null)
        location.assign('dashboard.html');
})();

userName = "";

function checkUser(){
    let email = document.getElementById("email");
    let signup = document.getElementById('checkUserButton');
    let flag = false;

    let userData = JSON.parse(localStorage.getItem('users')) || [];
    if(email.value == "")
    {
        signUp();
    }

    if(userData != ""){
    for(let i=0; i < userData.emailId.length; i++){
        if(userData.emailId[i] == email.value || userData.userNames[i] == email.value){
            flag = true;
            
           setDetails(userData.userNames[i]);

            let passwordDiv = document.getElementById("passwordDiv");
            email.disabled = true;
            signup.style.display = "none";
            passwordDiv.style = "display:block";
            break;
        }
    }
    if(flag == false){
        if(window.confirm("Do You Want To SignUp?")){
            signUp();
        }
    }
    }else
       signUp();
}

function setDetails(userName){
    this.userName = userName;
}

function authenticateUser(){
    let userData = JSON.parse(localStorage.getItem(userName));
    let password = document.getElementById('password').value;
    if( password == userData.password)
    {
        sessionStorage.setItem('activeUser',userName);
        location.assign('dashboard.html');
    }
}

function signUp(){
    console.log("redirecting to signup page");
    location.replace("signup.html");
}