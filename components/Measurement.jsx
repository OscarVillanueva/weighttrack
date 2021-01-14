import React from 'react';
import { Text, View } from 'native-base';
import useTheme from '../hooks/useTheme';

const Measurement = ({ measurement }) => {

    // Temas de la app
    const theme = useTheme()

    // Capitalizar la fecha
    const capitalize = text => {
        return text.charAt(0).toUpperCase() +  text.slice(1)
    }

    return ( 

        <View>
            <Text style = {{ fontWeight: "bold", fontSize: 22, marginBottom: 10 }}>
                { capitalize(measurement.date) }
            </Text>

            <View>

                <Text style = { theme.label }>
                    <Text style = {[{ fontWeight: "bold", color: "#fff" }, theme.label]}>
                        Peso:
                    </Text> { measurement.values.weight }
                </Text>

                <Text style = { theme.label }>
                    <Text style = {[{ fontWeight: "bold", color: "#fff" }, theme.label]}>
                        Grasa abdominal:
                    </Text> { measurement.values.abdomen }
                </Text>

                <Text style = { theme.label }>
                    <Text style = {[{ fontWeight: "bold", color: "#fff" }, theme.label]}>
                        Muscle:
                    </Text> { measurement.values.muscle }
                </Text>

                <Text style = { theme.label }>
                    <Text style = {[{ fontWeight: "bold", color: "#fff" }, theme.label]}>
                        Grasa:
                    </Text> { measurement.values.grease }
                </Text>


            </View>

        </View>

    );
}
 
export default Measurement;