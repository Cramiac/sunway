import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { SunPosition, CompassMode } from '@/types';

interface CompassNeedleProps {
  size: number;
  mode: CompassMode;
  sunPosition: SunPosition | null;
}

export default function CompassNeedle({ size, mode, sunPosition }: CompassNeedleProps) {
  const radius = size / 2;
  const needleLength = radius - 60;
  
  const needleColor = mode === 'towards' ? '#FF6B35' : '#1E3A8A';
  const isVisible = sunPosition?.isVisible ?? true;

  return (
    <View style={styles.container}>
      {/* Main needle */}
      <View style={[
        styles.needle,
        {
          height: needleLength,
          backgroundColor: needleColor,
          opacity: isVisible ? 1 : 0.5,
        }
      ]} />
      
      {/* Needle tip */}
      <View style={[
        styles.needleTip,
        {
          top: -needleLength / 2 - 15,
          backgroundColor: needleColor,
          opacity: isVisible ? 1 : 0.5,
        }
      ]}>
        {mode === 'towards' ? (
          <Sun size={16} color="#F8FAFC" />
        ) : (
          <Moon size={16} color="#F8FAFC" />
        )}
      </View>
      
      {/* Needle base */}
      <View style={[
        styles.needleBase,
        {
          bottom: -needleLength / 2 - 10,
          backgroundColor: needleColor,
          opacity: isVisible ? 1 : 0.5,
        }
      ]} />
      
      {/* Center hub */}
      <View style={styles.centerHub} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  needle: {
    width: 4,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  needleTip: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F8FAFC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  needleBase: {
    position: 'absolute',
    width: 8,
    height: 20,
    borderRadius: 4,
  },
  centerHub: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#334155',
    borderWidth: 2,
    borderColor: '#F8FAFC',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});