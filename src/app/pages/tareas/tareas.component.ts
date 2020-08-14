import { Component, OnInit, Pipe } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { tareaModel } from 'src/app/models/tarea.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tareas: tareaModel[] = [];
  cargando = false;
  fecha     : Date   = new Date();
  tiempo: number= 0;
  tiempoagregado: boolean= false;

  constructor( private tareasService: TareasService) { }

  ngOnInit(): void {//Uso ngOnINit para trase la infomración de las tareas

    this.cargando = true;

    this.tareasService.obtenerTareas()
      .subscribe( resp => {
        this.tareas = resp;
        this.cargando = false;
      });
  }

  borrarTarea( tarea: tareaModel, i: number){

    Swal.fire('¿Está seguro?',`Está seguro que desea borrar a ${tarea.nombre}`,'question')
    .then( resp => {
        if( resp.value ){
          this.tareas.splice(i, 1)
          this.tareasService.borrarTarea( tarea.id )
          .subscribe();
        }
    });

  }

  agregarTiempo( tarea: tareaModel, i: number){

    if(tarea.activo){
      tarea.tiempo= tarea.tiempo +1;
    }
  }

}
