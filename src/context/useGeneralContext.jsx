import { useContext } from 'react';
import { GeneralContext } from './createContext';

export const useGeneralContext = () => useContext(GeneralContext);