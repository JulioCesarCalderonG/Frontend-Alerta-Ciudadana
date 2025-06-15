export interface ResultAlertaSpam {
    data:   Data;
    ok:     boolean;
    msg:    string;
    alerta: AlertaSpam[];
}

export interface AlertaSpam {
    id:         number;
    lat:        string;
    lng:        string;
    fecha:      Date;
    hora:       string;
    ciudadano:  string;
    registrado: number;
    ano:        string;
    mes:        string;
    dni:        string;
    celular:    string;
    correo:     string | null;
    atendido:   number;
    spam:       number;
}


export interface Data {
}
