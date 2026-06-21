import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US06 - Rechazar intervalo inválido", () => {

  it("lanza error cuando fecha_inicio es mayor que fecha_fin", () => {

    /// -arrange
    const disponibilidad = new DiaDisponibilidad();

    const intervalo = disponibilidad.crearIntervalo();

    const fechaH_inicio = new Date("2026-06-01T10:00:00");

    const fechaH_fin = new Date("2026-06-01T09:00:00");

    /// -act + assert
    expect(() =>
      disponibilidad.configurarIntervalo(
        intervalo.id,
        fechaH_inicio,
        fechaH_fin,
        "LABORAL"
      )
    ).toThrow("La hora de inicio debe ser menor que la hora de fin");

  });

});