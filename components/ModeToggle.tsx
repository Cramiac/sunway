import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Sun, Moon } from 'lucide-react-native';
import { CompassMode } from '@/types';

interface ModeToggleProps {
  mode: CompassMode;
  onToggle: () => void;
}

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  const handleToggle = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onToggle();
  };

  const isTowardsMode = mode === 'towards';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isTowardsMode ? '#FF6B35' : '#1E3A8A' }
      ]}
      onPress={handleToggle}
      activeOpacity={0.8}
    >
      <div style={styles.iconContainer}>
        {isTowardsMode ? (
          <Sun size={20} color="#F8FAFC" />
        ) : (
          <Moon size={20} color="#F8FAFC" />
        )}
      </div>
      
      <Text style={styles.text}>
        {isTowardsMode ? 'Towards Sun' : 'Away from Sun'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
  },
});