/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine/renderingEngine.ts":
/*!***************************************!*\
  !*** ./src/engine/renderingEngine.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _math_mat4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/mat4 */ \"./src/math/mat4.ts\");\n\nvar RenderingEngine = /** @class */ (function () {\n    function RenderingEngine(canvas) {\n        this.world = new Float32Array(16);\n        this.view = new Float32Array(16);\n        this.projection = new Float32Array(16);\n        _math_mat4__WEBPACK_IMPORTED_MODULE_0__[\"default\"].identity(this.world);\n        this.canvas = canvas;\n        this.gl = canvas.getContext('webgl');\n        // Enable culling so invisible sides won't be rendered\n        if (!this.gl) {\n            console.log('falling back to experimental webgl');\n            this.gl = canvas.getContext('experimental-webgl');\n        }\n        this.gl.enable(this.gl.DEPTH_TEST);\n        this.gl.enable(this.gl.CULL_FACE);\n        this.gl.frontFace(this.gl.CCW);\n        this.gl.cullFace(this.gl.BACK);\n        this.frag = \"\\n      precision mediump float;\\n      varying vec2 fragColor;\\n      uniform sampler2D sampler;\\n\\n      void main() {\\n        gl_FragColor = texture2D(sampler, fragColor);  \\n      }\\n    \";\n        this.vert = \"\\n      precision mediump float;\\n      attribute vec3 vertPosition;\\n      attribute vec2 vertTexCoord;\\n\\n      varying vec2 fragColor;\\n      uniform mat4 worldMatrix;\\n      uniform mat4 viewMatrix;\\n      uniform mat4 projMatrix;\\n      \\n      \\n      \\n      void main() {\\n        fragColor = vertTexCoord;\\n        gl_Position = projMatrix * viewMatrix * worldMatrix * vec4(vertPosition, 1.0);\\n      }\\n    \";\n        this.vert_s = this.gl.createShader(this.gl.VERTEX_SHADER);\n        this.frag_s = this.gl.createShader(this.gl.FRAGMENT_SHADER);\n        this.gl.shaderSource(this.vert_s, this.vert);\n        this.gl.shaderSource(this.frag_s, this.frag);\n        this.gl.compileShader(this.vert_s);\n        if (!this.gl.getShaderParameter(this.vert_s, this.gl.COMPILE_STATUS)) {\n            console.error(\"failed compiling vertex shader\", this.gl.getShaderInfoLog(this.vert_s));\n            return;\n        }\n        this.gl.compileShader(this.frag_s);\n        if (!this.gl.getShaderParameter(this.frag_s, this.gl.COMPILE_STATUS)) {\n            console.error(\"failed compiling fragment shader\", this.gl.getShaderInfoLog(this.frag_s));\n            return;\n        }\n        this.prog = this.gl.createProgram();\n        this.gl.attachShader(this.prog, this.vert_s);\n        this.gl.attachShader(this.prog, this.frag_s);\n        this.gl.linkProgram(this.prog);\n        if (!this.gl.getProgramParameter(this.prog, this.gl.LINK_STATUS)) {\n            console.error('error linking program');\n            return;\n        }\n        this.gl.validateProgram(this.prog);\n        if (!this.gl.getProgramParameter(this.prog, this.gl.VALIDATE_STATUS)) {\n            console.error('error validating program');\n            return;\n        }\n        this.gl.clearColor(0.2, 0.8, 0.8, 1.0);\n        this.gl.useProgram(this.prog);\n        _math_mat4__WEBPACK_IMPORTED_MODULE_0__[\"default\"].perspective(this.projection, 0.7853982, 1, 0.1, 100);\n        _math_mat4__WEBPACK_IMPORTED_MODULE_0__[\"default\"].identity(this.view);\n        _math_mat4__WEBPACK_IMPORTED_MODULE_0__[\"default\"].translate(this.view, this.view, [0, 0, 0]);\n        _math_mat4__WEBPACK_IMPORTED_MODULE_0__[\"default\"].scale(this.view, this.view, [1, 1, 1]);\n    }\n    RenderingEngine.prototype.rect = function () {\n        var vertices = [\n            // Top\n            -1.0, 1.0, -1.0, 0, 0,\n            -1.0, 1.0, 1.0, 0, 1,\n            1.0, 1.0, 1.0, 1, 1,\n            1.0, 1.0, -1.0, 1, 0,\n            // Left\n            -1.0, 1.0, 1.0, 0, 0,\n            -1.0, -1.0, 1.0, 1, 0,\n            -1.0, -1.0, -1.0, 1, 1,\n            -1.0, 1.0, -1.0, 0, 1,\n            // Right\n            1.0, 1.0, 1.0, 1, 1,\n            1.0, -1.0, 1.0, 0, 1,\n            1.0, -1.0, -1.0, 0, 0,\n            1.0, 1.0, -1.0, 1, 0,\n            // Front\n            1.0, 1.0, 1.0, 1, 1,\n            1.0, -1.0, 1.0, 1, 0,\n            -1.0, -1.0, 1.0, 0, 0,\n            -1.0, 1.0, 1.0, 0, 1,\n            // Back\n            1.0, 1.0, -1.0, 0, 0,\n            1.0, -1.0, -1.0, 0, 1,\n            -1.0, -1.0, -1.0, 1, 1,\n            -1.0, 1.0, -1.0, 1, 0,\n            // Bottom\n            -1.0, -1.0, -1.0, 1, 1,\n            -1.0, -1.0, 1.0, 1, 0,\n            1.0, -1.0, 1.0, 0, 0,\n            1.0, -1.0, -1.0, 0, 1,\n        ];\n        this.indices =\n            [\n                // Top\n                0, 1, 2,\n                0, 2, 3,\n                // Left\n                5, 4, 6,\n                6, 4, 7,\n                // Right\n                8, 9, 10,\n                8, 10, 11,\n                // Front\n                13, 12, 14,\n                15, 14, 12,\n                // Back\n                16, 17, 18,\n                16, 18, 19,\n                // Bottom\n                21, 20, 22,\n                22, 20, 23\n            ];\n        var boxBuffer = this.gl.createBuffer();\n        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, boxBuffer);\n        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);\n        var boxIndexBuffer = this.gl.createBuffer();\n        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, boxIndexBuffer);\n        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);\n        var positionAttribLocation = this.gl.getAttribLocation(this.prog, 'vertPosition');\n        var texCoordAttribLocation = this.gl.getAttribLocation(this.prog, 'vertTexCoord');\n        this.gl.vertexAttribPointer(positionAttribLocation, 3, this.gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);\n        this.gl.vertexAttribPointer(texCoordAttribLocation, // Attribute locapositionAttribLocationtion\n        2, // Number of elements per attribute\n        this.gl.FLOAT, // Type of elements\n        false, 5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex\n        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute\n        );\n        this.gl.enableVertexAttribArray(positionAttribLocation);\n        this.gl.enableVertexAttribArray(texCoordAttribLocation);\n        this.worldLocation = this.gl.getUniformLocation(this.prog, \"worldMatrix\");\n        var viewLocation = this.gl.getUniformLocation(this.prog, \"viewMatrix\");\n        var projLocation = this.gl.getUniformLocation(this.prog, \"projMatrix\");\n        this.gl.uniformMatrix4fv(viewLocation, false, this.view);\n        this.gl.uniformMatrix4fv(projLocation, false, this.projection);\n        var timg = new Image();\n        timg.src = \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLKOUwxAt8O3xBJtv5kYzyXPw-q6cIgolq6KR7GJyqoKV48Pk-A\";\n        var boxTexture = this.gl.createTexture();\n        this.gl.bindTexture(this.gl.TEXTURE_2D, boxTexture);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);\n        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);\n        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, document.getElementById('img'));\n        this.gl.bindTexture(this.gl.TEXTURE_2D, null);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, boxTexture);\n        this.gl.activeTexture(this.gl.TEXTURE0);\n    };\n    RenderingEngine.prototype.clear = function () {\n        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);\n    };\n    RenderingEngine.prototype.drawElements = function () {\n        this.gl.uniformMatrix4fv(this.worldLocation, false, this.world);\n        this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);\n    };\n    return RenderingEngine;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (RenderingEngine);\n\n\n//# sourceURL=webpack:///./src/engine/renderingEngine.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _engine_renderingEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/renderingEngine */ \"./src/engine/renderingEngine.ts\");\n/* harmony import */ var _math_mat4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math/mat4 */ \"./src/math/mat4.ts\");\n\n\nvar canvas = document.getElementById('canvas');\ncanvas.requestPointerLock();\ncanvas.onclick = canvas.requestPointerLock;\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nvar renderer = new _engine_renderingEngine__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\nrenderer.clear();\n_math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].translate(renderer.world, renderer.world, [0, 0, -5]);\nrenderer.rect();\nrenderer.drawElements();\nvar angle = 0.0;\nvar cx = 0;\nvar cy = 0;\nvar cz = 0;\nvar pitch = 0;\nvar yaw = 0;\nvar keys = {};\nvar mouseVel = [0, 0];\nonmousemove = function (e) {\n    mouseVel = [e.movementX, e.movementY];\n};\nonkeyup = onkeydown = function (e) {\n    keys[e.key] = e.type == 'keydown';\n};\nfunction rotatef(x, y, cx, cy, angle) {\n    return {\n        x: Math.cos(angle) * (x - cx) - Math.sin(angle) * (y - cy) + cx,\n        y: Math.sin(angle) * (x - cx) + Math.cos(angle) * (y - cy) + cy\n    };\n}\nvar rm;\nvar prev;\nvar idn = new Float32Array(16);\n_math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].identity(idn);\nvar loop = function () {\n    if (keys['ArrowLeft']) {\n        angle += Math.PI / 50;\n    }\n    if (keys[' ']) {\n        cy -= 0.1;\n    }\n    if (keys['Shift']) {\n        cy += 0.1;\n    }\n    rm = rotatef(0, 0.1, 0, 0, yaw);\n    if (keys['w']) {\n        cx += rm.x;\n        cz += rm.y;\n    }\n    if (keys['s']) {\n        cx -= rm.x;\n        cz -= rm.y;\n    }\n    pitch -= mouseVel[1] / 100;\n    yaw += mouseVel[0] / 100;\n    console.log(rm);\n    mouseVel = [0, 0];\n    renderer.clear();\n    angle += 0.01;\n    _math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].identity(renderer.world);\n    renderer.rect();\n    _math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].rotateX(renderer.world, idn, -pitch);\n    _math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].rotateY(renderer.world, renderer.world, yaw);\n    for (var i = 0; i < 16; i++) {\n        for (var j = 0; j < 16; j++) {\n            for (var k = 0; k < 1; k++) {\n                prev = renderer.world.slice();\n                _math_mat4__WEBPACK_IMPORTED_MODULE_1__[\"default\"].translate(renderer.world, renderer.world, [-i * 2 + cx, k * 2 - 10 + cy, -j * 2 - 20 + cz]);\n                renderer.drawElements();\n                renderer.world = prev;\n            }\n        }\n    }\n    requestAnimationFrame(loop);\n};\nrequestAnimationFrame(loop);\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/math/mat4.ts":
/*!**************************!*\
  !*** ./src/math/mat4.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar glmMatrix = /** @class */ (function () {\n    function glmMatrix() {\n    }\n    glmMatrix.identity = function (out) {\n        out[0] = 1;\n        out[1] = 0;\n        out[2] = 0;\n        out[3] = 0;\n        out[4] = 0;\n        out[5] = 1;\n        out[6] = 0;\n        out[7] = 0;\n        out[8] = 0;\n        out[9] = 0;\n        out[10] = 1;\n        out[11] = 0;\n        out[12] = 0;\n        out[13] = 0;\n        out[14] = 0;\n        out[15] = 1;\n        return out;\n    };\n    // static multiply(other: Matrix4)\n    // {\n    // }\n    glmMatrix.translate = function (out, a, v) {\n        var x = v[0], y = v[1], z = v[2];\n        var a00, a01, a02, a03;\n        var a10, a11, a12, a13;\n        var a20, a21, a22, a23;\n        if (a === out) {\n            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];\n            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];\n            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];\n            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];\n        }\n        else {\n            a00 = a[0];\n            a01 = a[1];\n            a02 = a[2];\n            a03 = a[3];\n            a10 = a[4];\n            a11 = a[5];\n            a12 = a[6];\n            a13 = a[7];\n            a20 = a[8];\n            a21 = a[9];\n            a22 = a[10];\n            a23 = a[11];\n            out[0] = a00;\n            out[1] = a01;\n            out[2] = a02;\n            out[3] = a03;\n            out[4] = a10;\n            out[5] = a11;\n            out[6] = a12;\n            out[7] = a13;\n            out[8] = a20;\n            out[9] = a21;\n            out[10] = a22;\n            out[11] = a23;\n            out[12] = a00 * x + a10 * y + a20 * z + a[12];\n            out[13] = a01 * x + a11 * y + a21 * z + a[13];\n            out[14] = a02 * x + a12 * y + a22 * z + a[14];\n            out[15] = a03 * x + a13 * y + a23 * z + a[15];\n        }\n        return out;\n    };\n    glmMatrix.scale = function (out, a, v) {\n        var x = v[0], y = v[1], z = v[2];\n        out[0] = a[0] * x;\n        out[1] = a[1] * x;\n        out[2] = a[2] * x;\n        out[3] = a[3] * x;\n        out[4] = a[4] * y;\n        out[5] = a[5] * y;\n        out[6] = a[6] * y;\n        out[7] = a[7] * y;\n        out[8] = a[8] * z;\n        out[9] = a[9] * z;\n        out[10] = a[10] * z;\n        out[11] = a[11] * z;\n        out[12] = a[12];\n        out[13] = a[13];\n        out[14] = a[14];\n        out[15] = a[15];\n        return out;\n    };\n    glmMatrix.perspective = function (out, fov, aspect, near, far) {\n        var f = 1.0 / Math.tan(fov / 2), nf;\n        out[0] = f / aspect;\n        out[1] = 0;\n        out[2] = 0;\n        out[3] = 0;\n        out[4] = 0;\n        out[5] = f;\n        out[6] = 0;\n        out[7] = 0;\n        out[8] = 0;\n        out[9] = 0;\n        out[11] = -1;\n        out[12] = 0;\n        out[13] = 0;\n        out[15] = 0;\n        if (far != null && far !== Infinity) {\n            nf = 1 / (near - far);\n            out[10] = (far + near) * nf;\n            out[14] = 2 * far * near * nf;\n        }\n        else {\n            out[10] = -1;\n            out[14] = -2 * near;\n        }\n        return out;\n    };\n    glmMatrix.rotateY = function (out, a, rad) {\n        var s = Math.sin(rad);\n        var c = Math.cos(rad);\n        var a00 = a[0];\n        var a01 = a[1];\n        var a02 = a[2];\n        var a03 = a[3];\n        var a20 = a[8];\n        var a21 = a[9];\n        var a22 = a[10];\n        var a23 = a[11];\n        if (a !== out) {\n            // If the source and destination differ, copy the unchanged rows\n            out[4] = a[4];\n            out[5] = a[5];\n            out[6] = a[6];\n            out[7] = a[7];\n            out[12] = a[12];\n            out[13] = a[13];\n            out[14] = a[14];\n            out[15] = a[15];\n        } // Perform axis-specific matrix multiplication\n        out[0] = a00 * c - a20 * s;\n        out[1] = a01 * c - a21 * s;\n        out[2] = a02 * c - a22 * s;\n        out[3] = a03 * c - a23 * s;\n        out[8] = a00 * s + a20 * c;\n        out[9] = a01 * s + a21 * c;\n        out[10] = a02 * s + a22 * c;\n        out[11] = a03 * s + a23 * c;\n        return out;\n    };\n    glmMatrix.rotateX = function (out, a, rad) {\n        var s = Math.sin(rad);\n        var c = Math.cos(rad);\n        var a10 = a[4];\n        var a11 = a[5];\n        var a12 = a[6];\n        var a13 = a[7];\n        var a20 = a[8];\n        var a21 = a[9];\n        var a22 = a[10];\n        var a23 = a[11];\n        if (a !== out) {\n            // If the source and destination differ, copy the unchanged rows\n            out[0] = a[0];\n            out[1] = a[1];\n            out[2] = a[2];\n            out[3] = a[3];\n            out[12] = a[12];\n            out[13] = a[13];\n            out[14] = a[14];\n            out[15] = a[15];\n        } // Perform axis-specific matrix multiplication\n        out[4] = a10 * c + a20 * s;\n        out[5] = a11 * c + a21 * s;\n        out[6] = a12 * c + a22 * s;\n        out[7] = a13 * c + a23 * s;\n        out[8] = a20 * c - a10 * s;\n        out[9] = a21 * c - a11 * s;\n        out[10] = a22 * c - a12 * s;\n        out[11] = a23 * c - a13 * s;\n        return out;\n    };\n    glmMatrix.rotateZ = function (out, a, rad) {\n        var s = Math.sin(rad);\n        var c = Math.cos(rad);\n        var a00 = a[0];\n        var a01 = a[1];\n        var a02 = a[2];\n        var a03 = a[3];\n        var a10 = a[4];\n        var a11 = a[5];\n        var a12 = a[6];\n        var a13 = a[7];\n        if (a !== out) {\n            // If the source and destination differ, copy the unchanged last row\n            out[8] = a[8];\n            out[9] = a[9];\n            out[10] = a[10];\n            out[11] = a[11];\n            out[12] = a[12];\n            out[13] = a[13];\n            out[14] = a[14];\n            out[15] = a[15];\n        } // Perform axis-specific matrix multiplication\n        out[0] = a00 * c + a10 * s;\n        out[1] = a01 * c + a11 * s;\n        out[2] = a02 * c + a12 * s;\n        out[3] = a03 * c + a13 * s;\n        out[4] = a10 * c - a00 * s;\n        out[5] = a11 * c - a01 * s;\n        out[6] = a12 * c - a02 * s;\n        out[7] = a13 * c - a03 * s;\n        return out;\n    };\n    return glmMatrix;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (glmMatrix);\n\n\n//# sourceURL=webpack:///./src/math/mat4.ts?");

/***/ })

/******/ });