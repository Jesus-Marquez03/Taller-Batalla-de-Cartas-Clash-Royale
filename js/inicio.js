const clases = {
    "Astuto": "Ataca con estrategia y precision.",
    "Temerario": "Prefiere atacar antes que defender.",
    "Cauteloso": "Resiste y espera el momento adecuado.",
    "Velocista": "Ataca rapidamente.",
    "Ser de sombra": "Un luchador misterioso que aprovecha las oportunidades."
};

function iniciarInicio() {
    const nombreJugador = document.getElementById("nombreJugador");
    const botonesClase = document.querySelectorAll(".clase");
    const descripcionClase = document.getElementById("descripcionClase");
    const claseSeleccionada = document.getElementById("mensaje");
    const btnContinuar = document.getElementById("btnContinuar");

    let claseElegida = "";

    botonesClase.forEach(function(boton) {

        boton.addEventListener("click", function() {

            claseElegida = boton.dataset.clase;

            descripcionClase.textContent = clases[claseElegida];

            claseSeleccionada.textContent =
                `Clase seleccionada: ${claseElegida}`;
        });
    });

    btnContinuar.addEventListener("click", function() {

        const nombre = nombreJugador.value.trim();

        if (nombre === "") {

            mensaje.textContent =
                "Por favor, ingresa tu nombre o alias.";

            return;
        }

        if (claseElegida === "") {

            mensaje.textContent =
                "Por favor, selecciona una clase.";
            
            return;
        }

        window.location.href =
            `./arena-batalla.html?nombre=${encodeURIComponent(nombre)}&clase=${encodeURIComponent(claseElegida)}`;
    });

}

export { iniciarInicio };
