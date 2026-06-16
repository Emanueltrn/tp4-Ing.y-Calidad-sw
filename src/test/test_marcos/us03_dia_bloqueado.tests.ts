import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";

describe("US03 - Estado del Día", () => {
  it("retorna el estado BLOQUEADO cuando tiene un intervalo de bloqueo", () => {
    const disponibilidad = new DiaDisponibilidad();
    const fechaH_inicio = new Date("2026-06-01T00:00:00");
    const fechaH_fin = new Date("2026-06-01T23:59:59");

    disponibilidad.crearIntervalo(fechaH_inicio, fechaH_fin, "BLOQUEADO");
    const estado = disponibilidad.obtenerEstado();

    expect(estado).toBe("BLOQUEADO");
  });
});
