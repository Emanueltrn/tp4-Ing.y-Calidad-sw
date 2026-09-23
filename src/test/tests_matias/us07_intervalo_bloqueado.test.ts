import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { Intervalo } from "../../domain/intervalo/Intervalo";

describe("US07 - Crear intervalo bloqueado", () => {

  it("crea un intervalo configurado como BLOQUEADO", () => {

    /// -arrange
    const usuarioId = "admin-test-001";
    const fecha = new Date("2026-06-01");
    const dia = new DiaDisponibilidad("dia-test-001",usuarioId,fecha);
    
    const intervalo = new Intervalo(
      "intervalo-test-001",
      null,
      null,
      null
    );

    dia.agregarIntervalo(intervalo);

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
