import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const { height } = Dimensions.get('window');

export default function EntryScreen({ navigation }: any) {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleStart = () => {
    // In real app, this sets AsyncStorage flag to skip onboarding
    // For now, navigate to Main through a reset
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={styles.container}>
      {/* Progress dots */}
      <View style={styles.progressRow}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[styles.progressDot, i === 3 && styles.progressDotActive]} />
        ))}
      </View>

      <Animated.View style={[styles.content, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
        <Text style={styles.title}>Choose Your Path</Text>
        <Text style={styles.subtitle}>Start free, upgrade anytime.</Text>

        {/* Free Tier */}
        <TouchableOpacity activeOpacity={0.85} style={styles.tierCard} onPress={handleStart}>
          <View style={styles.tierBadge}>
            <Text style={styles.tierBadgeText}>FREE</Text>
          </View>
          <Text style={styles.tierTitle}>Explorer</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✓  Health Score tracking</Text>
            <Text style={styles.feature}>✓  3 Daily Missions</Text>
            <Text style={styles.feature}>✓  Basic AI guidance</Text>
            <Text style={styles.feature}>✓  M Coin rewards</Text>
          </View>
          <View style={styles.tierCta}>
            <Text style={styles.tierCtaText}>Start Now</Text>
          </View>
        </TouchableOpacity>

        {/* Premium Tier */}
        <TouchableOpacity activeOpacity={0.85} style={[styles.tierCard, styles.premiumCard]} onPress={handleStart}>
          <View style={[styles.tierBadge, styles.premiumBadge]}>
            <Text style={[styles.tierBadgeText, { color: Colors.background }]}>PRO</Text>
          </View>
          <Text style={styles.tierTitle}>Full System</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>✓  Everything in Free</Text>
            <Text style={styles.feature}>✓  AI Personalization</Text>
            <Text style={styles.feature}>✓  Doctor Matching</Text>
            <Text style={styles.feature}>✓  3x Coin Multiplier</Text>
          </View>
          <View style={[styles.tierCta, styles.premiumCta]}>
            <Text style={[styles.tierCtaText, { color: Colors.background }]}>Upgrade Later</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl, paddingTop: 60 },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxl },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  progressDotActive: { backgroundColor: Colors.accent, width: 24 },
  content: { flex: 1 },
  title: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyLight, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xxl },
  tierCard: {
    backgroundColor: Colors.glass,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    marginBottom: Spacing.lg,
  },
  premiumCard: { borderColor: Colors.accent, backgroundColor: 'rgba(52, 211, 153, 0.05)' },
  tierBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
  },
  premiumBadge: { backgroundColor: Colors.accent },
  tierBadgeText: { color: Colors.textSecondary, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  tierTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: Spacing.md },
  featureList: { gap: 8, marginBottom: Spacing.lg },
  feature: { color: Colors.textSecondary, fontSize: 14, lineHeight: 20 },
  tierCta: {
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 14,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  premiumCta: { backgroundColor: Colors.accent },
  tierCtaText: { color: Colors.textPrimary, fontSize: 16, fontWeight: '600' },
});
