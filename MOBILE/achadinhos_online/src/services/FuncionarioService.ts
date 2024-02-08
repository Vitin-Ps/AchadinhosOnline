import { FileUpload } from '../interfaces/FileUpload';
import { Funcionario } from '../interfaces/Funcionario';
import api from './api.';

export async function cadastrarFuncionario(funcionario: Funcionario, image: FileUpload) {
  if (!funcionario) {
    return null;
  }

  const formData = new FormData();
  console.log("image", image)

  if (image) formData.append('arquivo', image);

  delete funcionario.id;
  delete funcionario.imagem;

  const funcionarioJSON: string = JSON.stringify(funcionario);
  formData.append('dados', funcionarioJSON);

  console.log("form", formData)

  try {
    const res = await api.post('funcionarios', formData, { headers: { "Content-Type": "multipart/form-data" }});
    return res.data;
  } catch (error) {
    console.log('erro: ', error);
    return null;
  }
}
