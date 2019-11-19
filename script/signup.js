let validUserName = false,
    validEmail = false,
    validPassword = false,
    validRepassword = false,
    validFirstname = false,
    validLastName = false,
    validAddress = false,
    validPicture = false;

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

function signUp(){

    UploadProfilePicture();

    let obj = {};
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let gender = document.getElementById('gender').value;
    let address = document.getElementById('address').value;

    obj.userName = userName;
    obj.email = email;
    obj.password = password;
    obj.firstName = firstName;
    obj.lastName = lastName;
    obj.gender = gender;
    obj.address = address;
    obj.todo = [];
    obj.toDoId = 0;
    
    
    let picture = sessionStorage.getItem("displayPicture");
    let users = JSON.parse(localStorage.getItem('users'))||[];

    obj.userImage = picture;

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
        
    localStorage.setItem(obj.userName, JSON.stringify(obj))
    alert("Register Successfully");
    location.assign('index.html');

}

function UploadProfilePicture() {
    let Image = document.getElementById("profilePicture").files[0];    
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