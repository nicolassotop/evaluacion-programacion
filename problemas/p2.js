/**
 * Problema número 2.
 * 
 * Genera un script/algoritmo/función que sea capaz de transformar los datos de input-p2.csv
 * en un arból de estructura similar al problema de p1 utilizando la estructura de Nodo.js
 */

const Nodo = require("./src/Nodo.js");
const raiz = new Nodo("root", "Raíz");

//Se guarda csv en constante 'csv'
const fs = require("fs");
const csv = fs.readFileSync("./src/input-p2.csv");


//Se separa el csv por los saltos de lineas para obtener un array donde cada elemento es una linea
var lineas = csv.toString().split("\n");

//Se elimina la cabecera
lineas.shift();

//Se define variable que se utilizará como flag para validar la existencia de los nodos
var existe = false;

//Se recorre el array de lineas
lineas.forEach((obj) => {


    //Separa por coma para distinguir todos los elementos
    var elemento = obj.split(",");

    //Se construyen los nodos 
    const nodoSede = new Nodo(elemento[0], "Sede"); //De acuerdo a la cabecera sabemos que el primer elemento es la sede
    const nodoCurso = new Nodo(elemento[1], "Curso"); //2do elemento es el curso
    const nodoSeccion = new Nodo(elemento[2], "Seccion"); //3er elemento es la seccion
    const nodoOferta = new Nodo(elemento[3], "Oferta"); //4to elemento la oferta

    /* TEST
    console.log("===========================================================");
    console.log(nodoSede);
    console.log("=======================");
    console.log(nodoCurso);
    console.log("===========================================================");
    */


    //========================================================================================================================================
    // Para agregar las sedes
    //========================================================================================================================================

    raiz.hijos.forEach((sede) => {

        //La validacion debe comenzar siempre en falso 
        existe = false;

        //Si la sede ya existe le asigno verdadero al flag existe
        if (sede.nombre == nodoSede.nombre) {

            existe = true;
        }
    });

    //Si la sede no existe
    if (!existe &&
        nodoSede.nombre != 'undefined' &&
        nodoSede.nombre != '') {
        //Se agrega validacion para lineas vacías al final del archivo

        //Agrego nodo sede a la raiz
        raiz.hijos.push(nodoSede);
    }


    //========================================================================================================================================
    // Para agregar los cursos
    //========================================================================================================================================

    //Recorro las sedes
    raiz.hijos.forEach((sede) => {

        //Devuelvo el flag a cero para utilizarlo con la misma lógica
        existe = false;

        //Recorro todos los cursos de la sede
        sede.hijos.forEach((curso) => {

            //Si el curso existe 
            if (curso.nombre == nodoCurso.nombre) {
                existe = true;
            }

        });

        //console.log(sede.nombre); //TEST

        //Se debe verificar que el curso no exista en la sede actual
        if (!existe &&
            nodoSede.nombre === sede.nombre &&
            nodoCurso.nombre != 'undefined'
        ) {
            //Si el curso no existe en la sede actual se agrega el nodo curso a la sede
            sede.hijos.push(nodoCurso);
        }
    });



    //========================================================================================================================================
    // Para agregar las secciones
    //========================================================================================================================================

    //Recorro sedes 
    raiz.hijos.forEach((sede) => {

        //Recorro cursos
        sede.hijos.forEach((curso) => {

            //Se setea flag a falso
            existe = false;

            //Se recorren secciones
            curso.hijos.forEach((seccion) => {

                //Si seccion existe 
                if (seccion.nombre == nodoSeccion.nombre) {
                    existe = true;
                }
            });

            //Valido si seccion no existe en curso y sede actual
            if (!existe &&
                nodoSede.nombre === sede.nombre &&
                nodoCurso.nombre === curso.nombre &&
                nodoSeccion.nombre != 'undefined'
            ) {
                //Se agrega la seccion al curso
                curso.hijos.push(nodoSeccion);
            }
        });
    });



    //========================================================================================================================================
    // Para agregar las ofertas
    //========================================================================================================================================

    //Se recorren sedes
    raiz.hijos.forEach((sede) => {

        //Se recorren cursos
        sede.hijos.forEach((curso) => {

            //Seteo flag a falso
            existe = false;

            //Se recorren secciones
            curso.hijos.forEach((seccion) => {

                //Se recorren ofertas
                seccion.hijos.forEach((oferta) => {

                    //SI oferta existe
                    if (oferta.nombre == nodoOferta.nombre) {
                        existe = true;
                    }
                });

                //Si oferta no existe en sede, curso y seccion actual
                if (!existe &&
                    nodoSede.nombre === sede.nombre &&
                    nodoCurso.nombre === curso.nombre &&
                    nodoSeccion.nombre === seccion.nombre &&
                    nodoOferta.nombre != 'undefined'
                ) {
                    //Se agrega oferta a seccion
                    seccion.hijos.push(nodoOferta);
                }
            });
        });
    });

});


//Se imprime resultado por consola
console.log(raiz);


/*
//Para validar nodos por consola
console.log(raiz.hijos[0]);
console.log("===================");
console.log(raiz.hijos[1]);
console.log("===================");
console.log(raiz.hijos[2]);
console.log("===================");
console.log(raiz.hijos[3]);
console.log("===================");
console.log(raiz.hijos[1].hijos[0]);
console.log("===================");
console.log(raiz.hijos[1].hijos[0].hijos[0]);
  
*/