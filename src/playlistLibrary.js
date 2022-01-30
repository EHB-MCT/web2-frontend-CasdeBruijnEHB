import * as api from './index.js';
import * as spotifyApi from './apiCall.js'

let containerLibrary = document.getElementById("playlistPictures");


function init() {




    if (window.location.hash) {
        //Already authenticated
        getPlaylists();
    } else {
        //Not yet authenticated
        spotifyApi.authenticateUser('spotifyLibrary');
    }


}
init();
let playlistDataCurated;
async function getPlaylists() {
    await fetch('https://courseprojectwebii.herokuapp.com/getCuratedPlaylists').then(response => {
        return response.json();
    }).then(data => {
        playlistDataCurated = data;
        addCuratedPlaylists(data)
    })


}

function addCuratedPlaylists(playlists) {
    let html = "";

    playlists.forEach((element, index) => {

        html += `
            <img id="${element._id}" class="playlistImage" src="data:image/jpeg;base64,${element.imageurl}"
            alt="Cover ${element.title}">
            `
    })
    containerLibrary.innerHTML = html;
    let buttons = document.getElementsByClassName("playlistImage");
    addButtonEvents(buttons);
}

function addButtonEvents(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
            showPlaylistResult(e.target.id);
        })
    }
}

function showPlaylistResult(clickELementID) {

    //This is a function to get an element out of an array, based on the chosen ID.
    let chosenPlaylist = playlistDataCurated.find(x => x._id === clickELementID);

    //Code to show the result in the HTML
    //De library catalogus op onzichtbaar zetten
    let libraryContent = document.getElementById("libraryContent");
    libraryContent.style.display = "none";



    //De resultaatpage zichtbaar
    let resultContent = document.getElementById("container_playlist_result");
    let html = `
     <div id="container_playlist_cooking">
     <img id="playlistResultImages" src="data:image/jpeg;base64,${chosenPlaylist.imageurl}" alt="">
     <div id="textContentPlaylistResult">
         <h2 id="librarySubtitle">${chosenPlaylist.title}</h2>
         <p id="curatedBy">${chosenPlaylist.description}</p>
     </div>
 </div>
 <div id="playlist_results_links">
     <ul id="playlistLinksList">
         <li id="openSpotifyButton" class="playlistLinks">Save on Spotify</li>
         <li id="goBackButton" class="playlistLinks">Go back</li>
     </ul>
 </div>
     `
    resultContent.innerHTML = html;
    resultContent.style.display = "block";

    let openSpotifyButton = document.getElementById("openSpotifyButton");
    openSpotifyButton.addEventListener("click", function () {
        if (openSpotifyButton.innerHTML == "Playlist saved!") {
            alert("The playlist was already saved!")
        } else {
            openSpotifyButton.classList.remove("playlistLinks");
            openSpotifyButton.innerHTML = "Playlist saved!"
            //Turn on if you want to actually call API again
            //callSpotifyAPI(chosenPlaylist)
            console.log(chosenPlaylist);
            window.open(`http://open.spotify.com/user/spotify/playlist/${chosenPlaylist.playlistID}`);
        }
    })

    let goBackButton = document.getElementById("goBackButton");
    goBackButton.addEventListener("click", function () {

        restorePage(resultContent);
    })
}

function callSpotifyAPI(chosenPlaylist) {
    spotifyApi.createPlaylistForUser(chosenPlaylist);
}

function restorePage(containerResult) {
    let libraryContent = document.getElementById("libraryContent");
    libraryContent.style.display = "block";
    containerResult.innerHTML = "";
    containerResult.style.display = "none";
}