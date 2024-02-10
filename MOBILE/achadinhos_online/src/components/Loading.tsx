import { Box, Spinner } from "native-base";
import { Temas } from "../estilos/tema";

export function Loading() {
    return (
        <Box height="400px"justifyContent="center" alignItems="center">
            <Spinner size={70} color={Temas.colors.roxo.normal}/>
        </Box>
    )
}