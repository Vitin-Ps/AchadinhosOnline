import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Temas } from '../estilos/tema'
import Home from './Home'
import Administrativo from './Administrativo'
import Sobre from './Sobre'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Box, Image, Text, View } from 'native-base'
import Logo from '../assets/imagens/Logo.png'
import Botao from '../components/Botao'

const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarStyle: {
    backgroundColor: Temas.colors.white,
    borderTopWidth: 0,
    elevation: 5,
  },
  tabBarActiveTintColor: Temas.colors.verde.normal,
  tabBarInactiveTintColor: Temas.colors.roxo.claro,
}
export const mainTabs = [
  {
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    name: 'Administrativo',
    component: Administrativo,
    icon: 'search',
  },
  {
    name: 'sobre',
    component: Sobre,
    icon: 'book',
  },
]

export default function Tabs({navigation}: any) {
  function sair() {
    navigation.replace('Login')
  }

  function Header() {
    return (
        <Box
        w="100%"
        mt={5}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="white"
      >
        <Image source={Logo} alt="logo achadinhos" w={100} h={100} />
        <Botao w={70} h={45} mr={5} mt={0} onPress={sair}>
          <Text color="white" fontWeight="bold">
            Sair
          </Text>
        </Botao>
      </Box>
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}
    >
      {mainTabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            header: () => <Header />,
            tabBarIcon: ({ color, size }) => (
                <View mt={3}>
                <Ionicons name={tab.icon} color={color} size={size} />
              </View>
            ),
            tabBarLabel: ''
          }}
        />
      ))}
    </Tab.Navigator>
  )
}
