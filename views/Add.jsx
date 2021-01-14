import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Form, Item, Input, Button, Text, Toast } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import 'moment/locale/es';
import FirebaseContext from '../context/firebaseContext';
import Layout from '../components/Layout';
import useTheme from '../hooks/useTheme';

const Add = () => {

    // Temas de la app
    const theme = useTheme()

    // State para verficar si se pregunto
    const [requested, setRequested] = useState(false)

    // Context de firebase
    const { loading, success, addRegister, restartFlags } = useContext( FirebaseContext )

    // Navigator
    const navigator = useNavigation()

    // Verificar para mostrar la tostada
    useEffect(() => {
        
        if ( requested ) showMessage()

    }, [success, loading])

    // Validación del formulario
    const formik = useFormik({

        initialValues: {
            grease: 0,
            muscle: 0,
            abdomen: 0,
            weight: 0
        },

        validationSchema: Yup.object({
            grease: Yup.number().required("Debes indicar un porcentaje grasa válido"),
            muscle: Yup.number().required("Debes indicar un porcentaje musculo válido"),
            abdomen: Yup.number().required("Debes indicar un valor de grasa abdominal válido"),
            weight: Yup.number().required("Debes indicar un peso válido")
        }),

        onSubmit: values => {

            moment.locale("es")
            addRegister({ values, timestamp: Date.now(), date: moment().format("MMMM Do YYYY") })  

            setRequested(true)

        }

    })

    const showMessage = () => {
        
        if( success ) {

            Toast.show({
                text: "Se ha creado correctamente",
                buttonText: "OK",
                duration: 5000,
            })

            navigator.navigate("Home")

        }

        else if ( !success )

            Toast.show({
                text: "Ocurrio un error, intenta de nueva",
                buttonText: "OK",
                duration: 5000,
            })

        setRequested( false )
    }

    return ( 
        <Layout>

            <Spinner
                visible={ loading }
                textContent={'Cargando...'}
                textStyle={{ color: "#fff" }}
            />

            <Text
                style = { theme.title }
            >
                Agrega un nuevo registro
            </Text>

                <Form style = {{ marginBottom: 20 }}>
    
                    <Text
                        style = {[ theme.label, { marginBottom: 10 }]}
                    >
                        Porcentaje de grasa
                    </Text>

                    <Item 
                        last
                        style = { theme.input }
                    >
                        <Input
                            keyboardType = "numeric"
                            placeholder  = "Porcentanje de grasa"
                            value = { `${formik.values.grease}` }
                            onChangeText = { formik.handleChange("grease") }
                            onBlur = { formik.handleBlur("grease") }
                        />
                    </Item>

                    {(formik.touched.grease && formik.errors.grease) && (
                        <Text style = { theme.errorLabel }>

                            {formik.errors.grease}

                        </Text>
                    )}

                    <Text
                        style = {[ theme.label, { marginBottom: 10 }]}
                    >
                        Porcentaje de musculo
                    </Text>

                    <Item 
                        inlineLabel
                        last
                        style = { theme.input }
                    >
                        <Input
                            keyboardType = "numeric"
                            placeholder  = "Porcentaje de musculo"
                            value = { `${formik.values.muscle}`  }
                            onChangeText = { formik.handleChange("muscle") }
                            onBlur = { formik.handleBlur("muscle") }
                        />
                    </Item>

                    {(formik.touched.muscle && formik.errors.muscle) && (
                        <Text style = { theme.errorLabel }>

                            {formik.errors.muscle}
                            
                        </Text>
                    )}

                    <Text
                        style = {[ theme.label, { marginBottom: 10 }]}
                    >
                        Grasa abdominal
                    </Text>

                    <Item 
                        inlineLabel
                        last
                        style = { theme.input }
                    >
                        <Input
                            keyboardType = "numeric"
                            placeholder  = "Grasa abdominal"
                            value = { `${formik.values.abdomen}`  }
                            onChangeText = { formik.handleChange("abdomen") }
                            onBlur = { formik.handleBlur("abdomen") }
                        />
                    </Item>

                    {(formik.touched.abdomen && formik.errors.abdomen) && (
                        <Text style = { theme.errorLabel }>

                            {formik.errors.abdomen}
                            
                        </Text>
                    )}

                    <Text
                        style = {[ theme.label, { marginBottom: 10 }]}
                    >
                        Peso
                    </Text>

                    <Item 
                        inlineLabel
                        last
                        style = { theme.input }
                    >
                        <Input
                            keyboardType = "numeric"
                            placeholder  = "Peso"
                            value = { `${formik.values.weight}`  }
                            onChangeText = { formik.handleChange("weight") }
                            onBlur = { formik.handleBlur("weight") }
                        />
                    </Item>

                    {(formik.touched.weight && formik.errors.weight) && (
                        <Text style = { theme.errorLabel }>

                            {formik.errors.weight}
                            
                        </Text>
                    )}

                    <Button
                        style = {[ theme.button, { marginTop: 10 }]}
                        square
                        block
                        onPress = { formik.handleSubmit }
                    >
                        <Text
                            style = { theme.textButton }
                        >
                            Agregar registro
                        </Text>
                    </Button>
                    
                </Form>
                
        </Layout>
    );
}
 
export default Add;