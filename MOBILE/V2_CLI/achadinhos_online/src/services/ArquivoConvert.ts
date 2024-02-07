import {ImagePickerResponse} from 'react-native-image-picker';

export async function converterImagem(result: ImagePickerResponse): Promise<File | null>{
  if (!result || !result.assets || result.assets.length === 0) {
    return null;
  }
  const asset = result.assets[0];
  const filename = asset.fileName;
  const mimeType = asset.type;
  const uri = asset.uri;
  // let file: File | null = null;
  // // Fetch the image file as a blob
  // fetch(uri!)
  //   .then(response => response.blob())
  //   .then(blob => {
  //     file = new File([blob], filename, {
  //       type: mimeType!,
  //       lastModified: Date.now(),
  //     });
  //   });

  // return file;

  try {
    const response = await fetch(uri!);
    const blob = await response.blob();

    // Criar um objeto File a partir do blob
    const file = new File([blob], filename, {
      type: mimeType!,
      lastModified: Date.now(), // Definindo lastModified como o tempo atual
    });

    // Use o arquivo como necessário
    console.log(file);
    return file 
  } catch (error) {
    console.error('Erro ao buscar a imagem:', error);
    return null;
  }
}
