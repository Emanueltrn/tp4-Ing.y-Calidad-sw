import { sql } from "$lib/server/db";
import type { UnidadAntelacion } from "../../domain/preferencias/UnidadAntelacion";


export interface DiasHabilitadosRecord {
  Lunes: boolean;
  Martes: boolean;
  Miércoles: boolean;
  Jueves: boolean;
  Viernes: boolean;
  Sábado: boolean;
  Domingo: boolean;
}


export interface PreferenciaRecord {
  id: string;
  usuarioId: string;
  antelacionValor: number | null;
  antelacionUnidad: UnidadAntelacion | null;
  limiteReservasDiarias: number | null;
  diasHabilitados: DiasHabilitadosRecord;
}

export class PreferenciaRepository {
  async obtener(usuarioId: string): Promise<PreferenciaRecord | null> {
    const resultado = await sql<PreferenciaRecord[]>`
      SELECT
        id::text AS "id",
        usuario_id AS "usuarioId",
        antelacion_valor AS "antelacionValor",
        antelacion_unidad AS "antelacionUnidad",
        limite_reservas_diarias AS "limiteReservasDiarias",
        dias_habilitados AS "diasHabilitados"
      FROM preferencias_reuniones
      WHERE usuario_id = ${usuarioId}
      LIMIT 1
    `;

    const record = resultado[0];

    if (!record) {
      return null;
    }

    return {
      ...record,
      diasHabilitados:
        typeof record.diasHabilitados === "string"
          ? JSON.parse(record.diasHabilitados)
          : record.diasHabilitados
    };
  }

  async guardarAntelacion(
    usuarioId: string,
    valor: number,
    unidad: "HORAS" | "DIAS"
  ): Promise<void> {
    const existente = await this.obtener(usuarioId);

    if (existente) {
      await sql`
        UPDATE preferencias_reuniones
        SET
          antelacion_valor = ${valor},
          antelacion_unidad = ${unidad}
        WHERE usuario_id = ${usuarioId}
      `;
      return;
    }

    await sql`
      INSERT INTO preferencias_reuniones (
        usuario_id,
        antelacion_valor,
        antelacion_unidad
      )
      VALUES (
        ${usuarioId},
        ${valor},
        ${unidad}
      )
    `;
  }

  async guardarLimiteReservasDiarias(
    usuarioId: string,
    cantidad: number
  ): Promise<void> {
    const existente = await this.obtener(usuarioId);

    if (existente) {
      await sql`
        UPDATE preferencias_reuniones
        SET limite_reservas_diarias = ${cantidad}
        WHERE usuario_id = ${usuarioId}
      `;
      return;
    }

    await sql`
      INSERT INTO preferencias_reuniones (
        usuario_id,
        limite_reservas_diarias
      )
      VALUES (
        ${usuarioId},
        ${cantidad}
      )
    `;
  }

  async guardarDiasHabilitados(
    usuarioId: string,
    diasHabilitados: DiasHabilitadosRecord
  ): Promise<void> {
    const existente = await this.obtener(usuarioId);

    const json = JSON.stringify(diasHabilitados);

    if (existente) {
      await sql`
        UPDATE preferencias_reuniones
        SET dias_habilitados = ${json}::jsonb
        WHERE usuario_id = ${usuarioId}
      `;
      return;
    }

    await sql`
      INSERT INTO preferencias_reuniones (
        usuario_id,
        dias_habilitados
      )
      VALUES (
        ${usuarioId},
        ${json}::jsonb
      )
    `;
  }
}