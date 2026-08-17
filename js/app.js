import { iniciarInicio } from "./inicio.js";

import { iniciarBatalla } from "./batalla.js";

import { mostrarHistorial } from "./historial.js";


// ==========================================
// PÁGINA DE INICIO
// ==========================================

if (document.getElementById("nombreJugador")) {

    iniciarInicio();

}


// ==========================================
// PÁGINA DE BATALLA
// ==========================================

if (document.getElementById("cartasDisponibles")) {

    iniciarBatalla();

}


// ==========================================
// PÁGINA DE HISTORIAL
// ==========================================

if (document.getElementById("historialBatallas")) {

    mostrarHistorial();

}