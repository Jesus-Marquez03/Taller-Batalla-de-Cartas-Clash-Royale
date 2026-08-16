import { iniciarInicio } from "./inicio.js";
import { iniciarBatalla } from "./batalla.js";


if (document.getElementById("nombreJugador")) {

    iniciarInicio();

}


if (document.getElementById("cartasDisponibles")) {

    iniciarBatalla();

}