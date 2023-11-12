import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading'

import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import authStorage from './app/auth/storage';
import AuthContext from './app/auth/context';
import NavigationTheme from './app/navigation/NavigationTheme';
import OfflineNotice from './app/components/OfflineNotice';
import QuizSessionContext from './app/quizSession/context';
import quizSessionStorage, { removeLocalQuizSession } from './app/quizSession/storage'
import Screen from './app/components/Screen';
import VideoScreen from './app/screen/VideoScreen';
import LoginScreen from './app/screen/LoginScreen';
import useQuizSession from './app/quizSession/useQuizSession';
import HistoryItemScreen from './app/screen/HistoryItemScreen';

export default function App() {
  const [user, setUser] = useState();
  const [quizSession, setQuizSession] = useState();
  const [isReady, setIsReady] = useState(false);
  const isLandscape = useDeviceOrientation() == 'landscape';

  const restoreStates = async () => {
    const user = await authStorage.getUser();
    if(user) {
      setUser(user);

      console.log('restore state user',user);
      const localQuizSession = await quizSessionStorage.getLocalQuizSession(user.ta_id);
      console.log('restore state localQuizSession',localQuizSession);
      setQuizSession(localQuizSession);
    }
  }

  if(!isReady){
    return (
    <AppLoading 
      startAsync={restoreStates} 
      onFinish={() => setIsReady(true)} 
      onError={console.warn}
    />)
  }
  
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <AuthContext.Provider value={{user, setUser}}>
        <QuizSessionContext.Provider value={{quizSession, setQuizSession}}>
          <NavigationContainer theme={NavigationTheme}>
            <OfflineNotice />
            {/* <Screen><VideoScreen /></Screen> */}
            {/* <QuizScreen/> */}
            {/* <QuestionItemCard onPress={(item) => console.log(item)}/> */}
            {/* <LoginScreen /> */}
            {user ? <Screen><AppNavigator /></Screen> : <AuthNavigator /> }
            {/* <HistoryItemScreen />r */}
          </NavigationContainer>
        </QuizSessionContext.Provider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
