import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US05 - Bloqueo inhabilita intervalos existentes", () => {

  it("mantiene los intervalos configurados y deja el día bloqueado", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    const intervalo1 = dia.crearIntervalo();
    const intervalo2 = dia.crearIntervalo();

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
