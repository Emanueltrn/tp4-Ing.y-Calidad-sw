import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US06 - Crear intervalo laboral válido", () => {
  it("crea un intervalo cuando fecha_inicio < fecha_fin", () => {

    // -arrange
    const disponibilidad = new DiaDisponibilidad();

    const fechaH_inicio = new Date("2026-06-01T09:00:00");
    const fechaH_fin = new Date("2026-06-01T12:00:00");

    // -act
    const intervalo = disponibilidad.crearIntervalo(
      fechaH_inicio,
      fechaH_fin,
      "LABORAL"
    );

    // -assert
    expect(intervalo.horaInicio).toEqual(fechaH_inicio);
    expect(intervalo.horaFin).toEqual(fechaH_fin);
    expect(intervalo.tipo).toBe("LABORAL");
    expect(disponibilidad.obtenerIntervalos()).toHaveLength(1);
  });
});