import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US09 - Eliminar intervalo existente", () => {
  it("elimina un intervalo previamente agregado", () => {

    // -arrange
    const disponibilidad = new DiaDisponibilidad();

    const intervalo = disponibilidad.crearIntervalo(
      new Date("2026-06-01T09:00:00"),
      new Date("2026-06-01T12:00:00"),
      "LABORAL"
    );

    // -act
    disponibilidad.eliminarIntervalo(intervalo.id);

    // -assert
    expect(disponibilidad.obtenerIntervalos()).toHaveLength(0);
  });
});