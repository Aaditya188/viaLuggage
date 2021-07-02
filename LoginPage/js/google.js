function GoogleLogin() {
    //first of all create google provider object

    var provider=new firebase.auth.GoogleAuthProvider();
    //Login with popup window
    firebase.auth().signInWithPopup(provider).then(function () {
        //code executes after successful login

        window.location="home.php";
    }).catch(function (error) {
        var errorMessage=error.message;
        alert(errorMessage);
    });
}