import { Intervalo, type TipoIntervalo } from "../intervalo/Intervalo";
import { DiaEstado } from "./DiaEstado";

export class DiaDisponibilidad {
  private intervalos: Intervalo[] = [];
  private siguienteId = 1;
  private bloqueado = false;

crearIntervalo(): Intervalo {

  const intervalo = new Intervalo(
    String(this.siguienteId++),
    null,
    null,
    null
  );

  this.intervalos.push(intervalo);

  return intervalo;
}

configurarIntervalo(
  id: string,
  horaInicio: Date,
  horaFin: Date,
  tipo: TipoIntervalo
): void {

  const intervalo = this.intervalos.find(
    (i) => i.id === id
  );

  if (!intervalo) {
    throw new Error("Intervalo inexistente");
  }

  intervalo.configurar(
    horaInicio,
    horaFin,
    tipo
  );
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

  bloquear(): void {
       this.bloqueado = true;
  }

  desbloquear(): void {
       this.bloqueado = false;
  }

  obtenerEstado(): DiaEstado {

    if (this.bloqueado) {
      return DiaEstado.BLOQUEADO;;
    }

    const tieneIntervalosConfigurados =
      this.intervalos.some(
          (i) =>
          i.intervaloActivo() &&
          i.horaInicio !== null &&
          i.horaFin !== null &&
          i.tipo !== null
      );

    if (tieneIntervalosConfigurados) {
      return DiaEstado.HORARIO_ASIGNADO;
    }

    return DiaEstado.SIN_ASIGNAR;;
  }
}

