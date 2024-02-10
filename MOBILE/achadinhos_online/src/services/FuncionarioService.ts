import {FileUpload} from '../interfaces/FileUpload';
import {Funcionario} from '../interfaces/Funcionario';
import { Response } from '../interfaces/Response';
import api from './api.';

export async function cadastrarFuncionario(
  funcionario: Funcionario,
  image: FileUpload,
) {
  if (!funcionario) {
    return null;
  }

  const formData = new FormData();
  console.log('image', image);

  if (image) formData.append('arquivo', image);

  delete funcionario.id;
  delete funcionario.imagem;

  const funcionarioJSON: string = JSON.stringify(funcionario);
  formData.append('dados', funcionarioJSON);

  console.log('form', formData);

  try {
    const res = await api.post('funcionarios', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarFuncionariosPage(
  page: number,
  pageSize: number,
  sort: string,
) {
  try {
    const res = await api.get(`funcionarios?page=${page}&size=${pageSize}&sort=${sort}`);
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function listarFuncionariosAll(): Promise<Response<Funcionario[]> | null> {
  try {
    const res = await api.get('funcionarios');
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}

export async function detalharFuncionario(id: number) {
  try {
    const res = await api.get(`funcionarios/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
    return null;
  }
}