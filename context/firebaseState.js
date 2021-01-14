import React, { useReducer } from 'react';
import moment from 'moment';
import FirebaseContext from './firebaseContext';
import FirebaseReducer from './firebaseReducer';
import firebase from '../firebase';
import { 
    ADD_REGISTER_FAIL, 
    ADD_REGISTER_SUCESS, 
    LOADING, 
    STOP_LOADING, 
    FETCH_MEASUREMENTS_FAIL, FETCH_MEASUREMENTS_SUCCESS, RESTART_FLAGS 
} from '../types';

const FirebaseState = ({ children }) => {

    // State inicial
    const initialState = {
        measurements: [], 
        success: null,
        loading: false
    }

    // useReducer
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState)

    // Agregar un registro
    const addRegister = async data => {
        
        dispatch({
            type: LOADING
        })

        try {

            await firebase.addDocument("measurements", data)
            data.time = moment(data.timestamp).format("L")

            dispatch({
                type: ADD_REGISTER_SUCESS,
                payload: data
            })

        } catch (error) {
            console.log(error);

            dispatch({
                type: ADD_REGISTER_FAIL
            })

        } finally {

            dispatch({
                type: STOP_LOADING
            })

        }

    }

    // Descargar los registros
    const fetchMeasurements = async () => {

        // Mostramos el spinner
        dispatch({
            type: LOADING
        })

        // Descargamos las medidas
        const measurements = await firebase.db.collection("measurements").orderBy("timestamp", "desc").get()

        // Verificamos que tenga algo
        if ( measurements.empty ){
            
            dispatch({
                type: FETCH_MEASUREMENTS_FAIL
            })

            return

        }

        // Formatemos la data
        const data = measurements.docs.map(measurement => {
            
            return {
                id: measurement.id,
                time: moment(measurement.data().timestamp).format("L"),
                ...measurement.data()
            }

        })

        // Guardamos la información
        dispatch({
            type: FETCH_MEASUREMENTS_SUCCESS,
            payload: data
        })

        // Detemos el spinner
        dispatch({
            type: STOP_LOADING
        })
    }

    // Limpiar las banderas
    const restartFlags = () => {
        
        dispatch({
            type: RESTART_FLAGS
        })   

    }

    return (
        <FirebaseContext.Provider
            value = {{
                measurements: state.measurements,
                success: state.success,
                loading: state.loading,
                addRegister,
                fetchMeasurements,
                restartFlags
            }}
        >
            { children }
        </FirebaseContext.Provider>
    );
}
 
export default FirebaseState;