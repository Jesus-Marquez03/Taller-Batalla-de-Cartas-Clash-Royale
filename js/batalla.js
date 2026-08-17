import { cartas } from "./datos.js";
import { guardarBatalla } from "./historial.js";


function iniciarBatalla() {

    console.log("batalla.js funcionando");


    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================

    const cartasDisponibles =
        document.getElementById("cartasDisponibles");

    const mazoJugador =
        document.getElementById("mazoJugador");

    const contadorCartas =
        document.getElementById("contadorCartas");

    const mensajeBatalla =
        document.getElementById("mensajeBatalla");

    const btnMazoAzar =
        document.getElementById("btnMazoAzar");

    const btnIrLuchar =
        document.getElementById("btnIrLuchar");

    const arenaCombate =
        document.getElementById("arenaCombate");

    const turnoActual =
        document.getElementById("turnoActual");

    const datosCartaJugador =
        document.getElementById("datosCartaJugador");

    const datosCartaEnemigo =
        document.getElementById("datosCartaEnemigo");

    const vidaJugador =
        document.getElementById("vidaJugador");

    const vidaEnemigo =
        document.getElementById("vidaEnemigo");

    const btnAtacar =
        document.getElementById("btnAtacar");

    const mensajeCombate =
        document.getElementById("mensajeCombate");

    const ventanaResultado =
        document.getElementById("ventanaResultado");

    const tituloResultado =
        document.getElementById("tituloResultado");

    const marcadorResultado =
        document.getElementById("marcadorResultado");

    const mensajeResultado =
        document.getElementById("mensajeResultado");

    const btnContinuar =
        document.getElementById("btnContinuar");


    // ==========================================
    // VARIABLES DEL JUEGO
    // ==========================================

    let mazoSeleccionado = [];

    let mazoEnemigo = [];

    let cartaJugadorActual = null;

    let cartaEnemigoActual = null;

    let turnoJugador = true;

    let posicionJugador = 0;

    let posicionEnemigo = 0;

    let batallaTerminada = false;


    // Ocultamos la arena y resultado al comenzar
    arenaCombate.style.display = "none";

    ventanaResultado.style.display = "none";


    // ==========================================
    // CREAR MAZO DE LA IA
    // ==========================================

    function crearMazoEnemigo() {

        mazoEnemigo = [];

        const cartasDisponiblesCopia = [...cartas];


        while (mazoEnemigo.length < 5) {

            const posicionAleatoria =
                Math.floor(
                    Math.random() *
                    cartasDisponiblesCopia.length
                );


            const cartaAleatoria =
                cartasDisponiblesCopia.splice(
                    posicionAleatoria,
                    1
                )[0];


            mazoEnemigo.push(cartaAleatoria);

        }

    }


    // ==========================================
    // MOSTRAR LAS 20 CARTAS
    // ==========================================

    function mostrarCartas() {

        console.log("Mostrando cartas:", cartas);

        cartasDisponibles.innerHTML = "";


        for (const carta of cartas) {

            const tarjeta =
                document.createElement("div");


            tarjeta.className = "carta";


            tarjeta.innerHTML = `
                <h3>${carta.nombre}</h3>

                <p>Vida: ${carta.vida}</p>

                <p>Ataque: ${carta.ataque}</p>

                <p>Defensa: ${carta.defensa}</p>

                <button
                    class="btnSeleccionar"
                    data-id="${carta.id}"
                >
                    Seleccionar
                </button>
            `;


            cartasDisponibles.appendChild(tarjeta);

        }


        const botonesSeleccionar =
            document.querySelectorAll(".btnSeleccionar");


        botonesSeleccionar.forEach(function(boton) {

            boton.addEventListener("click", function() {

                const idCarta =
                    Number(boton.dataset.id);

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


        const cartaExiste =
            mazoSeleccionado.some(function(carta) {

                return carta.id === idCarta;

            });


        if (cartaExiste) {

            mensajeBatalla.textContent =
                "Esa carta ya está en tu mazo.";

            return;

        }


        const cartaEncontrada =
            cartas.find(function(carta) {

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
    // MOSTRAR MAZO DEL JUGADOR
    // ==========================================

    function mostrarMazo() {

        mazoJugador.innerHTML = "";


        for (const carta of mazoSeleccionado) {

            const tarjeta =
                document.createElement("div");


            tarjeta.className =
                "carta seleccionada";


            tarjeta.innerHTML = `
                <h3>${carta.nombre}</h3>

                <p>Vida: ${carta.vida}</p>

                <p>Ataque: ${carta.ataque}</p>

                <p>Defensa: ${carta.defensa}</p>

                <button
                    class="btnEliminar"
                    data-id="${carta.id}"
                >
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

                const idCarta =
                    Number(boton.dataset.id);

                eliminarCarta(idCarta);

            });

        });

    }


    // ==========================================
    // ELIMINAR CARTA
    // ==========================================

    function eliminarCarta(idCarta) {

        const posicion =
            mazoSeleccionado.findIndex(function(carta) {

                return carta.id === idCarta;

            });


        if (posicion !== -1) {

            mazoSeleccionado.splice(
                posicion,
                1
            );

        }


        mostrarMazo();


        mensajeBatalla.textContent =
            "Carta eliminada del mazo.";

    }


    // ==========================================
    // CREAR MAZO AL AZAR
    // ==========================================

    function crearMazoAzar() {

        mazoSeleccionado = [];

        const copiaCartas = [...cartas];


        while (mazoSeleccionado.length < 5) {

            const posicionAleatoria =
                Math.floor(
                    Math.random() *
                    copiaCartas.length
                );


            const cartaAleatoria =
                copiaCartas.splice(
                    posicionAleatoria,
                    1
                )[0];


            mazoSeleccionado.push(
                cartaAleatoria
            );

        }


        mostrarMazo();


        mensajeBatalla.textContent =
            "Se ha creado un nuevo mazo al azar.";

    }


    // ==========================================
    // PREPARAR COMBATE
    // ==========================================

    function prepararCombate() {

        crearMazoEnemigo();


        posicionJugador = 0;

        posicionEnemigo = 0;

        batallaTerminada = false;


        cartaJugadorActual = {
            ...mazoSeleccionado[0]
        };


        cartaEnemigoActual = {
            ...mazoEnemigo[0]
        };


        turnoJugador = true;

        btnAtacar.disabled = false;


        mostrarCartasCombate();

    }


    // ==========================================
    // MOSTRAR CARTAS EN COMBATE
    // ==========================================

    function mostrarCartasCombate() {

        datosCartaJugador.innerHTML = `
            <p>Nombre: ${cartaJugadorActual.nombre}</p>

            <p>Ataque: ${cartaJugadorActual.ataque}</p>

            <p>Defensa: ${cartaJugadorActual.defensa}</p>
        `;


        datosCartaEnemigo.innerHTML = `
            <p>Nombre: ${cartaEnemigoActual.nombre}</p>

            <p>Ataque: ${cartaEnemigoActual.ataque}</p>

            <p>Defensa: ${cartaEnemigoActual.defensa}</p>
        `;


        vidaJugador.textContent =
            cartaJugadorActual.vida;


        vidaEnemigo.textContent =
            cartaEnemigoActual.vida;

    }


    // ==========================================
    // CAMBIAR CARTA DEL JUGADOR
    // ==========================================

    function cambiarCartaJugador() {

        posicionJugador++;


        if (
            posicionJugador <
            mazoSeleccionado.length
        ) {

            cartaJugadorActual = {
                ...mazoSeleccionado[posicionJugador]
            };


            mensajeCombate.textContent =
                `¡${cartaJugadorActual.nombre} entra a la batalla!`;


            mostrarCartasCombate();


            /*
                La IA acaba de atacar y derrotó
                nuestra carta.

                Por lo tanto, el siguiente turno
                debe ser del jugador.
            */

            turnoJugador = true;


            turnoActual.textContent =
                "Turno del jugador";

        } else {

            finalizarBatalla("derrota");

        }

    }


    // ==========================================
    // CAMBIAR CARTA DE LA IA
    // ==========================================

    function cambiarCartaEnemigo() {

        posicionEnemigo++;


        if (
            posicionEnemigo <
            mazoEnemigo.length
        ) {

            cartaEnemigoActual = {
                ...mazoEnemigo[posicionEnemigo]
            };


            mensajeCombate.textContent =
                `¡${cartaEnemigoActual.nombre} entra a la batalla!`;


            mostrarCartasCombate();


            /*
                El jugador acaba de atacar y
                derrotó la carta enemiga.

                Por lo tanto, ahora corresponde
                el turno de la IA.
            */

            turnoJugador = false;


            turnoActual.textContent =
                "Turno de la IA";


            setTimeout(function() {

                ataqueEnemigo();

            }, 1000);

        } else {

            finalizarBatalla("victoria");

        }

    }


    // ==========================================
    // FINALIZAR BATALLA
    // ==========================================

    function finalizarBatalla(resultado) {

        batallaTerminada = true;

        btnAtacar.disabled = true;


        let marcador = "";


        /*
            El marcador será:

            jugador - IA

            Victoria:
            jugador derrotó 5 cartas de la IA.

            Derrota:
            la IA derrotó las 5 cartas del jugador.
        */


        if (resultado === "victoria") {

            tituloResultado.textContent =
                "¡VICTORIA!";


            mensajeResultado.textContent =
                "¡Has derrotado a todas las cartas enemigas!";


            marcador =
                `5 - ${posicionJugador}`;

        } else {

            tituloResultado.textContent =
                "DERROTA";


            mensajeResultado.textContent =
                "La IA ha derrotado a todas tus cartas.";


            marcador =
                `${posicionEnemigo} - 5`;

        }


        marcadorResultado.textContent =
            marcador;


        /*
            Primero mostramos la ventana para que
            un posible error guardando el historial
            no impida ver el resultado.
        */

        ventanaResultado.style.display =
            "block";


        try {

            guardarBatalla(
                resultado,
                marcador
            );

        } catch (error) {

            console.error(
                "No se pudo guardar la batalla:",
                error
            );

        }

    }


    // ==========================================
    // ATAQUE DEL JUGADOR
    // ==========================================

    function atacar() {

        if (
            !turnoJugador ||
            batallaTerminada
        ) {

            return;

        }


        let daño =
            cartaJugadorActual.ataque -
            cartaEnemigoActual.defensa;


        if (daño < 1) {

            daño = 1;

        }


        cartaEnemigoActual.vida =
            cartaEnemigoActual.vida - daño;


        /*
            Evitamos que visualmente aparezca
            una vida negativa.
        */

        if (cartaEnemigoActual.vida < 0) {

            cartaEnemigoActual.vida = 0;

        }


        vidaEnemigo.textContent =
            cartaEnemigoActual.vida;


        mensajeCombate.textContent =
            `${cartaJugadorActual.nombre} hizo ${daño} de daño.`;


        if (cartaEnemigoActual.vida <= 0) {

            cambiarCartaEnemigo();

            return;

        }


        turnoJugador = false;


        turnoActual.textContent =
            "Turno de la IA";


        setTimeout(function() {

            ataqueEnemigo();

        }, 1000);

    }


    // ==========================================
    // ATAQUE DE LA IA
    // ==========================================

    function ataqueEnemigo() {

        if (batallaTerminada) {

            return;

        }


        let daño =
            cartaEnemigoActual.ataque -
            cartaJugadorActual.defensa;


        if (daño < 1) {

            daño = 1;

        }


        cartaJugadorActual.vida =
            cartaJugadorActual.vida - daño;


        if (cartaJugadorActual.vida < 0) {

            cartaJugadorActual.vida = 0;

        }


        vidaJugador.textContent =
            cartaJugadorActual.vida;


        mensajeCombate.textContent =
            `${cartaEnemigoActual.nombre} hizo ${daño} de daño.`;


        if (cartaJugadorActual.vida <= 0) {

            cambiarCartaJugador();

            return;

        }


        turnoJugador = true;


        turnoActual.textContent =
            "Turno del jugador";

    }


    // ==========================================
    // BOTÓN MAZO AL AZAR
    // ==========================================

    btnMazoAzar.addEventListener(
        "click",
        function() {

            crearMazoAzar();

        }
    );


    // ==========================================
    // BOTÓN IR A LUCHAR
    // ==========================================

    btnIrLuchar.addEventListener(
        "click",
        function() {

            if (mazoSeleccionado.length !== 5) {

                mensajeBatalla.textContent =
                    "Debes seleccionar 5 cartas antes de luchar.";

                return;

            }


            prepararCombate();


            arenaCombate.style.display =
                "block";


            ventanaResultado.style.display =
                "none";


            mensajeBatalla.textContent =
                "¡La batalla ha comenzado!";

        }
    );


    // ==========================================
    // BOTÓN ATACAR
    // ==========================================

    btnAtacar.addEventListener(
        "click",
        function() {

            atacar();

        }
    );


    // ==========================================
    // BOTÓN CONTINUAR
    // ==========================================

    btnContinuar.addEventListener(
        "click",
        function() {

            window.location.href =
                "./historial.html";

        }
    );


    // ==========================================
    // MOSTRAR CARTAS AL INICIAR
    // ==========================================

    mostrarCartas();

}


export { iniciarBatalla };