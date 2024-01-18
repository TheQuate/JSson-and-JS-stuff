// Brukerdata hentet fra JSON-filen
var userData;

// Henter JSON-data asynkront
function loadUserData(callback) {
    fetch('json-persobjekt.json')
        .then(response => response.json())
        .then(data => {
            userData = data;
            callback();
        })
        .catch(error => console.error('Feil ved lasting av JSON: ', error));
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
        return user.epost === email;
    });
}

// Viser brukerinformasjon i innloggingsboksen
function showUserInfo(user) {
    var nameElement = document.getElementById('name');
    var imageElement = document.getElementById('image');
    var passwordInput = document.getElementById('passwordInput');
    var userInfoDiv = document.getElementById('userInfo');
    var loginBoxDiv = document.getElementById('loginBox');

    nameElement.textContent = 'Navn: ' + user.navn;
    imageElement.src = user.bilde;
    passwordInput.value = '';  // Resetter passordfeltet

    // Skjuler innholdsdiven for innlogging og viser brukerinformasjon
    loginBoxDiv.style.display = 'none';
    userInfoDiv.style.display = 'block';
}

// Kjører funksjonen for å laste inn brukerdata
loadUserData(function() {
    console.log('User data loaded successfully.');
});
