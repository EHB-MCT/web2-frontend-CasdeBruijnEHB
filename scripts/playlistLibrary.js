import * as api from './index.js';

let containerLibrary = document.getElementById("playlistPictures");

/*
let pageElements = [];
let followPlaylistButtons = [];
export const playlist = {
    playlistLibrary: [{
        id: "cooking",
        title: "Cooking",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Jorja Smith, Kanye west and more.",
        image: "./Images/PlaylistLibrary/CDCuratedCooking.png",
        link: "./librarypage_cooking.html"
    }, {
        id: "dancing",
        title: "Dancing",
        curated: "Curated by Cas d. B.",
        description: "Features artists like The Rolling Stones, Mac Miller and more.",
        image: "./Images/PlaylistLibrary/CDCuratedDancingV1_VersieKleiner.png",
        link: ""
    }, {
        id: "driving",
        title: "Driving",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Ariana Grande, Elton John and more.",
        image: "./Images/PlaylistLibrary/CDCuratedDriving.png",
        link: ""
    }, {
        id: "laundry",
        title: "Laundry",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Kid Cudi, Mac Demarco and more.",
        image: "./Images/PlaylistLibrary/CDCuratedLaundry.png",
        link: ""
    }, {
        id: "reading",
        title: "Reading",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Drake, The Beatles and more.",
        image: "./Images/PlaylistLibrary/CDCuratedReadingV1_VersieKleiner.png",
        link: ""
    }, {
        id: "romantic",
        title: "Romantic Night",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Prince, Daniel Ceasar and more.",
        image: "./Images/PlaylistLibrary/CDCuratedRomantic.png",
        link: ""
    }, {
        id: "running",
        title: "Running",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Travis Scott, Al Green and more.",
        image: "./Images/PlaylistLibrary/CDCuratedRunning.png",
        link: ""
    }, {
        id: "workingout",
        title: "Working Out",
        curated: "Curated by Cas d. B.",
        description: "Features artists like Future, Young Thug and more.",
        image: "./Images/PlaylistLibrary/CDCuratedWorkingOut.png",
        link: ""
    }],
    fillHTML() {
        let html = "";

        this.playlistLibrary.forEach((element, index) => {
            html += `
            <img id="playlist_${element.id}" class="playlistImage" src="${element.image}"
            alt="Cover ${element.title}">
            `
        })
        containerLibrary.innerHTML = html;
        pageElements = document.getElementsByClassName("playlistImage");


    },
    clickEvent() {
        //Een eventlistener toevoegen aan de foto's die ze redirect naar de desbetreffende content
        //console.log("elements", pageElements);
        for (let i = 0; i < pageElements.length; i++) {
            pageElements[i].addEventListener("click", (e) => {
                //console.log("item", e.target.id);
                this.fillResultPage(e.target.id);
                //window.location.replace(`./library_${e.target.id}.html`);

            })
        }
    },
    fillResultPage(id) {
        //De library catalogus op onzichtbaar zetten
        let libraryContent = document.getElementById("libraryContent");
        //console.log(libraryContent)
        libraryContent.style.display = "none";

        //Eerst gaan we zoeken naar een match met het geselecteerde ID en in de library.
        //console.log("id: ", id);
        let indexLibraryPage;
        this.playlistLibrary.forEach((element, index) => {
            //console.log(element.id);
            if (id === `playlist_${element.id}`) {
                //console.log("Match!", element);
                //console.log("index", index);
                indexLibraryPage = index;
            }
        })

        //De resultaatpage zichtbaar
        let resultContent = document.getElementById("container_playlist_result");
        let html = `
        <div id="container_playlist_cooking">
        <img id="playlistResultImages" src="${this.playlistLibrary[indexLibraryPage].image}" alt="">
        <div id="textContentPlaylistResult">
            <h2 id="librarySubtitle">${this.playlistLibrary[indexLibraryPage].title}</h2>
            <p id="curatedBy">${this.playlistLibrary[indexLibraryPage].curated}</p>
            <p id="playlistDescription">${this.playlistLibrary[indexLibraryPage].description}</p>
        </div>
    </div>
    <div id="playlist_results_links">
        <ul id="playlistLinksList">
            <li id="openSpotifyButton" class="playlistLinks">Open in Spotify </li>
            <li id="goBackButton" class="playlistLinks"><a href="./playlistLibrary.html">Go back</a></li>
        </ul>
    </div>
        `

        resultContent.innerHTML = html;
        resultContent.style.display = "block";
        this.followPlaylistClick();
    },
    followPlaylistClick() {
        //Hier wordt de follow button ingelikt bij de Library. 
        //Vervolgens moet er een authenticatie worden opengedaan waar de user moet inloggen. Daarna kan het opgeslagen worden!
        followPlaylistButtons = document.getElementsByClassName("playlistLinks");
        console.log("Brrr", followPlaylistButtons);

        for (let i = 0; i < followPlaylistButtons.length; i++) {
            followPlaylistButtons[i].addEventListener("click", (e) => {
                console.log("YEP");
                api.curatedPlaylistFollow();
            })
        }
    },
    savedResultpage() {
        //De library catalogus op onzichtbaar zetten
        let libraryContent = document.getElementById("libraryContent");
        //console.log(libraryContent)
        libraryContent.style.display = "none";

        //Eerst gaan we zoeken naar een match met het geselecteerde ID en in de library.
        //console.log("id: ", id);
        let indexLibraryPage;
        this.playlistLibrary.forEach((element, index) => {
            //console.log(element.id);
            if (id === `playlist_${element.id}`) {
                //console.log("Match!", element);
                //console.log("index", index);
                indexLibraryPage = index;
            }
        })

        //De resultaatpage zichtbaar
        let resultContent = document.getElementById("container_playlist_result");
        let html = `
         <div id="container_playlist_cooking">
         <img id="playlistResultImages" src="${this.playlistLibrary[indexLibraryPage].image}" alt="">
         <div id="textContentPlaylistResult">
             <h2 id="librarySubtitle">${this.playlistLibrary[indexLibraryPage].title}</h2>
             <p id="curatedBy">${this.playlistLibrary[indexLibraryPage].curated}</p>
             <p id="playlistDescription">${this.playlistLibrary[indexLibraryPage].description}</p>
         </div>
     </div>
     <div id="playlist_results_links">
         <ul id="playlistLinksList">
             <li id="openSpotifyButton" class="playlistLinks">Saved!</li>
             <li id="goBackButton" class="playlistLinks"><a href="./playlistLibrary.html">Go back</a></li>
         </ul>
     </div>
         `

        resultContent.innerHTML = html;
        resultContent.style.display = "block";

    }
}

*/


function init() {

    getPlaylists();


}
init();
let playlistDataCurated;
async function getPlaylists() {
    console.log("fetch")
    await fetch('https://courseprojectwebii.herokuapp.com/getCuratedPlaylists').then(response => {
        return response.json();
    }).then(data => {
        //challengesList = data;
        //console.log("Fetch this: ", data);
        playlistDataCurated = data;
        addCuratedPlaylists(data)
    })

    await fetch('https://courseprojectwebii.herokuapp.com/getGeneratedPlaylists').then(response => {
        return response.json();
    }).then(data => {
        //challengesList = data;
        //console.log("Fetch this: ", data);
    })



}

function addCuratedPlaylists(playlists) {
    //console.log("add", playlists)
    let html = "";

    playlists.forEach((element, index) => {
        //console.log(element);

        html += `
            <img id="${element._id}" class="playlistImage" src="data:image/jpeg;base64,${element.image}"
            alt="Cover ${element.title}">
            `
    })
    containerLibrary.innerHTML = html;
    pageElements = document.getElementsByClassName("playlistImage");
    let buttons = document.getElementsByClassName("playlistImage");
    addButtonEvents(buttons);
}

function addButtonEvents(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
            console.log(e.target.id)
            showPlaylistResult(e.target.id);
        })
    }
}

function showPlaylistResult(clickELementID) {
    console.log("initial data curated: ", playlistDataCurated);
    console.log("click data: ", clickELementID);
    //https://www.codegrepper.com/code-examples/javascript/javascript+get+array+object+by+id
    //This is a function to get an element out of an array, based on the chosen ID.
    let chosenPlaylist = playlistDataCurated.find(x => x._id === clickELementID);
    console.log("value", chosenPlaylist)

    //Code to show the result in the HTML
    //De library catalogus op onzichtbaar zetten
    let libraryContent = document.getElementById("libraryContent");
    //console.log(libraryContent)
    libraryContent.style.display = "none";



    //De resultaatpage zichtbaar
    let resultContent = document.getElementById("container_playlist_result");
    let html = `
     <div id="container_playlist_cooking">
     <img id="playlistResultImages" src="data:image/jpeg;base64,${chosenPlaylist.image}" alt="">
     <div id="textContentPlaylistResult">
         <h2 id="librarySubtitle">${chosenPlaylist.title}</h2>
         <p id="curatedBy">${chosenPlaylist.description}</p>
         <p id="playlistDescription">${chosenPlaylist.description}</p>
     </div>
 </div>
 <div id="playlist_results_links">
     <ul id="playlistLinksList">
         <li id="openSpotifyButton" class="playlistLinks">Save playlist</li>
         <li id="goBackButton" class="playlistLinks"><a href="./playlistLibrary.html">Go back</a></li>
     </ul>
 </div>
     `
    resultContent.innerHTML = html;
    resultContent.style.display = "block";

}