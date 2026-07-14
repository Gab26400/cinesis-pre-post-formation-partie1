/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : config.js
========================================================== */


const configuration = {


    urlGoogleSheet:

    "https://script.google.com/macros/s/AKfycbxtjV961pKej69Adr6OQBbxjpMTkZB3eAQ-I_OseTvDVX-GSSAjzUmaNKqNT0eNZVlz/exec",



    session:{


        formation:"",

        date:"",

        lieu:"",

        type:"pre"


    }


};





function chargerSession(){


    const parametres =
    new URLSearchParams(window.location.search);



    configuration.session.formation =
    parametres.get("formation") || "";



    configuration.session.date =
    parametres.get("date") || "";



    configuration.session.lieu =
    parametres.get("lieu") || "";



    configuration.session.type =
    parametres.get("type") || "pre";



}



chargerSession();