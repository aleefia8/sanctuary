import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const AI_RESPONSES: Record<string, string> = {
  default: "Based on your recent patterns, I'd suggest focusing on your sleep routine tonight. Small changes compound — you're doing great.",
  tired: "Looking at your sleep data, you averaged 5.8 hours this week. Here are 3 lifestyle adjustments that could help:\n\n1. Dim screens by 9pm\n2. Try a 10-min wind-down stretch\n3. Keep your room at 65°F",
  stressed: "Stress can affect your Health Score. Try a 5-minute breathing exercise — I'll guide you through it. Your cortisol patterns suggest evening is your peak stress window.",
  sleep: "Your sleep improved 12% this week. To keep that momentum, try maintaining a consistent bedtime within a 30-minute window.",
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hey! I'm your health concierge. Ask me anything about your wellness journey. 🌿", isUser: false, timestamp: 'Just now' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingDots = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingDots, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(typingDots, { toValue: 0, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      typingDots.setValue(0);
    }
  }, [isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input.trim(), isUser: true, timestamp: 'Now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Determine response
    const lower = input.toLowerCase();
    let response = AI_RESPONSES.default;
    if (lower.includes('tired') || lower.includes('energy') || lower.includes('fatigue')) response = AI_RESPONSES.tired;
    else if (lower.includes('stress') || lower.includes('anxious') || lower.includes('overwhelm')) response = AI_RESPONSES.stressed;
    else if (lower.includes('sleep') || lower.includes('rest') || lower.includes('insomnia')) response = AI_RESPONSES.sleep;

    // Delayed AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: response, isUser: false, timestamp: 'Now' };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500 + Math.random() * 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.msgRow, item.isUser && styles.msgRowUser]}>
      <View style={[styles.bubble, item.isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.msgText, item.isUser && styles.msgTextUser]}>{item.text}</Text>
      </View>
    </View>
  );

  const suggestions = ['Why am I tired?', 'How\'s my sleep?', 'I feel stressed'];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Concierge</Text>
        <View style={styles.onlineDot} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListFooterComponent={
          isTyping ? (
            <View style={styles.msgRow}>
              <Animated.View style={[styles.bubble, styles.bubbleAI, styles.typingBubble, { opacity: Animated.add(0.5, Animated.multiply(typingDots, 0.5)) }]}>
                <Text style={styles.typingText}>● ● ●</Text>
              </Animated.View>
            </View>
          ) : null
        }
      />

      {/* Quick suggestions */}
      {messages.length <= 1 && (
        <View style={styles.suggestionsRow}>
          {suggestions.map(s => (
            <TouchableOpacity key={s} style={styles.suggestion} onPress={() => { setInput(s); }}>
              <Text style={styles.suggestionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask anything..."
          placeholderTextColor={Colors.textMuted}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>↑</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 80 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingTop: 56, paddingBottom: Spacing.md, gap: 8,
  },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent },
  chatList: { padding: Spacing.lg, paddingBottom: 8 },
  msgRow: { marginBottom: 12 },
  msgRowUser: { alignItems: 'flex-end' },
  bubble: { maxWidth: '80%', padding: 14, borderRadius: 18 },
  bubbleAI: { backgroundColor: Colors.surfaceLight, borderBottomLeftRadius: 4 },
  bubbleUser: { backgroundColor: Colors.accent, borderBottomRightRadius: 4 },
  msgText: { color: Colors.textPrimary, fontSize: 15, lineHeight: 22 },
  msgTextUser: { color: Colors.background },
  typingBubble: { paddingVertical: 10, paddingHorizontal: 18 },
  typingText: { color: Colors.textSecondary, fontSize: 14, letterSpacing: 2 },
  suggestionsRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.lg, gap: 8, marginBottom: 12 },
  suggestion: {
    backgroundColor: Colors.glass, borderRadius: Radius.full,
    paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Colors.glassBorder,
  },
  suggestionText: { color: Colors.textSecondary, fontSize: 13 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingVertical: 8, gap: 8,
  },
  input: {
    flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: Radius.full,
    paddingHorizontal: 18, paddingVertical: 14, color: Colors.textPrimary, fontSize: 15,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
  },
  sendBtnText: { color: Colors.background, fontSize: 20, fontWeight: 'bold' },
});
