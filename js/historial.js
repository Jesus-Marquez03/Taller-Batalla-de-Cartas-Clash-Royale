// ==========================================
// GUARDAR BATALLA
// ==========================================

function guardarBatalla(resultado, marcador) {

    const batalla = {
        resultado: resultado,
        marcador: marcador
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


    // ==========================================
    // HISTORIAL VACÍO
    // ==========================================

    if (historialBatallas.length === 0) {

        historialContenedor.innerHTML =
            "<p>No hay batallas registradas.</p>";

    } else {

        // ==========================================
        // MOSTRAR BATALLAS
        // ==========================================

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


            tarjeta.innerHTML = `
                <h3>Batalla ${i + 1}</h3>

                <p>
                    Resultado: ${batalla.resultado}
                </p>

                <p>
                    Marcador: ${batalla.marcador}
                </p>
            `;


            historialContenedor.appendChild(
                tarjeta
            );

        }

    }


    // ==========================================
    // VOLVER A LA ARENA
    // ==========================================

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


// ==========================================
// EXPORTAR
// ==========================================

export {
    guardarBatalla,
    mostrarHistorial
};