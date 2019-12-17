let validUserName = false,
    validEmail = false,
    validPassword = false,
    validRepassword = false,
    validFirstname = false,
    validLastName = false,
    updating = false,
    signupImage = false;
    imageChanged = false;


    let userName = document.getElementById('userName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let rePassword = document.getElementById('Repassword');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let gender = document.getElementById('gender');
    let address = document.getElementById('address');
    let userImage = document.getElementById('userImage');
    let errorMsg = document.getElementById('errorDiv');

    (function(){
        let user = sessionStorage.getItem('activeUser');
        if(user != null){

            updating = true;
            validUserName = true;
            validEmail = true;
            validPassword = true;
            validRepassword = true;
            validFirstname = true;
            validLastName = true;
            document.getElementById('signupButton').style.display = "none";
            document.getElementById('resetButton').style.display = "none";
            document.getElementById('goToLogin').style.display = "none";
            document.getElementById('updateProfile').style.display = "inline-block";
            document.getElementById('resetProfile').style.display = "inline-block";
            document.getElementById('goToDashboard').style.display = "block";
            displayProfile();
        }
    })();


    function showErrorMsg(msg) {
        errorMsg.className = "show";
        errorMsg.innerText = msg;
        setTimeout(function(){ errorMsg.className = errorMsg.className.replace("show", ""); }, 3000);
      }


function dissmissMsg(){
    errorMsg.style.display = "none";
}

function displayProfile(){
    let user = sessionStorage.getItem('activeUser')
    let userData = JSON.parse(localStorage.getItem(user));
    userName.value = user;
    userName.disabled = true;
    email.value = userData.email;
    email.disabled = true;
    password.value = userData.password;
    rePassword.value = userData.password;
    firstName.value = userData.firstName;
    lastName.value = userData.lastName;
    gender.value = userData.gender;
    address.value = userData.address;
    if(userData.userImage)
        userImage.src = userData.userImage;
    let inputFields = document.getElementsByClassName('inputField');
    for(let test = 0; test < inputFields.length; test++){
        inputFields[test].style.backgroundColor = "white";
    }
}

function setInputBackground(element, color){
    if(color)
        element.style = "background-color:green";
    else
        element.style = "background-color:red";
}

let loadUserData = () => JSON.parse(localStorage.getItem('users'))||[];

function checkUser(userName){
    if(userName.type == "email"){
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if((userName.value).match(mailformat))
            checkEmail(userName);
        else{
            showErrorMsg("Invalid Email");
            setInputBackground(userName, false);
        }
    }else{
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        if((userName.value).match(usernameRegex))
            checkUserName(userName);
        else{
            setInputBackground(userName, false)
            showErrorMsg("User name must contain alphabates and digits only");
        }   
    }
}

function checkUserName(userName){
    if(userName.value == "users"){
        userName.value = "";
        setInputBackground(userName, false);
        showErrorMsg("'users' Cannot be a username")
        return;
    }
    
    let users = loadUserData();
    
    if(users != ""){
        for(let userID = 0; userID < users.userNames.length; userID++){
            if(users.userNames[userID] == userName.value){
                validUserName = false;
                setInputBackground(userName, false);
                showErrorMsg("Username already used.");
                break;
            }else{
                validUserName = true;
                setInputBackground(userName, true);
            }
        }  
    }else{
        validUserName = true;
        setInputBackground(userName, true);
    }
}

function checkEmail(email){
    let users = loadUserData();
    if(users != ""){
        for(let userID = 0; userID < users.emailId.length; userID++){
            if(users.emailId[userID] == email.value){
                setInputBackground(email,false);
                validEmail = false;
                showErrorMsg("Email-ID already used.");
                break;
            }else{
                validEmail = true;
                setInputBackground(email,true);
            }
        }  
    }else{
        validEmail = true;
        setInputBackground(email,true);
    }
}

function checkPassword(password, rePassword){
    validRepassword = false;
    validPassword = false;
    rePassword.value = "";

    let passReg = /^.*(?=.{8,})((?=.*[!@#$%^&*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g;
    if((password.value).match(passReg)){
        validPassword = true;
        setInputBackground(password,true);
    }else{
        showErrorMsg("use strong password")
        setInputBackground(password, false);
    }
}

function confirmPassword(rePassword, password){
    validRepassword = false;
    if(validPassword){  
        if(rePassword.value == password.value){
            setInputBackground(rePassword,true);
            validRepassword = true;
        }
        else{
            showErrorMsg("Please Enter Same Password Again")
            setInputBackground(rePassword,false);
        }
            
    }else{
        setInputBackground(rePassword, false);
        rePassword.value = "";
        showErrorMsg("First Enter Password");
        password.focus();
    }

}

function checkFirstName(firstName){
    validFirstname = false;
    validFirstname = checkName(firstName.value);
    if(validFirstname)
        setInputBackground(firstName,true);
    else
        setInputBackground(firstName,false);
}

function checkLastName(lastName){
    validLastName = false;
    validLastName = checkName(lastName.value);
    if(validLastName)
        setInputBackground(lastName,true);
    else
        setInputBackground(lastName,false);
}

function checkName(name){
    let nameRegex = /[a-zA-z]{3,20}/
    return nameRegex.test(name)
}

function signUp(isNew){
    if(validUserName && validEmail && validFirstname && validLastName && validPassword && validRepassword)
        profileHelper(isNew);
    else
        showErrorMsg('Fill All The Required Details'); 
}

function profileHelper(isNew){

    UploadProfilePicture();
    let picture = "";
    if(userImage || imageChanged)
        picture = sessionStorage.getItem("displayPicture");
 
    let obj = {
    userName : userName.value,
    email : email.value,
    password : password.value,
    firstName : firstName.value,
    lastName : lastName.value,
    gender : gender.value,
    address : address.value,
    userImage : picture
    };
    
    if(isNew){
        obj.todo = [];
        obj.toDoId = 0;
        let users = loadUserData();
        let userData = {};
        if(users == ""){
                userData.userNames = [obj.userName];
                userData.emailId = [obj.email];
                localStorage.setItem('users', JSON.stringify(userData));
        }else{
            users.userNames.push(obj.userName);
            users.emailId.push(obj.email);
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.setItem(obj.userName, JSON.stringify(obj));
        alert("Registration Successful..");
        location.replace('index.html');
    
    }else{
        let userData = JSON.parse(localStorage.getItem(userName.value))
        userData.password = password.value;
        userData.firstName = firstName.value;
        userData.lastName = lastName.value;
        userData.gender = gender.value;
        userData.address = address.value;
        if(imageChanged)
            userData.userImage = picture;
        localStorage.setItem(obj.userName, JSON.stringify(userData));
        location.assign('dashboard.html');
        alert("Profile Updated Successfully");
    }
}

function UploadProfilePicture() {
    let Image = document.getElementById("profilePicture").files[0];
    if(Image == null && updating){
        imageChanged = false;
    }else if(updating && Image != null ){
        imageChanged = true;
        setImage(Image);
    }
    else if(!updating && Image != null){
        signupImage = true; 
        setImage(Image);
    }
    else if(!updating && Image == null){
         signupImage = false;
    }
}

function setImage(Image){
    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);
    
    imagereader.onload = function () {
    let imgdata = imagereader.result;
    sessionStorage.setItem("displayPicture", imgdata);
        document.getElementById("userImage").src = sessionStorage.displayPicture;
    };

    imagereader.onerror = function (error) {   
    };
}

function resetSignupForm(){
    let inputFields = document.getElementsByClassName('inputField');
    for(let test = 0; test < inputFields.length; test++){
        inputFields[test].style.backgroundColor = "white";
    }
    gender.options[0].selected = true;
    userImage.src = "../images/image.png";
}