import React, { useContext, useEffect, useState } from 'react';
import { Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import Layout from '../components/Layout';
import useTheme from '../hooks/useTheme';
import StatisticsGraph from '../components/StatisticsGraph';
import FirebaseContext from '../context/firebaseContext';

const Graphics = () => {

    // Temas de la app
    const theme = useTheme()

    // Arreglos con los datos
    const [graphicData, setGraphicData] = useState({
      weight: null,
      percentage: null 
    })

    // Context de firebase
    const { measurements, fetchMeasurements } = useContext( FirebaseContext )

    // Saber cuando estan descargadas los datos
    useEffect(() => {
      
      if ( measurements.length < 0 ) fetchMeasurements()
      else parseData(measurements)

    }, [measurements])

    // Función para parsear la información a las gráficas
    const parseData = data => {
      
      const labels = []
      const values = {}

      // Separamos los datos en arreglos con su respectiva llave 
      // { "abdomen": [], "peso": [], . . .  }
      data.forEach(element => {
        
        // Sacamos las etiquetas que van en el eje x
        labels.unshift( element.time )

        Object.entries( element.values ).forEach( value => {
          
          // Si ya existe el arreglo lo insertamos en la posición uno para que quede de la fechas más
          // Vieja a la más reciente
          if ( Object.keys( values ).includes( value[0] ) ) 
            values[value[0]].unshift( value[1] )

          // Si no existe creamos el arreglo 
          else 
            values[value[0]] = [ value[1] ]

        });

      });

      // Formateamos y guardamos en el estate
      setGraphicData({
        ...formatDataSet( labels, values )
      })

    }

    const formatDataSet = (labels, data) => {
      
      // Variables de control
      const colors = [ "#ffda00", "#f28", "#fff"]
      let counter = 0

      // Peso se hace estatico porque no es valor porcentual
      const weightDataSet = {
        labels,
        legend: ["Peso"],
        datasets: [{

          data: data.weight,
          color: (opacity = 1) => colors[ 0 ], 
          strokeWidth: 2 

        }]
      }

      // Se elimina el peso el arreglo para evitar conflictos
      delete data.weight

      // Otros
      const percentageDataSet = {
        labels,
        legend: [],
        datasets: []
      }
      
      // se formatean los datos
      Object.entries(data).forEach(entrie => {
        
        // Sacamos el nombre del serie que aparece en la bolita de arriba
        percentageDataSet.legend.push( entrie[0] )

        // Sacamos el color para evitar perder la referencia
        let tmp = colors[ counter ]

        // Guardamos el objeto
        percentageDataSet.datasets.push({
          data: entrie[1],
          color: (opacity = 1) => tmp, 
          strokeWidth: 2 
        })

        // Movemos el apuntador
        if ( counter < ( colors.length - 1 ) ) counter = counter + 1
        else counter = 0

      });

      // Retornamos las dos gráficas
      return {
        percentage: percentageDataSet,
        weight: weightDataSet
      }

    }

    return (graphicData.percentage && graphicData.weight) ? ( 
      
        <Layout>
            
            <Text style = { theme.title }>

                Procentajes

            </Text>

            { graphicData.percentage && <StatisticsGraph data = { graphicData.percentage } /> }

            <Text style = { theme.title }>

                Peso

            </Text>

            { graphicData.weight && <StatisticsGraph data = { graphicData.weight } /> }

        </Layout>

    ) : <Spinner
          visible={ true }
          textContent={'Cargando...'}
          textStyle={{ color: "#fff" }}
        />;
}
 
export default Graphics;