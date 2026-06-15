import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US03 - Estado del Día", () => {

  it("permanece SIN_ASIGNAR cuando solo existen intervalos sin configurar", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    dia.crearIntervalo();

    /// -act
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.SIN_ASIGNAR);

  });

});