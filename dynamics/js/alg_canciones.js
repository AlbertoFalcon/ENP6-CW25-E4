let likeBtn = document.getElementById("likeBtn");
let idCancion;

//objeto donde se guardan las canciones y se ordenan
class al_recom
{
    constructor()
    {
        this.lista = {puntajeTotal: 0};
        this.cancionesPorProbabilidad = [];
    }
    //Cambia el atributo booleano like del objeto con el nombre del iCancion en la clase al_recom
    agregarQuitarCancionesLike(idCancion)
    {
        if(this.lista[idCancion].like === true)
        {
            this.lista[idCancion] = {...this.lista[idCancion],
                like: false,
                puntaje: this.lista[idCancion].reproducciones
            };
            this.lista.puntajeTotal -= this.lista[idCancion].reproducciones*0.5;
        }
        else
        {
            this.lista[idCancion] = {...this.lista[idCancion], like: true};
            this.lista.puntajeTotal += this.lista[idCancion].reproducciones*0.5;
        }
    }
    //Agrega la reproduccion a el objeto con idCancion en la clase al_recom
    contadorReproducciones(reproduccionesCancion, idCancion)
    {
        this.lista[idCancion] ={...this.lista, reproducciones: reproduccionesCancion += 1};
        this.lista.puntajeTotal += reproduccionesCancion;
    }
    //El algoritmo ordena las canciones en base a el de mayor puntajr32e
    ordenarCancionesPorProbabilidad()
    {
        this.cancionesPorProbabilidad = Object.entries(this.lista);
        this.cancionesPorProbabilidad.sort((a,b)=>b.puntaje - a.puntaje);
    }
}

likeBtn.addEventListener("click",()=>{
    al_recom.agregarQuitarCancionesLike(idCancion);
});