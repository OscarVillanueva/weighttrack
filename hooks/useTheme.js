import { useState, useEffect } from 'react';
import { useColorScheme, StyleSheet } from 'react-native';

const useTheme = () => {

    // Sacamos el tema que esta usando el sistema
    const scheme = useColorScheme();

    // State para el tema
    const [theme, setTheme] = useState({})

    useEffect(() => {

        const styles = StyleSheet.create({

            container: {
                flex: 1,
            },
        
            content: {
                flex: 1,
                marginHorizontal: "2.5%",
            },
        
            button: {
                backgroundColor: "#ffda00",
            },

            icon: {
                color: "#ffda00",
                fontSize: 30
            },
        
            textButton:{
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#000",
            },

            img: {
                width: "100%",
                height: 300
            },

            input: {
                backgroundColor: "#fff",
                marginBottom: 20,
                borderRadius: 10
            },

            price: {
                marginVertical: 20,
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold"
            },
        
            label: {
                color: scheme === "light" ? "#1a202c" : "#edf2f7",
                fontSize: 18
            },

            descriptive: {
                color: scheme === "light" ? "#1a202c" : "#edf2f7",
                fontSize: 22
            },

            title: {
                color: scheme === "light" ? "#1a202c" : "#edf2f7",
                textAlign: "center",
                marginTop: 40,
                marginBottom: 20,
                fontSize: 30
            },

            errorLabel: {
                textAlign: "center",
                fontSize: 18,
                color: "#b30404",
                marginBottom: 10
            },

            background: {
                backgroundColor: scheme === "light" ? "#f7fafc" : "#718096"
            }
            
        
        });

        setTheme(styles)

        
    }, [scheme])

    return theme
}
 
export default useTheme;