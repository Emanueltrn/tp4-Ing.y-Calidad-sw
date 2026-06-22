import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US07 - Crear intervalo bloqueado", () => {

  it("crea un intervalo configurado como BLOQUEADO", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();
    const intervalo = dia.crearIntervalo();

    /// -act
    dia.configurarIntervalo(
      intervalo.id,
      new Date("2026-06-01T09:00:00"),
      new Date("2026-06-01T12:00:00"),
      "BLOQUEADO"
    );

    /// -assert
    expect(intervalo.horaInicio).toEqual(new Date("2026-06-01T09:00:00"));
    expect(intervalo.horaFin).toEqual(new Date("2026-06-01T12:00:00"));
    expect(intervalo.tipo).toBe("BLOQUEADO");
    expect(dia.obtenerIntervalos()).toHaveLength(1);
  });

});
