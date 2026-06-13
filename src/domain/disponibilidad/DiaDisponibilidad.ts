import { Intervalo, type TipoIntervalo } from "../intervalo/Intervalo";

export class DiaDisponibilidad {
  private intervalos: Intervalo[] = [];
  private siguienteId = 1;

  crearIntervaloVacio(intervalo: Intervalo): void {
    this.intervalos.push(intervalo);
  }

  crearIntervalo(
    horaInicio: Date,
    horaFin: Date,
    tipo: TipoIntervalo
  ): Intervalo {

    if (horaInicio >= horaFin) {
      throw new Error(
        "La hora de inicio debe ser menor que la hora de fin"
      );
    }

    const intervalo = new Intervalo(
      String(this.siguienteId++),
      horaInicio,
      horaFin,
      tipo
    );

    this.intervalos.push(intervalo);

    return intervalo;
  }

  eliminarIntervalo(id: string): void {

    const intervalo = this.intervalos.find(
      (i) => i.id === id
    );

    if (!intervalo) {
      throw new Error("Intervalo inexistente");
    }

    intervalo.eliminarIntervalo();
  }

  obtenerIntervalos(): Intervalo[] {

    return this.intervalos.filter(
      (i) => i.intervaloActivo()
    );
  }
}