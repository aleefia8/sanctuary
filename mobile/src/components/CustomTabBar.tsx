import React from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Radius } from '../theme';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 76;

const ICONS: Record<string, string> = {
  Home: '⬡',
  Progress: '📊',
  AI: '✦',
  Profile: '●',
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCenter = route.name === 'AI';

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.8} style={styles.centerTab}>
                <View style={styles.centerBtn}>
                  <Text style={styles.centerIcon}>✦</Text>
                </View>
                <Text style={[styles.label, { color: isFocused ? Colors.accent : Colors.textMuted }]}>AI</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.7} style={styles.tab}>
              <Text style={[styles.tabIcon, isFocused && { color: Colors.accent }]}>
                {ICONS[route.name] || '○'}
              </Text>
              <Text style={[styles.label, isFocused && { color: Colors.accent }]}>
                {route.name}
              </Text>
              {isFocused && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 27, 34, 0.95)',
    borderRadius: 28,
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    fontSize: 20,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
  centerTab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  centerBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    marginBottom: 4,
  },
  centerIcon: {
    color: Colors.background,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
