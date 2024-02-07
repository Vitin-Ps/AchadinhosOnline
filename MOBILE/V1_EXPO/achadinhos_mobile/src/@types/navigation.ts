import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { mainTabs } from '../Tabs'
import { RouteProp } from '@react-navigation/native'

export type ListaTabelas = {
  Login: undefined
  Home: undefined
  Administrativo: undefined
  Sobre: undefined
  Tabs: {
    screen: keyof typeof mainTabs
  }
}

export type NavigationProps<T extends keyof ListaTabelas> = {
  navigation: NativeStackNavigationProp<ListaTabelas, T>
  route: RouteProp<ListaTabelas, T>
}
