import 'react-native-reanimated';
import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import * as SplashScreenNative from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuthContext } from "../context/authContext";
import { ScreenAuthHeaderOptions } from "@/components/ThemedHeaderOptions";
import {
  HomeScreen,
  AboutScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  GetStartedScreen
} from "./screens";

const Stack = createNativeStackNavigator();

function BaseApp() {
  const { session, isLoading } = useAuthContext();
  const loader = (false | isLoading);


  if (loader) {
    return <SplashScreen />;
  };
  return (
    <NavigationContainer
      independent={true}

    >
      <Stack.Navigator
        initialRouteName='Splash'
      >
        {session !== null ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="About" component={AboutScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>

        ) : (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStartedScreen}
              options={{
                headerShown: false,
              }} />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false
              }} />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                headerShown: false
              }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

SplashScreenNative.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  React.useEffect(() => {
    if (loaded) {
      SplashScreenNative.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BaseApp />
      </ThemeProvider>
    </AuthProvider>
  );

};

