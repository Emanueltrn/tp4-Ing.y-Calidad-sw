import { describe, expect, it } from "vitest";
import { Sesion } from "../../domain/sesion/Sesion";

describe("US1 - Escenario 3: Sesión inválida o expirada", () => {

  it("Bloquea el acceso por expiración, redirecciona al login y muestra mensaje de advertencia", () => {
    /// -arrange
    const adminId = "admin-123";
    
    // Fijamos una fecha de referencia: 1 de Junio de 2026 a las 12:00:00
    const fechaReferencia = new Date("2026-06-01T12:00:00Z");
    
    // El último acceso fue 40 minutos antes de la referencia
    const ultimoAcceso = new Date(fechaReferencia.getTime() - 40 * 60 * 1000); 
    
    const sesionExpirada = new Sesion(adminId, ultimoAcceso, "/dashboard");

    const tiempoIntento = fechaReferencia.getTime();
    const tiempoRedireccionCompleta = tiempoIntento + 600; 

    /// -act
    const resultado = sesionExpirada.navegarA(
      "Disponibilidad", 
      tiempoIntento, 
      tiempoRedireccionCompleta
    );

    /// -assert
    expect(resultado.url).toBe("/login");
    expect(resultado.error).toBe("Su sesión ha expirado. Inicie sesión nuevamente.");
    expect(sesionExpirada.urlActual).toBe("/login");
  });

});