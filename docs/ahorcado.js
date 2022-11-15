var dict = [
    ["balon", "futbol", "cesped", "baloncesto", "porteria"],
    ["ordenador", "tablet", "telefono", "teclado", "servidor"],
    ["camiseta", "blusa", "pantalon", "abrigo", "polar"],
    ["mesa", "silla", "estanteria", "sillon", "lampara"]
]

var letrasRepetidas = [];
var palabra = "";
var palabra_array = "";
var palabra_guiones = "";
var puntuacion = 0;
var errores = 0;
var categoria = ""
var contador = "1";
partidas = 0;

function createTeclado() {

    var letras = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
        "Z", "X", "C", "V", "B", "N", "M"];

    var div = document.getElementById("teclado");
    var boton = "";

    for (var i = 0; i < letras.length; i++) {
        if (i % 10 == 0)
            document.getElementById("teclado").appendChild(document.createElement("br"));
        boton = ("<input id='" + letras[i] + "' class type='button' style='font-size:16px;margin:1px;padding:4px,font-weight:bold;color:white;background-color:#1883ba;border-color:#10618a' value='" + letras[i] + "' onclick=putLetter('" + letras[i] + "')>");
        div.innerHTML += boton;
    }

    /*for (i = 0; i < letras.length; i++) {
        var button = document.createElement("button");
        button.type = "button"
        button.innerHTML = letras[i];
        button.setAttribute("style", "margin:1px;padding:4px,font-weight:bold;color:white;background-color:#1883ba;border-color:#10618a");
        
        button.setAttribute("onclick", "putLetter("+letras[i]+")");
        if (i % 10 == 0)
            document.getElementById("teclado").appendChild(document.createElement("br"));
        document.getElementById("teclado").appendChild(button);
    }*/
}


function putLetter(letra) {//poner letra del teclado en type text

    var text = document.getElementById("letra");
    music = new Audio("sonido-click.mp3");
    music.play();
    text.value += letra.toLowerCase();
}

//1. Aparece las categorias
function chooseTopic() {
    if(contador=="1"){
    music = new Audio("musica-fondo.mp3");
    music.play()
    }
    contador == "2";
    var titulo = document.getElementById("titleTopic");
    var bEmpezar = document.getElementById("bStart");
    var select = document.getElementById("categorias");
    var bEnviar = document.getElementById("bEnviarCategoria");

    bEnviar.style.display = "block";
    titulo.style.display = "block";
    bEmpezar.style.display = "none";
    select.style.display = "block";
}

//2. detectar que categoria ha elegido
function chooseCategory() {

    var select = document.getElementById("categorias");
    var msgError = document.getElementById("msgError");
    var msgCategoria = document.getElementById("tipoCategoria");

    if (select != -1) {
        palabra = dict[select.value][randomNumber()];
        categoria = select.options[select.selectedIndex].text;
        msgCategoria.innerHTML = categoria
        startGame();
    } else {
        msgError.innerHTML = "Debes elegir una categoría";
    }
}

//3. Cuando pulsamos el boton de empezar, sale el juego
function startGame() {
    var puntuacion = document.getElementById("puntuacion");
    var errores = document.getElementById("errores");
    var repetidas = document.getElementById("letrasrep");
    var bStart = document.getElementById("bStart");
    var select = document.getElementById("categorias");
    var bEnviar = document.getElementById("bEnviarCategoria");
    var titulo = document.getElementById("titleTopic");
    var msgError = document.getElementById("msgError");
    var panelDer = document.getElementById("panel_der");
    var teclado = document.getElementById("teclado");
    var categoria = document.getElementById("categoria");
    var cont = document.getElementById("cont");

    cont.style.display = "block";
    categoria.style.display = "block";
    teclado.style.display = "block";
    panelDer.style.display = "block";
    msgError.style.display = "none";
    puntuacion.style.display = "block";
    errores.style.display = "block";
    repetidas.style.display = "block";
    bStart.style.display = "none";
    select.style.display = "none";
    bEnviar.style.display = "none";
    titulo.style.display = "none";
    if (partidas == 0) {
        createTeclado();
        partidas++;
        segundos()
    }
    getGuiones();
}


//4. palabra con guiones
function getGuiones() {

    var getPalabraGuiones = document.getElementById("palabra_guiones");
    getPalabraGuiones.style.display = "block";

    for (i = 0; i < palabra.length; i++) {
        palabra_guiones += "-";
    }
    getPalabraGuiones.innerHTML = palabra_guiones;
    console.log("La palabra es: " + palabra);
}

//5. comprobar letra correcta
function checkLetter() {
    //var form = document.getElementById("pedirLetra");
    var der = document.getElementById("panel_der");
    var letra = document.getElementById("letra").value;
    var getPalabraGuiones = document.getElementById("palabra_guiones");
    var numPuntuacion = document.getElementById("numPuntuacion");
    var erroresSpan = document.getElementById("numError");
    var imagen = document.getElementById("imagen");
    var errorText = document.getElementById("errorText");
    var fail = true;

    //console.log(palabra_array)
    if (((letra >= 'a' && letra <= 'z') || (letra == 'ñ'))) {
        if (letra.length != 0) {
            if (letra.length == 1) {//si es una letra
                if (!isRepeat(letra)) {
                    for (i = 0; i < palabra.length; i++) {
                        if (letra == palabra[i]) {
                            palabra_array = palabra_guiones.split('');
                            palabra_array[i] = letra;
                            palabra_array = arrayToString(palabra_array);
                            palabra_guiones = palabra_array;
                            //console.log(palabra_array)
                            getPalabraGuiones.innerHTML = palabra_array;
                            puntuacion += 10;
                            numPuntuacion.innerHTML = puntuacion;
                            fail = false;
                        }
                    }
                    repeatLetter(letra);//meter en array letras puestas
                } else {
                    //console.log("repe")
                    fail = false;
                }
                showRepes();
            } else {//si has introducido una palabra
                if (checkWord(letra)) {//fin partida -- GANAR
                    getPalabraGuiones.innerHTML = palabra;
                    bRepeat = document.getElementById("bRepeatGame");
                    bRepeat.style.display = "block";
                    der.style.display = "none";
                    puntuacion += 100;
                    numPuntuacion.innerHTML = puntuacion;
                    fail = false;
                    imagen.src = "images/win.gif";
                    imagen.style.display = "block";
                    var teclado = document.getElementById("teclado");
                    teclado.style.display = "none";
                    imagen.width = "300";
                    imagen.height = "330";
                    
                    //document.getElementById("contador").innerHTML="contador"
                    
                    return;
                }
            }

            if (fail) {//contador de errores
                errores++;
                erroresSpan.innerHTML = errores;
            }

            checkWord(palabra_array);

            if (finJuego(errores)) {//fin partida -- PERDER
                der.style.display = "none";
                getPalabraGuiones.innerHTML = palabra;
                var teclado = document.getElementById("teclado");
                teclado.style.display = "none";
                document.getElementById("contador").innerHTML="contador"

            }
            errorText.innerHTML = "";
        }

    } else {
        errorText.innerHTML = "Introduzca solo letras";
    }

    document.getElementById("letra").value = "";
    imagenes(errores);
    //console.log(letrasRepetidas)
}

//6. Letras repetidas
function repeatLetter(letra) {

    letrasRepetidas.push(letra);

}

//7. Mostrar Imagenes
function imagenes(errores) {

    var imagen = document.getElementById("imagen");

    if (errores > 0)
        imagen.style.display = "block";
    switch (errores) {
        case 1: imagen.src = "images/fail1.png";
            break;
        case 2: imagen.src = "images/fail2.png";
            break;
        case 3: imagen.src = "images/fail3.png";
            break;
        case 4: imagen.src = "images/fail4.png";
            break;
        case 5: imagen.src = "images/fail5.png";
            break;
        case 6: imagen.src = "images/fail6.png";
            break;
        case 7: imagen.src = "images/gameover.gif";
            bRepeat = document.getElementById("bRepeatGame");
            bRepeat.style.display = "block";
            break;
    }

}

function isRepeat(letra) {

    for (i = 0; i < letrasRepetidas.length; i++) {

        if (letra == letrasRepetidas[i])
            return true;
    }
    return false;
}

function showRepes() {

    var repes = document.getElementById("repetidas");

    for (i = 0; i < letrasRepetidas.length; i++) {

        repes.innerHTML = letrasRepetidas

    }
}

function randomNumber() {
    return Math.round(Math.random() * (4));
}

function arrayToString(palabra_array) {
    var string = "";
    for (var i = 0; i < palabra_array.length; i++) {
        string += palabra_array[i];
    }
    return string;
}

function finJuego(errores) {

    if (errores == 7)
        return true;
    else
        return false;

}

function checkWord(palabraIntroducida) {

    if (palabraIntroducida == palabra)
        return true;

}

function segundos() {
    
    contador = 1;
    var seg = document.getElementById("contador")
    var complemento = document.getElementById("seg");
    complemento.innerHTML = " seg"
    window.setInterval(function () {
        seg.innerHTML = contador;
        contador++;
    }, 1000);
    
}

function repeatGame() {
    puntuacion = document.getElementById("puntuacion");
    errores = document.getElementById("errores");
    repetidas = document.getElementById("letrasrep");
    bRepeat = document.getElementById("bRepeatGame");
    img = document.getElementById('imagen');
    categoria = document.getElementById("categoria")
    var cont = document.getElementById("cont")
    var getPalabraGuiones = document.getElementById("palabra_guiones");

    cont.style.display = "none";
    categoria.style.display = "none";
    getPalabraGuiones.style.display = "none";
    img.style.display = "none";
    bRepeat.style.display = "none";
    puntuacion.style.display = "none";
    errores.style.display = "none";
    repetidas.style.display = "none";
    document.getElementById("letra").value = "";
    errorText.innerHTML = "";

    letrasRepetidas = [];
    palabra = "";
    palabra_array = "";
    palabra_guiones = "";
    puntuacion = 0;
    errores = 0;
    categoria = "";
    contador = 0;

    //document.getElementById("tipoCategoria").innerHTML = categoria
    document.getElementById("numPuntuacion").innerHTML = puntuacion
    document.getElementById("numError").innerHTML = errores
    document.getElementById("repetidas").innerHTML = letrasRepetidas

    chooseTopic();
}