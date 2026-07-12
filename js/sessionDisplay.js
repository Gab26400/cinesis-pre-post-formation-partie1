/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : sessionDisplay.js
========================================================== */


document.addEventListener("DOMContentLoaded", () => {


    const parametres =
    new URLSearchParams(window.location.search);



    const formation =
    parametres.get("formation");



    const date =
    parametres.get("date");



    const lieu =
    parametres.get("lieu");



    const type =
    parametres.get("type") || "pre";



    const titre =
    document.getElementById("titreQuestionnaire");



    if(titre){


        if(type==="post"){


            titre.textContent =
            "Questionnaire post-formation";


        }
        else{


            titre.textContent =
            "Questionnaire pré-formation";


        }


    }



    if(!formation) return;



    const blocsFormation =
    document.querySelectorAll(".formation span");



    if(blocsFormation.length >= 2){


        blocsFormation[0].textContent =
        decodeURIComponent(formation);



        let sessionTexte =
        decodeURIComponent(date || "");



        if(lieu){


            sessionTexte +=
            " - " + decodeURIComponent(lieu);


        }



        blocsFormation[1].textContent =
        sessionTexte;


    }


});