import { AntelacionMinima } from "../preferencias/AntelacionMinima";

export class Reserva {

  constructor(
    public readonly fechaTurno: Date
  ) {}

  cumpleAntelacion(
    fechaActual: Date,
    antelacion: AntelacionMinima
  ): boolean {

    const diferenciaHoras =
      (this.fechaTurno.getTime() - fechaActual.getTime())
      / (1000 * 60 * 60);

    return (
      diferenciaHoras >=
      antelacion.obtenerHoras()
    );
  }

}