import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US03 - Estado del Día", () => {

  it("retorna SIN_ASIGNAR cuando no existen intervalos", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    /// -act
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.SIN_ASIGNAR);
  });

});