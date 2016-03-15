(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nivel = 1,
    operacion = "+",
    setActivado = false,
    operadores = ["/", "*", "-", "+"],
    ecuacion = "",
    respuestaOpera = 0,
    encadenaRespuesta = "";

var respuestaValor = function respuestaValor() {
    encadenaRespuesta = "";
    var operandos = { operador1: 0, operador2: 0 };
    if (nivel === 1) {
        operandos.operador1 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        operandos.operador2 = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        ecuacion = operandos.operador1 + operacion + operandos.operador2;
    } else {
        if (nivel === 2) {
            operandos.operador1 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
            operandos.operador2 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
            ecuacion = operandos.operador1 + operacion + operandos.operador2;
        } else {
            if (nivel === 3) {
                operandos.operador1 = Math.floor(Math.random() * (30 - 20 + 1) + 20);
                operandos.operador2 = Math.floor(Math.random() * (30 - 20 + 1) + 20);
                ecuacion = operandos.operador1 + operacion + operandos.operador2;
            } else {
                if (nivel === 4) {
                    operandos.operador1 = Math.floor(Math.random() * (40 - 30 + 1) + 30);
                    operandos.operador2 = Math.floor(Math.random() * (40 - 30 + 1) + 30);
                    ecuacion = operandos.operador1 + operacion + operandos.operador2;
                } else {
                    if (nivel === 5) {
                        operandos.operador1 = Math.floor(Math.random() * (50 - 40 + 1) + 40);
                        operandos.operador2 = Math.floor(Math.random() * (50 - 40 + 1) + 40);
                        ecuacion = operandos.operador1 + operacion + operandos.operador2;
                    }
                }
            }
        }
    }
    respuestaOpera = eval(ecuacion);
    _utils2.default.accesoDOM("lcd").innerHTML = ecuacion + " =" + respuestaOpera;
    console.log(ecuacion);
};

var presionaTecla = function presionaTecla(opc) {
    //Saber si se ha presionado la opción de SET...
    if (opc.toLowerCase() === "set" || setActivado) {
        //Saber si se ha presionado "go"...
        if (opc.toLowerCase() !== "go") {
            //Imprimir las opciones...
            if (_utils2.default.isNumber(opc)) {
                //Saber si el número está en un nivel de 1 a 5...
                if (Number(opc) >= 1 && Number(opc) <= 5) {
                    nivel = Number(opc);
                }
                //console.log("Número");
            } else {
                    for (var i = 0; i < operadores.length; i++) {
                        if (opc === operadores[i]) {
                            operacion = operadores[i];
                            break;
                        }
                    }
                }
            _utils2.default.accesoDOM("lcd").innerHTML = "L" + nivel + "&nbsp;&nbsp;OP&nbsp;" + operacion;
            setActivado = true;
        } else {
            setActivado = false;
            _utils2.default.accesoDOM("lcd").innerHTML = "";
            respuestaValor();
        }
    } else {
        if (_utils2.default.isNumber(opc)) {
            //Se debe mostrar una ecuación de forma aleatoria en el LCD...
            //Se debe validar que la respuesta dada por el usuario sea válida...
            //Se debe validar que la operación que se haga es relacionada al valor que está guardada en ecuación...
            console.log("Número seleccionado: " + opc);
            _utils2.default.accesoDOM("lcd").innerHTML = "" + opc;
        }
    }
};

var crearBotones = function crearBotones() {
    var posicion = {
        left: 66,
        bottom: 221
    };

    var opciones = ["set", "0", "go"],
        inciaNumero = 7;
    for (var i = 0; i < 4; i++) {
        for (var c = 0; c < 4; c++) {
            var data = c <= 2 ? inciaNumero > 0 ? inciaNumero + c : opciones[c] : operadores[i];
            var style = "left: " + (posicion.left + c * 53) + "px;\n                         bottom: " + (posicion.bottom - i * 62) + "px;";
            var elementoDIV = "<div class = \"tecla\" style = \"" + style + "\" data = " + data + " id = \"" + i + "_" + c + "\"></div>";
            _utils2.default.accesoDOM("carcasa").insertAdjacentHTML('afterbegin', elementoDIV);
            _utils2.default.accesoDOM(i + "_" + c).addEventListener('click', function (event) {
                var valor = _utils2.default.accesoDOM(event.target.id).getAttribute("data");
                presionaTecla(valor);
            });
        }
        inciaNumero -= 3;
    }
};
crearBotones();

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

var accesoDOM = function accesoDOM(param) {
  return document.getElementById(param);
};
var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = { accesoDOM: accesoDOM, isNumber: isNumber };

},{}]},{},[1]);
