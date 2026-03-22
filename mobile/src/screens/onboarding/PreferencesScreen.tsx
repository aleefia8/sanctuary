import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const { width } = Dimensions.get('window');

const PREFERENCES = [
  { id: 'energy', label: 'Energy', emoji: '⚡', color: Colors.energy, desc: 'Feel more alive daily' },
  { id: 'sleep', label: 'Sleep', emoji: '🌙', color: Colors.sleep, desc: 'Rest deeper, wake refreshed' },
  { id: 'fitness', label: 'Fitness', emoji: '💪', color: Colors.fitness, desc: 'Move better, feel stronger' },
  { id: 'stress', label: 'Stress', emoji: '🧘', color: Colors.stress, desc: 'Find calm in the chaos' },
  { id: 'longevity', label: 'Longevity', emoji: '🌿', color: Colors.longevity, desc: 'Build habits that last' },
];

export default function PreferencesScreen({ navigation }: any) {
  const [selected, setSelected] = useState<string[]>([]);
  const scaleAnims = useRef(PREFERENCES.map(() => new Animated.Value(1))).current;

  const togglePref = (id: string, index: number) => {
    // Bounce animation
    Animated.sequence([
      Animated.timing(scaleAnims[index], { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleAnims[index], { toValue: 1, damping: 8, stiffness: 200, useNativeDriver: true }),
    ]).start();

    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <View style={styles.progressRow}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[styles.progressDot, i === 1 && styles.progressDotActive]} />
        ))}
      </View>

      <Text style={styles.title}>What matters{'\n'}most to you?</Text>
      <Text style={styles.subtitle}>Select your priorities. We'll personalize everything.</Text>

      <View style={styles.cards}>
        {PREFERENCES.map((pref, index) => {
          const isSelected = selected.includes(pref.id);
          return (
            <Animated.View key={pref.id} style={{ transform: [{ scale: scaleAnims[index] }] }}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.card,
                  isSelected && { borderColor: pref.color, backgroundColor: `${pref.color}10` },
                ]}
                onPress={() => togglePref(pref.id, index)}
              >
                <Text style={styles.emoji}>{pref.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardLabel}>{pref.label}</Text>
                  <Text style={styles.cardDesc}>{pref.desc}</Text>
                </View>
                <View style={[styles.checkCircle, isSelected && { backgroundColor: pref.color }]}>
                  {isSelected && <Text style={styles.check}>✓</Text>}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.nextBtn, selected.length === 0 && styles.nextBtnDisabled]}
        disabled={selected.length === 0}
        onPress={() => navigation.navigate('ScoreReveal')}
      >
        <Text style={[styles.nextBtnText, selected.length === 0 && { opacity: 0.4 }]}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: Spacing.xl, paddingTop: 60 },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxl },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  progressDotActive: { backgroundColor: Colors.accent, width: 24 },
  title: { ...Typography.h1, color: Colors.textPrimary, marginBottom: Spacing.sm },
  subtitle: { ...Typography.bodyLight, color: Colors.textSecondary, marginBottom: Spacing.xxl },
  cards: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    gap: 16,
  },
  emoji: { fontSize: 28 },
  cardLabel: { color: Colors.textPrimary, fontSize: 17, fontWeight: '600' },
  cardDesc: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  nextBtn: {
    marginTop: 'auto',
    marginBottom: 40,
    backgroundColor: Colors.accent,
    paddingVertical: 18,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  nextBtnDisabled: { backgroundColor: Colors.surfaceLight },
  nextBtnText: { color: Colors.background, fontSize: 17, fontWeight: '700' },
});
