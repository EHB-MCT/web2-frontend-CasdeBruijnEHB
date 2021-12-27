//For spotify API call
"use strict";



export function authenticateUser(redirectlocation) {
    //let href = window.location.href;
    //let pos = href.indexOf('/', 7);
    //let beginhref = href.substring(0, pos + 1);
    let beginhref = "https://ehb-mct.github.io/web2-frontend-CasdeBruijnEHB/"
    if (redirectlocation == 'spotifyLibrary') {

        redirect_url_afterlogin = `${beginhref}playlistLibrary.html`;

    } else {

        redirect_url_afterlogin = `${beginhref}playlistGenerator.html`;

    }
    getToken()
    requestUserAuth();

}


export function createPlaylistForUser(playlistData) {

    getReturnAccessToken(window.location.hash);
    createPlaylist(token, parametersArray[0], playlistData);
}

let redirect_url_afterlogin = "http://127.0.0.1:5501/playlistGenerator.html";
const scopes = ["playlist-modify-public", "playlist-modify-private", "user-read-private", "user-read-email", "ugc-image-upload"]; //Scopes met get Current user data (ID)
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const space_delimiter = "%20";
const scopes_url_parm = scopes.join(space_delimiter);


//APP Spotify
//General declaraties
const clientId = '3b5e1281fd2a4f4a85feb85c9326513a';
const clientSecret = '9e9b58417cdf4969a3f4e7885765f7f9';
let token = "";
let getUserID = "";

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
    token = data.access_token;
}


//========================================================================
//AUTHENTICATION USER
//========================================================================


export function requestUserAuth() {
    let url = `${spotify_authorize_endpoint}?client_id=${clientId}&redirect_uri=${redirect_url_afterlogin}&scope=${scopes_url_parm}&response_type=token&show_dialog=true`;
    window.location.replace(url);





    if (window.location.hash) {
        getReturnAccessToken(window.location.hash);
    }

}

let parametersArray = [];
async function getReturnAccessToken(url) {

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
export async function getUserId() {
    console.log("Loaded")
    if (window.location.hash) {
        await getUser(parametersArray[0]);
    }

}

async function getUser(accesstoken) {

    const result2 = await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
        }
    });
    const data2 = await result2.json();
    getUserID = data2.id;


}

async function createPlaylist(token, accessToken, playlistData) {
    //Create playlist
    await getUserId();
    const result = await fetch(`https://api.spotify.com/v1/users/${getUserID}/playlists`, {
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



    //Get playlistItems
    getPlaylistItems(accessToken, playlistData, playlistId);



    //Add cover - Werkt nog niet
    addCover(accessToken, playlistId, playlistData);
}
async function getPlaylistItems(accesstoken, playlistData, idNewPlaylist) {
    //here we need to get the tracks out of the spotify playlists, to add them to the newly created playlists
    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.playlistID}/tracks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
        }
    });
    const data2 = await result2.json();
    let arrayTrackIds = [];
    data2.items.forEach((element, index) => {
        arrayTrackIds.push('spotify:track:' + element.track.id);
    })


    //Add tracks
    addTracks(accesstoken, idNewPlaylist, arrayTrackIds);

}

async function addCover(accessToken, playlistId, playlistData) {
    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: playlistData.imageurl

    });
}


async function addTracks(accessToken, playlistId, trackData) {
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

}