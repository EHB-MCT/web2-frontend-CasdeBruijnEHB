import * as loaderAnimation from './loader.js'
let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let progressBarCircles = document.getElementsByClassName("progressItems");

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
        switch (maincategory) {
            case "brownCreamGreenBlue":
                randomIndexOne = Math.floor(Math.random() * playlistGenerator.playlist_brownCreamGreenBlue.length);
                randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_brownCreamGreenBlue.length);

                while (randomIndexOne == randomIndexTwo) {
                    randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_brownCreamGreenBlue.length)
                }
                html = `
        <img class="generatorImages" id="${playlistGenerator.playlist_brownCreamGreenBlue[randomIndexOne].mainCategory}" src="${playlistGenerator.playlist_brownCreamGreenBlue[randomIndexOne].imageUrl}" alt="Image one">
        <img class="generatorImages" id="${playlistGenerator.playlist_brownCreamGreenBlue[randomIndexTwo].mainCategory}" src="${playlistGenerator.playlist_brownCreamGreenBlue[randomIndexTwo].imageUrl}" alt="Image Two">`;


                break;
            case "orangeYellowPink":
                randomIndexOne = Math.floor(Math.random() * playlistGenerator.playlist_orangeYellowPink.length);
                randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_orangeYellowPink.length);

                while (randomIndexOne == randomIndexTwo) {
                    randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_orangeYellowPink.length)
                }
                html = `
                <img class="generatorImages" id="${playlistGenerator.playlist_orangeYellowPink[randomIndexOne].mainCategory}" src="${playlistGenerator.playlist_orangeYellowPink[randomIndexOne].imageUrl}" alt="Image one">
                <img class="generatorImages" id="${playlistGenerator.playlist_orangeYellowPink[randomIndexTwo].mainCategory}" src="${playlistGenerator.playlist_orangeYellowPink[randomIndexTwo].imageUrl}" alt="Image Two">`;

                break;
            case "purpleBlackRed":
                randomIndexOne = Math.floor(Math.random() * playlistGenerator.playlist_purpleBlackRed.length);
                randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_purpleBlackRed.length);

                while (randomIndexOne == randomIndexTwo) {
                    randomIndexTwo = Math.floor(Math.random() * playlistGenerator.playlist_purpleBlackRed.length)
                }
                html = `
                <img class="generatorImages" id="${playlistGenerator.playlist_purpleBlackRed[randomIndexOne].mainCategory}" src="${playlistGenerator.playlist_purpleBlackRed[randomIndexOne].imageUrl}" alt="Image one">
                <img class="generatorImages" id="${playlistGenerator.playlist_purpleBlackRed[randomIndexTwo].mainCategory}" src="${playlistGenerator.playlist_purpleBlackRed[randomIndexTwo].imageUrl}" alt="Image Two">`;
                break;
        }
        //Loading animatie 
        loaderAnimation.generatorAnimation();

        containerImages.innerHTML = html;
        generatorImageButtons();


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
                playlistGenerator.updateHTML(e.target.id);
            }
        })
    }
}