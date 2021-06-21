console.log(firebase)
    // todo: Remove console.log commands in production

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function SignUp() {

    const auth = firebase.auth()
    console.log("Auth:")
    console.log(auth)

    var validator = 0;

    const email_field = document.getElementById('email');
    const password_field = document.getElementById('password');
    const confirmpassword_field = document.getElementById('confirmpassword');

    var email = email_field.value
    var password = password_field.value
    var confirmpassword = confirmpassword_field.value


    // * Validate email
    if (email == "") {
        email_field.classList.add('invalid')
        document.getElementById('email_feedback').innerHTML = 'Please fill out this field'
    } else if (!(validateEmail(email))) {
        email_field.classList.add('invalid')
        document.getElementById('email_feedback').innerHTML = 'Invalid email'
    } else {
        email_field.classList.remove('invalid')
        email_field.classList.add('valid')
        document.getElementById('email_feedback').innerHTML = ''
        validator += 1
    }

    // * Validate password
    if (password == "") {
        password_field.classList.add('invalid')
        document.getElementById('password_feedback').innerHTML = 'Please fill out this field'
    } else if (password.length < 8) {
        password_field.classList.add('invalid')
        document.getElementById('password_feedback').innerHTML = 'Passwords should be at least 8 characters long'
    } else {
        password_field.classList.remove('invalid')
        password_field.classList.add('valid')
        document.getElementById('password_feedback').innerHTML = ''
        validator += 1
    }

    // * Confirm password
    if (confirmpassword == "") {
        confirmpassword_field.classList.add('invalid')
        document.getElementById('confirmpassword_feedback').innerHTML = 'Please fill out this field'
    } else if (confirmpassword != password) {
        confirmpassword_field.classList.add('invalid')
        document.getElementById('confirmpassword_feedback').innerHTML = 'Passwords must match'
    } else {
        confirmpassword_field.classList.remove('invalid')
        confirmpassword_field.classList.add('valid')
        document.getElementById('confirmpassword_feedback').innerHTML = ''
        validator += 1
    }

    if (validator == 3) {
        console.log('Signing up...');
        // auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log('SignUp Error:')
        //     console.log(errorMessage)
        //         // ...
        // });
        auth.createUserWithEmailAndPassword(email, password)
            .then(function(result) {
                // document.getElementById("signout").innerHTML += (' ' + firebase.auth().currentUser.email_field)
                // window.location.replace('index.html')


            }).catch(function(error) {
                console.log(error);
                email_field.classList.add('invalid')
                document.getElementById('email_feedback').innerHTML = error.message
            });

        // .then(

        //     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         console.log('SignIn Error:')
        //         console.log(errorMessage)

        //         // ...
        //     }))


    } else {
        console.log("Bro something's invalid");
    }

}

function SignIn() {
    const auth = firebase.auth()
    console.log("Auth:")
    console.log(auth)


    const email_field = document.getElementById('email');
    const password_field = document.getElementById('password');

    var email = email_field.value
    var password = password_field.value

    var validator = 0;


    // * Validate email
    if (email == "") {
        email_field.classList.add('invalid')
        document.getElementById('email_feedback').innerHTML = 'Please fill out this field'
    } else if (!(validateEmail(email))) {
        email_field.classList.add('invalid')
        document.getElementById('email_feedback').innerHTML = 'Invalid email'
    } else {
        email_field.classList.remove('invalid')
        email_field.classList.add('valid')
        document.getElementById('email_feedback').innerHTML = ''
        validator += 1
    }

    // * Validate password
    if (password == "") {
        password_field.classList.add('invalid')
        document.getElementById('password_feedback').innerHTML = 'Please enter your password'
    } else {
        password_field.classList.remove('invalid')
        password_field.classList.add('valid')
        document.getElementById('password_feedback').innerHTML = ''
        validator += 1
    }

    if (validator == 2) {
        console.log('Signing in now...');
        auth.signInWithEmailAndPassword(email, password)
            .then(function(result) {
                console.log("Result:");
                console.log(result.toString());
                // document.getElementById("signout").innerHTML += (' ' + firebase.auth().currentUser.email_field)
                // window.location.replace('index.html')


            }).catch(function(error) {
                console.log(error);
                email_field.classList.add('invalid')
                document.getElementById('email_feedback').innerHTML = error.message
            });



    } else {
        console.log("Yo something's invalid");
    }
}

function SignOut() {
    console.log('User:')
    console.log(firebase.auth().currentUser)
    if ((firebase.auth().currentUser) != null) {
        firebase.auth().signOut()
        console.log("Signing out...")
    } else {
        console.log("Not signed in");
    }

}

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        console.log(user.toString());
        // User is signed in.
        var email = user.email;
        var emailVerified = user.emailVerified;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("Signed in")
        console.log(user.uid)
            // document.getElementById("signout").innerHTML += (' ' + firebase.auth().currentUser.email)

        // window.location.href = "index.html";
    } else {
        console.log("Signed out")
            // document.getElementById("signout").innerHTML = 'Log Out'
            // User is signed out.
            // ...
    }
});