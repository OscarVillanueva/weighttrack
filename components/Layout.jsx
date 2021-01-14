import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { Container, Content } from 'native-base';
import useTheme from '../hooks/useTheme';

const Layout = ({ children }) => {

    // Temas de la app
    const theme = useTheme()

    return ( 
        <Container style = { theme.background }>
            <Content>
                <SafeAreaView style = { styles.padding }>
                    { children }
                </SafeAreaView>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({

    padding: {
        marginVertical: "2.5%",
        marginHorizontal: "5%"
    }

})
 
export default Layout;