(function(){
    let userName = sessionStorage.getItem('activeUser');
    if(userName != null)
        location.assign('dashboard.html');
    if(!JSON.parse(localStorage.getItem('users'))){
        alert("No Users Added ... Taking You To Signup");
        location.assign('signup.html');
    }
})();

let email = document.getElementById("email");
let password = document.getElementById('password');

function showErrorMsg(msg) {
    let errorMsg = document.getElementById('errorDiv');
    errorMsg.className = "show";
    errorMsg.innerText = msg;
    setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); }, 3000);
}


function authenticateUser(){
    if(email.value == ""){
        showErrorMsg("Enter Username/Email");
    }else
        checkUser();
}

function checkUser(){
    let foundUser = false;
    let accountHolders = JSON.parse(localStorage.getItem('users')) || [];
    if(accountHolders != ""){
        for(let userID = 0; userID < accountHolders.emailId.length; userID++){
            if(accountHolders.emailId[userID] == email.value || accountHolders.userNames[userID] == email.value){
                foundUser = true;
                let userDetails = JSON.parse(localStorage.getItem(accountHolders.userNames[userID]));
                if(userDetails.password == password.value){
                    sessionStorage.setItem('activeUser',accountHolders.userNames[userID]);
                    location.assign('dashboard.html');
                    break;
                }else{
                    showErrorMsg("Wrong Password");
                }
            }
        }
        if(!foundUser)
            if(confirm("user not found. would you like to Signup?"))
                location.assign('signup.html');
    }
}

// function checkUser(){
//     let email = document.getElementById("email");
//     let signup = document.getElementById('checkUserButton');
//     if(email.value == "")
//     {
//         signUp();
//     }else{
//         let flag = false;
//         let userData = JSON.parse(localStorage.getItem('users')) || [];

//         if(userData != ""){
//             for(let userID=0; userID < userData.emailId.length; userID++){
//                 if(userData.emailId[userID] == email.value || userData.userNames[userID] == email.value){
//                     flag = true;
            
//                 setDetails(userData.userNames[userID]);
//                     let passwordDiv = document.getElementById("passwordDiv");
//                     email.disabled = true;
//                     signup.style.display = "none";
//                     passwordDiv.style = "display:block";
//                     break;
//                 }
//             }  
//             if(flag == false){
//                 if(window.confirm("Do You Want To SignUp?"))
//                     signUp();
//             }
//         }else
//            signUp();
//     }
// }

// function setDetails(userName){
//     let userData = JSON.parse(localStorage.getItem(userName));
//     if(userData.userImage)
//         document.getElementById("userImage").src = userData.userImage; 
//     this.userName = userName;
// }

// function authenticateUser(){
//     let userData = JSON.parse(localStorage.getItem(userName));
//     let password = document.getElementById('password');
//     if( password.value == userData.password){
//         sessionStorage.setItem('activeUser',userName);
//         location.assign('dashboard.html');
//     }
//     else{
//         password.value = "";
//         alert("Wrong Password");
//     }
        
// }

// function signUp(){
//     console.log("redirecting to signup page");
//     location.assign("signup.html");
// }