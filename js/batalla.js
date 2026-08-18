import { cartas } from "./datos.js";
import { guardarBatalla } from "./historial.js";


function iniciarBatalla() {


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


    const btnCambiarJugador =
        document.getElementById("btnCambiarJugador");


    const arenaCombate =
        document.getElementById("arenaCombate");


    const turnoActual =
        document.getElementById("turnoActual");


    const danoTurno =
        document.getElementById("danoTurno");


    const datosCartaJugador =
        document.getElementById("datosCartaJugador");


    const datosCartaEnemigo =
        document.getElementById("datosCartaEnemigo");


    const imagenCartaJugador =
        document.getElementById("imagenCartaJugador");


    const imagenCartaEnemigo =
        document.getElementById("imagenCartaEnemigo");


    const nombreCartaJugador =
        document.getElementById("nombreCartaJugador");


    const nombreCartaEnemigo =
        document.getElementById("nombreCartaEnemigo");


    const vidaJugador =
        document.getElementById("vidaJugador");


    const vidaEnemigo =
        document.getElementById("vidaEnemigo");


    const barraVidaJugador =
        document.getElementById("barraVidaJugador");


    const barraVidaEnemigo =
        document.getElementById("barraVidaEnemigo");


    const btnAtacar =
        document.getElementById("btnAtacar");


    const mensajeCombate =
        document.getElementById("mensajeCombate");


    const cartaJugadorElemento =
        document.getElementById("cartaJugador");


    const cartaEnemigoElemento =
        document.getElementById("cartaEnemigo");


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


    const nombreArena =
        document.getElementById("nombreArena");


    const claseArena =
        document.getElementById("claseArena");



    // ==========================================
    // DATOS DEL JUGADOR
    // ==========================================

    const nombreGuardado =
        sessionStorage.getItem("jugadorNombre") ||
        "Jugador";


    const claseGuardada =
        sessionStorage.getItem("jugadorClase") ||
        "Sin clase";


    nombreArena.textContent =
        nombreGuardado;


    claseArena.textContent =
        claseGuardada;



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



    // ==========================================
    // ESTADO INICIAL
    // ==========================================

    arenaCombate.style.display =
        "none";


    ventanaResultado.style.display =
        "none";



    // ==========================================
    // CREAR MAZO DE LA IA
    // ==========================================

    function crearMazoEnemigo() {

        mazoEnemigo = [];


        const cartasDisponiblesCopia =
            [...cartas];


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


            mazoEnemigo.push(
                cartaAleatoria
            );

        }

    }



    // ==========================================
    // CREAR CONTENIDO DE UNA CARTA
    // ==========================================

    function crearContenidoCarta(
        carta,
        textoBoton,
        claseBoton
    ) {

        return `

            <div class="carta__imagen-wrapper">

                <span class="carta__numero">
                    #${carta.id}
                </span>


                <img
                    class="carta__imagen"
                    src="${carta.imagen}"
                    alt="${carta.nombre}"
                    loading="lazy"
                >

            </div>


            <div class="carta__contenido">

                <h3>
                    ${carta.nombre}
                </h3>


                <div class="carta__stats">

                    <div class="stat">

                        ❤️

                        <strong>
                            ${carta.vida}
                        </strong>

                        <span>
                            Vida
                        </span>

                    </div>


                    <div class="stat">

                        ⚔️

                        <strong>
                            ${carta.ataque}
                        </strong>

                        <span>
                            Ataque
                        </span>

                    </div>


                    <div class="stat">

                        🛡️

                        <strong>
                            ${carta.defensa}
                        </strong>

                        <span>
                            Defensa
                        </span>

                    </div>

                </div>


                <button
                    class="${claseBoton}"
                    data-id="${carta.id}"
                >
                    ${textoBoton}
                </button>

            </div>
        `;

    }



    // ==========================================
    // MOSTRAR LAS CARTAS DISPONIBLES
    // ==========================================

    function mostrarCartas() {

        cartasDisponibles.innerHTML =
            "";


        for (const carta of cartas) {


            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "carta";


            tarjeta.innerHTML =
                crearContenidoCarta(
                    carta,
                    "Seleccionar",
                    "btnSeleccionar"
                );


            cartasDisponibles.appendChild(
                tarjeta
            );

        }



        const botonesSeleccionar =
            document.querySelectorAll(
                ".btnSeleccionar"
            );



        botonesSeleccionar.forEach(
            function(boton) {


                boton.addEventListener(
                    "click",
                    function() {


                        const idCarta =
                            Number(
                                boton.dataset.id
                            );


                        seleccionarCarta(
                            idCarta
                        );

                    }
                );

            }
        );

    }



    // ==========================================
    // SELECCIONAR CARTA
    // ==========================================

    function seleccionarCarta(idCarta) {


        if (
            mazoSeleccionado.length >= 5
        ) {

            mensajeBatalla.textContent =
                "No puedes seleccionar más de 5 cartas.";

            return;

        }



        const cartaExiste =
            mazoSeleccionado.some(
                function(carta) {

                    return carta.id === idCarta;

                }
            );



        if (cartaExiste) {

            mensajeBatalla.textContent =
                "Esa carta ya está en tu mazo.";

            return;

        }



        const cartaEncontrada =
            cartas.find(
                function(carta) {

                    return carta.id === idCarta;

                }
            );



        if (!cartaEncontrada) {

            mensajeBatalla.textContent =
                "No se encontró la carta.";

            return;

        }



        mazoSeleccionado.push(
            cartaEncontrada
        );


        mostrarMazo();


        mensajeBatalla.textContent =
            `${cartaEncontrada.nombre} fue añadida a tu mazo.`;

    }



    // ==========================================
    // MOSTRAR MAZO
    // ==========================================

    function mostrarMazo() {

        mazoJugador.innerHTML =
            "";



        for (
            const carta
            of mazoSeleccionado
        ) {


            const tarjeta =
                document.createElement(
                    "article"
                );


            tarjeta.className =
                "carta seleccionada";


            tarjeta.innerHTML =
                crearContenidoCarta(
                    carta,
                    "Quitar",
                    "btnEliminar"
                );


            mazoJugador.appendChild(
                tarjeta
            );

        }



        contadorCartas.textContent =
            `Cartas seleccionadas: ${mazoSeleccionado.length}/5`;



        const botonesEliminar =
            document.querySelectorAll(
                ".btnEliminar"
            );



        botonesEliminar.forEach(
            function(boton) {


                boton.addEventListener(
                    "click",
                    function() {


                        const idCarta =
                            Number(
                                boton.dataset.id
                            );


                        eliminarCarta(
                            idCarta
                        );

                    }
                );

            }
        );

    }



    // ==========================================
    // ELIMINAR CARTA
    // ==========================================

    function eliminarCarta(idCarta) {


        const posicion =
            mazoSeleccionado.findIndex(
                function(carta) {

                    return carta.id === idCarta;

                }
            );



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


        const copiaCartas =
            [...cartas];



        while (
            mazoSeleccionado.length < 5
        ) {


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


        posicionJugador =
            0;


        posicionEnemigo =
            0;


        batallaTerminada =
            false;



        cartaJugadorActual = {

            ...mazoSeleccionado[0],

            vidaMaxima:
                mazoSeleccionado[0].vida

        };



        cartaEnemigoActual = {

            ...mazoEnemigo[0],

            vidaMaxima:
                mazoEnemigo[0].vida

        };



        turnoJugador =
            true;


        btnAtacar.disabled =
            false;


        turnoActual.textContent =
            "Turno del jugador";


        danoTurno.textContent =
            "¡Comienza el combate!";


        danoTurno.className =
            "dano-turno";


        mostrarCartasCombate();

    }



    // ==========================================
    // ACTUALIZAR BARRA DE VIDA
    // ==========================================

    function actualizarBarraVida(
        carta,
        barra
    ) {


        const porcentaje =
            Math.max(
                0,
                (
                    carta.vida /
                    carta.vidaMaxima
                ) * 100
            );



        barra.style.width =
            `${porcentaje}%`;



        barra.classList.toggle(
            "barra-vida--peligro",
            porcentaje <= 35
        );

    }



    // ==========================================
    // MOSTRAR CARTAS EN COMBATE
    // ==========================================

    function mostrarCartasCombate() {


        // CARTA DEL JUGADOR

        imagenCartaJugador.src =
            cartaJugadorActual.imagen;


        imagenCartaJugador.alt =
            cartaJugadorActual.nombre;


        nombreCartaJugador.textContent =
            cartaJugadorActual.nombre;



        datosCartaJugador.innerHTML = `

            <div class="estadistica-combate">

                <span>
                    Ataque
                </span>

                <strong>
                    ⚔️ ${cartaJugadorActual.ataque}
                </strong>

            </div>


            <div class="estadistica-combate">

                <span>
                    Defensa
                </span>

                <strong>
                    🛡️ ${cartaJugadorActual.defensa}
                </strong>

            </div>

        `;



        // CARTA DE LA IA

        imagenCartaEnemigo.src =
            cartaEnemigoActual.imagen;


        imagenCartaEnemigo.alt =
            cartaEnemigoActual.nombre;


        nombreCartaEnemigo.textContent =
            cartaEnemigoActual.nombre;



        datosCartaEnemigo.innerHTML = `

            <div class="estadistica-combate">

                <span>
                    Ataque
                </span>

                <strong>
                    ⚔️ ${cartaEnemigoActual.ataque}
                </strong>

            </div>


            <div class="estadistica-combate">

                <span>
                    Defensa
                </span>

                <strong>
                    🛡️ ${cartaEnemigoActual.defensa}
                </strong>

            </div>

        `;



        vidaJugador.textContent =
            `${cartaJugadorActual.vida} / ${cartaJugadorActual.vidaMaxima}`;



        vidaEnemigo.textContent =
            `${cartaEnemigoActual.vida} / ${cartaEnemigoActual.vidaMaxima}`;



        actualizarBarraVida(
            cartaJugadorActual,
            barraVidaJugador
        );



        actualizarBarraVida(
            cartaEnemigoActual,
            barraVidaEnemigo
        );

    }



    // ==========================================
    // MOSTRAR DAÑO
    // ==========================================

    function mostrarDano(
        texto,
        tipo
    ) {


        danoTurno.textContent =
            texto;


        danoTurno.className =
            "dano-turno";


        danoTurno.classList.add(
            tipo,
            "dano-animado"
        );



        setTimeout(
            function() {


                danoTurno.classList.remove(
                    "dano-animado"
                );

            },

            450
        );

    }



    // ==========================================
    // ANIMAR ATAQUE
    // ==========================================

    function animarAtaque(
        atacante,
        defensor
    ) {


        let claseAtaque =
            "";



        if (
            atacante ===
            cartaJugadorElemento
        ) {

            claseAtaque =
                "atacando-jugador";

        } else {

            claseAtaque =
                "atacando-enemigo";

        }



        atacante.classList.add(
            claseAtaque
        );


        defensor.classList.add(
            "recibiendo-golpe"
        );



        setTimeout(
            function() {


                atacante.classList.remove(
                    claseAtaque
                );


                defensor.classList.remove(
                    "recibiendo-golpe"
                );

            },

            420
        );

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


            const nuevaCarta =
                mazoSeleccionado[
                    posicionJugador
                ];



            cartaJugadorActual = {

                ...nuevaCarta,

                vidaMaxima:
                    nuevaCarta.vida

            };



            mensajeCombate.textContent =
                `¡${cartaJugadorActual.nombre} entra a la batalla!`;



            mostrarDano(
                "Tu nueva carta está lista.",
                "dano-jugador"
            );



            mostrarCartasCombate();



            turnoJugador =
                true;


            turnoActual.textContent =
                "Turno del jugador";


            btnAtacar.disabled =
                false;

        } else {


            finalizarBatalla(
                "derrota"
            );

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


            const nuevaCarta =
                mazoEnemigo[
                    posicionEnemigo
                ];



            cartaEnemigoActual = {

                ...nuevaCarta,

                vidaMaxima:
                    nuevaCarta.vida

            };



            mensajeCombate.textContent =
                `¡${cartaEnemigoActual.nombre} entra a la batalla!`;



            mostrarDano(
                "La IA envía una nueva carta.",
                "dano-enemigo"
            );



            mostrarCartasCombate();



            turnoJugador =
                false;


            turnoActual.textContent =
                "Turno de la IA";


            btnAtacar.disabled =
                true;



            setTimeout(
                function() {

                    ataqueEnemigo();

                },

                1000
            );

        } else {


            finalizarBatalla(
                "victoria"
            );

        }

    }



    // ==========================================
    // FINALIZAR BATALLA
    // ==========================================

    function finalizarBatalla(
        resultado
    ) {


        batallaTerminada =
            true;


        btnAtacar.disabled =
            true;



        let marcador =
            "";



        if (
            resultado === "victoria"
        ) {


            tituloResultado.textContent =
                "¡VICTORIA!";


            mensajeResultado.textContent =
                "Has derrotado las 5 cartas enemigas.";


            marcador =
                `5 - ${posicionJugador}`;

        } else {


            tituloResultado.textContent =
                "DERROTA";


            mensajeResultado.textContent =
                "La IA ha derrotado todas tus cartas.";


            marcador =
                `${posicionEnemigo} - 5`;

        }



        marcadorResultado.textContent =
            marcador;



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



        btnAtacar.disabled =
            true;



        let dano =
            cartaJugadorActual.ataque -
            cartaEnemigoActual.defensa;



        if (dano < 1) {

            dano =
                1;

        }



        cartaEnemigoActual.vida =
            cartaEnemigoActual.vida -
            dano;



        if (
            cartaEnemigoActual.vida <
            0
        ) {

            cartaEnemigoActual.vida =
                0;

        }



        animarAtaque(
            cartaJugadorElemento,
            cartaEnemigoElemento
        );



        mostrarDano(

            `${cartaJugadorActual.nombre} hizo ${dano} de daño`,

            "dano-jugador"

        );



        mensajeCombate.textContent =
            `Tu ataque impactó por ${dano} puntos.`;



        mostrarCartasCombate();



        if (
            cartaEnemigoActual.vida <= 0
        ) {


            setTimeout(
                function() {

                    cambiarCartaEnemigo();

                },

                550
            );


            return;

        }



        turnoJugador =
            false;


        turnoActual.textContent =
            "Turno de la IA";



        setTimeout(
            function() {

                ataqueEnemigo();

            },

            1000
        );

    }



    // ==========================================
    // ATAQUE DE LA IA
    // ==========================================

    function ataqueEnemigo() {


        if (batallaTerminada) {

            return;

        }



        let dano =
            cartaEnemigoActual.ataque -
            cartaJugadorActual.defensa;



        if (dano < 1) {

            dano =
                1;

        }



        cartaJugadorActual.vida =
            cartaJugadorActual.vida -
            dano;



        if (
            cartaJugadorActual.vida <
            0
        ) {

            cartaJugadorActual.vida =
                0;

        }



        animarAtaque(
            cartaEnemigoElemento,
            cartaJugadorElemento
        );



        mostrarDano(

            `${cartaEnemigoActual.nombre} hizo ${dano} de daño`,

            "dano-enemigo"

        );



        mensajeCombate.textContent =
            `La IA atacó por ${dano} puntos.`;



        mostrarCartasCombate();



        if (
            cartaJugadorActual.vida <= 0
        ) {


            setTimeout(
                function() {

                    cambiarCartaJugador();

                },

                550
            );


            return;

        }



        turnoJugador =
            true;


        turnoActual.textContent =
            "Turno del jugador";


        btnAtacar.disabled =
            false;

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


            if (
                mazoSeleccionado.length !== 5
            ) {


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



            arenaCombate.scrollIntoView({

                behavior:
                    "smooth"

            });

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
    // BOTÓN VER HISTORIAL
    // ==========================================

    btnContinuar.addEventListener(
        "click",
        function() {


            window.location.href =
                "./historial.html";

        }
    );



    // ==========================================
    // NUEVO BOTÓN CAMBIAR JUGADOR
    // ==========================================

    btnCambiarJugador.addEventListener(
        "click",
        function() {


            /*
                Eliminamos solamente los datos
                del jugador actual.

                NO eliminamos localStorage,
                por lo tanto el historial
                permanece guardado.
            */


            sessionStorage.removeItem(
                "jugadorNombre"
            );


            sessionStorage.removeItem(
                "jugadorClase"
            );



            window.location.href =
                "./inicio.html";

        }
    );



    // ==========================================
    // INICIAR PÁGINA
    // ==========================================

    mostrarCartas();

    mostrarMazo();

}


export { iniciarBatalla };