import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../theme';

export default function MissionCard({ mission, onPress, completed }: any) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.card, completed && styles.cardDone]}>
      <View style={[styles.iconContainer, completed && styles.iconDone]}>
        <Text style={styles.icon}>{completed ? '✓' : mission.icon || '🎯'}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.titleDone]}>{mission.title}</Text>
        <Text style={styles.subtitle}>{completed ? 'Completed! +10 M Coins' : mission.subtitle || 'Reward: +10 M Coins'}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${mission.progress || 0}%` }, completed && styles.progressDone]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.glass, borderRadius: Radius.lg,
    padding: Spacing.lg, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.glassBorder,
  },
  cardDone: { borderColor: 'rgba(52,211,153,0.2)', backgroundColor: 'rgba(52,211,153,0.05)' },
  iconContainer: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  iconDone: { backgroundColor: Colors.accentSoft },
  icon: { fontSize: 20 },
  textContainer: { flex: 1 },
  title: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600', marginBottom: 3 },
  titleDone: { textDecorationLine: 'line-through', opacity: 0.6 },
  subtitle: { color: Colors.textSecondary, fontSize: 12 },
  progressContainer: { width: 50, alignItems: 'flex-end', justifyContent: 'center' },
  progressBar: { width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: Colors.accent, borderRadius: 2 },
  progressDone: { backgroundColor: Colors.accent },
});
