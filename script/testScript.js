function checkUser(){
    let flag = false;
    let email = document.getElementById("email");
    let userData = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i < userData.emailId.length; i++){
        if(userData.emailId[i] == email.value || userData.userNames[i] == email.value){
            flag = true;
            let passwordDiv = document.getElementById("passwordDiv");
            email.disabled = true;
            passwordDiv.style = "display:block";
        }
    }

    if(flag == false){
        if(window.confirm("Do You Want To SignUp?")){
            console.log("Inside");
            location.replace("index.html");
        }
    }
}

let userImage = document.getElementById("userImage");


function validateCharactersOnly(elementId, showError){
    let userText = elementId.value;
    let pattern = /^[a-zA-z]{3,15}$/g;
    
    if((userText.match(pattern)) || (userText == "")){
    document.getElementById(showError).innerHTML = " ";
    return true;
    }else{
    document.getElementById(showError).innerHTML= "Should only have characters(atleast 3)!!";
    elementId.value="";
    elementId.focus();
    return false;
    }
}