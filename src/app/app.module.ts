import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';//Se necesita para realizar consultas http para los servicios
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { TareaComponent } from './pages/tarea/tarea.component';
import { TareasComponent } from './pages/tareas/tareas.component';

registerLocaleData(localEs);

@NgModule({
  declarations: [
    AppComponent,
    TareaComponent,
    TareasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue : 'es'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
