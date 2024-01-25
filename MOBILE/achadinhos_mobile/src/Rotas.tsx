import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Login";


const Stack = createNativeStackNavigator();

export default function Rotas() {
    return (
        <NavigationContainer>
           <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={Login as React.FC}
                />
           </Stack.Navigator>
        </NavigationContainer>
    )
}