export interface ResultAlertaGenerada {
    ok:      boolean;
    msg:     string;
    results: AlertaGenerada[];
}

export interface AlertaGenerada {
    id:          number;
    descripcion: string;
    fecha:       string;
    hora:        string;
    lat:         string;
    lng:         string;
    tipo_alerta: string;
    img:         null;
    color:       null;
    ciudadano:   string;
    correo:      null | string;
    celular:     string;
    dni:         string;
    id_tipo:     number;
}
