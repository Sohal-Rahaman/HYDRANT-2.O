import { Stack, router, useSegments } from "expo-router";
import { useEffect } from 'react';
import '../global.css';
import { AppProvider, useApp } from '../context/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from "react-native";

// This is the custom hook with the CORRECT logic
const useProtectedRoute = () => {
  const { session, loading } = useApp();
  const segments = useSegments();

  useEffect(() => {
    // 1. Don't run until the session is loaded
    if (loading) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    // 2. If the user IS signed in AND they are in the auth group (e.g., /login),
    //    redirect them to the main app (home).
    if (session && inAuthGroup) {
      router.replace('/home');
    } 
    // 3. If the user is NOT signed in AND they are NOT in the auth group,
    //    redirect them to the login screen.
    else if (!session && !inAuthGroup) {
      router.replace('/login');
    }
  }, [session, segments, loading]); // Re-run the effect when session or navigation changes
};

const RootLayoutNav = () => {
  const { loading } = useApp();
  
  // The hook will protect the routes
  useProtectedRoute();

  // Show a loading indicator while the initial session is being checked
  if (loading) {
    return <ActivityIndicator style={{flex: 1}} size="large" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Add other modal screens here as needed */}
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootLayoutNav />
      </AppProvider>
    </GestureHandlerRootView>
  );
}