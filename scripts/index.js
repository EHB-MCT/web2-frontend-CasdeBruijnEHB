"use strict";


//console.log("window hash", window.location.hash)


//Login button
document.getElementById("buttonOne").addEventListener("click", function () {
    console.log("click");
    requestUserAuth();

});

//Button to create playlist
document.getElementById("buttonAdd").addEventListener("click", function () {
    //console.log("click follow");
    if (window.location.hash) {
        getReturnAccessToken(window.location.hash);
        createPlaylist(token, userId, parametersArray[0]);
    } else {
        console.log('No hash');
    }
});

//button to follow playlist
document.getElementById("buttonFollowPlaylist").addEventListener("click", function () {

    if (window.location.hash) {
        getReturnAccessToken(window.location.hash);
        followPlaylist(token, playlistIdFollow, parametersArray[0]);
    }
});


//EXTRA Authorization Spotify variabelen
const redirect_url_afterlogin = "http://127.0.0.1:5501/index.html";
//const scopes = ["playlist-modify-public", "playlist-modify-private"]; //playlist-modify-public voor follow a playlist
const scopes = ["playlist-modify-public", "playlist-modify-private", "user-read-private", "user-read-email", "ugc-image-upload"]; //Scopes met get Current user data (ID)
const spotify_authorize_endpoint = "https://accounts.spotify.com/authorize";
const space_delimiter = "%20";
const scopes_url_parm = scopes.join(space_delimiter);

//Get return parameters van spotify (access token, bearer & )
//http://127.0.0.1:5501/indexNieuw.html#access_token=BQCyocn6Nqx8EWKVWWMVFt5xMX6TFobpOPxtlVlzGm1HPcQI28xlw4Hy4PexrA5H4D_JWbXbT7p3IBAq56bQMxlTeZDApaNfFFAVMG_JUIhz_P5lW1d4srzdZzXkTk01WTwnRhERM5L07Qz6nkcuFRc1v2660UG-bQaq_8wGwCJjRA&token_type=Bearer&expires_in=3600



//APP Spotify
//General declaraties
const clientId = '3b5e1281fd2a4f4a85feb85c9326513a';
const clientSecret = '9e9b58417cdf4969a3f4e7885765f7f9';
let token = "";
let playlistId = "37i9dQZF1DX1kfybUJZB6S"; //Random playlist, Top hits belgie
let userId = "119096959"; //Test user ID, van mij (Cas)
let playlistIdFollow = "37i9dQZF1DX1kfybUJZB6S";




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

    //Functie aanroepen voor genres
    getPlaylist(token, playlistId);

}
getToken();



async function getPlaylist(token, playlistID) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await result.json();
    console.log("Playlist", data);
}

//========================================================================
async function requestUserAuth() {
    let url = `${spotify_authorize_endpoint}?client_id=${clientId}&redirect_uri=${redirect_url_afterlogin}&scope=${scopes_url_parm}&response_type=token&show_dialog=true`;
    window.location.replace(url);
    console.log("click login");



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


//NEED USER AUTHENTICATION FOR THIS
async function followPlaylist(token, playlistID, accesstoken) {
    console.log("Click follow!", accesstoken);
    //Eerst user profile ophalen
    const result = await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accesstoken
        }
    });
    const data = await result.json();
    console.log("User data", data.id);


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

async function createPlaylist(token, userID, accessToken) {
    console.log("id", userID);
    console.log("accesstoken", accessToken);
    //Create playlist
    const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "name": "Stumble Library: Reading",
            "description": "A stumble playlist for reading. Curated by Cas d. B.",
            "public": false
        })
    });
    const data = await result.json();
    let playlistId = data.id;
    console.log("Create", data);

    //Add cover - Werkt nog niet
    //addCover(accessToken, playlistId, userID);

    //Add tracks
    addTracks(accessToken, playlistId, userID);

}

async function addCover(accessToken, playlistId, userID) {
    let im = new Image();
    im.src = ('CoverCurated/SpotifyCoverSize_jpg.jpg');
    let imagesource = im.src;
    console.log(im.src);

    document.getElementById("foto").innerHTML = `<img src="${im.src}" alt="">`;


    const result2 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/images`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'image/jpeg',
            'Authorization': 'Bearer ' + accessToken
        },
        body: imagesource
    });
    const data2 = await result2.json();
    //console.log("FOto", data2);
}

async function addTracks(accessToken, playlistId, userID) {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "uris": ["spotify:track:3aUviSdBVbsdmH406j5GZC", "spotify:track:1ux778Ljln0QEitz2fB4PH", "spotify:track:300DUx4tdtCdGEUXR032jA"]
        })
    });
    const data = await result.json();
    console.log("Create", data);


}