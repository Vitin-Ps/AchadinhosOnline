import {
  Box,
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  Modal,
  ScrollView,
  Text,
} from 'native-base'
import Titulo from '../../components/Titulo'
import { Temas } from '../../estilos/tema'
import { EntradaTexto } from '../../components/EntradaTexto'
import { useState } from 'react'
import { ImagePickerResult, launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker'
import Botao from '../../components/Botao'

export default function CadastroFuncionario() {
  const [showModal, setShowModal] = useState(false)

  const [image, setImage] = useState(
    'https://avatars.githubusercontent.com/u/107129730?v=4'
  )
  async function selecionarImagem(camera: boolean) {

    let result: ImagePickerResult | null = null;
    if(camera) {
      result = await launchCameraAsync({
        aspect: [4, 4],
        allowsEditing: true,
        base64: true,
        quality: 1,
      })
    } else {
      result = await launchImageLibraryAsync({
        aspect: [4, 4],
        allowsEditing: true,
        base64: true,
        quality: 1,
      })
    }

    if(result !== null && !result.canceled) {
      setImage(result.assets[0].uri)
      console.log(image)
    }

    setShowModal(false);
  }
  const handleImagepicker = async () => {
    const result = await launchCameraAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      console.log(result.assets[0].uri)
      console.log(image)
    }

  }

  return (
    <ScrollView flex={1} p={2}>
      <HStack
        p={5}
        m={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Titulo>
          <Text color={Temas.colors.black}>Cadastre seu </Text>
          <Text color={Temas.colors.roxo.normal}>Produto</Text>
        </Titulo>
        <EntradaTexto icon="shirt" placeholder="Digite seu nome" />
        <EntradaTexto icon="pricetag" placeholder="Digite o valor" />

        <Image
          source={{
            uri: 'https://avatars.githubusercontent.com/u/107129730?v=4',
          }}
          alt="Teste" // Use accessibilityLabel em vez de alt
          width={100}
          height={100}
          m={5}
          borderRadius={50}
        />

        <Botao onPress={handleImagepicker}>Selecione</Botao>

        <Button onPress={() => setShowModal(true)}>Button</Button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Body>
              <Box alignItems="center">
                <Botao
                  w="80%"
                  m={0}
                  onPress={() => {
                    selecionarImagem(true)
                  }}
                >
                  <Text color="white">Câmera</Text>
                </Botao>
                <Botao
                  w="80%"
                  onPress={() => {
                    selecionarImagem(false)
                  }}
                >
                  <Text color="white">Galeria</Text>
                </Botao>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </HStack>
    </ScrollView>
  )
}
