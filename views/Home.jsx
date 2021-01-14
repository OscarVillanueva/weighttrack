import "react-native-gesture-handler"
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Measurements from './Measurements';
import Details from './Details';

const Stack = createStackNavigator()

const Home = () => {
    return ( 

        <Stack.Navigator
            screenOptions = {{
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                headerBackTitle: "Volver"
            }}
        >

            <Stack.Screen
                name = "Measurements"
                component = { Measurements }
                options = {{
                    title: "Registros anteriores",
                }}
            />

            <Stack.Screen
                name = "Details"
                component = { Details }
                options = {{
                    title: "Detalles"
                }}
            />

        </Stack.Navigator>

    );
}
 
export default Home;