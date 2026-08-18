import { iniciarInicio } from "./inicio.js";
import { iniciarBatalla } from "./batalla.js";
import { mostrarHistorial } from "./historial.js";


if (document.getElementById("nombreJugador")) {

    iniciarInicio();

}


if (document.getElementById("cartasDisponibles")) {

    iniciarBatalla();

}


if (document.getElementById("historialBatallas")) {

    mostrarHistorial();

}