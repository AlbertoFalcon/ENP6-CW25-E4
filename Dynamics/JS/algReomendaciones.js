let likeBtn = document.getElementById("likeBtn");
let crearPlaylistBtn = document.getElementById("crearPlaylistBtn");
let idCancion;

//objeto donde se guardan las canciones y se ordenan
class al_recom
{

    //Objeto de la lista y arreglo de canciones por probabilidad
    constructor()
    {
        this.lista = {puntajeTotal: 0};
        this.cancionesPorProbabilidad = [];
        this.playlists = [];
        this.cancionesDelCeroAUno = [];
    }

    //Cambia el atributo booleano like del objeto con el nombre del iCancion en la clase al_recom
    agregarQuitarCancionesLike(idCancion)
    {
        this.verificarCancion(idCancion);
        if(this.lista[idCancion].like === true)
        {
            this.lista[idCancion] = {...this.lista[idCancion],
                like: false,
            };
        }
        else
        {
            this.lista[idCancion] = {...this.lista[idCancion], like: true};
        }
        this.calcularPuntaje(idCancion);
    }

    //Agrega la reproduccion a el objeto con idCancion en la clase al_recom
    contadorReproducciones(reproduccionesCancion, idCancion)
    {
        this.verificarCancion(idCancion);
        this.lista[idCancion].reproducciones = reproduccionesCancion + 1;
        this.calcularPuntaje(idCancion);
    }
    //Calcula el puntaje para asignar una probabilidad a que aparezcan en el algoritmo de recomendacion
    calcularPuntaje(idCancion)
    {
        this.lista[idCancion].puntaje = this.lista[idCancion].reproducciones;
        if(this.lista[idCancion].like === true)
            this.lista[idCancion].puntaje += this.lista[idCancion].reproducciones*0.5;
    }
    //Suma todos los puntos
    contarPuntajeTotal()
    {
        let total = 0;
        for(let i = 0; i < this.cancionesPorProbabilidad.length; i++)
        {
            total += this.cancionesPorProbabilidad[i][1].puntaje || 0;
        }
        this.lista.puntajeTotal = total;
    }
    //El algoritmo ordena las canciones en base a el de mayor puntajr32e
    ordenarCancionesPorProbabilidad()
    {
        this.cancionesPorProbabilidad = Object.entries(this.lista);
        this.cancionesPorProbabilidad = this.cancionesPorProbabilidad.filter(([id]) => id != "puntajeTotal");
        this.cancionesPorProbabilidad = this.cancionesPorProbabilidad.sort((a,b)=>b[1].puntaje - a[1].puntaje);
    }

    //Agrega el atributo a la canción con el nombre de la playlist
    agregarAPlaylist(idCancion,nombrePlaylist)
    {
        this.verificarCancion(idCancion);
        if(this.lista[idCancion][nombrePlaylist] === false)
            this.lista[idCancion][nombrePlaylist] = true;
        else
            this.lista[idCancion][nombrePlaylist] = false;
    }
    //verifica que todos los atributos existan
    verificarCancion(idCancion)
    {
        if (!this.lista[idCancion]) 
        {
            this.lista[idCancion] = 
            {
                reproducciones: 0,
                like: false,
                puntaje: 0
            };
        }

        if (!this.lista[idCancion].hasOwnProperty("reproducciones")) 
        {
            this.lista[idCancion].reproducciones = 0;
        }

        if (!this.lista[idCancion].hasOwnProperty("like")) 
        {
            this.lista[idCancion].like = false;
        }

        if (!this.lista[idCancion].hasOwnProperty("puntaje"))
        {
            this.lista[idCancion].puntaje = 0;
        }
    }  
    //guarda preferencias de canciones en cookie xdxd
    guardarDatosEnCookie() 
    {
        let datosRecomendacion = JSON.stringify(this.cancionesPorProbabilidad);
        document.cookie = `recomendaciones=${encodeURIComponent(datosRecomendacion)}; path=/; expires=Fri, 31 Dec 2027 23:59:59 GMT`;
        let datosPlaylists = JSON.stringify(this.playlists);
        document.cookie = `playlists=${encodeURIComponent(datosPlaylists)}; path=/; expires=Fri, 31 Dec 2027 23:59:59 GMT`;
    }
    //trae el arreglo "cancionesPorProbabilidad" desde la cookie
    cargarDatosDesdeCookie() 
    {
        const cookies = document.cookie.split("; ");
        for (let c of cookies) 
        {
            const [key, value] = c.split("=");
            if (key === "recomendaciones") 
            {
                try 
                {
                    const datos = JSON.parse(decodeURIComponent(value));
                    if (Array.isArray(datos)) 
                    {
                        this.cancionesPorProbabilidad = datos; 
                    }
                } 
                catch (e) 
                {
                    console.error("Error al parsear la cookie:", e);
                }   
                break;
            }
        }
        const galletas = document.cookie.split("; ");
        for (let c of galletas) 
        {
            const [key, value] = c.split("=");
            if (key === "playlists") 
            {
                try 
                {
                    const datos = JSON.parse(decodeURIComponent(value));
                    if (Array.isArray(datos)) 
                    {
                        this.playlists = datos;
                    }
                } 
                catch (e) 
                {
                    console.error("Error al parsear la cookie:", e);
                }   
                break;
            }
        }
    }
    //Actualiza las canciones por probabilidad y cuenta el puntaje total
    actualizarSistema()
    {
        this.obtenerPlaylists();
        this.ordenarCancionesPorProbabilidad();
        this.contarPuntajeTotal();
        this.guardarDatosEnCookie();
    }
    //obtiene las playlist de canciones por probabilidad y las pasa a un arreglo que se llama playlists xd
    obtenerPlaylists() 
    {
        let playlistsMap = new Map();
        for (let [id, datos] of this.cancionesPorProbabilidad) 
        {
            for (let clave in datos) 
            {
                if (datos[clave] === true && !["reproducciones", "like", "puntaje"].includes(clave)) 
                {
                    if (!playlistsMap.has(clave)) 
                        playlistsMap.set(clave, []);
                    playlistsMap.get(clave).push(id);
                }
            }
        }
        this.playlists = Array.from(playlistsMap.entries());
        //elimina de canciones por probabilidad las que no son reproducciones like o puntaje
        this.cancionesPorProbabilidad = this.cancionesPorProbabilidad.map(([id, datos]) => 
        {
            const datosFiltrados = Object.fromEntries(
            Object.entries(datos).filter(([clave]) =>["reproducciones", "like", "puntaje"].includes(clave)));
            return [id, datosFiltrados];
        });
    }
    //Ordenar el puntaje del uno a el cero
    ordenarPuntajeUnoACero()
    {
        for(let [id, datos] of this.cancionesPorProbabilidad)
        {
            let probabilidad = datos.puntaje/this.lista.puntajeTotal;
            this.cancionesDelCeroAUno.push([id, probabilidad]);
        }
    }
    recomendacionCancion()
    {
        const numeroRandom = Math.random();
        for(let [id, datos] of this.cancionesPorProbabilidad)
        {
            if()
        }
    }
}

let systCancion = new al_recom();

//Cuando alguien da like agrega a la cancion el atributo like
likeBtn.addEventListener("click",()=>{
    systCancion.agregarQuitarCancionesLike(idCancion);
    systCancion.actualizarSistema();
});

//Agrega a la playlist una cancion
crearPlaylistBtn.addEventListener("click",()=>{
    systCancion.agregarAPlaylist(idCancion,nombrePlaylist);
    systCancion.actualizarSistema();
});