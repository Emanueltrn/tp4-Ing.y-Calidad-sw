import type { TipoIntervalo } from "../intervalo/Intervalo";

export class InstanciaIntervalo {
  constructor(
    public readonly id: string,
    public readonly recurrenciaId: string,
    public readonly fecha: Date,
    public horaInicio: Date,
    public horaFin: Date,
    public tipo: TipoIntervalo,
  ) {}
}
