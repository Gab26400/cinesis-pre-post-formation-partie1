/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : export.js

   Export simple des réponses au format CSV
========================================================== */


function exporterReponsesCSV(reponses){


    let lignes = [];


    lignes.push(
        "Champ;Réponse"
    );



    Object.keys(reponses).forEach(cle=>{


        lignes.push(

            `${cle};${reponses[cle]}`

        );


    });



    const contenu =
    lignes.join("\n");



    const fichier =
    new Blob(

        [contenu],

        {
            type:"text/csv;charset=utf-8;"
        }

    );



    const lien =
    document.createElement("a");



    lien.href =
    URL.createObjectURL(fichier);



    lien.download =
    "reponses_questionnaire_pre_post.csv";



    lien.click();


}