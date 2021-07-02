window.onload=function () {
  render();
};
function render() {
    window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}
function phoneAuth() {
    //get the number
    var number=document.getElementById('number').value;
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(number,window.recaptchaVerifier).then(function (confirmationResult) {
        //s is in lowercase
        window.confirmationResult=confirmationResult;
        coderesult=confirmationResult;
        console.log(coderesult);
        alert("OTP sent to Given Mobile Number");
    }).catch(function (error) {
        alert(error.message);
    });
}

function checktick(){

    if(document.getElementById("check").checked == true )
    {
      codeverify();
    }
    else{
      alert('Please Accept Privacy Policies');
    }
  }


function codeverify() {
    var code=document.getElementById('verificationCode').value;
    coderesult.confirm(code).then(function (result) {
        alert("Successfully registered! Proceed to Profile Page");
        var user=result.user;
        window.location.replace('../../ProfileSection/profile.html');
    }).catch(function (error) {
        alert(error.message);
    });
}