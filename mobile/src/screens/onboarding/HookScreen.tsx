import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function HookScreen({ navigation }: any) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;
  const btnFade = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(slideUp, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
      Animated.timing(btnFade, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    // Continuous glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.6, duration: 3000, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.3, duration: 3000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0c0f14', '#0f1a15', '#0c0f14']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle glow orb */}
      <Animated.View style={[styles.glowOrb, { opacity: glowPulse }]} />

      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}>
          <Text style={styles.title}>Upgrade Your{'\n'}Health Score.</Text>
          <Text style={styles.subtitle}>Earn While You Do It.</Text>
        </Animated.View>

        <Animated.View style={[styles.ctaContainer, { opacity: btnFade }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Preferences')}
          >
            <Text style={styles.primaryBtnText}>Start Free</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>No account needed · Takes 30 seconds</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  glowOrb: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accentGlow,
    top: height * 0.25,
    left: width * 0.5 - 150,
    transform: [{ scale: 1.5 }],
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xxl,
    paddingTop: height * 0.3,
    paddingBottom: Spacing.xxxl + 20,
  },
  title: {
    ...Typography.hero,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLight,
    color: Colors.accent,
    fontSize: 20,
  },
  ctaContainer: { alignItems: 'center' },
  primaryBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: Radius.full,
    width: '100%',
    alignItems: 'center',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  primaryBtnText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  disclaimer: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: Spacing.md,
  },
});
