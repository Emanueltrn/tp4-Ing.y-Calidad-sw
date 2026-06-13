export type TipoIntervalo = "LABORAL" | "BLOQUEADO";

export class Intervalo {
  constructor(
    public readonly id: string,
    public readonly horaInicio: Date | null,
    public readonly horaFin: Date | null,
    public readonly tipo: TipoIntervalo | null,
    public readonly fechaAlta: Date = new Date(),
    public fechaBaja: Date | null = null
  ) {}

  intervaloActivo(): boolean {
    return this.fechaBaja === null;
  }

  eliminarIntervalo(): void {
    this.fechaBaja = new Date();
  }
}