import { useContext } from "react"
import jwtDecode from "jwt-decode"

import AuthContext from "./context"
import authStorage from "./storage"
import accountApi from '../api/accounts';
import userDetailsApi from "../api/userDetails";

export default useAuth = () => {
    const {user, setUser} = useContext(AuthContext)

    // const logOut = () => {
    //     setUser(null);
    //     authStorage.removeToken();
    // }

    const logOut = () => {
        setUser(null);
        authStorage.removeUser();
    }

    // const logIn = (authToken) => {
    //     const user = jwtDecode(authToken)
    //     setUser(user);
    //     authStorage.storeToken(authToken)
    // }

    const logIn = async (username) => {
        const account = await accountApi.getAccount(username);
        const user = await userDetailsApi.getUser(account.data[0].ta_id)
        const localUser = {...user.data[0], ['ta_username']: account.data[0].ta_username, ['ta_id']: account.data[0].ta_id}
        setUser(localUser);
        authStorage.storeUser(localUser);
    }

    return {user, logIn, logOut, setUser}
}