import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './pages/Login'
import Tabs from './Tabs'

const Stack = createNativeStackNavigator()

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login as React.FC}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs as React.FC}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// options={{
//     headerShown: true,
//     headerTitle: '',
//     headerStyle: {
//       backgroundColor: 'blue',
//     },
//     headerTintColor: 'white',
//   }}
