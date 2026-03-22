import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingStack from './OnboardingStack';
import MainTabs from './MainTabs';
import UpgradeModal from '../modals/UpgradeModal';
import MissionDetailScreen from '../screens/home/MissionDetailScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Upgrade: undefined;
  MissionDetail: { mission?: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="MissionDetail"
          component={MissionDetailScreen}
          options={{ presentation: 'card', animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Upgrade"
          component={UpgradeModal}
          options={{ presentation: 'transparentModal', animation: 'fade_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
