import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Svg, { Polyline, Line } from 'react-native-svg';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const { width } = Dimensions.get('window');
const CHART_W = width - 48;
const CHART_H = 140;

// Mock weekly data
const weekData = [58, 55, 60, 57, 62, 61, 62];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxVal = 70;
const minVal = 50;

function getPoints() {
  return weekData.map((val, i) => {
    const x = (i / (weekData.length - 1)) * CHART_W;
    const y = CHART_H - ((val - minVal) / (maxVal - minVal)) * CHART_H;
    return `${x},${y}`;
  }).join(' ');
}

export default function ProgressScreen() {
  const level = 12;
  const xp = 340;
  const xpNeeded = 500;
  const progress = xp / xpNeeded;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Progress</Text>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <View>
              <Text style={styles.levelLabel}>Level</Text>
              <Text style={styles.levelNum}>{level}</Text>
            </View>
            <View style={styles.levelRight}>
              <Text style={styles.xpText}>{xp} / {xpNeeded} XP</Text>
              <View style={styles.xpBarBg}>
                <View style={[styles.xpBarFill, { width: `${progress * 100}%` }]} />
              </View>
            </View>
          </View>
          <Text style={styles.levelHint}>160 XP to Level {level + 1}</Text>
        </View>

        {/* Weekly Score Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Score Trend</Text>
          <View style={styles.chartCard}>
            <Svg width={CHART_W} height={CHART_H + 30}>
              {/* Grid lines */}
              {[0, 0.5, 1].map((f, i) => (
                <Line key={i} x1={0} y1={CHART_H * f} x2={CHART_W} y2={CHART_H * f}
                  stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              ))}
              <Polyline
                points={getPoints()}
                fill="none"
                stroke={Colors.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <View style={styles.dayLabels}>
              {days.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
            </View>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          {[
            { icon: '😴', text: 'Your sleep improved 12% this week', color: Colors.sleep },
            { icon: '🏃', text: 'Steps are 8% below your weekly goal', color: Colors.stress },
            { icon: '🧘', text: 'Mood consistency is excellent', color: Colors.accent },
          ].map((insight, i) => (
            <View key={i} style={styles.insightCard}>
              <Text style={styles.insightIcon}>{insight.icon}</Text>
              <Text style={styles.insightText}>{insight.text}</Text>
            </View>
          ))}
        </View>

        {/* Streak Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gamification</Text>
          <View style={styles.statsGrid}>
            {[
              { label: 'Current Streak', value: '5 Days', emoji: '🔥' },
              { label: 'Multiplier', value: 'x2', emoji: '⚡' },
              { label: 'Total Coins', value: '2,480', emoji: '🪙' },
              { label: 'Missions Done', value: '47', emoji: '✅' },
            ].map((s, i) => (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statEmoji}>{s.emoji}</Text>
                <Text style={styles.statVal}>{s.value}</Text>
                <Text style={styles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: 56 },
  title: { ...Typography.h1, color: Colors.textPrimary, marginBottom: Spacing.xl },
  levelCard: {
    backgroundColor: Colors.glass, borderRadius: Radius.xl, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.glassBorder, marginBottom: Spacing.xl,
  },
  levelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelLabel: { ...Typography.caption, color: Colors.textSecondary },
  levelNum: { fontSize: 48, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -1 },
  levelRight: { flex: 1, marginLeft: 24 },
  xpText: { ...Typography.caption, color: Colors.textSecondary, textAlign: 'right', marginBottom: 8 },
  xpBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 3 },
  xpBarFill: { height: '100%', backgroundColor: Colors.accent, borderRadius: 3 },
  levelHint: { ...Typography.small, color: Colors.textMuted, marginTop: 12 },
  section: { marginBottom: Spacing.xl },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: Spacing.md },
  chartCard: {
    backgroundColor: Colors.glass, borderRadius: Radius.lg, padding: Spacing.lg,
    borderWidth: 1, borderColor: Colors.glassBorder,
  },
  dayLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  dayLabel: { ...Typography.small, color: Colors.textMuted },
  insightCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.glass,
    borderRadius: Radius.md, padding: Spacing.md, marginBottom: 8, gap: 12,
    borderWidth: 1, borderColor: Colors.glassBorder,
  },
  insightIcon: { fontSize: 22 },
  insightText: { color: Colors.textPrimary, fontSize: 14, flex: 1 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statBox: {
    width: '47%', backgroundColor: Colors.glass, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.glassBorder, alignItems: 'center',
  },
  statEmoji: { fontSize: 24, marginBottom: 8 },
  statVal: { color: Colors.textPrimary, fontSize: 20, fontWeight: '700' },
  statLbl: { ...Typography.small, color: Colors.textSecondary, marginTop: 4 },
});
