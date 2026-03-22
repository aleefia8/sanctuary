import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing } from '../../theme';

const { width, height } = Dimensions.get('window');
const RING_SIZE = 220;
const RING_R = 95;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

export default function ScoreRevealScreen({ navigation }: any) {
  const [displayScore, setDisplayScore] = useState(0);
  const ringAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Count up the score
    Animated.timing(ringAnim, { toValue: 62, duration: 2000, useNativeDriver: false }).start();

    ringAnim.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    // Fade in the ring
    Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Glow after count finishes
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(glowPulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(subtitleFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
    }, 2200);

    // Navigate after reveal
    const timer = setTimeout(() => {
      navigation.navigate('Entry');
    }, 4500);

    return () => {
      clearTimeout(timer);
      ringAnim.removeAllListeners();
    };
  }, []);

  const dashOffset = CIRCUMFERENCE * (1 - displayScore / 100);

  return (
    <View style={styles.container}>
      {/* Progress dots */}
      <View style={styles.progressRow}>
        {[0,1,2,3].map(i => (
          <View key={i} style={[styles.progressDot, i === 2 && styles.progressDotActive]} />
        ))}
      </View>

      <Animated.View style={[styles.scoreContainer, { opacity: fadeIn }]}>
        {/* Glow behind ring */}
        <Animated.View style={[styles.glowRing, { opacity: glowPulse }]} />

        <Svg width={RING_SIZE} height={RING_SIZE} style={styles.svg}>
          {/* Background ring */}
          <Circle
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={10}
            fill="none"
          />
          {/* Animated progress ring */}
          <Circle
            cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
            stroke={Colors.accent}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE}`}
            strokeDashoffset={`${dashOffset}`}
            fill="none"
            origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
            rotation="-90"
          />
        </Svg>

        <View style={styles.scoreTextContainer}>
          <Text style={styles.scoreNumber}>{displayScore}</Text>
          <Text style={styles.scoreLabel}>Health Score</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.bottomContent, { opacity: subtitleFade }]}>
        <Text style={styles.message}>No devices needed yet.</Text>
        <Text style={styles.submessage}>Let's improve this together.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, alignItems: 'center', paddingTop: 60 },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.xxxl },
  progressDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.15)' },
  progressDotActive: { backgroundColor: Colors.accent, width: 24 },
  scoreContainer: {
    width: RING_SIZE,
    height: RING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.12,
  },
  svg: { position: 'absolute' },
  glowRing: {
    position: 'absolute',
    width: RING_SIZE + 60,
    height: RING_SIZE + 60,
    borderRadius: (RING_SIZE + 60) / 2,
    backgroundColor: 'rgba(52, 211, 153, 0.08)',
  },
  scoreTextContainer: { alignItems: 'center' },
  scoreNumber: { ...Typography.score, color: Colors.textPrimary },
  scoreLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 4 },
  bottomContent: { marginTop: 60, alignItems: 'center' },
  message: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 8 },
  submessage: { ...Typography.bodyLight, color: Colors.accent },
});
