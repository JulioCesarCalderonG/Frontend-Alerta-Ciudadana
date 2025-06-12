export interface Vehiculo {
  id: string,
  nombre: string,
  lng: number,
  lat: number,
  color: string,
  id_vehiculo:string,
  vehiculo:string
}

export interface ResultVehiculo {
  ok:       boolean;
  msg:      string;
  vehiculo: VehiculoPost[];
}

export interface VehiculoPost {
  id:     number;
  nombre: string;
  estado: number;
}
