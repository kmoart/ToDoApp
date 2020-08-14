import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareaModel } from '../models/tarea.model';
import { map, delay } from 'rxjs/operators';// El operador map sirve para transformar lo que un observador puede regresar. o en este caso para transformar los servicios http .

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url = 'https://crud2-47c6c.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearTarea( tarea: tareaModel ){
      return this.http.post(`${this.url}/tareas.json`, tarea)
      .pipe( 
        map( (resp:any) => {
           tarea.id = resp.name;
           return tarea;
        })// El map recibiería la respuesta de la petición o lo que responda el http.post
          //Para éste caso sería la respuesta del name con el id
          //Se especifica a resp como tipo any para recibir cualquier cosa y poder escribir resp.name, si no sale error.
      );
  }


  actualizarTarea( tarea: tareaModel ){

    //Se crea un objeto temporal para guardar la tarea sin el id, para que no lo envié a la bd, porque no es necesario volverlo a guardar
    const tareaTemp = {
      //para no escribir todas la propiedades del objeto(pueden ser cientos o miles), se escribe lo siguiente 
      ...tarea
      //EL operador spread se encarga de tomar cada una de las propiedades de tarea y crearse una propiedad con el mismo nombre
    };

    delete tareaTemp.id;// se borra el id de la tarea temporal.

    return this.http.put(`${this.url}/tareas/${ tarea.id }.json`, tareaTemp);
  }

  borrarTarea( id:string ){

    return this.http.delete(` ${this.url}/tareas/${ id }.json`);

  }

  obtenerTarea( id: string ){
      return this.http.get( ` ${this.url}/tareas/${ id }.json`);
  }

  obtenerTareas(){

    return this.http.get(`${this.url}/tareas.json`)//para cambiar la obtención del objeto a una colección de arreglos se hace con el siguiente pipe.
    .pipe(
      map( resp=> this.crearArreglo( resp )),
      delay(1500)// Este map está recibiendo la info en resp y la está tranformando en cualquier cosa en este caso en un arreglo.
      );
  }


  private crearArreglo( tareasObj: object ){

    const tareas: tareaModel[] = [];

    if( tareas === null ){ return [];}

    Object.keys( tareasObj).forEach( key =>{

      const tarea: tareaModel = tareasObj[key];

      tarea.id= key; 

      tareas.push(tarea);
    })

    return tareas;
  }
}
