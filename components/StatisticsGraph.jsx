import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StatisticsGraph = ({ data }) => {

    // sacamos el ancho de la pantalla y le quitamos para el margen
    const screenWidth = Dimensions.get("window").width - 40

    return ( 
        <LineChart
                data = {data}
                width = { screenWidth }
                height = { 420 }
                style = {{ borderRadius: 16 }}
                verticalLabelRotation = { 85 }
                xLabelsOffset = { -10 }
                bezier
                chartConfig = {{
                    backgroundColor: "#2d3748",
                    backgroundGradientFrom: "#2d3748",
                    backgroundGradientTo: "#2d3748",
                    color: (opacity = 1) => `#000`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 36
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#000"
                    }
                }}
            />
    );
}
 
export default StatisticsGraph;