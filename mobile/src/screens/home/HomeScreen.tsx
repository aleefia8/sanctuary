import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import MissionCard from '../../components/MissionCard';
import CoinAnimation from '../../components/CoinAnimation';

const RING_SIZE = 180;
const RING_R = 78;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;

export default function HomeScreen({ navigation }: any) {
  const [showCoins, setShowCoins] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const scoreFade = useRef(new Animated.Value(0)).current;
  const scoreScale = useRef(new Animated.Value(0.85)).current;

  const score = 62;
  const coinsEarned = 12 + completedMissions.length * 10;

  useEffect(() => {
    Animated.stagger(200, [
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(headerSlide, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(scoreFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(scoreScale, { toValue: 1, damping: 15, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const missions = [
    { id: 1, title: 'Morning Hydration', subtitle: 'Drink 16oz of water', icon: '💧', progress: 0 },
    { id: 2, title: 'Deep Work Session', subtitle: '90m focus block', icon: '🧠', progress: 50 },
    { id: 3, title: 'Evening Wind Down', subtitle: 'No screens after 10PM', icon: '🌙', progress: 0 },
  ];

  const handleMissionPress = (mission: any) => {
    if (completedMissions.includes(mission.id)) return;
    setCompletedMissions(prev => [...prev, mission.id]);
    setShowCoins(true);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: headerFade, transform: [{ translateY: headerSlide }] }]}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.subtitle}>Your Sanctuary awaits.</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>5</Text>
          </View>
        </Animated.View>

        {/* Health Score Ring */}
        <Animated.View style={[styles.scoreSection, { opacity: scoreFade, transform: [{ scale: scoreScale }] }]}>
          <View style={styles.ringContainer}>
            <Svg width={RING_SIZE} height={RING_SIZE} style={styles.svg}>
              <Circle cx={RING_SIZE/2} cy={RING_SIZE/2} r={RING_R}
                stroke="rgba(255,255,255,0.05)" strokeWidth={10} fill="none" />
              <Circle cx={RING_SIZE/2} cy={RING_SIZE/2} r={RING_R}
                stroke={Colors.accent} strokeWidth={7} strokeLinecap="round"
                strokeDasharray={`${CIRCUMFERENCE}`}
                strokeDashoffset={`${CIRCUMFERENCE * (1 - score / 100)}`}
                fill="none" origin={`${RING_SIZE/2}, ${RING_SIZE/2}`} rotation="-90" />
            </Svg>
            <View style={styles.scoreInner}>
              <Text style={styles.scoreNum}>{score}</Text>
              <Text style={styles.scoreLabel}>Health Score</Text>
            </View>
          </View>
          <Text style={styles.scoreDelta}>+4 today</Text>
        </Animated.View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🪙 {coinsEarned}</Text>
            <Text style={styles.statLabel}>M Coins Today</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🔥 5 Days</Text>
            <Text style={styles.statLabel}>Streak (x2)</Text>
          </View>
        </View>

        {/* Missions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Missions</Text>
          <Text style={styles.sectionMeta}>{completedMissions.length}/{missions.length}</Text>
        </View>

        {missions.map((mission) => {
          const isDone = completedMissions.includes(mission.id);
          return (
            <MissionCard
              key={mission.id}
              mission={{ ...mission, progress: isDone ? 100 : mission.progress }}
              onPress={() => handleMissionPress(mission)}
              completed={isDone}
            />
          );
        })}

        {/* AI Nudge */}
        <TouchableOpacity style={styles.aiNudge} activeOpacity={0.8}>
          <Text style={styles.aiNudgeEmoji}>🤖</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiNudgeText}>You slept less last night</Text>
            <Text style={styles.aiNudgeAction}>Tap for a recovery plan →</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {showCoins && <CoinAnimation amount={10} onComplete={() => setShowCoins(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 8 },
  greeting: { ...Typography.h2, color: Colors.textPrimary },
  subtitle: { color: Colors.textSecondary, fontSize: 15, marginTop: 2 },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(251,191,36,0.12)',
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: Radius.full, gap: 4,
  },
  streakEmoji: { fontSize: 16 },
  streakText: { color: Colors.coin, fontWeight: '700', fontSize: 16 },
  scoreSection: { alignItems: 'center', marginVertical: Spacing.xl },
  ringContainer: { width: RING_SIZE, height: RING_SIZE, justifyContent: 'center', alignItems: 'center' },
  svg: { position: 'absolute' },
  scoreInner: { alignItems: 'center' },
  scoreNum: { fontSize: 56, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -2 },
  scoreLabel: { ...Typography.caption, color: Colors.textSecondary, marginTop: 2 },
  scoreDelta: { color: Colors.accent, fontWeight: '600', fontSize: 15, marginTop: 8 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xl },
  statCard: {
    flex: 1, backgroundColor: Colors.glass, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.glassBorder, alignItems: 'center',
  },
  statValue: { color: Colors.textPrimary, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  statLabel: { ...Typography.small, color: Colors.textSecondary },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  sectionMeta: { ...Typography.caption, color: Colors.textSecondary },
  aiNudge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(34, 211, 238, 0.08)',
    borderRadius: Radius.lg, padding: Spacing.lg, marginTop: Spacing.xl, gap: 14,
    borderWidth: 1, borderColor: 'rgba(34, 211, 238, 0.15)',
  },
  aiNudgeEmoji: { fontSize: 28 },
  aiNudgeText: { color: Colors.textPrimary, fontWeight: '600', fontSize: 15 },
  aiNudgeAction: { color: Colors.info, fontSize: 13, marginTop: 2 },
});
