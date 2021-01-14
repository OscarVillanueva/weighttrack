import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from 'native-base';
import useTheme from '../hooks/useTheme';

const Empty = () => {

    // Temas de la app
    const theme = useTheme()

    return ( 

        <View
            style = {[ styles.container, theme.background] }
        >

            <Text style = { theme.title }>
                No hay contenido para mostrar
            </Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
    }

})
 
export default Empty;