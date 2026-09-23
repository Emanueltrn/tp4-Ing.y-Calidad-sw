import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";
import { Intervalo } from "../../domain/intervalo/Intervalo";

describe("US05 - Bloqueo inhabilita intervalos existentes", () => {

  it("mantiene los intervalos configurados y deja el día bloqueado", () => {

    /// -arrange
    const usuarioId = "admin-test-001";
    const fecha = new Date("2026-06-01");
    const dia = new DiaDisponibilidad("dia-test-001",usuarioId,fecha);

    const intervalo1 = new Intervalo(
      "intervalo-test-001",
      null,
      null,
      null
    );

    const intervalo2 = new Intervalo(
      "intervalo-test-002",
      null,
      null,
      null
    );

    dia.agregarIntervalo(intervalo1);
    dia.agregarIntervalo(intervalo2);

    dia.configurarIntervalo(
      intervalo1.id,
      new Date("2026-06-01T09:00:00"),
      new Date("2026-06-01T12:00:00"),
      "LABORAL"
    );

    dia.configurarIntervalo(
      intervalo2.id,
      new Date("2026-06-01T14:00:00"),
      new Date("2026-06-01T18:00:00"),
      "LABORAL"
    );

    /// -act
    dia.bloquear();

    /// -assert
    expect(dia.obtenerEstado()).toBe(DiaEstado.BLOQUEADO);
    expect(dia.obtenerIntervalos()).toHaveLength(2);
    expect(dia.obtenerIntervalos()[0].horaInicio).toEqual(
      new Date("2026-06-01T09:00:00")
    );
    expect(dia.obtenerIntervalos()[1].horaFin).toEqual(
      new Date("2026-06-01T18:00:00")
    );
    expect(dia.obtenerIntervalos()[0].tipo).toBe("LABORAL");
    expect(dia.obtenerIntervalos()[1].tipo).toBe("LABORAL");
  });

});
