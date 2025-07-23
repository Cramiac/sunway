import CompassView from '@/components/CompassView';
import ModeToggle from '@/components/ModeToggle';
import SunInfoPanel from '@/components/SunInfoPanel';
import { CompassMode, SunPosition } from '@/types';
import { calculateSunPosition } from '@/utils/solarCalculations';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [sunPosition, setSunPosition] = useState<SunPosition | null>(null);
  const [mode, setMode] = useState<CompassMode>('towards');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      updateSunPosition();
      const interval = setInterval(updateSunPosition, 1000); // Update every second
      return () => clearInterval(interval);
    }
  }, [location]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required for accurate Sunway functionality');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
      setLoading(false);
    } catch (err) {
      setError('Failed to get location. Please check your GPS settings.');
      setLoading(false);
    }
  };

  const updateSunPosition = () => {
    if (!location) return;

    const now = new Date();
    const position = calculateSunPosition(
      location.coords.latitude,
      location.coords.longitude,
      now
    );
    setSunPosition(position);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'towards' ? 'away' : 'towards');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Initializing Sunway...</Text>
        <Text style={styles.loadingSubtext}>Getting your location</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Error</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Sunway</Text>
        <ModeToggle mode={mode} onToggle={toggleMode} />
      </View>

      <View style={styles.compassContainer}>
        <CompassView 
          sunPosition={sunPosition}
          mode={mode}
        />
      </View>

      <View style={styles.infoContainer}>
        <SunInfoPanel 
          sunPosition={sunPosition}
          location={location}
          mode={mode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  loadingText: {
    color: '#FF6B35',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  loadingSubtext: {
    color: '#94A3B8',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 20,
  },
  errorTitle: {
    color: '#EF4444',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  errorText: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  compassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});