import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface HealthScoreProps {
  score: number;
  delta?: number;
}

export default function HealthScore({ score, delta = 0 }: HealthScoreProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(10)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, damping: 20, stiffness: 90, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(textSlide, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ringContainer, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
        <Svg width={200} height={200} style={styles.svg}>
          <Circle cx={100} cy={100} r={88} stroke="rgba(255,255,255,0.06)" strokeWidth={10} fill="none" />
          <Circle 
            cx={100} cy={100} r={88} 
            stroke="#34D399" 
            strokeWidth={8} 
            strokeLinecap="round" 
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - score / 100)}`}
            fill="none" 
            origin="100, 100"
            rotation="-90"
          />
        </Svg>
        <Animated.View style={[styles.textContainer, { transform: [{ translateY: textSlide }], opacity: textOpacity }]}>
          <Text style={styles.scoreText}>{score}</Text>
          <Text style={styles.deltaText}>
            {delta > 0 ? `+${delta} today` : `${delta} today`}
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 40 },
  ringContainer: { width: 200, height: 200, justifyContent: 'center', alignItems: 'center' },
  svg: { position: 'absolute' },
  textContainer: { alignItems: 'center' },
  scoreText: { color: '#fff', fontSize: 64, fontWeight: 'bold', letterSpacing: -1 },
  deltaText: { color: '#34D399', fontSize: 16, marginTop: 4, fontWeight: '500' },
});
