import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HookScreen from '../screens/onboarding/HookScreen';
import PreferencesScreen from '../screens/onboarding/PreferencesScreen';
import ScoreRevealScreen from '../screens/onboarding/ScoreRevealScreen';
import EntryScreen from '../screens/onboarding/EntryScreen';

export type OnboardingStackParamList = {
  Hook: undefined;
  Preferences: undefined;
  ScoreReveal: undefined;
  Entry: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Hook" component={HookScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="ScoreReveal" component={ScoreRevealScreen} />
      <Stack.Screen name="Entry" component={EntryScreen} />
    </Stack.Navigator>
  );
}
