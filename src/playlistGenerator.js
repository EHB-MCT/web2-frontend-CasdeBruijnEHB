import * as loaderAnimation from './loader.js'
import * as spotifyApi from './apiCall.js'
let containerImages = document.getElementById("GeneratorContainer");
let progressBarClicks;
let calculateScore;
let progressBarCircles = document.getElementsByClassName("progressItems");
let generatedPlaylistData;



//This variable is used to save the urls of the chosen images. In order to prohibit duplicates
let chosenImagesUrls = [];

const playlistGenerator = {
    category_images: [{
            imageUrl: "./Images/Generator/CategoryPictures/One.png",
            mainCategory: "purpleBlackRed"
        }, {
            imageUrl: "./Images/Generator/CategoryPictures/Two.png",
            mainCategory: "purpleBlackRed"
        }, {
            imageUrl: "./Images/Generator/CategoryPictures/Three.png",
            mainCategory: "orangeYellowPink"
        },
        {
            imageUrl: "./Images/Generator/CategoryPictures/Four.png",
            mainCategory: "orangeYellowPink"
        },
        {
            imageUrl: "./Images/Generator/CategoryPictures/Five.png",
            mainCategory: "brownCreamGreenBlue"
        }
    ],
    playlist_brownCreamGreenBlue: [{
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Funky.png",
        score: "1",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Pharrel.png",
        score: "3",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Skate.png",
        score: "3",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/VHS.png",
        score: "5",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Vintage.png",
        score: "2",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Brug.png",
        score: "8",
        mainCategory: "brownCreamGreenBlue"
    }, {
        imageUrl: "./Images/Generator/BrownCreamGreenBlue/Lights.png",
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
        //containerImages.onclick(spotifyApi.generateID())
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
    //Check if authentication is complete
    if (window.location.hash) {
        calculateScore = 0;
        progressBarClicks = 1;
        getPlaylists();
        playlistGenerator.initiateGenerator();
    } else {
        spotifyApi.authenticateUser('spotifyGenerator');
    }

}
async function getPlaylists() {
    await fetch('https://courseprojectwebii.herokuapp.com/getGeneratedPlaylists').then(response => {
        return response.json();
    }).then(data => {
        //challengesList = data;
        generatedPlaylistData = data;
    })
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
                fillResultPage(e.target.id);
            }
        })
    }
}

function generateScore(elementID) {
    playlistGenerator[`playlist_${elementID.id}`].forEach(element => {
        //Voor de juiste imagescore te pakken, wordt de url vergeleken met die in de arrays
        //Als ze een match vindt, wordt de score er van genomen
        //De website url is wel aangepast dus daarom moest er een substring worden toegevoegd.
        let urlTarget = elementID.src;
        urlTarget = urlTarget.substring(urlTarget.indexOf("Images") - 1);
        let newUrl = "." + urlTarget;
        if (newUrl === element.imageUrl) {

            calculateScore += parseInt(element.score);
        }
    });
}

function fillResultPage(category) {
    let chosenPlaylist = [];
    generatedPlaylistData.forEach((element, index) => {
        if (element.mainCategory === category.toLowerCase()) {
            chosenPlaylist.push(element);
        }
    })
    //Dan sorteren adhv de score van de playlists.
    chosenPlaylist.sort(function (a, b) {
        return a.score - b.score;
    });

    //Hier gaan we kijken of de score groter is dan de score van de playlist. Indien niet meer, die score en dus playlist gebruiken!
    let oneChosenPlaylist = chosenPlaylist.find(x => x.score >= calculateScore);



    let containerResult = document.getElementById("generatorPage");
    let titlepage = document.getElementById("titleGenerator");
    let html = `
    <div id="container_playlist_cooking">
    <img id="playlistResultImages" src="data:image/jpeg;base64,${oneChosenPlaylist.imageurl}" alt="">
    <div id="textContentPlaylistResult">
        <h2 id="librarySubtitle">${oneChosenPlaylist.title}</h2>
        <p id="curatedBy">${oneChosenPlaylist.description}</p>
    </div>
</div>
<div id="playlist_results_links">
    <ul id="playlistLinksList">
        <li id="openSpotifyButton" class="playlistLinks">Save on Spotify</li>
        <li id="goBackButton" class="playlistLinks"><a href="./introPageGenerator.html">Go back</a></li>
    </ul>
</div>
    `
    titlepage.innerHTML = "The playlist for you"
    containerResult.innerHTML = html;
    containerResult.style.display = "block";

    //add functions to open spotify button
    let spotifyOpenButtons = document.getElementById("openSpotifyButton");
    spotifyOpenButtons.addEventListener("click", function () {
        if (spotifyOpenButtons.innerHTML == "Playlist saved!") {
            alert("The playlist was already saved!")
        } else {
            spotifyOpenButtons.classList.remove("playlistLinks");
            spotifyOpenButtons.innerHTML = "Playlist saved!"
            callSpotifyAPI(oneChosenPlaylist);
        }
    })
}

function callSpotifyAPI(chosenPlaylist) {
    spotifyApi.createPlaylistForUser(chosenPlaylist);
}