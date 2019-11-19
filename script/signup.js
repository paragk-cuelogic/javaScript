let validUserName = false,
    validEmail = false,
    validPassword = false,
    validRepassword = false,
    validFirstname = false,
    validLastName = false,
    imageChanged = false;

    let signupButton = document.getElementById('signupButton');
    let resetButton =  document.getElementById('resetButton');
    let updateButton =  document.getElementById('updateProfile');
    let resetProfile = document.getElementById('resetProfile');

    let userName = document.getElementById('userName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let rePassword = document.getElementById('Repassword');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let gender = document.getElementById('gender');
    let address = document.getElementById('address');
    let userImage = document.getElementById('userImage');

    (function(){
        let user = sessionStorage.getItem('activeUser');
        if(user != null){
            validUserName = true
            validEmail = true;
            validPassword = true;
            validRepassword = true;
            validFirstname = true;
            validLastName = true;
            signupButton.style.display = "none";
            resetButton.style.display = "none";
            updateButton.style.display = "inline-block";
            resetProfile.style.display = "inline-block";

            displayProfile();
        }
    })();


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
    userImage.src = userData.userImage;
}

function updateProfile(){

}

function checkUser(userName){
    if(userName.type == "email"){
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if((userName.value).match(mailformat))
            checkEmail(userName);
        else{
            alert("Invalid Email");
        }
    }else{
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        if((userName.value).match(usernameRegex))
            checkUserName(userName);
        else{
            alert("User name must contain alphabates and digits only");
        }   
    }
}

function checkUserName(userName){
    console.log("Inside userName Validator");
    name = userName.value;
    let users = JSON.parse(localStorage.getItem('users'))||[];
    if(users != ""){
        for(let i = 0; i < users.userNames.length; i++){
            if(users.userNames[i] == name){
                validUserName = false;
                userName.style = "background-color:red";
                break;
            }else{
                validUserName = true;
                userName.style = "background-color:green";
            }
        }  
    }
}

function checkEmail(email){
    console.log("Inside checkEmail()");
    name = email.value;
    let users = JSON.parse(localStorage.getItem('users'))||[];
    if(users != ""){
        for(let i = 0; i < users.emailId.length; i++){
            if(users.emailId[i] == name){
                email.style = "background-color:red";
                validEmail = false;
                break;
            }else{
                validEmail = true;
                email.style = "background-color:green";
            }
        }  
    }
}

function checkPassword(password, rePassword){
    rePassword.value = "";
    let passReg = /^.*(?=.{8,})((?=.*[!@#$%^&*]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g;
    if((password.value).match(passReg)){
        validPassword = true;
        password.style = "background-color:green";
    }else{
        validPassword = false;
        alert("use strong password")
        password.style = "background-color:red";
    }
}

function confirmPassword(rePassword, password){
    if(validPassword){
        if(rePassword.value == password.value)
            rePassword.style = "background-color:green";
        else
            rePassword.style = "background-color:red";
    }else{
        rePassword.style = "background-color:red";
        rePassword.value = "";
        alert("First Enter Password");
    }

}

function checkFirstName(firstName){
    validFirstname = false;
    validFirstname = checkName(firstName.value);
}

function checkLastName(lastName){
    validFirstname = false;
    validFirstname = checkName(lastName.value);
}

function checkName(name){
    let nameReg = /[a-zA-z]{3,20}/
    return nameReg.test(name)
}

function signUp(isNew){
    if(validUserName && validEmail && validFirstname && validLastName && validPassword && validRepassword)
        profileHelper(isNew);
    else
        alert('Fill All The Required Details'); 
}

function profileHelper(isNew){
    
    UploadProfilePicture();
    
    let picture = sessionStorage.getItem("displayPicture");
 
    let obj = {};
    obj.userName = userName.value;
    obj.email = email.value;
    obj.password = password.value;
    obj.firstName = firstName.value;
    obj.lastName = lastName.value;
    obj.gender = gender.value;
    obj.address = address.value;
    obj.userImage = picture;

    if(isNew){
        obj.todo = [];
        obj.toDoId = 0;
        let users = JSON.parse(localStorage.getItem('users'))||[];
        let userData = {};

        if(users == ""){
                userData.userNames = [obj.userName];
                userData.emailId = [obj.email];
                localStorage.setItem('users', JSON.stringify(userData));
        }else{
            users.userNames.push(obj.userName);
            users.emailId.push(obj.email);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem(obj.userName, JSON.stringify(obj));
        }

        alert("Register Successfully");
        location.assign('index.html');
    
    }else{
        let userData = JSON.parse(localStorage.getItem(userName.value))
        userData.password = password.value;
        userData.firstName = firstName.value;
        userData.lastName = lastName.value;
        userData.gender = gender.value;
        userData.address = address.value;
        userData.userImage = picture;
        localStorage.setItem(obj.userName, JSON.stringify(userData));
        alert("Profile Updated Successfully");
        location.assign('dashboard.html');
    }
}

function UploadProfilePicture() {
    
    let Image = document.getElementById("profilePicture").files[0];
    if(Image == null){
    }else{    
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
}