import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#0c0f14' }}>
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
