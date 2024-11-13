import { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { initialState, reducer } from './generalReducer';
import { GeneralContext } from './createContext';

export const GeneralProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [abrirModal, setAbrirModal] = useState(false);
    const value = { state, dispatch, abrirModal, setAbrirModal };
    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    )
}

GeneralProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

