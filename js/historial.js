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
        ) || [];


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


    const historialBatallas =
        JSON.parse(
            localStorage.getItem("historialBatallas")
        ) || [];


    historialContenedor.innerHTML = "";


    if (historialBatallas.length === 0) {

        historialContenedor.innerHTML =
            "<p>No hay batallas registradas.</p>";

    } else {

        for (let i = 0; i < historialBatallas.length; i++) {

            const batalla = historialBatallas[i];

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


    btnVolverArena.addEventListener(
        "click",
        function() {

            volverArena();

        }
    );

}


// ==========================================
// VOLVER A LA ARENA
// ==========================================

function volverArena() {

    window.location.href =
        "./arena-batalla.html";

}


// ==========================================
// EXPORT
// ==========================================

export {
    guardarBatalla,
    mostrarHistorial
};