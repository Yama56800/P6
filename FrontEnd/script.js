const api = 'http://localhost:5678/api/works';
let data; // Variable pour stocker les données



function updateGallery(items) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ''; // Efface le contenu existant de la galerie

    items.forEach(work => {
        const container = document.createElement("div");

        const img = document.createElement("img");
        img.src = work.imageUrl;

        const name = document.createElement("p");
        name.textContent = work.title;

        container.appendChild(img);
        container.appendChild(name);

        gallery.appendChild(container);


        
    });
}

fetch(api)
    .then(response => response.json())
    .then(dataResponse => {
        data = dataResponse;


        updateGallery(data);
        updateGallerymodal(data);


        console.log(data);
    });
    function fetchData() {
        fetch(api)
        .then(response => response.json())
        .then(dataResponse => {
        data = dataResponse;


        updateGallery(data);
        updateGallerymodal(data);


        console.log(data); 
    });
      }
      
      
    //   setInterval(fetchData, 5000);

//version modal


// fetch(api)
//     .then(response => response.json())
//     .then(dataResponse => {
//         data = dataResponse;


//         updateGallerymodal(data);

//         // console.log(data);
//     });

const btnTous = document.getElementById("tous");
const btnall = document.querySelectorAll(".all-btn button")

document.addEventListener("DOMContentLoaded", function () {

 
    
    btnTous.style.backgroundColor = "#1D6154";
    btnTous.style.color = "white";
    btnTous.addEventListener("click", function () {
        const imgTous = data.filter(function (work) {
            return work.categoryId === 1 || work.categoryId === 2 || work.categoryId === 3 || work.categoryId === 4;
        });

        btnall.forEach(function (button) {
            button.style.backgroundColor = "#FFFEF8";
            button.style.color = "#1D6154";
        });

        btnTous.style.backgroundColor = "#1D6154";
        btnTous.style.color = "white";

        updateGallery(imgTous);

        console.log(imgTous);
    });

});


const btnObjets = document.getElementById("objets");

btnObjets.addEventListener("click", function () {
    const Objets = data.filter(function (work) {
        return work.categoryId === 1;
    });
    btnall.forEach(function (button) {
            button.style.backgroundColor = "#FFFEF8";
            button.style.color = "#1D6154";
        });
    btnObjets.style.backgroundColor = "#1D6154";
    btnObjets.style.color = "white";
   

    updateGallery(Objets);

    console.log(Objets);
});
const btnappartements = document.getElementById("appartements");

btnappartements.addEventListener("click", function () {
    const appartements = data.filter(function (work) {
        return work.categoryId === 2;
    });
    btnall.forEach(function (button) {
            button.style.backgroundColor = "#FFFEF8";
            button.style.color = "#1D6154";
        });
    btnappartements.style.backgroundColor = "#1D6154";
    btnappartements.style.color = "white";
   

    updateGallery(appartements);

    console.log(appartements);
});
const btnhotels = document.getElementById("hotels");

btnhotels.addEventListener("click", function () {
    const hotels = data.filter(function (work) {
        return work.categoryId === 3;
    });
    btnall.forEach(function (button) {
            button.style.backgroundColor = "#FFFEF8";
            button.style.color = "#1D6154";
        });
    btnhotels.style.backgroundColor = "#1D6154";
    btnhotels.style.color = "white";
   
    
   

    //update Met à jour la galerie avec les éléments filtrés
    updateGallery(hotels);

    console.log(hotels);
});



const logoutButton = document.getElementById("logoutButton");
const loginButton = document.getElementById("loginButton");
const allbtn = document.querySelector('.all-btn');
const headerDiv = document.querySelector('.header-div');
const token = localStorage.getItem("token");

// Créer la div avec l'id "black-banner"
const blackBanner = document.createElement("div");
blackBanner.id = "black-banner";

// Créer l'élément <i> avec la classe "fa-regular fa-pen-to-square"
const iElement = document.createElement("i");
iElement.className = "fa-regular fa-pen-to-square";

// Ajouter l'icône en premier lieu
blackBanner.appendChild(iElement);

// Créer le titre <h4> et lui ajouter du texte
const h4Element = document.createElement("h4");
h4Element.textContent = "Mode édition";

// Ajouter l'élément <h4> après l'icône
blackBanner.appendChild(h4Element);

// Ajouter la div au document (par exemple, au body)
document.body.appendChild(blackBanner);

if (token) {
    // Le token est présent, affiche le bouton "Modifier" et le bouton de déconnexion 
    const modifierButton = document.getElementById("modifierButton");
    modifierButton.style.display = "block";
    // banner.style.display = "flex";
    allbtn.style.display = "none" // Pour afficher le bouton "Modifier"

    loginButton.style.display = "none"; // Pour masquer le bouton de connexion (login)
    logoutButton.style.display = "block"; // Pour afficher le bouton de déconnexion (logout)

        blackBanner.style.display = "flex";
        headerDiv.style.marginTop = "30px";
} else {
    loginButton.style.display = "block";
    logoutButton.style.display = "none"; // masquer le bouton de déconnexion 
    blackBanner.style.display = null;
    headerDiv.style.marginTop = "0px";

}

logoutButton.addEventListener("click", function () {
    //Supprimer le token du localStorage pour déconnecter l'utilisateur
    localStorage.removeItem("token");

    //afficher le bouton de connexion  et masquer le bouton de déconnexion 
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    modifierButton.style.display = "none"
    allbtn.style.display = "flex"
    blackBanner.style.display = null;
    headerDiv.style.marginTop = "0px";
});

let modal = null

const openmodal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closemodal)
    modal.querySelector('.js-modal-close').addEventListener('click', closemodal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

}

const closemodal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closemodal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closemodal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null

}
const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openmodal)
})





const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const i = document.querySelector(".formphoto .fa-image");
const labelsToHide = document.querySelectorAll('label:not(.keep-visible)');

imageInput.addEventListener("change", async function () {
    const file = this.files[0];

    closeimg();

    if (file) {
        const imageUrl = URL.createObjectURL(file);
        imagePreview.src = imageUrl;
        imagePreview.style.display = "block";
        i.style.display = "none";


        // Masquer tous les labels sauf ceux avec la classe "keep-visible"
        labelsToHide.forEach(label => {
            label.style.display = "none";
        });

    } else {
        
        imagePreview.style.display = "none";

        // Afficher à nouveau tous les labels (y compris les deux derniers)
        labelsToHide.forEach(label => {
            label.style.display = "block";
        });
    }
});

   
async function resetimg() {
    const i = document.querySelector(".formphoto .fa-image");
    const imageInput = document.getElementById("photo");
    const labelsToHide = document.querySelectorAll('label:not(.keep-visible)');
    const imagePreview = document.getElementById("imagePreview");

    i.style.display = "block";
    imageInput.style.display = "none";
    imagePreview.style.display = "none";
    imagePreview.src = '';

    labelsToHide.forEach(label => {
        label.style.display = "block";
    });
}
    const closeresetimg = document.querySelector('.close-reset-img');
    closeresetimg.addEventListener('click', resetimg);
    closeresetimg.addEventListener('click', () => {
        closeresetimg.style.display = 'none';
    });
    


async function closeimg () {
    const imagePreview = document.getElementById("imagePreview");
    

    if (imagePreview.src) {
        closeresetimg.style.display = 'block';
    }
    else if (imagePreview.src === '') {
        closeresetimg.style.display = 'none';
    }
    

}


//open second modal

const secondModal = document.getElementById("second-modal");

function openSecondModal() {
    secondModal.style.display = null;
    secondModal.removeAttribute('aria-hidden');
    secondModal.setAttribute('aria-modal', 'true');
    modal.style.display = "none";

    
    
    document.body.addEventListener('click', closeSecondModalOnClickOutside);
}

//close second modal

function closeSecondModal() {
    secondModal.style.display = "none";
    secondModal.setAttribute('aria-hidden', 'true');
    secondModal.removeAttribute('aria-modal');
    modal.style.display = "none";
    document.body.removeEventListener('click', closeSecondModalOnClickOutside);
    resetimg();
    
}

function closeSecondModalOnClickOutside(event) {
    if (event.target === secondModal) {
        closeSecondModal();
        resetimg();
    }
}

const ajouterModalButton = document.querySelector('.js-ajouter-modal');
ajouterModalButton.addEventListener('click', openSecondModal);

const closeSecondModalButton = document.querySelector(".js-modal-close");

closeSecondModalButton.addEventListener("click", function (e) {
    e.preventDefault();
    closeSecondModal();
    resetimg();
});

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openmodal);
});

let backmodal = document.querySelector('.js-first-modal-close')

function backtomodal() {

    resetimg();
    closeSecondModal();
    modal.style.display = null
}
backmodal.addEventListener('click', backtomodal)

//DELETEEEEEEE  


async function updateGallerymodal(items) {
    const gallerymodal = document.querySelector(".gallery-modal");
    gallerymodal.innerHTML = '';

    items.forEach(async (work) => {
        const containerModal = document.createElement("div");

        const img = document.createElement("img");
        img.src = work.imageUrl;

        // Code ci-dessus pour ajouter la galerie dans la modal

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash";

        deleteIcon.addEventListener("click", async function (event) {
            event.preventDefault(); 
            deleteimg(work,items,containerModal);

            
        });

        containerModal.appendChild(img);
        containerModal.appendChild(deleteIcon);

        gallerymodal.appendChild(containerModal);
    });
}

async function deleteimg(work,items,containerModal) {
   
    try {
        // Supprimez l'objet en utilisant l'API
        const id = work.id;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: headers,
        });

        if (response.ok) {
            // Suppression côté serveur réussie, supprimez également côté client
            const index = items.indexOf(work);
            if (index > -1) {
                items.splice(index, 1);
                
                containerModal.remove();

                // Supprimez l'élément correspondant dans la galerie principale
                const gallery = document.querySelector(".gallery");

                const imageToDelete = gallery.querySelector(`img[src="${work.imageUrl}"]`);

                if (imageToDelete) {

                    imageToDelete.parentElement.remove();
                }
            }
        } else {
            console.error("La suppression a échoué.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }



}





     








// Note
//  asynch dans tout les function api
//  charge de son coté et ne bloque pas l'application, affiche le resultat apres le chargement en arriere plans



// -gerer le retour  ok
// -test en dessous
// -masquer mdp OK
// -faire le delete OK
// -ajouter a closemodal reset imageinput ok a peut pret 
// -form ne valide pas si form non rempli OK
// -losque admin connecter barre top noir edition ok 
// -redimenssioné image image input ok 
// -faire en sorte que c refresh pas la page au Submit (juste fermer la modal) bug
// -reset image preview bug
// note


const form = document.getElementById("formphoto");




async function addphoto(event,items,work,containerModal) {
    event.preventDefault();
    

    // Récupérer les éléments du formulaire
    const imageInput = document.getElementById("imageInput");
    const title = document.getElementById("title");
    const categorySelect = document.getElementById("category");
    const category = categorySelect.value;
    
    // Obtenir le token d'authentification depuis le localStorage
    const token = localStorage.getItem("token");

    // Vérifier si le token est présent
    if (!token) {
        console.error("Token d'authentification non trouvé. Veuillez vous connecter.");
        return;
    }

    const maxFileSize = 4 * 1024 * 1024; 
    const selectedFile = imageInput.files[0];

    if (selectedFile && selectedFile.size > maxFileSize) {
        console.error("Le fichier sélectionné dépasse la taille maximale autorisée (4 Mo).");
        alert("Le fichier sélectionné dépasse la taille maximale autorisée (4 Mo).");
        return;
    }
    const formData = new FormData(form);
    // formData.append("image", imageInput.files[0]);
    // formData.append("title", title.value);
    // formData.append("category", category);

    formData.set("image", imageInput.files[0]);
    formData.set("title", title.value);
    formData.set("category", category);

    for (const value of formData.values()) {
        console.log(value);
      }
   
    const headers = {
        Authorization: `Bearer ${token}`,
    };
     console.log(formData)
    try {
        
        const response = await fetch('http://localhost:5678/api/works', {
            method: "POST",
            body: formData,
            headers: headers,
            
        });
        
       
       
        console.log(response)
        // Vérifier la réponse (virer le if else,)
        if (response.ok) {
            console.log("Données envoyées avec succès !");
        
            fetchData();
            const newWork = await response.json();
        
          
            const newWorkElement = document.createElement('div');
            newWorkElement.id = `element-${api.id}`;
            const newWorkElementModal = document.createElement('div');

            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fa fa-trash";
            

            
// Ajouter l'événement de suppression au bouton
deleteIcon.addEventListener("click", async function (event) {
    event.preventDefault();
   

    try {
        // Supprimez l'objet en utilisant l'API
        const id = work.id;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: headers,
        });

        if (response.ok) {
            // Suppression côté serveur réussie, supprimez également côté client
            const index = items.indexOf(work);
            if (index > -1) {
                items.splice(index, 1);
                
                containerModal.remove();

                // Supprimez l'élément correspondant dans la galerie principale
                const gallery = document.querySelector(".gallery");

                const imageToDelete = gallery.querySelector(`img[src="${work.imageUrl}"]`);

                if (imageToDelete) {

                    imageToDelete.parentElement.remove();
                }
            }
        } else {
            console.error("La suppression a échoué.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }


    console.log('supp elements')
});

              
            const newWorkImage = document.createElement('img');
            newWorkImage.src = newWork.imageUrl;
            
        
            const newWorkTitle = document.createElement('p');
            newWorkTitle.textContent = ` ${newWork.title}`;

            newWorkElement.appendChild(newWorkImage);
            newWorkElement.appendChild(newWorkTitle);
        
            

           

            const liveUpdates = document.querySelector('.gallery');
            liveUpdates.appendChild(newWorkElement);
            
            
            const newWorkImageForLiveUpdates = newWorkImage.cloneNode(true);
            newWorkElementModal.appendChild(newWorkImageForLiveUpdates)
            newWorkElementModal.appendChild(deleteIcon);

            const liveUpdatesModal = document.querySelector('.gallery-modal');
            liveUpdatesModal.appendChild(newWorkElementModal);
            
           
       
            

            closeSecondModal();
        }
         else {
            console.error("Erreur lors de l'envoi. Statut de réponse :", response.status);
            const responseData = await response.json();
            console.error("Message d'erreur du serveur :", responseData.error);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);
    }
}

form.addEventListener("submit", addphoto);




// test ici try catch et aussi if else 
// try {
        
//      await fetch('http://localhost:5678/api/works', {
//         method: "POST",
//         body: formData,
//         headers: headers,
        
//     });
  
//     console.log(response)
//     console.log("Données envoyées avec succès !");
        
    
// } catch (error) {
  
//         console.error("Erreur lors de l'envoi des données. Statut de réponse :", response.status);
//         const responseData = await response.json();
//         console.error("Message d'erreur du serveur :", responseData.error);
    
//     console.error("Erreur lors de l'envoi des données :", error);
// }






// parenthese au dessus !!!!!!!!!!!!





