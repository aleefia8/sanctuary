import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';

export default function UpgradeModal({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Unlock Your{'\n'}Full Health System</Text>
          <Text style={styles.subtitle}>Upgrade to access everything SanctuaryOS has to offer.</Text>

          <View style={styles.features}>
            {[
              '🤖  AI Personalization',
              '👨‍⚕️  Doctor Matching',
              '⚡  3x Coin Multiplier',
              '📊  Advanced Insights',
              '🏆  Premium Missions',
            ].map((f, i) => (
              <Text key={i} style={styles.feature}>{f}</Text>
            ))}
          </View>

          <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.85}>
            <Text style={styles.upgradeBtnText}>Upgrade Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.later}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  container: { flex: 1, justifyContent: 'flex-end' },
  closeBtn: {
    position: 'absolute', top: 56, right: 24, width: 36, height: 36,
    borderRadius: 18, backgroundColor: Colors.surfaceLight, justifyContent: 'center', alignItems: 'center', zIndex: 10,
  },
  closeText: { color: Colors.textSecondary, fontSize: 16 },
  content: {
    backgroundColor: Colors.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: Spacing.xxl, paddingTop: 40, alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center', marginBottom: 12 },
  subtitle: { ...Typography.bodyLight, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.xl },
  features: { width: '100%', marginBottom: Spacing.xxl, gap: 14 },
  feature: { color: Colors.textPrimary, fontSize: 16, lineHeight: 24 },
  upgradeBtn: {
    backgroundColor: Colors.accent, paddingVertical: 18, borderRadius: Radius.full,
    width: '100%', alignItems: 'center', marginBottom: 16,
    shadowColor: Colors.accent, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20,
  },
  upgradeBtnText: { color: Colors.background, fontSize: 17, fontWeight: '700' },
  later: { color: Colors.textMuted, fontSize: 14 },
});
