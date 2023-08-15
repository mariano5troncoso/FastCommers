import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler'
import Register from '../views/Register';
import Signin from '../views/SignIn';
import Home from '../views/Home';

import ProductDetails from "../views/ProductDetails";
import ProductsScreen from "../views/Products";




const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name= 'Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name= 'Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name= 'SignIn' component={ Signin } options={{ headerShown: false }} />
        <Stack.Screen name= 'ProductsPrueba' component={ProductsScreen} options={{ headerShown: false }} />
        <Stack.Screen name= 'ProductDetails' component={ProductDetails} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default StackNavigator
