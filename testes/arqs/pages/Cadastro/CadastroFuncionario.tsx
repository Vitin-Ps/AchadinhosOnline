// import { HStack, ScrollView, Text } from 'native-base'
// import Titulo from '../../components/Titulo'
// import { Temas } from '../../estilos/tema'
// import { EntradaTexto } from '../../components/EntradaTexto'
// import Botao from '../../components/Botao'
// import { useState } from 'react'
// import { Produto } from '../../interfaces/Produto'

import { Text } from "native-base";

// export default function CadastroFuncionario({ navigation }: any) {
//   const [dados, setDados] = useState({} as Produto)

//   const handleSelecionarImagem = (imagemSelecionada) => {
//    setDados({...dados, imagem: imagemSelecionada});
//   }

//   async function cadastrar() {
//     console.log('chegou')
//     console.log('dados:', dados)

//     const res = await cadastrarProduto(dados)
//     if (!res) console.log('Erro:', res)
//     else navigation.replace('Tabs')
//   }

//   return (
//     <ScrollView flex={1} p={2}>
//       <HStack
//         p={5}
//         m={2}
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Titulo>
//           <Text color={Temas.colors.black}>Cadastre seu </Text>
//           <Text color={Temas.colors.roxo.normal}>Produto</Text>
//         </Titulo>
//         <EntradaTexto icon="shirt" placeholder="Digite seu nome" onChangeText={(text) => setDados({...dados, nome: text})}/>
//         <EntradaTexto icon="pricetag" placeholder="Digite o valor" 
//         onChangeText={(text) => setDados({...dados, valor: Number(text)})}/>
//         <EntradaArquivo onImagemSelecionada={handleSelecionarImagem} />
//         <Botao>
//           <Text
//             fontWeight="bold"
//             color={Temas.colors.white}
//             fontSize={20}
//             onPress={() => cadastrar()}
//           >
//             Cadastrar
//           </Text>
//         </Botao>
//       </HStack>
//     </ScrollView>
//   )
// }




export default function CadastroFuncionario({ navigation }: any) {
  return (
    <>
    
    </>
  ) 
}
