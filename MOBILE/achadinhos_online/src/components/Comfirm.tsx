import {Box, Modal, Text} from 'native-base';
import Botao from './Botao';
import {Temas} from '../estilos/tema';

interface ConfirmProps {
  message: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onPress?: () => void;
}

export function Confirm(props: ConfirmProps) {
  function confirmar() {
    if(props.onPress) {
      props.onPress();
    }
    
    // props.setShowModal(false);
  }

  return (
    <Modal isOpen={props.showModal}>
      <Modal.Content
        maxWidth="400px"
        backgroundColor={Temas.colors.branco.brancoTransparent}>
        <Modal.CloseButton />
        <Modal.Body>
          <Text p={5} w="100%" textAlign="center" fontSize={16}>
            {props.message}
          </Text>
          <Box
            width=""
            display="flex"
            flexDirection="row"
            justifyContent="space-around"
            alignContent="center">
            <Botao
              bgColor={Temas.colors.white}
              borderWidth={2}
              borderColor={Temas.colors.roxo.normal}
              w=""
              onPress={confirmar}>
              <Text
                fontWeight="bold"
                color={Temas.colors.roxo.normal}
                fontSize={15}>
                Confirmar
              </Text>
            </Botao>
            <Botao w="" onPress={() => props.setShowModal(false)}>
              <Text fontWeight="bold" color={Temas.colors.white} fontSize={15}>
                Cancelar
              </Text>
            </Botao>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
