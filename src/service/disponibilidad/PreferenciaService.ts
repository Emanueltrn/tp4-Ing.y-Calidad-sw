import {
  AntelacionMinima
} from "../../domain/preferencias/AntelacionMinima";

import {
  LimiteReservasDiarias
} from "../../domain/preferencias/LimiteReservasDiarias";

import {
  PreferenciasReuniones
} from "../../domain/preferencias/PreferenciaReuniones";

import {
  UnidadAntelacion
} from "../../domain/preferencias/UnidadAntelacion";

import {
  PreferenciaRepository,
  type DiasHabilitadosRecord,
  type PreferenciaRecord
} from "../../repository/disponibilidad/PreferenciaRepository";

export class PreferenciaService {
  constructor(
    private readonly preferenciaRepository: PreferenciaRepository
  ) {}

  async obtenerPreferencias(
    usuarioId: string
  ): Promise<PreferenciasReuniones> {
    const record =
      await this.preferenciaRepository.obtener(usuarioId);

    if (!record) {
      return new PreferenciasReuniones(usuarioId);
    }

    return this.mapearRecordADominio(record);
  }

  async guardarAntelacionMinima(
    usuarioId: string,
    valor: number,
    unidad: UnidadAntelacion
  ): Promise<void> {
    const antelacion = new AntelacionMinima(valor, unidad);

    await this.preferenciaRepository.guardarAntelacion(
      usuarioId,
      antelacion.valor,
      antelacion.unidad
    );
  }

  async guardarLimiteReservasDiarias(
    usuarioId: string,
    cantidad: number
  ): Promise<void> {
    const limite = new LimiteReservasDiarias(cantidad);

    await this.preferenciaRepository.guardarLimiteReservasDiarias(
      usuarioId,
      limite.cantidad
    );
  }

    async obtenerDiasHabilitados(
      usuarioId: string
    ): Promise<DiasHabilitadosRecord> {
      const record = await this.preferenciaRepository.obtener(usuarioId);

      if (!record) {
        return this.obtenerDiasHabilitadosPorDefecto();
      }

      console.log(
        record.diasHabilitados,
        typeof record.diasHabilitados
      );

      return record.diasHabilitados;
    }

  async guardarDiasHabilitados(
    usuarioId: string,
    diasHabilitados: DiasHabilitadosRecord
  ): Promise<void> {
    this.validarDiasHabilitados(diasHabilitados);

    await this.preferenciaRepository.guardarDiasHabilitados(
      usuarioId,
      diasHabilitados
    );
  }

  private mapearRecordADominio(
    record: PreferenciaRecord
  ): PreferenciasReuniones {
    const preferencias =
      new PreferenciasReuniones(record.usuarioId);

    if (
      record.antelacionValor !== null &&
      record.antelacionUnidad !== null
    ) {
      const antelacion = new AntelacionMinima(
        record.antelacionValor,
        record.antelacionUnidad
      );

      preferencias.guardarAntelacionMinima(antelacion);
    }

    if (record.limiteReservasDiarias !== null) {
      const limite = new LimiteReservasDiarias(
        record.limiteReservasDiarias
      );

      preferencias.guardarLimiteReservasDiarias(limite);
    }

    return preferencias;
  }

  private obtenerDiasHabilitadosPorDefecto(): DiasHabilitadosRecord {
    return {
      Lunes: true,
      Martes: true,
      Miércoles: true,
      Jueves: true,
      Viernes: true,
      Sábado: true,
      Domingo: true
    };
  }

  private validarDiasHabilitados(
    diasHabilitados: DiasHabilitadosRecord
  ): void {
    const diasEsperados = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo"
    ];

    const claves = Object.keys(diasHabilitados);

    if (claves.length !== diasEsperados.length) {
      throw new Error(
        "La configuración debe contener exactamente los siete días de la semana."
      );
    }

    for (const dia of diasEsperados) {
      if (
        typeof diasHabilitados[dia as keyof DiasHabilitadosRecord] !==
        "boolean"
      ) {
        throw new Error(
          `El valor del día ${dia} debe ser booleano.`
        );
      }
    }
  }
}