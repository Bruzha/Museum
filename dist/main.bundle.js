/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './src/js/index.js':
      /*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        'use strict';
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _radio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radio.js */ "./src/js/radio.js");\n/* harmony import */ var _radio_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_radio_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar hello = __webpack_require__(/*! ./radio.js */ "./src/js/radio.js");\n\n//# sourceURL=webpack://my-project/./src/js/index.js?'
        );

        /***/
      },

    /***/ './src/js/radio.js':
      /*!*************************!*\
  !*** ./src/js/radio.js ***!
  \*************************/
      /***/ () => {
        eval(
          "console.log('Hello');\n/*var i = 4;\r\nvar i2 = 0;\r\nvar i3 = 1;\r\nvar i4 = 2;\r\nvar i5 = 3;\r\nvar src = new Array(\r\n  'https://www.youtube.com/embed/aWmJ5DgyWPI?si=H85tY1qiikp8xfTx',\r\n  'https://www.youtube.com/embed/Vi5D6FKhRmo?si=WhHSVVS17bNR0Rx9',\r\n  'https://www.youtube.com/embed/NOhDysLnTvY?si=5t7R4CF4vOVp_k1n',\r\n  'https://www.youtube.com/embed/T65C91rTjn0?si=N2SCaJZECn2RjIiI',\r\n  'https://www.youtube.com/embed/VVj-2Jdtl4o?si=2eQCWj_A3kqzbJEu'\r\n);\r\nvar color = new Array(\r\n  'background-color: rgba(51, 51, 51, 1);',\r\n  'background-color: rgba(153, 153, 153, 1);',\r\n  'background-color: rgba(153, 153, 153, 1);',\r\n  'background-color: rgba(153, 153, 153, 1);',\r\n  'background-color: rgba(153, 153, 153, 1);'\r\n);\r\nfunction changeVideo() {\r\n  let span21 = document.getElementById('span21');\r\n  let span22 = document.getElementById('span22');\r\n  let span23 = document.getElementById('span23');\r\n  let span24 = document.getElementById('span24');\r\n  let span25 = document.getElementById('span25');\r\n  let frame1 = document.getElementById('frame1');\r\n  let frame2 = document.getElementById('frame2');\r\n  let frame3 = document.getElementById('frame3');\r\n  i++;\r\n  i2++;\r\n  i3++;\r\n  i4++;\r\n  i5++;\r\n  if (imgs[i] === undefined) {\r\n    i = 0;\r\n  }\r\n  if (imgs[i2] === undefined) {\r\n    i2 = 0;\r\n  }\r\n  if (imgs[i3] === undefined) {\r\n    i3 = 0;\r\n  }\r\n  if (imgs[i4] === undefined) {\r\n    i4 = 0;\r\n  }\r\n  if (imgs[i5] === undefined) {\r\n    i5 = 0;\r\n  }\r\n\r\n  span21.style = color[i2];\r\n  span22.style = color[i3];\r\n  span23.style = color[i];\r\n  span24.style = color[i5];\r\n  span25.style = color[i];\r\n  frame1.src = src[3];\r\n}\r\nfunction changeImg2() {\r\n  let image1 = document.getElementById('image1');\r\n  let image2 = document.getElementById('image2');\r\n  let image3 = document.getElementById('image3');\r\n  let r1 = document.getElementById('r1');\r\n  let r2 = document.getElementById('r2');\r\n  let r3 = document.getElementById('r3');\r\n  i++;\r\n  i2++;\r\n  i3++;\r\n  if (imgs[i] === undefined) {\r\n    i = 0;\r\n  }\r\n  if (imgs[i2] === undefined) {\r\n    i2 = 0;\r\n  }\r\n  if (imgs[i3] === undefined) {\r\n    i3 = 0;\r\n  }\r\n  image1.style = imgs[i3];\r\n  image1.innerHTML = text[i3];\r\n  r1.style = color[i3];\r\n  image2.style = imgs[i2];\r\n  image2.innerHTML = text[i2];\r\n  r2.style = color[i2];\r\n  image3.style = imgs[i];\r\n  image3.innerHTML = text[i];\r\n  r3.style = color[i];\r\n}*/\n\n//# sourceURL=webpack://my-project/./src/js/radio.js?"
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module['default']
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__('./src/js/index.js');
  /******/
  /******/
})();
