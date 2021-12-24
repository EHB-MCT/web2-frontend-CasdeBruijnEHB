/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiCall.js":
/*!************************!*\
  !*** ./src/apiCall.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authenticateUser\": () => (/* binding */ authenticateUser),\n/* harmony export */   \"createPlaylistForUser\": () => (/* binding */ createPlaylistForUser),\n/* harmony export */   \"requestUserAuth\": () => (/* binding */ requestUserAuth)\n/* harmony export */ });\n//For spotify API call\r\n\r\n\r\n\r\n\r\nfunction authenticateUser(redirectlocation) {\r\n    //let href = window.location.href;\r\n    //let pos = href.indexOf('/', 7);\r\n    //let beginhref = href.substring(0, pos + 1);\r\n    let beginhref = \"https://ehb-mct.github.io/web2-frontend-CasdeBruijnEHB/\"\r\n    if (redirectlocation == 'spotifyLibrary') {\r\n        console.log(\"Naar library page\");\r\n        redirect_url_afterlogin = `${beginhref}playlistLibrary.html`;\r\n\r\n    } else {\r\n        console.log(\"Naar generator page\")\r\n        redirect_url_afterlogin = `${beginhref}playlistGenerator.html`;\r\n\r\n    }\r\n    getToken()\r\n    requestUserAuth();\r\n\r\n}\r\n/*\r\nexport function generateID() {\r\n    console.log(\"Get userID\")\r\n    getReturnAccessToken(window.location.hash);\r\n    userID(parametersArray[0]);\r\n}\r\n\r\n*/\r\n\r\nfunction createPlaylistForUser(playlistData) {\r\n    console.log(\"Click create\")\r\n    getReturnAccessToken(window.location.hash);\r\n    createPlaylist(token, getUserID, parametersArray[0], playlistData);\r\n}\r\n\r\nlet redirect_url_afterlogin = \"http://127.0.0.1:5501/playlistGenerator.html\";\r\nconst scopes = [\"playlist-modify-public\", \"playlist-modify-private\", \"user-read-private\", \"user-read-email\", \"ugc-image-upload\"]; //Scopes met get Current user data (ID)\r\nconst spotify_authorize_endpoint = \"https://accounts.spotify.com/authorize\";\r\nconst space_delimiter = \"%20\";\r\nconst scopes_url_parm = scopes.join(space_delimiter);\r\n\r\n\r\n//APP Spotify\r\n//General declaraties\r\nconst clientId = '3b5e1281fd2a4f4a85feb85c9326513a';\r\nconst clientSecret = '9e9b58417cdf4969a3f4e7885765f7f9';\r\nlet token = \"\";\r\nlet getUserID = \"\";\r\n\r\ngetToken()\r\nasync function getToken() {\r\n    const result = await fetch('https://accounts.spotify.com/api/token', {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)\r\n        },\r\n        body: 'grant_type=client_credentials'\r\n    });\r\n    const data = await result.json();\r\n    token = data.access_token;\r\n}\r\n\r\n\r\n//========================================================================\r\n//AUTHENTICATION USER\r\n//========================================================================\r\n\r\n\r\n\r\nfunction requestUserAuth() {\r\n    let url = `${spotify_authorize_endpoint}?client_id=${clientId}&redirect_uri=${redirect_url_afterlogin}&scope=${scopes_url_parm}&response_type=token&show_dialog=true`;\r\n    window.location.replace(url);\r\n    console.log(\"click login\");\r\n\r\n\r\n\r\n    if (window.location.hash) {\r\n        getReturnAccessToken(window.location.hash);\r\n    }\r\n\r\n}\r\n\r\nlet parametersArray = [];\r\nasync function getReturnAccessToken(url) {\r\n    console.log(\"Return access\");\r\n    const stringNaHashtag = url.substring(1);\r\n    const paramatersURL = stringNaHashtag.split('&');\r\n    for (let i = 0; i < paramatersURL.length; i++) {\r\n        let parasplit = paramatersURL[i].split(\"=\");\r\n        //Eerst splitten op basis van de \"=\" teken.\r\n        //Daarna ENKEL de waarden in de array zetten.\r\n        //In deze volgorde; eerst access_token, daarna token_type, daarna expires_in\r\n        parametersArray.push(parasplit[1]);\r\n    }\r\n    getUser(parametersArray[0])\r\n}\r\n\r\n\r\n//========================================================================\r\n//Following & liking playlists, adding tracks & covers\r\n//========================================================================\r\n\r\nasync function getUser(accesstoken) {\r\n    console.log(\"DATA\");\r\n    const result2 = await fetch(`https://api.spotify.com/v1/me`, {\r\n        method: 'GET',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accesstoken\r\n        }\r\n    });\r\n    const data2 = await result2.json();\r\n    getUserID = data2.id;\r\n    console.log(\"USER DATA\", data2.id);\r\n\r\n}\r\n\r\nasync function createPlaylist(token, userID, accessToken, playlistData) {\r\n    console.log(\"Create playlist, data:\", playlistData.description)\r\n    //Create playlist\r\n    const result = await fetch(`https://api.spotify.com/v1/users/${getUserID}/playlists`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'accept': 'application/json',\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: JSON.stringify({\r\n            \"name\": playlistData.title,\r\n            \"description\": playlistData.description,\r\n            \"public\": true\r\n        })\r\n    });\r\n    const data = await result.json();\r\n    let playlistId = data.id;\r\n    console.log(\"Create\", data);\r\n\r\n    //Get playlistItems\r\n    getPlaylistItems(accessToken, userID, playlistData, playlistId);\r\n\r\n\r\n\r\n    //Add cover - Werkt nog niet\r\n    addCover(accessToken, playlistId, userID, playlistData);\r\n}\r\nasync function getPlaylistItems(accesstoken, userID, playlistData, idNewPlaylist) {\r\n    //here we need to get the tracks out of the spotify playlists, to add them to the newly created playlists\r\n    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistData.playlistID}/tracks`, {\r\n        method: 'GET',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accesstoken\r\n        }\r\n    });\r\n    const data2 = await result2.json();\r\n    console.log(\"Playlist items, id first track\", data2.items[1].track.id);\r\n    let arrayTrackIds = [];\r\n    data2.items.forEach((element, index) => {\r\n        arrayTrackIds.push('spotify:track:' + element.track.id);\r\n    })\r\n    console.log(arrayTrackIds);\r\n\r\n    //Add tracks\r\n    addTracks(accesstoken, idNewPlaylist, userID, arrayTrackIds);\r\n\r\n}\r\n\r\nasync function addCover(accessToken, playlistId, userID, playlistData) {\r\n    const result2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {\r\n        method: 'PUT',\r\n        headers: {\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: playlistData.imageurl\r\n\r\n    });\r\n}\r\n\r\n\r\nasync function addTracks(accessToken, playlistId, userID, trackData) {\r\n    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'accept': 'application/json',\r\n            'Content-Type': 'application/json',\r\n            'Authorization': 'Bearer ' + accessToken\r\n        },\r\n        body: JSON.stringify({\r\n            \"uris\": trackData\r\n        })\r\n    });\r\n    const data = await result.json();\r\n    console.log(\"Create\", data);\r\n}\n\n//# sourceURL=webpack://web2-frontend-casdebruijnehb/./src/apiCall.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://web2-frontend-casdebruijnehb/./src/index.js?");

/***/ }),

/***/ "./src/playlistLibrary.js":
/*!********************************!*\
  !*** ./src/playlistLibrary.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _apiCall_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiCall.js */ \"./src/apiCall.js\");\n\r\n\r\n\r\nlet containerLibrary = document.getElementById(\"playlistPictures\");\r\n\r\n\r\nfunction init() {\r\n    if (window.location.hash) {\r\n        //Already authenticated\r\n        getPlaylists();\r\n    } else {\r\n        //Not yet authenticated\r\n        _apiCall_js__WEBPACK_IMPORTED_MODULE_1__.authenticateUser('spotifyLibrary');\r\n    }\r\n\r\n\r\n}\r\ninit();\r\nlet playlistDataCurated;\r\nasync function getPlaylists() {\r\n    console.log(\"fetch\")\r\n    await fetch('https://courseprojectwebii.herokuapp.com/getCuratedPlaylists').then(response => {\r\n        return response.json();\r\n    }).then(data => {\r\n        playlistDataCurated = data;\r\n        addCuratedPlaylists(data)\r\n    })\r\n\r\n\r\n}\r\n\r\nfunction addCuratedPlaylists(playlists) {\r\n    let html = \"\";\r\n\r\n    playlists.forEach((element, index) => {\r\n\r\n        html += `\r\n            <img id=\"${element._id}\" class=\"playlistImage\" src=\"data:image/jpeg;base64,${element.imageurl}\"\r\n            alt=\"Cover ${element.title}\">\r\n            `\r\n    })\r\n    containerLibrary.innerHTML = html;\r\n    let buttons = document.getElementsByClassName(\"playlistImage\");\r\n    addButtonEvents(buttons);\r\n}\r\n\r\nfunction addButtonEvents(buttons) {\r\n    for (let i = 0; i < buttons.length; i++) {\r\n        buttons[i].addEventListener(\"click\", (e) => {\r\n            console.log(e.target.id)\r\n            showPlaylistResult(e.target.id);\r\n        })\r\n    }\r\n}\r\n\r\nfunction showPlaylistResult(clickELementID) {\r\n    console.log(\"initial data curated: \", playlistDataCurated);\r\n    console.log(\"click data: \", clickELementID);\r\n    //This is a function to get an element out of an array, based on the chosen ID.\r\n    let chosenPlaylist = playlistDataCurated.find(x => x._id === clickELementID);\r\n    console.log(\"value\", chosenPlaylist)\r\n\r\n    //Code to show the result in the HTML\r\n    //De library catalogus op onzichtbaar zetten\r\n    let libraryContent = document.getElementById(\"libraryContent\");\r\n    libraryContent.style.display = \"none\";\r\n\r\n\r\n\r\n    //De resultaatpage zichtbaar\r\n    let resultContent = document.getElementById(\"container_playlist_result\");\r\n    let html = `\r\n     <div id=\"container_playlist_cooking\">\r\n     <img id=\"playlistResultImages\" src=\"data:image/jpeg;base64,${chosenPlaylist.imageurl}\" alt=\"\">\r\n     <div id=\"textContentPlaylistResult\">\r\n         <h2 id=\"librarySubtitle\">${chosenPlaylist.title}</h2>\r\n         <p id=\"curatedBy\">${chosenPlaylist.description}</p>\r\n     </div>\r\n </div>\r\n <div id=\"playlist_results_links\">\r\n     <ul id=\"playlistLinksList\">\r\n         <li id=\"openSpotifyButton\" class=\"playlistLinks\">Save on Spotify</li>\r\n         <li id=\"goBackButton\" class=\"playlistLinks\">Go back</li>\r\n     </ul>\r\n </div>\r\n     `\r\n    resultContent.innerHTML = html;\r\n    resultContent.style.display = \"block\";\r\n\r\n    let openSpotifyButton = document.getElementById(\"openSpotifyButton\");\r\n    openSpotifyButton.addEventListener(\"click\", function () {\r\n        if (openSpotifyButton.innerHTML == \"Playlist saved!\") {\r\n            alert(\"The playlist was already saved!\")\r\n        } else {\r\n            openSpotifyButton.classList.remove(\"playlistLinks\");\r\n            openSpotifyButton.innerHTML = \"Playlist saved!\"\r\n            callSpotifyAPI(chosenPlaylist)\r\n        }\r\n    })\r\n\r\n    let goBackButton = document.getElementById(\"goBackButton\");\r\n    goBackButton.addEventListener(\"click\", function () {\r\n        console.log(\"click\");\r\n        restorePage(resultContent);\r\n    })\r\n}\r\n\r\nfunction callSpotifyAPI(chosenPlaylist) {\r\n    console.log(\"Calling API...\")\r\n    _apiCall_js__WEBPACK_IMPORTED_MODULE_1__.createPlaylistForUser(chosenPlaylist);\r\n}\r\n\r\nfunction restorePage(containerResult) {\r\n    let libraryContent = document.getElementById(\"libraryContent\");\r\n    libraryContent.style.display = \"block\";\r\n    containerResult.innerHTML = \"\";\r\n    containerResult.style.display = \"none\";\r\n}\n\n//# sourceURL=webpack://web2-frontend-casdebruijnehb/./src/playlistLibrary.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/playlistLibrary.js");
/******/ 	
/******/ })()
;