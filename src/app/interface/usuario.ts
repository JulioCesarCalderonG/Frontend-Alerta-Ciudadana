// Generated by https://quicktype.io

export interface ResultUsuarios {
    ok:      boolean;
    msg:     string;
    usuario: Usuario[];
}
export interface ResultUsuario {
    ok:      boolean;
    msg:     string;
    usuario: Usuario;
}

export interface Usuario {
    id:       number;
    dni:      string;
    nombre:   string;
    apellido: string;
    estado:   number;
    password: string;
    id_cargo: number;
    cargousuario:    Cargo;
}

export interface Cargo {
    id:          number;
    cargo:       string;
    descripcion: string;
    estado:      number;
}
