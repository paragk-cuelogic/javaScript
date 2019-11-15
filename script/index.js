function checkAvail(){
    let userName = document.getElementById('userName');
    console.log(userName.value);
    let userAvailable = false;
    if(!userAvailable)
    {
        // document.getElementById('userAvailability').style.visibility = "hidden";
        document.getElementById('signUpDetails').style.visibility = "visible";
    }
}

function checkField(event){

    let target = event.target;
    let value = event.target.value;
    let type = event.type;
    console.log(event)
    console.log(target+"  "+value+"  "+type)

}

function signUp(){
    let obj = {};
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let gender = document.getElementById('gender').value;
    let address = document.getElementById('address').value;
    let profilePicture = document.getElementById('profilePicture').value;
    
    
    obj.userName = userName;
    obj.email = email;
    obj.firstName = firstName;
    obj.lastName = lastName;
    obj.gender = gender;
    obj.address = address;
    obj.userImage = userImage;

    console.log(obj)

   localStorage.setItem(obj.userName, JSON.stringify(obj))

    let exe = "\nUser Name : "+userName+
    "\nEmail : "+email+
    "\nUser Name : "+firstName+
    "\nUser Name : "+lastName+
    "\nUser Name : "+gender+
    "\nUser Name : "+address+
    "\nUser Name : "+profilePicture;

    console.log(
        "\nUser Name : "+userName+
        "\nEmail : "+email+
        "\nUser Name : "+firstName+
        "\nUser Name : "+lastName+
        "\nUser Name : "+gender+
        "\nUser Name : "+address+
        "\nUser Name : "+profilePicture
    )
}