//For spotify API call
"use strict";

//EXTRA Authorization Spotify variabelen

export function authenticateUser(redirectlocation) {
    if (redirectlocation == 'spotifyLibrary') {
        console.log("Naar library page");
        redirect_url_afterlogin = "http://127.0.0.1:5501/playlistLibrary.html";

    } else {
        console.log("Naar generator page")
        redirect_url_afterlogin = "http://127.0.0.1:5501/playlistGenerator.html";

    }
    getToken()
    requestUserAuth();
}
export function createPlaylistForUser(playlistData) {
    console.log("Click create")
    getReturnAccessToken(window.location.hash);
    createPlaylist(token, userId, parametersArray[0], playlistData);
}

let redirect_url_afterlogin = "http://127.0.0.1:5501/playlistGenerator.html";
//const scopes = ["playlist-modify-public", "playlist-modify-private"]; //playlist-modify-public voor follow a playlist
const scopes = ["playlist-modify-public", "playlist-modify-private", "user-read-private", "user-read-email", "ugc-image-upload"]; //Scopes met get Current user data (ID)
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const space_delimiter = "%20";
const scopes_url_parm = scopes.join(space_delimiter);


//APP Spotify
//General declaraties
const clientId = '3b5e1281fd2a4f4a85feb85c9326513a';
const clientSecret = '9e9b58417cdf4969a3f4e7885765f7f9';
let token = "";
let userId = "119096959"; //Test user ID, van mij (Cas)
let playlistIdFollow = "37i9dQZF1DX1kfybUJZB6S";

let createdPlaylistID;




getToken()
async function getToken() {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    //console.log("data", data);
    token = data.access_token;
}


//========================================================================
//AUTHENTICATION USER
//========================================================================
export function requestUserAuth(requestType) {
    //Er wordt een request type meegegeven voor te weten welke functie dan moet worden opgeroepen
    //Kan voor te volgen (FollowPlaylist), voor te maken zijn (createPlaylist)
    let url = `${spotify_authorize_endpoint}?client_id=${clientId}&redirect_uri=${redirect_url_afterlogin}&scope=${scopes_url_parm}&response_type=token&show_dialog=true`;
    window.location.replace(url);
    console.log("click login");



    if (window.location.hash) {
        getReturnAccessToken(window.location.hash);
    }

}

let parametersArray = [];
async function getReturnAccessToken(url) {
    console.log("Return access");
    const stringNaHashtag = url.substring(1);
    const paramatersURL = stringNaHashtag.split('&');
    for (let i = 0; i < paramatersURL.length; i++) {
        let parasplit = paramatersURL[i].split("=");
        //Eerst splitten op basis van de "=" teken.
        //Daarna ENKEL de waarden in de array zetten.
        //In deze volgorde; eerst access_token, daarna token_type, daarna expires_in
        parametersArray.push(parasplit[1]);
    }
}


//========================================================================
//Following & liking playlists, adding tracks & covers
//========================================================================
async function followPlaylist(token, playlistID, accesstoken) {
    console.log("Click follow!", accesstoken);

    //Like playlist
    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/followers`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
        }
    });
    //rare error? 
    const data2 = await result2.json();
    console.log("Follow playlist", data2);
}


//VOOR PLAYLIST TOE TE VOEGEN. EERST PROBEREN GEWOON TE VOLGEN

async function createPlaylist(token, userID, accessToken, playlistData) {

    console.log("Create playlist, data:", playlistData)
    //Create playlist
    const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "name": playlistData.title,
            "description": playlistData.description,
            "public": true
        })
    });
    const data = await result.json();
    let playlistId = data.id;
    //this.createdPlaylistID = data.id;
    console.log("Create", data);

    //Get playlistItems
    getPlaylistItems(accessToken, userID, playlistData, playlistId);



    //Add cover - Werkt nog niet
    addCover(accessToken, playlistId, userID, playlistData);
}
async function getPlaylistItems(accesstoken, userID, playlistData, idNewPlaylist) {
    //here we need to get the tracks out of the spotify playlists, to add them to the newly created playlists
    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.playlistID}/tracks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
        }
    });
    const data2 = await result2.json();
    console.log("Playlist items, id first track", data2.items[1].track.id);
    let arrayTrackIds = [];
    data2.items.forEach((element, index) => {
        arrayTrackIds.push('spotify:track:' + element.track.id);
    })
    console.log(arrayTrackIds);

    //Add tracks
    addTracks(accesstoken, idNewPlaylist, userID, arrayTrackIds);

}

async function addCover(accessToken, playlistId, userID, playlistData) {
    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: playlistData.imageurl

    });
    const data2 = await result2.json();
    console.log("FOto", data2);
}


async function addTracks(accessToken, playlistId, userID, trackData) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "uris": trackData
        })
    });
    const data = await result.json();
    console.log("Create", data);
}