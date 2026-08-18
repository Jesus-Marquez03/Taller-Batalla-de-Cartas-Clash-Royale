// ==========================================
// GUARDAR BATALLA
// ==========================================

function guardarBatalla(resultado, marcador) {

    const nombreJugador =
        sessionStorage.getItem("jugadorNombre") ||
        "Jugador";


    const claseJugador =
        sessionStorage.getItem("jugadorClase") ||
        "Sin clase";


    const batalla = {
        resultado: resultado,
        marcador: marcador,
        jugador: nombreJugador,
        clase: claseJugador,
        fecha: new Date().toLocaleString("es-CO")
    };


    let historialBatallas =
        JSON.parse(
            localStorage.getItem("historialBatallas")
        );


    if (historialBatallas === null) {

        historialBatallas = [];

    }


    historialBatallas.push(batalla);


    localStorage.setItem(
        "historialBatallas",
        JSON.stringify(historialBatallas)
    );

}


// ==========================================
// MOSTRAR HISTORIAL
// ==========================================

function mostrarHistorial() {

    const historialContenedor =
        document.getElementById("historialBatallas");

    const btnVolverArena =
        document.getElementById("btnVolverArena");


    let historialBatallas =
        JSON.parse(
            localStorage.getItem("historialBatallas")
        );


    if (historialBatallas === null) {

        historialBatallas = [];

    }


    historialContenedor.innerHTML = "";


    if (historialBatallas.length === 0) {

        historialContenedor.innerHTML =
            "<p>No hay batallas registradas.</p>";

    } else {

        for (
            let i = 0;
            i < historialBatallas.length;
            i++
        ) {

            const batalla =
                historialBatallas[i];


            const tarjeta =
                document.createElement("div");


            tarjeta.className =
                "batallaHistorial";


            const resultadoTexto =
                batalla.resultado === "victoria"
                    ? "Victoria"
                    : "Derrota";


            tarjeta.innerHTML = `
                <h3>Batalla ${i + 1}</h3>

                <p>
                    Jugador:
                    <strong>${batalla.jugador || "Jugador"}</strong>
                </p>

                <p>
                    Clase:
                    <strong>${batalla.clase || "Sin clase"}</strong>
                </p>

                <p>
                    Resultado:
                    <strong>${resultadoTexto}</strong>
                </p>

                <p>
                    Marcador:
                    <strong>${batalla.marcador}</strong>
                </p>

                <p>
                    Fecha:
                    <strong>${batalla.fecha || "Sin registro"}</strong>
                </p>
            `;


            historialContenedor.appendChild(
                tarjeta
            );

        }

    }


    if (btnVolverArena) {

        btnVolverArena.addEventListener(
            "click",
            function() {

                window.location.href =
                    "./arena-batalla.html";

            }
        );

    }

}


export {
    guardarBatalla,
    mostrarHistorial
};
