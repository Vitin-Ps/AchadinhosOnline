import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, Spinner } from "native-base";
import { Temas } from "../estilos/tema";

export default function InputLoading({icon}: any) {
    return(
        <Box
        fontSize="20px"
        fontWeight="bold"
        width="100%"
        color={Temas.colors.roxo.claro}
        borderColor={Temas.colors.roxo.escuro}
        borderRadius={15}
        borderWidth={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        p={4}
        mt={5}
        >
        <FontAwesomeIcon icon={icon} color={Temas.colors.roxo.normal} size={20}/> <Spinner w="80%" size={30} color={Temas.colors.roxo.escuro}/>
      </Box>
    )
}