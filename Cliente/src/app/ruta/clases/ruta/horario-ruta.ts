import { Ruta } from './ruta';

export class HorarioRuta {

    constructor(
        public id: number,
        public fechaInicio: Date,
        public fechaFin: Date,
        public ruta: Ruta
    ) {

    }
}
