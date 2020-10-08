import { HorarioBus } from '../../../bus/clases/horario-bus';
import { HorarioRuta } from './horario-ruta';
import { Estacion } from '../estacion/estacion';

export class Ruta {

    constructor(public id: number,
                public codigo: string
    ) {

    }
}
