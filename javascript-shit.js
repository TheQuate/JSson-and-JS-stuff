// Brukerdata hentet fra JSON-filen
var userData;

// Vent til dokumentet er ferdig lastet inn
document.addEventListener("DOMContentLoaded", function() {
    // Kjør koden her
    loadUserData(function() {
        console.log('User data loaded successfully.');
    });

    // Resten av koden...
});


// Henter JSON-data asynkront
function loadUserData(callback) {
    fetch('json-persobjekt.json')
        .then(response => response.json())
        .then(data => {
            // Sjekker om data er en liste av brukere
            if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty('epost')) {
                userData = { users: data };
                console.log(userData);
                callback();
            } else {
                console.error('Ugyldig JSON-struktur. Mangler nødvendige felt.');
            }
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

   // Legg til ekstra informasjon på HTML-siden
   var userInfoContainer = document.getElementById('userInfoContainer');
   userInfoContainer.innerHTML = '<p>E-post: ' + user.epost + '</p>';
   // Legg til andre felt du ønsker å vise
}

// Kjører funksjonen for å laste inn brukerdata
loadUserData(function() {
    console.log('User data loaded successfully.');
});
