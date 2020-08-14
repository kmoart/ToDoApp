import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { tareaModel } from '../../models/tarea.model';
import { TareasService } from '../../services/tareas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit{

  tarea = new tareaModel();

  constructor( private tareasService: TareasService,
              private route: ActivatedRoute ) { }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if( id !== 'nueva'){      

      this.tareasService.obtenerTarea( id )
        .subscribe( (resp:tareaModel) => {
          this.tarea = resp;
          this.tarea.id = id;
          console.log( resp );
      });
    }
  }

  Guardar( form: NgForm ){

    if( form.invalid ){
        console.log('Formulario no válido');
        return;
    }

    Swal.fire('Espere','Guardando información', 'info');
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.tarea.id){// Si el id de la tarea existe , voy a llamar el servicio de actualizarTarea, si no llamo el servicio de crearTarea
      peticion = this.tareasService.actualizarTarea( this.tarea );
        /*.subscribe( resp=>{
          console.log( resp );
        });*/

    } else{
      peticion = this.tareasService.crearTarea( this.tarea );
        /*.subscribe( resp=>{
          console.log( resp );
          this.tarea = resp;
        });*/
    }

    peticion.subscribe( resp =>{
      Swal.fire(this.tarea.nombre,'se actualizó correctamente', 'success');
    });
    
  }
}
