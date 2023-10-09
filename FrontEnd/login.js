const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const api = 'http://localhost:5678/api/users/login';


// const emailCorrect = "sophie.bluel@test.tld";
// const passwordCorrect = "S0phie";



// apell token de l'api / stocker le token sur le local storage envoie vers index comme admin possibilité modale


loginButton.addEventListener("click", function() {
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    // if (emailValue === emailCorrect && passwordValue === passwordCorrect) {
        // Crée un objet de données pour l'authentification
        const data = {
            email: emailValue,
            password: passwordValue
        };

        // Effectue une requête POST vers l'API pour obtenir le token
        fetch(api, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    }  
        )
        .then(response => {
            
            if (response.ok) { // Vérifie si la réponse est un succès (status 200 OK)
                return response.json(); 
            } 
            else {
                throw new Error("Échec de l'authentification");
            }
        })

        .then(data => {
            
                // Stocke le token dans le localStorage
                localStorage.setItem("token", data.token);
                console.log(data.token)
                // Redirige  vers la page index.html 
                window.location.href = "index.html";
        })


        .catch(error => {
            alert("Erreur d'authentification, email or password false : " + error.message);
            console.error(error)
        })
    });