import React, { useContext, useEffect, useState } from 'react';
import { Container, View, Text } from 'native-base';
import { SafeAreaView, StyleSheet } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import Timeline from 'react-native-timeline-flatlist';
import FirebaseContext from '../context/firebaseContext';
import useTheme from '../hooks/useTheme';
import Empty from '../components/Empty';
import Measurement from '../components/Measurement';

const Measurements = () => {

    // Temas de la app
    const theme = useTheme()

    // Context de firebase
    const { measurements, loading, success, fetchMeasurements } = useContext( FirebaseContext )

    // Descargamos los datos
    useEffect(() => {
        
        fetchMeasurements()

    }, [])

    const renderDetail = (rowData, sectionID, rowID) => (

        <Measurement measurement = { rowData } />

    )

    return success ? ( 
        <Container style = { theme.background }>

            <SafeAreaView style = {[styles.padding, { flex: 1 }]}>

                <Spinner
                    visible={ loading }
                    textContent={'Cargando...'}
                    textStyle={{ color: "#fff" }}
                />
    
                <Timeline
                    data={ measurements }
                    innerCircle = { "dot" }
                    circleSize = { 20 }
                    circleColor = "#ffda00"
                    lineColor = "#000"
                    timeStyle={{ textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding: 10, borderRadius:13 }}
                    timeContainerStyle = {{ minWidth: 72 }}
                    separator = { true }
                    descriptionStyle={ theme.label }
                    options = {{ style: { padding: 5 } }}
                    renderDetail = { renderDetail }
                />
    
            </SafeAreaView>
        </Container>

    ) : <Empty/> ;
}

const styles = StyleSheet.create({

    padding: {
        marginVertical: "2.5%",
        marginHorizontal: "5%"
    }

})
 
export default Measurements;