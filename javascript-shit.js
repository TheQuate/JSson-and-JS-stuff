// Brukerdata hentet fra JSON-filen
var userData;

// Henter JSON-data asynkront
function loadUserData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', 'user_data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            userData = JSON.parse(xhr.responseText);
            callback();
        }
    };
    xhr.send();
}

// Validerer e-postadresse og viser brukerinformasjon hvis gyldig
function checkEmail() {
    var emailInput = document.getElementById('emailInput').value;
    var user = getUserByEmail(emailInput);

    if (user) {
        showUserInfo(user);
    } else {
        alert('Ugyldig e-postadresse. Vennligst prøv igjen.');
    }
}

// Henter brukerinformasjon basert på e-postadresse
function getUserByEmail(email) {
    return userData.users.find(function(user) {
        return user.email === email;
    });
}

// Viser brukerinformasjon i innloggingsboksen
function showUserInfo(user) {
    var nameElement = document.getElementById('name');
    var imageElement = document.getElementById('image');
    var passwordInput = document.getElementById('passwordInput');
    var userInfoDiv = document.getElementById('userInfo');
    var loginBoxDiv = document.getElementById('loginBox');

    nameElement.textContent = 'Navn: ' + user.name;
    imageElement.src = user.image;
    passwordInput.value = '';  // Resetter passordfeltet

    // Skjuler innholdsdiven for innlogging og viser brukerinformasjon
    loginBoxDiv.style.display = 'none';
    userInfoDiv.style.display = 'block';
}

// Kjører funksjonen for å laste inn brukerdata
loadUserData(function() {
    console.log('User data loaded successfully.');
});
