import * as loaderAnimation from './loader.js'
let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let calculateScore;
let progressBarCircles = document.getElementsByClassName("progressItems");

//This variable is used to save the urls of the chosen images. In order to prohibit duplicates
let chosenImagesUrls = [];

const playlistGenerator = {
    category_images: [{
        imageUrl: "./Images/Generator/CategoryPictures/One2.png",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/CategoryPictures/Three.png",
        mainCategory: "orangeYellowPink"
    }, {
        imageUrl: "./Images/Generator/CategoryPictures/Four.png",
        mainCategory: "purpleBlackRed"
    }],
    playlist_brownCreamGreenBlue: [{
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Funky.png",
        score: "1",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Pharrel.png",
        score: "3",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Skate.png",
        score: "3",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/VHS.png",
        score: "5",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Vintage.png",
        score: "2",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Brug.png",
        score: "8",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/brownCreamGreenBlue/Lights.png",
        score: "13",
        mainCategory: "brownCreamGreenBlue"
    }],
    playlist_orangeYellowPink: [{
            imageUrl: "./Images/Generator/OrangeYellowPink/Drinking.png",
            score: "1",
            mainCategory: "orangeYellowPink"
        }, {
            imageUrl: "./Images/Generator/OrangeYellowPink/Oranges.png",
            score: "3",
            mainCategory: "orangeYellowPink"
        },
        {
            imageUrl: "./Images/Generator/OrangeYellowPink/Heart.png",
            score: "8",
            mainCategory: "orangeYellowPink"
        }, {
            imageUrl: "./Images/Generator/OrangeYellowPink/Kersen.png",
            score: "7",
            mainCategory: "orangeYellowPink"
        }
    ],
    playlist_purpleBlackRed: [{
        imageUrl: "./Images/Generator/PurpleBlackRed/CD.png",
        score: "7",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Distorted.png",
        score: "5",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Distorter.png",
        score: "10",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Futuristic.png",
        score: "4",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Space.png",
        score: "8",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Motor.png",
        score: "2",
        mainCategory: "purpleBlackRed"
    }, {
        imageUrl: "./Images/Generator/PurpleBlackRed/Stronger.png",
        score: "1",
        mainCategory: "purpleBlackRed"
    }],
    initiateGenerator() {
        //De generator wordt hier aangezet, allereerst beginnen we met een foto die ze in een bepaalde categorie zal plaatsen.
        //Eerst wordt er een random foto genomen.
        let randomIndexOne = Math.floor(Math.random() * playlistGenerator.category_images.length)
        let randomIndexTwo = Math.floor(Math.random() * playlistGenerator.category_images.length)

        while (randomIndexOne == randomIndexTwo) {
            randomIndexTwo = Math.floor(Math.random() * playlistGenerator.category_images.length)
        }

        containerImages.innerHTML = `
        <img class="generatorImages" id="${playlistGenerator.category_images[randomIndexOne].mainCategory}" src=${playlistGenerator.category_images[randomIndexOne].imageUrl} alt="Image one">
        <img class="generatorImages" id="${playlistGenerator.category_images[randomIndexTwo].mainCategory}" src=${playlistGenerator.category_images[randomIndexTwo].imageUrl} alt="Image Two">
        `;

        //Link een button & actie aan elke foto.
        generatorImageButtons();
    },
    updateHTML(maincategory) {

        let randomIndexOne;
        let randomIndexTwo;
        let html;

        //Hier worden de URLS van de images uit de juiste category in een array geplaatst.
        //Ze worden er in geplaatst zodat er op een makkelijke manier duplicaten verwijderd kunnen worden.
        if (chosenImagesUrls.length <= 1) {
            chosenImagesUrls = [];
            for (let i = 0; i < playlistGenerator[`playlist_${maincategory}`].length; i++) {
                chosenImagesUrls.push(playlistGenerator[`playlist_${maincategory}`][i].imageUrl);
            }
        }


        //Random images worden gekozen
        randomIndexOne = Math.floor(Math.random() * chosenImagesUrls.length);
        randomIndexTwo = Math.floor(Math.random() * chosenImagesUrls.length);
        //Checken of het dezelfde zouden zijn
        while (randomIndexOne == randomIndexTwo) {
            randomIndexTwo = Math.floor(Math.random() * chosenImagesUrls.length)
        }

        html = `
        <img class="generatorImages" id="${maincategory}" src="${chosenImagesUrls[randomIndexOne]}" alt="Image one">
        <img class="generatorImages" id="${maincategory}" src="${chosenImagesUrls[randomIndexTwo]}" alt="Image Two">`;

        //Nu moeten de foto urls uit de array verwijderd worden.
        //eerste kan gewoon met splice maar daarna worden de indexes veranderd dus moet er een -1 of +1 bijkomen.
        chosenImagesUrls.splice(randomIndexOne, 1)
        if (randomIndexOne < randomIndexTwo) {
            chosenImagesUrls.splice(randomIndexTwo - 1, 1)
        } else {
            chosenImagesUrls.splice(randomIndexTwo + 1, 1)
        }
        //Loading animatie 
        loaderAnimation.generatorAnimation();
        //Toevoegen HTML en functies toewijzen aan de images
        containerImages.innerHTML = html;
        generatorImageButtons(randomIndexOne, randomIndexTwo);
    }
}

init();

function init() {
    //Deze variabelen wordt gebruikt voor de eerstvolgende progressbar circle te kiezen & opvullen.
    calculateScore = 0;
    progressBarClicks = 1;
    playlistGenerator.initiateGenerator();
}


function generatorImageButtons() {
    //Eerst de foto's ophalen en gebruiken als knop. Hier wordt functie aan vastgebonden bij klik event.
    let imageButtons = document.getElementsByClassName("generatorImages");
    for (let i = 0; i < imageButtons.length; i++) {
        imageButtons[i].addEventListener("click", function (e) {
            //Progressbar circeltjes aanpassen op klik event.
            if (progressBarClicks < 3) {
                progressBarCircles[progressBarClicks].classList.add("active");
                progressBarClicks++;

                //Functie aangeroepen die de playlist score berekend.
                generateScore(e.target);
                //calculateScore+= playlistGenerator[`playlist_${e.target.id}`][randomIndexOne].score
                playlistGenerator.updateHTML(e.target.id);
            } else if (progressBarClicks >= 3) {
                //Wanneer de progressbar vol is = de quiz afgelopen en mag het resultaat weergeven worden.
                generateScore(e.target);
                fillResultPage();
            }
        })
    }
}

function generateScore(elementID) {
    playlistGenerator[`playlist_${elementID.id}`].forEach(element => {
        let urlTarget = elementID.src;
        urlTarget = urlTarget.substring(urlTarget.indexOf("Images") - 1);
        let newUrl = "." + urlTarget;
        if (newUrl === element.imageUrl) {
            console.log("YEP", element.imageUrl)
            console.log("YEP", element.score)
            calculateScore += parseInt(element.score);
        }
    });
}

function fillResultPage(score, category) {
    console.log("Fill result");
    console.log("totaal:", calculateScore)
}