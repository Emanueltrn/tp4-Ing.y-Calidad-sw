import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US03 - Estado del Día", () => {

  it("retorna SIN_ASIGNAR cuando no existen intervalos", () => {

    /// -arrange
    const usuarioId = "admin-test-001";
    const fecha = new Date("2026-06-01");
    const dia = new DiaDisponibilidad("dia-test-001",usuarioId,fecha);

    /// -act
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.SIN_ASIGNAR);
  });

});