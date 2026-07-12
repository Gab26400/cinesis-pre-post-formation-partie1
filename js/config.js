/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : config.js
========================================================== */


const configuration = {


    urlGoogleSheet:

    "COLLER_ICI_URL_SCRIPT_GOOGLE",



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