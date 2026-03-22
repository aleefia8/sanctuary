import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';

export default function CoinAnimation({ amount, onComplete }: { amount: number; onComplete?: () => void }) {
  const translateY = useRef(new Animated.Value(200)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -100, duration: 2000, useNativeDriver: true }),
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.delay(1200),
        Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.spring(scale, { toValue: 1, damping: 12, useNativeDriver: true }),
    ]).start(() => {
      if (onComplete) onComplete();
    });
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[styles.container, { transform: [{ translateY }, { scale }], opacity }]}>
        <View style={styles.coin}>
          <Text style={styles.coinText}>M</Text>
        </View>
        <Text style={styles.amountText}>+{amount} Coins</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  coin: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fbbf24', justifyContent: 'center', alignItems: 'center', shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12 },
  coinText: { color: '#92400e', fontSize: 28, fontWeight: 'bold' },
  amountText: { color: '#fbbf24', fontSize: 20, fontWeight: 'bold', marginTop: 16 },
});
