(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName != null)
        location.assign('dashboard.html');
})();

userName = "";

function checkUser(){
    let email = document.getElementById("email");
    let signup = document.getElementById('checkUserButton');
    if(email.value == "")
    {
        signUp();
    }else{
        let flag = false;
        let userData = JSON.parse(localStorage.getItem('users')) || [];

        if(userData != ""){
            for(let userID=0; userID < userData.emailId.length; userID++){
                if(userData.emailId[userID] == email.value || userData.userNames[userID] == email.value){
                    flag = true;
            
                setDetails(userData.userNames[userID]);
                    let passwordDiv = document.getElementById("passwordDiv");
                    email.disabled = true;
                    signup.style.display = "none";
                    passwordDiv.style = "display:block";
                    break;
                }
            }  
            if(flag == false){
                if(window.confirm("Do You Want To SignUp?"))
                    signUp();
            }
        }else
           signUp();
    }
}

function setDetails(userName){
    let userData = JSON.parse(localStorage.getItem(userName));
    if(userData.userImage)
        document.getElementById("userImage").src = userData.userImage; 
    this.userName = userName;
}

function authenticateUser(){
    let userData = JSON.parse(localStorage.getItem(userName));
    let password = document.getElementById('password');
    if( password.value == userData.password){
        sessionStorage.setItem('activeUser',userName);
        location.assign('dashboard.html');
    }
    else{
        password.value = "";
        alert("Wrong Password");
    }
        
}

function signUp(){
    console.log("redirecting to signup page");
    location.assign("signup.html");
}