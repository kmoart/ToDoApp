import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TareasComponent } from './pages/tareas/tareas.component';
import { TareaComponent } from './pages/tarea/tarea.component';

const routes: Routes = [
      { path: 'tareas', component: TareasComponent},
      { path: 'tarea/:id', component: TareaComponent},
      { path: '**', pathMatch: 'full', redirectTo: 'tareas'}
];

@NgModule({

  imports: [ 
    RouterModule.forRoot( routes ) //archivo de rutas principal al cual se le envían los routes o rutas.
  ],//Para utilizar el routerModule, de manera global o en otro modulo se debe exportar de la siguiente forma:
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }// Especificar éste AppRoutingModule en el archivo app.module en la sección imports.
