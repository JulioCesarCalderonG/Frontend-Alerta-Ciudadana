export interface FiltroForm {
  tipo: string;
  fechaUno: string;
  fechaDos: string;
  datoTipo: string
}
export interface EnvioAlertGet {
  fechaUno: string;
  fechaDos: string;
  tipoAlerta: string | number
}