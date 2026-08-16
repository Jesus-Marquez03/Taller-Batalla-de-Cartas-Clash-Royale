import { cartas } from "./datos.js";


function iniciarBatalla() {

    console.log("batalla.js funcionando");

    const cartasDisponibles = document.getElementById("cartasDisponibles");
    const mazoJugador = document.getElementById("mazoJugador");
    const contadorCartas = document.getElementById("contadorCartas");
    const mensajeBatalla = document.getElementById("mensajeBatalla");
    const btnMazoAzar = document.getElementById("btnMazoAzar");
    const btnIrLuchar = document.getElementById("btnIrLuchar");

    let mazoSeleccionado = [];


    // ==========================================
    // MOSTRAR LAS 20 CARTAS
    // ==========================================

    function mostrarCartas() {

        console.log("Mostrando cartas:", cartas);

        cartasDisponibles.innerHTML = "";

        for (const carta of cartas) {

            const tarjeta = document.createElement("div");

            tarjeta.className = "carta";

            tarjeta.innerHTML = `
                <h3>${carta.nombre}</h3>
                <p>Vida: ${carta.vida}</p>
                <p>Ataque: ${carta.ataque}</p>
                <p>Defensa: ${carta.defensa}</p>

                <button class="btnSeleccionar" data-id="${carta.id}">
                    Seleccionar
                </button>
            `;

            cartasDisponibles.appendChild(tarjeta);
        }


        const botonesSeleccionar =
            document.querySelectorAll(".btnSeleccionar");


        botonesSeleccionar.forEach(function(boton) {

            boton.addEventListener("click", function() {

                const idCarta = Number(boton.dataset.id);

                seleccionarCarta(idCarta);

            });

        });

    }


    // ==========================================
    // SELECCIONAR CARTA
    // ==========================================

    function seleccionarCarta(idCarta) {

        if (mazoSeleccionado.length >= 5) {

            mensajeBatalla.textContent =
                "No puedes seleccionar más de 5 cartas.";

            return;
        }


        const cartaExiste = mazoSeleccionado.some(function(carta) {

            return carta.id === idCarta;

        });


        if (cartaExiste) {

            mensajeBatalla.textContent =
                "Esa carta ya está en tu mazo.";

            return;
        }


        const cartaEncontrada = cartas.find(function(carta) {

            return carta.id === idCarta;

        });


        if (!cartaEncontrada) {

            mensajeBatalla.textContent =
                "No se encontró la carta.";

            return;
        }


        mazoSeleccionado.push(cartaEncontrada);

        mostrarMazo();

        mensajeBatalla.textContent = "";

    }


    // ==========================================
    // MOSTRAR MAZO
    // ==========================================

    function mostrarMazo() {

        mazoJugador.innerHTML = "";


        for (const carta of mazoSeleccionado) {

            const tarjeta = document.createElement("div");

            tarjeta.className = "carta seleccionada";

            tarjeta.innerHTML = `
                <h3>${carta.nombre}</h3>
                <p>Vida: ${carta.vida}</p>
                <p>Ataque: ${carta.ataque}</p>
                <p>Defensa: ${carta.defensa}</p>

                <button class="btnEliminar" data-id="${carta.id}">
                    Quitar
                </button>
            `;

            mazoJugador.appendChild(tarjeta);
        }


        contadorCartas.textContent =
            `Cartas seleccionadas: ${mazoSeleccionado.length}/5`;


        const botonesEliminar =
            document.querySelectorAll(".btnEliminar");


        botonesEliminar.forEach(function(boton) {

            boton.addEventListener("click", function() {

                const idCarta = Number(boton.dataset.id);

                eliminarCarta(idCarta);

            });

        });

    }


    // ==========================================
    // ELIMINAR CARTA
    // ==========================================

    function eliminarCarta(idCarta) {

        const posicion = mazoSeleccionado.findIndex(function(carta) {

            return carta.id === idCarta;

        });


        if (posicion !== -1) {

            mazoSeleccionado.splice(posicion, 1);

        }


        mostrarMazo();

        mensajeBatalla.textContent =
            "Carta eliminada del mazo.";

    }


    // ==========================================
    // MAZO AL AZAR
    // ==========================================

    function crearMazoAzar() {

        mazoSeleccionado = [];

        const copiaCartas = [...cartas];


        while (mazoSeleccionado.length < 5) {

            const posicionAleatoria =
                Math.floor(
                    Math.random() * copiaCartas.length
                );


            const cartaAleatoria =
                copiaCartas.splice(
                    posicionAleatoria,
                    1
                )[0];


            mazoSeleccionado.push(cartaAleatoria);

        }


        mostrarMazo();

        mensajeBatalla.textContent =
            "Se ha creado un nuevo mazo al azar.";

    }


    // ==========================================
    // BOTÓN MAZO AL AZAR
    // ==========================================

    btnMazoAzar.addEventListener("click", function() {

        crearMazoAzar();

    });


    // ==========================================
    // BOTÓN IR A LUCHAR
    // ==========================================

    btnIrLuchar.addEventListener("click", function() {

        if (mazoSeleccionado.length < 5) {

            mensajeBatalla.textContent =
                "Debes seleccionar 5 cartas antes de luchar.";

            return;
        }


        mensajeBatalla.textContent =
            "¡Mazo listo para la batalla!";

    });


    // ==========================================
    // INICIAR MOSTRANDO LAS 20 CARTAS
    // ==========================================

    mostrarCartas();

}


export { iniciarBatalla };