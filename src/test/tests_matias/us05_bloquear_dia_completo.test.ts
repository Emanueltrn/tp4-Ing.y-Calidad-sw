import { describe, expect, it } from "vitest";
import { DiaDisponibilidad } from "../../domain/disponibilidad/DiaDisponibilidad";
import { DiaEstado } from "../../domain/disponibilidad/DiaEstado";

describe("US05 - Bloquear día completo", () => {

  it("retorna BLOQUEADO cuando el día fue bloqueado", () => {

    /// -arrange
    const dia = new DiaDisponibilidad();

    /// -act
    dia.bloquear();
    const estado = dia.obtenerEstado();

    /// -assert
    expect(estado).toBe(DiaEstado.BLOQUEADO);
  });

});
