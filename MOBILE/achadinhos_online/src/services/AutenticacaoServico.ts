import api from "./api.";


export async function fazerLogin(login: string, senha: string) {
    if (!login || !senha) {
        console.log('Email ou senha vazios');
        return null; // Se algum dos dois estiver vazio
    }
    
    try { // Vai tentar fazer a conexão com a API
        const resultado = await api.post('/login', {
            login,
            senha
        })
        console.log(resultado.data);
        return resultado.data;

    } catch (error) {
        console.log("erro: ", error);
        return null;
    }
}

