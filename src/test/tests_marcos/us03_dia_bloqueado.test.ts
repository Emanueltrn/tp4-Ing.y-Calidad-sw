import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US05 - Bloqueo de día", () => {

  it("retorna BLOQUEADO cuando el día fue bloqueado manualmente", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    const intervalo = dia.crearIntervalo();

    dia.configurarIntervalo(
      intervalo.id,
      new Date("2026-06-01T09:00:00"),
      new Date("2026-06-01T12:00:00"),
      "LABORAL"
    );

    dia.bloquear();

    /// -act
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.BLOQUEADO);

  });

});