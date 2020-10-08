import { HorarioConductor } from './horario-conductor';
export class Conductor {
  constructor(
    public id: number,
    public nombre: string,
    public cedula: string,
    public telefono: string,
    public direccion: string
  ) {}

}
