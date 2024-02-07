import { ImagePickerResult } from 'expo-image-picker';
import { Buffer } from "buffer";

export function converterImagem(result: ImagePickerResult): File {
  const asset = result.assets[0];

  const uriComponents = asset.uri.split('/');

  const filename = uriComponents.pop();

  const extension = filename.split('.').pop();

  const mimeType = asset.type;

  // Obter o conteúdo do arquivo em base64
  const base64Data = asset.base64;

  // Converter base64 para um ArrayBuffer
  let byteCharacters = Buffer.from(base64Data, 'base64').toString('binary');
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Criar um Blob a partir dos bytes decodificados
  const blob = new Blob([byteArray], { type: mimeType });

  // Criar um objeto File a partir do blob
  const file = new File([blob], filename, { type: mimeType });
  return file;
}
