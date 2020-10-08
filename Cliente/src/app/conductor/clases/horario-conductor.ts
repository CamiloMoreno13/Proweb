import { Conductor } from './conductor';
import { Bus } from '../../bus/clases/bus';
export class HorarioConductor {

    constructor(
        public id: number,
        public fecha: Date,
        public conductor: Conductor,
        public bus: Bus
    ) {}
}

