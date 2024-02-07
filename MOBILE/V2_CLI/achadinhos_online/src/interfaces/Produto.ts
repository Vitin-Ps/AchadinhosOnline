export interface Produto {
    id?: number;
    nome: string;
    valor: number;
    imagem?: string;
    selecionado?: boolean
}

export interface ProdutoDTO {
    nome: string;
    valor: number;
    imagem?: File;
}