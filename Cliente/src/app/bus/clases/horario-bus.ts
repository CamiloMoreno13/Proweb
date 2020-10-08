import { Conductor } from '../../conductor/clases/conductor';
import { Bus } from './bus';
import { Ruta } from '../../ruta/clases/ruta/ruta';
export class HorarioBus {

    constructor(
        public id: number,
        public fecha: Date,
        public ruta: Ruta,
        public bus: Bus
    ) {}
}
