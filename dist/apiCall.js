/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiCall.js":
/*!************************!*\
  !*** ./src/apiCall.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authenticateUser\": () => (/* binding */ authenticateUser),\n/* harmony export */   \"createPlaylistForUser\": () => (/* binding */ createPlaylistForUser),\n/* harmony export */   \"requestUserAuth\": () => (/* binding */ requestUserAuth)\n/* harmony export */ });\n//For spotify API call\r\n\r\n\r\n//EXTRA Authorization Spotify variabelen\r\n\r\nfunction authenticateUser(redirectlocation) {\r\n    //let href = window.location.href;\r\n    //let pos = href.indexOf('/', 7);\r\n    //let beginhref = href.substring(0, pos + 1);\r\n    let beginhref = \"https://ehb-mct.github.io/web2-frontend-CasdeBruijnEHB/\"\r\n    if (redirectlocation == 'spotifyLibrary') {\r\n        console.log(\"Naar library page\");\r\n        redirect_url_afterlogin = `${beginhref}dist/playlistLibrary.html`;\r\n\r\n    } else {\r\n        console.log(\"Naar generator page\")\r\n        redirect_url_afterlogin = `${beginhref}dist/playlistGenerator.html`;\r\n\r\n    }\r\n    getToken()\r\n    requestUserAuth();\r\n}\r\nfunction createPlaylistForUser(playlistData) {\r\n    console.log(\"Click create\")\r\n    getReturnAccessToken(window.location.hash);\r\n    createPlaylist(token, userId, parametersArray[0], playlistData);\r\n}\r\n\r\nlet redirect_url_afterlogin = \"http://127.0.0.1:5501/playlistGenerator.html\";\r\n//const scopes = [\"playlist-modify-public\", \"playlist-modify-private\"]; //playlist-modify-public voor follow a playlist\r\nconst scopes = [\"playlist-modify-public\", \"playlist-modify-private\", \"user-read-private\", \"user-read-email\", \"ugc-image-upload\"]; //Scopes met get Current user data (ID)\r\nconst spotify_authorize_endpoint = \"https://accounts.spotify.com/authorize\";\r\nconst space_delimiter = \"%20\";\r\nconst scopes_url_parm = scopes.join(space_delimiter);\r\n\r\n\r\n//APP Spotify\r\n//General declaraties\r\nconst clientId = '3b5e1281fd2a4f4a85feb85c9326513a';\r\nconst clientSecret = '9e9b58417cdf4969a3f4e7885765f7f9';\r\nlet token = \"\";\r\nlet userId = \"119096959\"; //Test user ID, van mij (Cas)\r\nlet playlistIdFollow = \"37i9dQZF1DX1kfybUJZB6S\";\r\n\r\nlet createdPlaylistID;\r\n\r\n\r\n\r\n\r\ngetToken()\r\nasync function getToken() {\r\n    const result = await fetch('https://accounts.spotify.com/api/token', {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)\r\n        },\r\n        body: 'grant_type=client_credentials'\r\n    });\r\n    const data = await result.json();\r\n    //console.log(\"data\", data);\r\n    token = data.access_token;\r\n}\r\n\r\n\r\n//========================================================================\r\n//AUTHENTICATION USER\r\n//========================================================================\r\nfunction requestUserAuth(requestType) {\r\n    //Er wordt een request type meegegeven voor te weten welke functie dan moet worden opgeroepen\r\n    //Kan voor te volgen (FollowPlaylist), voor te maken zijn (createPlaylist)\r\n    let url = `${spotify_authorize_endpoint}?client_id=${clientId}&redirect_uri=${redirect_url_afterlogin}&scope=${scopes_url_parm}&response_type=token&show_dialog=true`;\r\n    window.location.replace(url);\r\n    console.log(\"click login\");\r\n\r\n\r\n\r\n    if (window.location.hash) {\r\n        getReturnAccessToken(window.location.hash);\r\n    }\r\n\r\n}\r\n\r\nlet parametersArray = [];\r\nasync function getReturnAccessToken(url) {\r\n    console.log(\"Return access\");\r\n    const stringNaHashtag = url.substring(1);\r\n    const paramatersURL = stringNaHashtag.split('&');\r\n    for (let i = 0; i < paramatersURL.length; i++) {\r\n        let parasplit = paramatersURL[i].split(\"=\");\r\n        //Eerst splitten op basis van de \"=\" teken.\r\n        //Daarna ENKEL de waarden in de array zetten.\r\n        //In deze volgorde; eerst access_token, daarna token_type, daarna expires_in\r\n        parametersArray.push(parasplit[1]);\r\n    }\r\n}\r\n\r\n\r\n//========================================================================\r\n//Following & liking playlists, adding tracks & covers\r\n//========================================================================\r\nasync function followPlaylist(token, playlistID, accesstoken) {\r\n    console.log(\"Click follow!\", accesstoken);\r\n\r\n    //Like playlist\r\n    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/followers`, {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Accept': 'application/json',\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accesstoken\r\n        }\r\n    });\r\n    //rare error? \r\n    const data2 = await result2.json();\r\n    console.log(\"Follow playlist\", data2);\r\n}\r\n\r\n\r\n//VOOR PLAYLIST TOE TE VOEGEN. EERST PROBEREN GEWOON TE VOLGEN\r\n\r\nasync function createPlaylist(token, userID, accessToken, playlistData) {\r\n\r\n    console.log(\"Create playlist, data:\", playlistData.description)\r\n    //Create playlist\r\n    const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'accept': 'application/json',\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: JSON.stringify({\r\n            \"name\": playlistData.title,\r\n            \"description\": playlistData.description,\r\n            \"public\": true\r\n        })\r\n    });\r\n    const data = await result.json();\r\n    let playlistId = data.id;\r\n    //this.createdPlaylistID = data.id;\r\n    console.log(\"Create\", data);\r\n\r\n    //Get playlistItems\r\n    getPlaylistItems(accessToken, userID, playlistData, playlistId);\r\n\r\n\r\n\r\n    //Add cover - Werkt nog niet\r\n    addCover(accessToken, playlistId, userID, playlistData);\r\n}\r\nasync function getPlaylistItems(accesstoken, userID, playlistData, idNewPlaylist) {\r\n    //here we need to get the tracks out of the spotify playlists, to add them to the newly created playlists\r\n    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.playlistID}/tracks`, {\r\n        method: 'GET',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accesstoken\r\n        }\r\n    });\r\n    const data2 = await result2.json();\r\n    console.log(\"Playlist items, id first track\", data2.items[1].track.id);\r\n    let arrayTrackIds = [];\r\n    data2.items.forEach((element, index) => {\r\n        arrayTrackIds.push('spotify:track:' + element.track.id);\r\n    })\r\n    console.log(arrayTrackIds);\r\n\r\n    //Add tracks\r\n    addTracks(accesstoken, idNewPlaylist, userID, arrayTrackIds);\r\n\r\n}\r\n\r\nasync function addCover(accessToken, playlistId, userID, playlistData) {\r\n    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: playlistData.imageurl\r\n\r\n    });\r\n    // const data2 = await result2.json();\r\n    //console.log(\"FOto\", data2);\r\n}\r\n\r\n\r\nasync function addTracks(accessToken, playlistId, userID, trackData) {\r\n    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'accept': 'application/json',\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: JSON.stringify({\r\n            \"uris\": trackData\r\n        })\r\n    });\r\n    const data = await result.json();\r\n    console.log(\"Create\", data);\r\n}\n\n//# sourceURL=webpack://web2-frontend-casdebruijnehb/./src/apiCall.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/apiCall.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;