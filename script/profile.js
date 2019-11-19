(function(){
    let user = sessionStorage.getItem('activeUser');
    if(user == null)
        location.assign('index.html');

    else{
        
        let userData = JSON.parse(localStorage.getItem(user));
        document.getElementById('firstName').value = userData.firstName;
        document.getElementById('lastName').value = userData.lastName;
        document.getElementById('userName').value = userData.userName;
        document.getElementById('email').value = userData.email;
        document.getElementById('gender').value = userData.gender;
        document.getElementById('address').value = userData.address;
        document.getElementById('userImage').src = userData.userImage;          
        console.log(userData);
    }
})();

