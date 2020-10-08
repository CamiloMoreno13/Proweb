import { Ruta } from './ruta';
import { Estacion } from '../estacion/estacion';
export class EstacionRutas {

    constructor(
        public id: number,
        public ruta: Ruta,
        public estacion: Estacion
    ) {}
}
