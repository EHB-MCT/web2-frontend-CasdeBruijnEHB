import * as loaderAnimation from './loader.js'
let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let progressBarCircles = document.getElementsByClassName("progressItems");

function init() {
    //Deze variabelen wordt gebruikt voor de eerstvolgende progressbar circle te kiezen & opvullen.
    progressBarClicks = 1;
    containerImages.innerHTML = `
    <img class="generatorImages" src="./Images/Generator_p1/One2.png" alt="Image one">
    <img class="generatorImages" src="./Images/Generator_p1/Two2.png" alt="Image Two">
    `;

    generatorImages();
}
init();

function generatorImages() {
    //Eerst de foto's ophalen en gebruiken als knop. Hier wordt functie aan vastgebonden bij klik event.
    let imageButtons = document.getElementsByClassName("generatorImages");
    for (let i = 0; i < imageButtons.length; i++) {
        imageButtons[i].addEventListener("click", function (e) {
            //Progressbar circeltjes aanpassen op klik event.
            if (progressBarClicks < 3) {
                progressBarCircles[progressBarClicks].classList.add("active");
                progressBarClicks++;
                playlistGenerator.updateHTML();
            }
        })
    }
}

const playlistGenerator = {
    playlist_brownCream: [{
        imageUrl: "./Images/Generator/BrownCream/Funky.png",
        score: "",
        category: "brownCream"
    }, {
        imageUrl: "./Images/Generator/BrownCream/Pharrel.png",
        score: "",
        category: "brownCream"
    }, {
        imageUrl: "./Images/Generator/BrownCream/Skate.png",
        score: "",
        category: "brownCream"
    }, {
        imageUrl: "./Images/Generator/BrownCream/VHS.png",
        score: "",
        category: "brownCream"
    }, {
        imageUrl: "./Images/Generator/BrownCream/Vintage.png",
        score: "",
        category: "brownCream"
    }],
    playlist_greenBlue: [{
        imageUrl: "./Images/Generator/GreenBlue/Brug.png",
        score: "",
        category: "GreenBlue"
    }, {
        imageUrl: "./Images/Generator/GreenBlue/Lights.png",
        score: "",
        category: "GreenBlue"
    }],
    playlist_orangeYellow: [{
        imageUrl: "./Images/Generator/OrangeYellow/Drinking.png",
        score: "",
        category: "OrangeYellow"
    }, {
        imageUrl: "./Images/Generator/OrangeYellow/Oranges.png",
        score: "",
        category: "OrangeYellow"
    }],
    playlist_pinkRed: [{
        imageUrl: "./Images/Generator/PinkRed/Heart.png",
        score: "",
        category: "PinkRed"
    }, {
        imageUrl: "./Images/Generator/PinkRed/Kersen.png",
        score: "",
        category: "PinkRed"
    }, {
        imageUrl: "./Images/Generator/PinkRed/Motor.png",
        score: "",
        category: "PinkRed"
    }, {
        imageUrl: "./Images/Generator/PinkRed/Stronger.png",
        score: "",
        category: "PinkRed"
    }],
    playlist_purpleBlack: [{
        imageUrl: "./Images/Generator/PurpleBlack/CD.png",
        score: "",
        category: "PurpleBlack"
    }, {
        imageUrl: "./Images/Generator/PurpleBlack/Distorted.png",
        score: "",
        category: "PurpleBlack"
    }, {
        imageUrl: "./Images/Generator/PurpleBlack/Distorter.png",
        score: "",
        category: "PurpleBlack"
    }, {
        imageUrl: "./Images/Generator/PurpleBlack/Futuristic.png",
        score: "",
        category: "PurpleBlack"
    }, {
        imageUrl: "./Images/Generator/PurpleBlack/Space.png",
        score: "",
        category: "PurpleBlack"
    }],
    updateHTML() {

        let html = `
        <img class="generatorImages" src="${playlistGenerator.playlist_brownCream[0].imageUrl}" alt="Image one">
        <img class="generatorImages" src="${playlistGenerator.playlist_brownCream[1].imageUrl}" alt="Image Two">`;
        loaderAnimation.generatorAnimation();

        containerImages.innerHTML = html;


    }
}