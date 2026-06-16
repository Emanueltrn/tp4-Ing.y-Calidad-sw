import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US03 - Estado del Día", () => {
  it("retorna el estado CONFIGURADO cuando tiene intervalos laborales", () => {
    const disponibilidad = new DiaDisponibilidad();
    const fechaH_inicio = new Date("2026-06-01T09:00:00");
    const fechaH_fin = new Date("2026-06-01T12:00:00");

    disponibilidad.crearIntervalo(fechaH_inicio, fechaH_fin, "LABORAL");
    const estado = disponibilidad.obtenerEstado();

    expect(estado).toBe("CONFIGURADO");
  });
});
