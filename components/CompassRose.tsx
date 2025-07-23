import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CompassRoseProps {
  size: number;
}

export default function CompassRose({ size }: CompassRoseProps) {
  const radius = size / 2;
  const tickRadius = radius - 20;
  const labelRadius = radius - 40;

  const cardinalDirections = ['N', 'E', 'S', 'W'];
  const intercardinalDirections = ['NE', 'SE', 'SW', 'NW'];

  const renderTicks = () => {
    const ticks = [];
    
    for (let i = 0; i < 360; i += 5) {
      const angle = (i - 90) * (Math.PI / 180);
      const isMajor = i % 30 === 0;
      const isCardinal = i % 90 === 0;
      
      const startRadius = isCardinal ? tickRadius - 15 : isMajor ? tickRadius - 10 : tickRadius - 5;
      const endRadius = tickRadius;
      
      const x1 = radius + startRadius * Math.cos(angle);
      const y1 = radius + startRadius * Math.sin(angle);
      const x2 = radius + endRadius * Math.cos(angle);
      const y2 = radius + endRadius * Math.sin(angle);
      
      ticks.push(
        <View
          key={i}
          style={[
            styles.tick,
            {
              left: x1,
              top: y1,
              width: Math.abs(x2 - x1) || 2,
              height: Math.abs(y2 - y1) || 2,
              backgroundColor: isCardinal ? '#FF6B35' : isMajor ? '#F8FAFC' : '#64748B',
            }
          ]}
        />
      );
    }
    
    return ticks;
  };

  const renderLabels = () => {
    const labels = [];
    
    // Cardinal directions
    cardinalDirections.forEach((direction, index) => {
      const angle = (index * 90 - 90) * (Math.PI / 180);
      const x = radius + labelRadius * Math.cos(angle);
      const y = radius + labelRadius * Math.sin(angle);
      
      labels.push(
        <View
          key={direction}
          style={[
            styles.cardinalLabel,
            {
              left: x - 12,
              top: y - 12,
            }
          ]}
        >
          <Text style={styles.cardinalText}>{direction}</Text>
        </View>
      );
    });
    
    // Intercardinal directions
    intercardinalDirections.forEach((direction, index) => {
      const angle = ((index * 90 + 45) - 90) * (Math.PI / 180);
      const x = radius + (labelRadius - 10) * Math.cos(angle);
      const y = radius + (labelRadius - 10) * Math.sin(angle);
      
      labels.push(
        <View
          key={direction}
          style={[
            styles.intercardinalLabel,
            {
              left: x - 10,
              top: y - 8,
            }
          ]}
        >
          <Text style={styles.intercardinalText}>{direction}</Text>
        </View>
      );
    });
    
    // Degree markers
    for (let i = 0; i < 360; i += 30) {
      if (i % 90 !== 0) { // Skip cardinal directions
        const angle = (i - 90) * (Math.PI / 180);
        const x = radius + (labelRadius + 15) * Math.cos(angle);
        const y = radius + (labelRadius + 15) * Math.sin(angle);
        
        labels.push(
          <View
            key={`deg-${i}`}
            style={[
              styles.degreeLabel,
              {
                left: x - 10,
                top: y - 8,
              }
            ]}
          >
            <Text style={styles.degreeText}>{i}°</Text>
          </View>
        );
      }
    }
    
    return labels;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer circle */}
      <View style={[styles.outerCircle, { width: size, height: size, borderRadius: radius }]} />
      
      {/* Inner circle */}
      <View style={[styles.innerCircle, { 
        width: size - 40, 
        height: size - 40, 
        borderRadius: (size - 40) / 2,
        left: 20,
        top: 20,
      }]} />
      
      {/* Center dot */}
      <View style={[styles.centerDot, { 
        left: radius - 6, 
        top: radius - 6 
      }]} />
      
      {/* Ticks */}
      {renderTicks()}
      
      {/* Labels */}
      {renderLabels()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  outerCircle: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#334155',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  innerCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#475569',
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
  },
  centerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B35',
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  tick: {
    position: 'absolute',
  },
  cardinalLabel: {
    position: 'absolute',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F8FAFC',
  },
  cardinalText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  intercardinalLabel: {
    position: 'absolute',
    width: 20,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intercardinalText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '600',
  },
  degreeLabel: {
    position: 'absolute',
    width: 20,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  degreeText: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '500',
  },
});