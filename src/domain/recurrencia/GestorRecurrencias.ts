import type { TipoIntervalo } from "../intervalo/Intervalo";
import { InstanciaIntervalo } from "./InstanciaIntervalo.ts";

export interface CrearRecurrenciaParams {
  recurrenciaId: string;
  desde: Date;
  hasta: Date;
  diasSemana: number[];
  horaInicio: Date;
  horaFin: Date;
  tipo: TipoIntervalo;
}

export interface ModificarRecurrenciaFuturaParams {
  recurrenciaId: string;
  desde: Date;
  horaInicio: Date;
  horaFin: Date;
  tipo?: TipoIntervalo;
}

export class GestorRecurrencias {
  private instancias: InstanciaIntervalo[] = [];
  private siguienteId = 1;

  crearRecurrencia(params: CrearRecurrenciaParams): InstanciaIntervalo[] {
    this.validarRango(params.desde, params.hasta);
    this.validarHorario(params.horaInicio, params.horaFin);

    const diasUnicos = new Set(params.diasSemana);
    for (const dia of diasUnicos) {
      if (!Number.isInteger(dia) || dia < 0 || dia > 6) {
        throw new Error("El día de la semana debe estar entre 0 y 6");
      }
    }

    const nuevasInstancias: InstanciaIntervalo[] = [];
    let fecha = inicioDelDia(params.desde);
    const hasta = inicioDelDia(params.hasta);

    while (fecha <= hasta) {
      if (diasUnicos.has(fecha.getUTCDay())) {
        const instancia = new InstanciaIntervalo(
          String(this.siguienteId++),
          params.recurrenciaId,
          new Date(fecha),
          combinarFechaYHora(fecha, params.horaInicio),
          combinarFechaYHora(fecha, params.horaFin),
          params.tipo,
        );

        this.instancias.push(instancia);
        nuevasInstancias.push(instancia);
      }

      fecha = sumarDias(fecha, 1);
    }

    return nuevasInstancias;
  }

  modificarRecurrenciaFutura(
    params: ModificarRecurrenciaFuturaParams,
  ): InstanciaIntervalo[] {
    this.validarHorario(params.horaInicio, params.horaFin);
    const fechaEfectiva = inicioDelDia(params.desde).getTime();

    const afectadas = this.instancias.filter(
      (instancia) =>
        instancia.recurrenciaId === params.recurrenciaId &&
        inicioDelDia(instancia.fecha).getTime() >= fechaEfectiva,
    );

    for (const instancia of afectadas) {
      instancia.horaInicio = combinarFechaYHora(
        instancia.fecha,
        params.horaInicio,
      );
      instancia.horaFin = combinarFechaYHora(instancia.fecha, params.horaFin);

      if (params.tipo !== undefined) {
        instancia.tipo = params.tipo;
      }
    }

    return afectadas;
  }

  obtenerInstancias(recurrenciaId?: string): InstanciaIntervalo[] {
    const resultado = recurrenciaId
      ? this.instancias.filter(
          (instancia) => instancia.recurrenciaId === recurrenciaId,
        )
      : this.instancias;

    return [...resultado].sort(
      (a, b) => a.fecha.getTime() - b.fecha.getTime(),
    );
  }

  private validarRango(desde: Date, hasta: Date): void {
    if (inicioDelDia(desde) > inicioDelDia(hasta)) {
      throw new Error("La fecha inicial debe ser anterior o igual a la final");
    }
  }

  private validarHorario(horaInicio: Date, horaFin: Date): void {
    const minutosInicio = horaInicio.getUTCHours() * 60 + horaInicio.getUTCMinutes();
    const minutosFin = horaFin.getUTCHours() * 60 + horaFin.getUTCMinutes();

    if (minutosInicio >= minutosFin) {
      throw new Error("La hora de inicio debe ser menor que la hora de fin");
    }
  }
}

function inicioDelDia(fecha: Date): Date {
  return new Date(
    Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate()),
  );
}

function sumarDias(fecha: Date, cantidad: number): Date {
  const copia = new Date(fecha);
  copia.setUTCDate(copia.getUTCDate() + cantidad);
  return copia;
}

function combinarFechaYHora(fecha: Date, hora: Date): Date {
  return new Date(
    Date.UTC(
      fecha.getUTCFullYear(),
      fecha.getUTCMonth(),
      fecha.getUTCDate(),
      hora.getUTCHours(),
      hora.getUTCMinutes(),
      hora.getUTCSeconds(),
      hora.getUTCMilliseconds(),
    ),
  );
}
