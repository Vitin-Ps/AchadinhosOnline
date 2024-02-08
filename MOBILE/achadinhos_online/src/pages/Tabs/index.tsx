import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Administrativo from './Administrativo';
import Sobre from './Sobre';
import {Box, Image, Text, View} from 'native-base';
import Logo from '../../assets/imagens/Logo.png';
import {Temas} from '../../estilos/tema';
import Botao from '../../components/Botao';
import {faBook, faHome, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarStyle: {
    backgroundColor: Temas.colors.white,
    borderTopWidth: 0,
    elevation: 5,
  },
  tabBarActiveTintColor: Temas.colors.verde.normal,
  tabBarInactiveTintColor: Temas.colors.roxo.claro,
};
export const mainTabs = [
  {
    name: 'Home',
    component: Home,
    icon: faHome,
  },
  {
    name: 'Administrativo',
    component: Administrativo,
    icon: faSearch,
  },
  {
    name: 'sobre',
    component: Sobre,
    icon: faBook,
  },
];

export default function Tabs({navigation}: any) {
  function sair() {
    AsyncStorage.removeItem('token');
    navigation.replace('Login');
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
        backgroundColor="white">
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
    <Tab.Navigator screenOptions={screenOptions}>
      {mainTabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            header: () => <Header />,
            tabBarIcon: ({color, size}) => (
              <View mt={3}>
                <FontAwesomeIcon icon={tab.icon} color={color} size={size} />
              </View>
            ),
            tabBarLabel: '',
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
