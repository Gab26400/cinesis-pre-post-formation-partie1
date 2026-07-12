/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : app.js
========================================================== */


let etape = 0;

let reponses = {};

let questions = [];



document.addEventListener("DOMContentLoaded", () => {


    questions = questionnaire.questions;


    document
    .getElementById("startButton")
    ?.addEventListener(
        "click",
        lancerQuestionnaire
    );


});





function lancerQuestionnaire(){


    const card =
    document.querySelector(".card");


    card.classList.add("fade-out");


    setTimeout(()=>{


        afficherInformations();


    },300);


}







function afficherInformations(){


    const card =
    document.querySelector(".card");



    card.classList.remove("fade-out");



    card.innerHTML = `


    <div class="progress">

        <div class="progress-bar"
        style="width:10%">
        </div>

    </div>



    <div class="question-counter">

        Informations personnelles

    </div>



    <h2>Vos informations</h2>



    <input

    id="nom"

    class="text-input"

    placeholder="Nom"

    >



    <input

    id="prenom"

    class="text-input"

    placeholder="Prénom"

    >



    <input

    id="profession"

    class="text-input"

    placeholder="Profession"

    >



    <button id="nextButton">

        Continuer

    </button>


    `;



    document
    .getElementById("nextButton")
    .onclick=()=>{


        reponses.nom =
        document
        .getElementById("nom")
        .value
        .trim();



        reponses.prenom =
        document
        .getElementById("prenom")
        .value
        .trim();



        reponses.profession =
        document
        .getElementById("profession")
        .value
        .trim();



        afficherQuestion();


    };


}







function afficherQuestion(){


    if(etape >= questions.length){


        afficherFin();


        return;


    }



    const question =
    questions[etape];



    const card =
    document.querySelector(".card");



    let html = `


    <div class="progress">

        <div class="progress-bar"

        style="width:${((etape+2)/(questions.length+2))*100}%">

        </div>

    </div>



    <div class="question-counter">

        Question ${etape+1} / ${questions.length}

    </div>



    <h2>

        ${question.titre}

    </h2>



    <p class="question-description">

        ${question.description || ""}

    </p>


    `;



    if(question.type==="choix"){


        html += `


        <div class="choix">


        <div class="carte-reponse"

        data-value="Réponse A">

        <strong>A</strong>

        ${question.reponseA}

        </div>



        <div class="carte-reponse"

        data-value="Réponse B">

        <strong>B</strong>

        ${question.reponseB}

        </div>



        <div class="carte-reponse"

        data-value="Réponse C">

        <strong>C</strong>

        ${question.reponseC}

        </div>


        </div>



        <button id="previousButton">

            Précédent

        </button>



        <button id="nextButton" disabled>

            Continuer

        </button>


        `;


    }



    if(question.type==="texte"){


        html += `


        <textarea

        id="textAnswer"

        class="text-input">

        </textarea>



        <button id="previousButton">

            Précédent

        </button>



        <button id="nextButton">

            Continuer

        </button>


        `;


    }



    card.innerHTML = html;



    document
    .getElementById("previousButton")
    ?.addEventListener(
        "click",
        ()=>{


            if(etape>0){

                etape--;

                afficherQuestion();

            }


        }
    );



    if(question.type==="choix"){


        activerChoix(question);


    }



    if(question.type==="texte"){


        document
        .getElementById("nextButton")
        .onclick=()=>{


            reponses[question.id] =

            document
            .getElementById("textAnswer")
            .value;



            etape++;

            afficherQuestion();


        };


    }



}







function activerChoix(question){


    const cartes =
    document.querySelectorAll(".carte-reponse");


    const bouton =
    document.getElementById("nextButton");



    cartes.forEach(carte=>{


        carte.onclick=()=>{


            cartes.forEach(c=>{

                c.classList.remove("selection");

            });



            carte.classList.add("selection");



            reponses[question.id] =
            carte.dataset.value;



            bouton.disabled=false;


        };


    });



    bouton.onclick=()=>{


        etape++;


        afficherQuestion();


    };


}







function afficherFin(){


    envoyerReponses();



    const card =
    document.querySelector(".card");



    card.innerHTML = `


    <h2>

    Merci pour votre participation

    </h2>



    <p class="question-description">

    Vos réponses ont bien été enregistrées.

    </p>


    `;


}

function envoyerReponses(){


    const donnees = {


        formation:
        configuration.session.formation,


        date:
        configuration.session.date,


        lieu:
        configuration.session.lieu,


        type:
        configuration.session.type,


        nom:
        reponses.nom || "",


        prenom:
        reponses.prenom || "",


        profession:
        reponses.profession || ""

    };



    Object.keys(reponses).forEach(cle=>{


        if(
            cle !== "nom" &&
            cle !== "prenom" &&
            cle !== "profession"
        ){

            donnees["q"+cle] =
            reponses[cle];

        }


    });



    fetch(configuration.urlGoogleSheet, {


        method:"POST",


        body:JSON.stringify(donnees)


    })

    .then(()=>{


        console.log(
            "Réponses envoyées"
        );


    })


    .catch(erreur=>{


        console.log(
            "Erreur envoi :",
            erreur
        );


    });


}