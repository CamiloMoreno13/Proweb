import { HorarioBus } from './horario-bus';
import { HorarioConductor } from '../../conductor/clases/horario-conductor';
export class Bus {

    constructor(
        public id: number,
        public placa: string,
        public modelo: string
    ) {}
}