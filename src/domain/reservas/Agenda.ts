import type { LimiteReservasDiarias } from "../preferencias/LimiteReservasDiarias";
import { Reserva } from "./Reserva";

export class Agenda {

  private reservas: Reserva[] = [];

  constructor(
    private limiteReservasDiarias:
      LimiteReservasDiarias
  ) {}
  
  agregarReserva(reserva: Reserva): void {

    const cantidadReservas =
      this.cantidadReservasDelDia(
        reserva.fechaTurno
      );

    if (
      cantidadReservas >= this.limiteReservasDiarias.cantidad
    ) {
      throw new Error(
        "Se alcanzó el límite de reservas diarias."
      );
    }

    this.reservas.push(reserva);
  }

  cantidadReservasDelDia(
    fecha: Date
  ): number {

    return this.reservas.filter(
      (r) =>
        r.fechaTurno.getFullYear() === fecha.getFullYear() &&
        r.fechaTurno.getMonth() === fecha.getMonth() &&
        r.fechaTurno.getDate() === fecha.getDate()
    ).length;
  }
}