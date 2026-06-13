export class Sesion {
  constructor(
    public usuarioId: string,
    public ultimoAcceso: Date
  ) {}
}