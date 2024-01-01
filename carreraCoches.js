document.addEventListener("DOMContentLoaded", function() {

let coches = [
    "furgo.png",
    "gris.png",
    "rojo.png",
    "verde.png",
    
]
let jugadores=0;
let ganadores=[];
let contador=0;
let contadorPartidas=0;


document.getElementById("Reiniciar").addEventListener("click", reiniciar);
document.getElementById("Iniciar").addEventListener("click",players);

function players(index) {
    $("#Reiniciar").hide();
    jugadores = parseInt(document.getElementById("num").value);
    let contenedorCarretera = document.querySelectorAll(".carretera");
    for (let i = 0; i < jugadores; i++) {
        let coche = document.createElement("img");
        coche.src = coches[i % coches.length]; // Cicla a través del array de coches
        coche.style.width = "50px";
        coche.style.height = "50px";
        coche.style.position = "absolute";
        coche.style.left = "0px";
        coche.style.top = "10px";
        coche.classList.add("coche");
        contenedorCarretera[i].appendChild(coche); // Agrega el coche a la carretera correspondiente
        let carreteraWidth = contenedorCarretera[i].clientWidth;
        let cocheWidth = coche.clientWidth;
        let maxLeft = carreteraWidth - cocheWidth; //Valor Meta = maximo pagina.
    
        // Animar el coche a una posición aleatoria dentro de la carretera
        $(coche).animate({
            left: Math.floor(Math.random() * 10 + 1) * maxLeft / 10
        }, {
            duration: 6000,
            complete: function () {
                ganadores[i] = coche.offsetLeft + cocheWidth; // Guardar el avance en el array
                contador++;
                if(contador===jugadores){
                    tablaGanadores(maxLeft);
                }    
            }
        });
            
    }
    $("#Reiniciar").show();
    $("#Iniciar").hide();
}


function reiniciar() {
    jugadores = 0;
    contador=0;
    $(".coche").remove();
    $("#Iniciar").show();
}

function tablaGanadores(maxLeft) {
    console.log("Ganadores:", ganadores); //prueba
    let ganadorIndex = ganadores.findIndex(posicion => posicion >= maxLeft); // Encuentra el índice del ganador
    console.log("GanadorIndex:", ganadorIndex); //prueba
    let ganador = coches[ganadorIndex];
    console.log("Ganador:", ganador); //prueba
    let tablaGanadores = document.getElementById("resultados");
    let fila = tablaGanadores.insertRow();
    let celdaPosicion = fila.insertCell(0);
    let celdaPosicion1 = fila.insertCell(1);
    let celdaCoche = fila.insertCell(2);
    contadorPartidas++;

    celdaPosicion.textContent = "Partida nº: " + contadorPartidas + "----";
    celdaPosicion1.textContent = "1ª Posición!!!" + "----";
    celdaCoche.innerHTML = "<img src='" + ganador + "' alt='Coche ganador' style='width: 50px; height: 50px;'>";

                                
}
});


