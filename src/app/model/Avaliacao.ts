import {Cliente} from "./Cliente"
import {Livros} from "./Livros"

export class Avaliacao{

    public id: number
    public avaliacao: number
    public comentario: string
    public cliente: Cliente
    public livros: Livros
}