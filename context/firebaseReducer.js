import { 
    ADD_REGISTER_FAIL, 
    ADD_REGISTER_SUCESS, 
    LOADING, 
    STOP_LOADING,
    FETCH_MEASUREMENTS_SUCCESS,
    FETCH_MEASUREMENTS_FAIL,
    RESTART_FLAGS
} from "../types"

export default ( state, action ) => {

    switch (action.type) {
    
        case LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        

        case RESTART_FLAGS: 
            return {
                ...state,
                success: null,
                loading: false
            }

        case ADD_REGISTER_SUCESS : 
            return {
                ...state,
                success: true,
                measurements: [  action.payload , ...state.measurements ]
            }

        case FETCH_MEASUREMENTS_FAIL: 
        case ADD_REGISTER_FAIL : 
            return {
                ...state,
                success: false,
                loading: false
            }

        case FETCH_MEASUREMENTS_SUCCESS:
            return {
                ...state,
                success: true,
                measurements: action.payload
            }

        default: return state

    }

}