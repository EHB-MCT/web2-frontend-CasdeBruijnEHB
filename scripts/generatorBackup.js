import * as loaderAnimation from './loader.js'
let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let playlistScores = [];
let chosenPictureObject = [];
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
        console.log(maincategory)
        let randomIndexOne;
        let randomIndexTwo;
        let html;

        //Hier wordt de html upgedate naargelang de category van gekozen foto. 
        //Er zijn drie categorieën met foto's.
        //console.log(playlistScores);
        switch (maincategory) {
            case "brownCreamGreenBlue":
                //Eerst kijken of er al iets in de array zit (mag maar 1x toevoegen. Daarna de juiste urls toevoegen.)
                if (chosenImagesUrls.length <= 1) {
                    chosenImagesUrls = [];
                    for (let i = 0; i < playlistGenerator.playlist_brownCreamGreenBlue.length; i++) {
                        chosenImagesUrls.push(playlistGenerator.playlist_brownCreamGreenBlue[i].imageUrl);
                        //playlistScores.push(playlistGenerator.playlist_brownCreamGreenBlue[i].score)
                    }
                }
                break;
            case "orangeYellowPink":
                //Eerst kijken of er al iets in de array zit (mag maar 1x toevoegen. Daarna de juiste urls toevoegen.)
                if (chosenImagesUrls.length <= 1) {
                    chosenImagesUrls = [];
                    for (let i = 0; i < playlistGenerator.playlist_orangeYellowPink.length; i++) {
                        chosenImagesUrls.push(playlistGenerator.playlist_orangeYellowPink[i].imageUrl);
                        //playlistScores.push(playlistGenerator.playlist_orangeYellowPink[i].score)
                    }
                }
                break;
            case "purpleBlackRed":
                if (chosenImagesUrls.length <= 1) {
                    chosenImagesUrls = [];
                    for (let i = 0; i < playlistGenerator.playlist_purpleBlackRed.length; i++) {
                        chosenImagesUrls.push(playlistGenerator.playlist_purpleBlackRed[i].imageUrl);
                        //playlistScores.push(playlistGenerator.playlist_purpleBlackRed[i].score)

                    }
                }
                break;
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


        //Hier worden ze in een aparte array gestopt om de score te kunnen ophalen
        switch (maincategory) {
            case "brownCreamGreenBlue":
                chosenPictureObject.push(playlistGenerator.playlist_brownCreamGreenBlue[randomIndexOne]);
                chosenPictureObject.push(playlistGenerator.playlist_brownCreamGreenBlue[randomIndexTwo]);
                break;
            case "orangeYellowPink":
                chosenPictureObject.push(playlistGenerator.playlist_orangeYellowPink[randomIndexOne]);
                chosenPictureObject.push(playlistGenerator.playlist_orangeYellowPink[randomIndexTwo]);
                break;
            case "purpleBlackRed":
                chosenPictureObject.push(playlistGenerator.playlist_purpleBlackRed[randomIndexOne]);
                chosenPictureObject.push(playlistGenerator.playlist_purpleBlackRed[randomIndexTwo]);
                break;
        }


        //Nu moeten de foto urls uit de array verwijderd worden.
        //eerste kan gewoon met splice maar daarna worden de indexes veranderd dus moet er een -1 of +1 bijkomen.
        chosenImagesUrls.splice(randomIndexOne, 1)
        if (randomIndexOne < randomIndexTwo) {
            chosenImagesUrls.splice(randomIndexTwo - 1, 1)
        } else {
            chosenImagesUrls.splice(randomIndexTwo + 1, 1)
        }

        console.log("chosen objects ", chosenPictureObject)

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
    progressBarClicks = 1;
    console.log("Aantal categories", playlistGenerator.category_images);
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
                //console.log("Click button", playlistGenerator.category_images[i].mainCategory)
                //Bij de klik moet je de category meegeven van de desbetreffende foto, zodat de volgende ronde er op wordt afgestemd
                console.log(e.target.id)
                console.log("Tryout", playlistGenerator[`playlist_${e.target.id}`]);

                playlistGenerator.updateHTML(e.target.id);
            } else if (progressBarCircles > 3) {
                fillResultPage();
            }
            //Na klikken worden de gekozen objecten weer leeg gemaakt omdat er een nieuwe ronde is.
            chosenPictureObject = [];
        })
    }
}

function fillResultPage(score, category) {

}