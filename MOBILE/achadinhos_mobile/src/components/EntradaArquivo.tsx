import { Box, Image, Modal, Text } from 'native-base'
import Botao from './Botao'
import { useState } from 'react'
import {
  ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker'
import { Temas } from '../estilos/tema'
import { converterImagem } from '../services/ArquivoConvert'

export function EntradaArquivo({ onImagemSelecionada }) {
  const [showModal, setShowModal] = useState(false)

  const [image, setImage] = useState('')
  async function selecionarImagem(camera: boolean) {
    let result: ImagePickerResult | null = null
    if (camera) {
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
    if (result !== null && !result.canceled) {
      setImage(result.assets[0].uri)
      const arquivo = converterImagem(result)
      onImagemSelecionada(arquivo)
    }

    setShowModal(false)
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
        m={2}
      >
        <Botao w="30%" onPress={() => setShowModal(true)}>
          Selecione
        </Botao>
        {image === '' ? (
          <Box
            backgroundColor={Temas.colors.cinza.muitoClaro}
            p={5}
            borderRadius={10}
            shadow={3}
          >
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
          backgroundColor={Temas.colors.branco.brancoTransparent}
        >
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
    </>
  )
}
