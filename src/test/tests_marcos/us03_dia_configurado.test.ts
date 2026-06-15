import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US03 - Estado del Día", () => {

  it("retorna HORARIO_ASIGNADO cuando existe un intervalo configurado", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    const intervalo = dia.crearIntervalo();

    dia.configurarIntervalo(
      intervalo.id,
      new Date("2026-06-01T09:00:00"),
      new Date("2026-06-01T12:00:00"),
      "LABORAL"
    );

    /// -act
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.HORARIO_ASIGNADO);

  });

});