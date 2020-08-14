
export class tareaModel{
    id: string;
    nombre: string;
    titulo: string;
    descripcion: string;
    activo : boolean;
    tiempo : number;

    constructor(){
        this.activo = true;
        this.tiempo = 0;
    }
}