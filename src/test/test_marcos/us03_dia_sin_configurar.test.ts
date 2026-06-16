import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US03 - Estado del Día", () => {
  it("retotna el estado SIN_CONFIGURACION cuando no hay intervalos", () => {
    const disponibilidad = new DiaDisponibilidad();

    const estado = disponibilidad.obtenerEstado();

    expect(estado).toBe("SIN_CONFIGURACION");
  });
});
