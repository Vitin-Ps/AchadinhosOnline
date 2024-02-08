import {Box, Image, Modal, Text} from 'native-base';
import {useState} from 'react';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Botao from './Botao';
import {Temas} from '../estilos/tema';
import {FileUpload} from '../interfaces/FileUpload';

export function EntradaArquivo({onImagemSelecionada}: any) {
  const [showModal, setShowModal] = useState(false);

  const [image, setImage] = useState('');

  async function selecionarImagem(camera: boolean) {
    setShowModal(false);

    let result: ImagePickerResponse | null = null;
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
      includeExtra: true,
    };

    if (camera) {
      result = await launchCamera(options);
    } else {
      result = await launchImageLibrary(options);
    }
    if (result !== null && !result.didCancel) {
      const arquivo = result.assets![0];
      setImage(result.assets![0].uri!);
      const file: FileUpload = {
        uri: arquivo.uri!,
        type: arquivo.type!,
        name: arquivo.fileName!,
      };
      onImagemSelecionada(file);
    }
  }

  return (
    <>
      <Box
        w="100%"
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        p={1}
        m={2}>
        <Botao w="30%" onPress={() => setShowModal(true)}>
          Selecione
        </Botao>
        {image === '' ? (
          <Box
            backgroundColor={Temas.colors.cinza.muitoClaro}
            p={5}
            borderRadius={10}
            shadow={3}>
            <Text>Escolha a Imagem</Text>
          </Box>
        ) : (
          <Image
            source={{uri: image}}
            alt="teste"
            w={150}
            h={150}
            m={5}
            borderRadius={10}
          />
        )}
      </Box>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content
          maxWidth="400px"
          backgroundColor={Temas.colors.branco.brancoTransparent}>
          <Modal.CloseButton />
          <Modal.Body>
            <Box alignItems="center">
              <Botao
                w="80%"
                m={0}
                onPress={() => {
                  selecionarImagem(true);
                }}>
                <Text color="white">Câmera</Text>
              </Botao>
              <Botao
                w="80%"
                onPress={() => {
                  selecionarImagem(false);
                }}>
                <Text color="white">Galeria</Text>
              </Botao>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
