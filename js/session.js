/* ==========================================================
   CINESIS FORMS
   Questionnaire Pré / Post Formation
   Fichier : session.js
========================================================== */


document.addEventListener("DOMContentLoaded", () => {


    const bouton =
    document.getElementById("sessionButton");



    if(!bouton) return;



    const parametres =
    new URLSearchParams(window.location.search);



    const lienSessionExiste =

    parametres.has("formation")
    &&
    parametres.has("type");



    if(lienSessionExiste){


        bouton.style.display = "none";


        return;


    }



    bouton.addEventListener(
        "click",
        afficherCreationSession
    );


});







function afficherCreationSession(){


    const card =
    document.querySelector(".card");



    card.innerHTML = `


    <h2>Créer une session</h2>


    <p class="question-description">

    Ces informations seront ajoutées aux réponses des stagiaires.

    </p>



    <input id="formation"
    class="text-input"
    placeholder="Nom de la formation">



    <input id="dateFormation"
    class="text-input"
    placeholder="Date de la session">



    <input id="lieuFormation"
    class="text-input"
    placeholder="Lieu">



    <select id="typeQuestionnaire"
    class="text-input">

        <option value="pre">
            Pré-formation
        </option>

        <option value="post">
            Post-formation
        </option>

    </select>



    <button id="genererLien">

        Générer le lien

    </button>



    <textarea id="lienSession"
    class="text-input"
    rows="4"
    readonly
    style="display:none;margin-top:20px">
    </textarea>



    <button id="copierLien"
    style="display:none;margin-top:15px">

        Copier le lien

    </button>



    <div id="qrcode"
    style="margin-top:25px;text-align:center;display:none">

    </div>


    `;



    document
    .getElementById("genererLien")
    .onclick =
    genererLien;


}







function genererLien(){


    const url =
    new URL(window.location.href);



    url.searchParams.set(
        "formation",
        document
        .getElementById("formation")
        .value
        .trim()
    );



    url.searchParams.set(
        "date",
        document
        .getElementById("dateFormation")
        .value
        .trim()
    );



    url.searchParams.set(
        "lieu",
        document
        .getElementById("lieuFormation")
        .value
        .trim()
    );



    url.searchParams.set(
        "type",
        document
        .getElementById("typeQuestionnaire")
        .value
    );



    const zoneLien =
    document.getElementById("lienSession");



    zoneLien.style.display="block";

    zoneLien.value =
    url.toString();



    const boutonCopie =
    document.getElementById("copierLien");



    boutonCopie.style.display="block";



    const zoneQR =
    document.getElementById("qrcode");



    zoneQR.style.display="block";

    zoneQR.innerHTML="";



    new QRCode(zoneQR, {

        text:url.toString(),

        width:200,

        height:200

    });



    boutonCopie.onclick=()=>{


        navigator.clipboard.writeText(
            zoneLien.value
        );


        boutonCopie.textContent =
        "Lien copié ✓";


    };


}