// Generated by https://quicktype.io

export interface ResultCargo {
    ok:    boolean;
    msg:   string;
    cargo: Cargo[];
}

export interface Cargo {
    id:          number;
    cargo:       string;
    descripcion: string;
    estado:      number;
}
