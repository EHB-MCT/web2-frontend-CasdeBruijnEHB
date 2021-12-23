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

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loaderAnimation\": () => (/* binding */ loaderAnimation),\n/* harmony export */   \"generatorAnimation\": () => (/* binding */ generatorAnimation)\n/* harmony export */ });\nfunction loaderAnimation() {\r\n    window.addEventListener('load', (event) => {\r\n        console.log('page is fully loaded');\r\n        generatorAnimation();\r\n    });\r\n}\r\nloaderAnimation();\r\n\r\nfunction generatorAnimation() {\r\n    let wrapper = document.getElementById(\"loader-wrapper\");\r\n    let html = `\r\n    <span class = \"loader\" >\r\n    <span class = \"loader-inner\" >\r\n    </span> \r\n    </span>`;\r\n    wrapper.style.display = \"flex\";\r\n    wrapper.style.opacity = 1;\r\n    wrapper.innerHTML = html;\r\n    fadeEffect(wrapper);\r\n}\r\n\r\n\r\nfunction fadeEffect(wrapper) {\r\n    var fade = setInterval(function () {\r\n        if (!wrapper.style.opacity) {\r\n            wrapper.style.opacity = 1;\r\n        }\r\n        if (wrapper.style.opacity > 0) {\r\n            wrapper.style.opacity -= 0.1;\r\n        } else {\r\n            clearInterval(fade);\r\n        }\r\n    }, 200);\r\n\r\n\r\n    var fadeEffectTwee = setTimeout(function () {\r\n        wrapper.style.display = \"none\";\r\n    }, 300);\r\n}\n\n//# sourceURL=webpack://web2-frontend-casdebruijnehb/./src/loader.js?");

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
/******/ 	__webpack_modules__["./src/loader.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;