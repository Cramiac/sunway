import { CompassMode, SunPosition } from '@/types';
import { getTargetBearing } from '@/utils/solarCalculations';
import * as Location from 'expo-location';
import { Clock, Compass, MapPin, Sun } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SunInfoPanelProps {
  sunPosition: SunPosition | null;
  location: Location.LocationObject | null;
  mode: CompassMode;
}

export default function SunInfoPanel({ sunPosition, location, mode }: SunInfoPanelProps) {
  const formatTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatCoordinate = (coord: number, isLatitude: boolean) => {
    const direction = isLatitude 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(4)}° ${direction}`;
  };

  const getCardinalDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const targetBearing = sunPosition ? getTargetBearing(sunPosition, mode) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.infoItem}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.label}>Current Time</Text>
          <Text style={styles.value}>{formatTime()}</Text>
        </View>
        
        <View style={styles.infoItem}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.label}>Location</Text>
          <Text style={styles.valueSmall}>
            {location ? formatCoordinate(location.coords.latitude, true) : '---'}
          </Text>
          <Text style={styles.valueSmall}>
            {location ? formatCoordinate(location.coords.longitude, false) : '---'}
          </Text>
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.infoItem}>
          <Sun size={16} color="#FF6B35" />
          <Text style={styles.label}>Sun Position</Text>
          <Text style={styles.value}>
            {sunPosition ? `${Math.round(sunPosition.azimuth)}°` : '---'}
          </Text>
          <Text style={styles.valueSmall}>
            {sunPosition ? getCardinalDirection(sunPosition.azimuth) : '---'}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Compass size={16} color={mode === 'towards' ? '#FF6B35' : '#1E3A8A'} />
          <Text style={styles.label}>Target Direction</Text>
          <Text style={styles.value}>
            {Math.round(targetBearing)}°
          </Text>
          <Text style={styles.valueSmall}>
            {getCardinalDirection(targetBearing)}
          </Text>
        </View>
      </View>
      
      {sunPosition && !sunPosition.isVisible && (
        <View style={styles.nightModeWarning}>
          <Text style={styles.warningText}>
            ⚠️ Sun is below horizon - calculations based on theoretical position
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  valueSmall: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  nightModeWarning: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
    marginTop: 8,
  },
  warningText: {
    color: '#FCA5A5',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});