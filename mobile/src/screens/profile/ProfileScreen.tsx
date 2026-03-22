import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

const DOCTORS = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Integrative Medicine', philosophy: 'Holistic wellness', rating: 4.9, style: 'Warm & Direct' },
  { id: 2, name: 'Dr. Marcus Wright', specialty: 'Lifestyle Medicine', philosophy: 'Evidence-based prevention', rating: 4.8, style: 'Analytical' },
  { id: 3, name: 'Dr. Amara Obi', specialty: 'Functional Medicine', philosophy: 'Root cause resolution', rating: 4.9, style: 'Empathetic' },
];

export default function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <Text style={styles.name}>Anissa R.</Text>
          <Text style={styles.memberSince}>Member since March 2026</Text>
          <View style={styles.tierTag}>
            <Text style={styles.tierTagText}>EXPLORER · FREE</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { label: 'Level', value: '12' },
            { label: 'Coins', value: '2,480' },
            { label: 'Streak', value: '5 Days' },
          ].map((s, i) => (
            <View key={i} style={[styles.quickStat, i < 2 && styles.quickStatBorder]}>
              <Text style={styles.quickStatVal}>{s.value}</Text>
              <Text style={styles.quickStatLbl}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Doctor Marketplace */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Doctor Marketplace</Text>
            <View style={styles.proBadge}><Text style={styles.proBadgeText}>PRO</Text></View>
          </View>
          <Text style={styles.sectionSubtitle}>Match with physicians aligned to your lifestyle</Text>

          {DOCTORS.map(doc => (
            <View key={doc.id} style={styles.doctorCard}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorAvatarText}>{doc.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={styles.doctorSpec}>{doc.specialty}</Text>
                <Text style={styles.doctorPhil}>"{doc.philosophy}"</Text>
                <View style={styles.doctorMeta}>
                  <Text style={styles.doctorRating}>⭐ {doc.rating}</Text>
                  <Text style={styles.doctorStyle}>{doc.style}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.matchBtn}>
                <Text style={styles.matchBtnText}>Match</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {['Notifications', 'Connected Devices', 'Privacy', 'Help & Support', 'About SanctuaryOS'].map((item, i) => (
            <TouchableOpacity key={i} style={styles.settingRow}>
              <Text style={styles.settingText}>{item}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upgrade CTA */}
        <TouchableOpacity style={styles.upgradeCta} activeOpacity={0.85}>
          <Text style={styles.upgradeTitle}>Unlock Full Health System</Text>
          <Text style={styles.upgradeSubtitle}>AI Personalization · Doctor Matching · 3x Coin Multiplier</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          activeOpacity={0.8}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Onboarding' }],
            });
          }}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: Spacing.xl, paddingTop: 56 },
  profileHeader: { alignItems: 'center', marginBottom: Spacing.xl },
  avatar: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.accentSoft,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarText: { color: Colors.accent, fontSize: 28, fontWeight: '700' },
  name: { ...Typography.h2, color: Colors.textPrimary },
  memberSince: { ...Typography.small, color: Colors.textSecondary, marginTop: 4 },
  tierTag: {
    backgroundColor: Colors.surfaceLight, paddingHorizontal: 14, paddingVertical: 4,
    borderRadius: Radius.full, marginTop: 12,
  },
  tierTagText: { ...Typography.small, color: Colors.textSecondary, fontWeight: '600', letterSpacing: 1 },
  quickStats: {
    flexDirection: 'row', backgroundColor: Colors.glass, borderRadius: Radius.lg,
    padding: Spacing.lg, borderWidth: 1, borderColor: Colors.glassBorder, marginBottom: Spacing.xl,
  },
  quickStat: { flex: 1, alignItems: 'center' },
  quickStatBorder: { borderRightWidth: 1, borderRightColor: Colors.glassBorder },
  quickStatVal: { color: Colors.textPrimary, fontSize: 18, fontWeight: '700' },
  quickStatLbl: { ...Typography.small, color: Colors.textSecondary, marginTop: 4 },
  section: { marginBottom: Spacing.xl },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
  sectionSubtitle: { ...Typography.small, color: Colors.textSecondary, marginBottom: Spacing.md },
  proBadge: { backgroundColor: Colors.accent, paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full },
  proBadgeText: { color: Colors.background, fontSize: 10, fontWeight: '700' },
  doctorCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.glass,
    borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.glassBorder,
  },
  doctorAvatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.surfaceLight,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  doctorAvatarText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600' },
  doctorInfo: { flex: 1 },
  doctorName: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600' },
  doctorSpec: { color: Colors.textSecondary, fontSize: 12, marginTop: 2 },
  doctorPhil: { color: Colors.textMuted, fontSize: 11, fontStyle: 'italic', marginTop: 4 },
  doctorMeta: { flexDirection: 'row', gap: 12, marginTop: 4 },
  doctorRating: { color: Colors.coin, fontSize: 12 },
  doctorStyle: { color: Colors.textSecondary, fontSize: 12 },
  matchBtn: {
    backgroundColor: Colors.accentSoft, paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: Radius.full,
  },
  matchBtnText: { color: Colors.accent, fontSize: 13, fontWeight: '600' },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  settingText: { color: Colors.textPrimary, fontSize: 15 },
  chevron: { color: Colors.textMuted, fontSize: 22 },
  upgradeCta: {
    backgroundColor: 'rgba(52,211,153,0.08)', borderRadius: Radius.xl, padding: Spacing.xl,
    borderWidth: 1, borderColor: Colors.accent, alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  upgradeTitle: { ...Typography.h3, color: Colors.accent, marginBottom: 6 },
  upgradeSubtitle: { ...Typography.small, color: Colors.textSecondary, textAlign: 'center' },
  logoutBtn: {
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)', borderRadius: Radius.lg,
    backgroundColor: 'rgba(239,68,68,0.05)',
  },
  logoutText: { color: '#EF4444', fontSize: 15, fontWeight: '600' },
});
