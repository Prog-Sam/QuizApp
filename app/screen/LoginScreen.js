import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import {Form, FormField, SubmitButton, ErrorMessage} from '../components/forms';
import authApi from '../api/auth2';
// import authApi from '../api/fakeAuth';
import useAuth from '../auth/useAuth';
import Screen from '../components/Screen';;

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label('Username'),
    password: Yup.string().required().min(4).label('Password')
});

function LoginScreen(props) {
    const { logIn } = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    // const handleSubmit = async ({email, password}) => {
    //     const result = await authApi.login(email, password);
    //     console.log(result);
    //     if(!result.ok) return setLoginFailed(true);
    //     setLoginFailed(false);
    //     logIn(result.data)
    // }

    const handleSubmit = async ({username, password}) => {
        const result = await authApi.login(username, password);
        if(!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        if(result.data.L_BIT == '0')
        return setLoginFailed(true);
        logIn(username)
    }

    return (
        <Screen style={styles.container}>
            <Image 
                source={require('../assets/app_logo_black.png')}
                style={styles.logo} 
            />
            <ErrorMessage error='Invalid username and/or password.' visible={loginFailed} />
            <Form
                initialValues={{username: '', password: ''}}
                onSubmit={values => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCapitalize='none'
                    icon='account'
                    keyboardType='email-address'
                    name='username'
                    placeholder='Username'
               />
               <FormField
                    autoCapitalize='none'
                    icon='lock'
                    name='password'
                    placeholder='Password'
                    secureTextEntry
                    textContentType='password'
                />
                <SubmitButton title='Login' />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 160,
        height: 160,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})

export default LoginScreen;