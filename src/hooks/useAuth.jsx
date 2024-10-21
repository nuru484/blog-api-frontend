import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/*
 * A custom hook that returns the authentication context.
 */
const useAuth = () => useContext(AuthContext);
export default useAuth;
