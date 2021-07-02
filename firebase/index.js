//===============================Global Variable===================//
var email_verified;

//-------------------------------Check SignUp------------------------------//

function checklogin(){
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      var user = firebase.auth().currentUser;
      if(user != null){
  
        var email_id = user.email;
        email_verified = user.emailVerified;
        if(email_verified)
        {
          location.replace('../Landing.html')
        }
        else
        {
          window.alert('Please Complete Your Email Verification First before Continuing');
        }
      }
    }
});
}
//-------------------------------Print Details on Profile Page------------------------------//

function checkdetails(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
  
        var user = firebase.auth().currentUser;
        if(user != null){
    
          var email_id = user.email;
          document.getElementById("email").value = email_id;
          displaydata();
        }
    
      } else {
  
      }
  });
  }
//---------------------------Print Name-------------------------------------//

function checkname(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
  
        var user = firebase.auth().currentUser;
        if(user != null){
    
          var mail = user.email;
          name1 = mail.substring(0, mail.lastIndexOf("@"));
          console.log('Name : '+name1);
          firebase.database().ref('profile/'+name1).on('value',function(snapshot){
            
            document.getElementById('user_name').innerHTML = snapshot.val().FName;
            document.getElementById('user_name2').innerHTML = snapshot.val().LName;
          
          });
        }
    
      } else {
  
      }
  });
  }
//-------------------------------Check SignUp------------------------------//

function checksignup(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
    
          var user = firebase.auth().currentUser;
          if(user != null){
      
            var email_id = user.email;
            sendVerificationEmail();
          }
      
        }
    });
}
//-------------------------------Send Verification------------------------------//

function sendVerificationEmail(){
   
  //Built in firebase function responsible for sending the verification email
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() =>{
      window.alert('Verification Email Sent Successfully !');
  }).catch(error => {
      console.error(error);
  });
}

//-------------------------------Register User---------------------------------//
function chckbox(){

  if(document.getElementById("check").checked == true )
  {
    RegisterUser();
  }
  else{
    alert('Please Accept Privacy Policies');
  }
}

function RegisterUser() {
        var email=document.getElementById('email').value;
        var password=document.getElementById('password').value;
        firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
         location.replace("../ProfileSection/profile.html");
         var id=firebase.auth().currentUser.uid;
         checksignup();
        }).catch(function(error){
     
         var errorcode=error.code;
         var errormsg=error.message;
         window.alert("Error : " +errorMsg)
         
        });
}

//-------------------------------Login User---------------------------------//	
function LoginUser(){
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
     var id=firebase.auth().currentUser.uid;
     localStorage.setItem('id',id);
     location.replace("../Landing.html");
    }).catch(function(error){
 
     var errorCode=error.code;
     var errorMsg=error.message;
     window.alert("Error : " +errorMsg)
 
    });
   }
//-------------------------------Reset Password---------------------------------//
   const resetPasswordFunction = () => {
    const email = mailField.value;
    
    if(!email)
    {
        window.alert("Please enter a registered email");
    }
    else
    {
        
        auth.sendPasswordResetEmail(email).then(() => {
    
        window.alert('Password Reset Email Sent Successfully!');
    
    }).catch(function(error){
      
        window.alert("Please enter a registered email");
    });
    }
    }


//-------------------------------Ready Data---------------------------------//
var fname, lname, mob, email, rc, name1;

function Ready(){
  fname = document.getElementById('first_name').value;
  lname = document.getElementById('last_name').value;
  mob = document.getElementById('mobile').value;
  mail = document.getElementById('email').value;
  rc = document.getElementById('location').value;
  name1 = mail.substring(0, mail.lastIndexOf("@"));
}

//-------------------------------Insert Data---------------------------------//
 function insertdata(){
  Ready();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      
      var user = firebase.auth().currentUser;
      if(user != null){
        firebase.database().ref('profile/'+name1).set({
        FName: fname,
        LName: lname,
        Mobile: mob,
        Email: mail,
        Location: rc
          });
          location.replace('../Landing.html')
        }
      }
    });
}
//-------------------------------Select Data---------------------------------//
function displaydata(){
  Ready();
  firebase.database().ref('profile/'+name1).on('value',function(snapshot){
      document.getElementById('first_name').value = snapshot.val().FName;
      document.getElementById('last_name').value = snapshot.val().LName;
      document.getElementById('mobile').value = snapshot.val().Mobile; 
      document.getElementById('email').value = snapshot.val().Email; 
      document.getElementById('location').value = snapshot.val().Location;
      
    });
   }
//-------------------------------Update Data---------------------------------//
 function updatedata(){
  Ready();
  firebase.database().ref('profile/'+name1).update({
    FName: fname,
    LName: lname,
    Email: mail,
    Mobile: mob,
    Location: rc
  });
}
//-------------------------------Delete Data---------------------------------//
  function deletedata(){
  Ready();
  firebase.database().ref('profile/'+name1).remove();
}

//-------------------------------Google SignUP---------------------------------//
function checktick_G(){

  if(document.getElementById("check").checked == true )
  {
    GoogleLogin();
  }
  else{
    alert('Please Accept Privacy Policies');
  }
}

function GoogleLogin() {
  //first of all create google provider object

  var provider=new firebase.auth.GoogleAuthProvider();
  //Login with popup window
  firebase.auth().signInWithPopup(provider).then(function () {
    alert('Sign Up Successfully! Proceed Furthur');
    location.replace('../ProfileSection/profile.html')
  }).catch(function (error) {
      var errorMessage=error.message;
      alert(errorMessage);
  });
}
