import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Typography, Spacing, Radius } from '../../theme';

export default function MissionDetailScreen({ route, navigation }: any) {
  const mission = route?.params?.mission || { title: 'Morning Hydration', subtitle: 'Drink 16oz of water', icon: '💧' };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.hero}>
          <Text style={styles.heroIcon}>{mission.icon || '🎯'}</Text>
          <Text style={styles.heroTitle}>{mission.title}</Text>
          <Text style={styles.heroSubtitle}>{mission.subtitle}</Text>
        </View>

        {/* Progress Ring */}
        <View style={styles.ringWrap}>
          <Svg width={140} height={140}>
            <Circle cx={70} cy={70} r={58} stroke="rgba(255,255,255,0.06)" strokeWidth={8} fill="none" />
            <Circle cx={70} cy={70} r={58} stroke={Colors.accent} strokeWidth={6}
              strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 58}`}
              strokeDashoffset={`${2 * Math.PI * 58 * 0.5}`} fill="none"
              origin="70, 70" rotation="-90" />
          </Svg>
          <Text style={styles.ringPercent}>50%</Text>
        </View>

        {/* Steps */}
        <View style={styles.stepsSection}>
          <Text style={styles.stepsTitle}>How to complete</Text>
          {['Track your intake throughout the day', 'Mark each glass when finished', 'Reach your 16oz goal before noon'].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Reward */}
        <View style={styles.rewardCard}>
          <Text style={styles.rewardTitle}>🪙 Reward</Text>
          <Text style={styles.rewardValue}>+10 M Coins</Text>
          <Text style={styles.rewardBonus}>x2 Streak Multiplier Active</Text>
        </View>

        <TouchableOpacity style={styles.completeBtn} activeOpacity={0.85} onPress={() => navigation.goBack()}>
          <Text style={styles.completeBtnText}>Mark Complete</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: 56 },
  backBtn: { marginBottom: Spacing.xl },
  backText: { color: Colors.textSecondary, fontSize: 16 },
  hero: { alignItems: 'center', marginBottom: Spacing.xxl },
  heroIcon: { fontSize: 56, marginBottom: 16 },
  heroTitle: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center' },
  heroSubtitle: { ...Typography.bodyLight, color: Colors.textSecondary, marginTop: 8 },
  ringWrap: { alignSelf: 'center', width: 140, height: 140, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.xxl },
  ringPercent: { position: 'absolute', color: Colors.textPrimary, fontSize: 24, fontWeight: '700' },
  stepsSection: { marginBottom: Spacing.xxl },
  stepsTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.md },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 14 },
  stepNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.accentSoft, justifyContent: 'center', alignItems: 'center' },
  stepNumText: { color: Colors.accent, fontWeight: '700', fontSize: 13 },
  stepText: { color: Colors.textSecondary, fontSize: 14, flex: 1 },
  rewardCard: {
    backgroundColor: 'rgba(251,191,36,0.08)', borderRadius: Radius.lg, padding: Spacing.xl,
    alignItems: 'center', borderWidth: 1, borderColor: 'rgba(251,191,36,0.15)', marginBottom: Spacing.xxl,
  },
  rewardTitle: { color: Colors.coin, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  rewardValue: { color: Colors.textPrimary, fontSize: 28, fontWeight: '800' },
  rewardBonus: { color: Colors.coin, fontSize: 12, marginTop: 4 },
  completeBtn: {
    backgroundColor: Colors.accent, paddingVertical: 18, borderRadius: Radius.full,
    alignItems: 'center', shadowColor: Colors.accent, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20,
  },
  completeBtnText: { color: Colors.background, fontSize: 17, fontWeight: '700' },
});
