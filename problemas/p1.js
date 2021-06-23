/**
 * Problema número 1.
 *
 * Necesitamos que obtengas los datos de ./src/input-p1.json y generes funciones que permitan:
 *
 * 1. Retornar todos los nodos que no tienen hijos.
 * 2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
 * 3. Contabilizar la cantidad de nodos totales
 * 4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
 */

const data = require("./src/input-p1.json");
//console.log(data);

//========================================================================================================================================
//1. Retornar todos los nodos que no tienen hijos.
//========================================================================================================================================

var respuestaP1 =[];
nodosSinHijos(data);

//Para imprimir respuesta por consola
//console.log(respuestaP1);

function nodosSinHijos(data){
    //Valido cantidad de hijos. Si es cero agrego la data al array
    if(Object(data).hijos.length === 0){        
        return respuestaP1.push(data);
        
        //Si solo necesito respuesta mediante consola se puede mostrar cada nodo por separado, imprimiendolo en cada iteracion
        //return console.log(data);        
    }
    else{ 
        //Si no es cero llamo a la función para cada uno de los hijos
        data.hijos.map( hijo => nodosSinHijos(hijo));
    }
}




//========================================================================================================================================
//2. Retornar todos los nodos que contienen una cantidad X (parametrizable) de hijos
//========================================================================================================================================


const cantidadDeNodos = 0;
var respuestaP2 =[];

nodosConXHijos(data,cantidadDeNodos);

//Para ver respuesta pr consola
//console.log(respuestaP2);


//Serviría también para responder a pregunta 1:
//nodosConXHijos(data,0);

//Utilizando la misma lógica que en P1
function nodosConXHijos(data, cantHijos){    
    //Valido cantidad de hijos, si es igual al valor consultado agrego la data al array   
    if (Object(data).hijos.length === cantHijos) {        
            return respuestaP2.push(data);

            //Si solo lo requiero por consola puedo mostrar cada nodo por separado
            //return console.log(data);
    }
    else{
        //Si no, llamo a la misma función para cada hijo        
        data.hijos.map( hijo => nodosConXHijos(hijo,cantHijos));
    }
}


//========================================================================================================================================
//3. Contabilizar la cantidad de nodos totales
//========================================================================================================================================

//Esta función no considera el nodo raiz en el total, por lo que si se desea tomar en cuenta se debería sumar 1
var respuestaP3 = contarNodos(data);

//Para ver respuesta por consola
//console.log(respuestaP3);


function contarNodos(data) {
    //Cantidad de hijos
    var cantidad = data.hijos.length;

    //Se cuentan los hijos de los hijos y se suma a la variable cantidad
    //Reduce simplifica el recorrido de los elementos y la suma
    cantidad += data.hijos.reduce((a, e) => a + contarNodos(e), 0);

    // Se puede agregar  el elemento cantNodos para saber la cantidad de nodos de cada sub-nodo y tener un mejor detalle
    // Se dejará comentado para no modificar 'data' 
    //data.cantNodos = cantidad; 

    // Se retorna cantidad para ser usada en objeto padre
    return cantidad; 
}




//========================================================================================================================================
//4. Retornar todas las Sedes con 4° Medio que *SI* poseen la *Oferta Tecnología* en sus *Secciones A*
//========================================================================================================================================

//Filtros requeridos:
const curso = "4 Medio";
const seccion = "A";
const oferta = "Tecnología";

var respuestaP4 = [];
obtenerSedes(data,curso,seccion,oferta);

//Para imprimir respuesta por consola
console.log(respuestaP4);


function obtenerSedes(data,curso,seccion,oferta) {

    //Se recorren las sedes
    data.hijos.map(sedes => {

        //Se recorren cursos
        sedes.hijos.map( cursos => {  

            //Se valida si el curso corresponde
            if (cursos.tipo === "Curso" && cursos.nombre === curso) {                

                //Se recorren las secciones
               cursos.hijos.map( secciones => {                   
                    
                    //Se valida si la sección corresponde
                    if (secciones.tipo === "Seccion" && secciones.nombre === seccion) {

                        //Se recorren las ofertas
                        secciones.hijos.map( ofertas => {

                            //Se valida si la oferta corresponde
                            if (ofertas.tipo === "Oferta" && ofertas.nombre === oferta) {
                                
                                //Si corresponde, se agrega la sede a la lista
                                respuestaP4.push(sedes);

                            }
                        });
                    }
                });
            }
        });
    });

    return respuestaP4;

}
