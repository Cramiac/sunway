import { CompassMode, SunPosition } from '@/types';
import { getTargetBearing } from '@/utils/solarCalculations';
import { Magnetometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import CompassNeedle from './CompassNeedle';
import CompassRose from './CompassRose';

const { width } = Dimensions.get('window');
const COMPASS_SIZE = Math.min(width * 0.8, 290);

interface CompassViewProps {
  sunPosition: SunPosition | null;
  mode: CompassMode;
}

export default function CompassView({ sunPosition, mode }: CompassViewProps) {
  const [magnetometerData, setMagnetometerData] = useState<{ x: number; y: number; z: number } | null>(null);
  const compassRotation = useSharedValue(0);
  const needleRotation = useSharedValue(0);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      // Subscribe to magnetometer updates
      const subscription = Magnetometer.addListener((data) => {
        setMagnetometerData(data);
        
        // Calculate compass heading from magnetometer data
        const heading = Math.atan2(data.y, data.x) * (180 / Math.PI);
        const normalizedHeading = (heading + 360) % 360;
        
        // Rotate compass rose to align with magnetic north
        compassRotation.value = withSpring(-normalizedHeading, {
          damping: 15,
          stiffness: 100,
        });
      });

      // Set update interval
      Magnetometer.setUpdateInterval(100);

      return () => subscription.remove();
    } else {
      // For web platform, use a mock magnetometer data
      setMagnetometerData({ x: 1, y: 0, z: 0 });
    }
  }, []);

  useEffect(() => {
    if (sunPosition && magnetometerData) {
      const targetBearing = getTargetBearing(sunPosition, mode);
      
      // Calculate the current device heading
      const deviceHeading = Math.atan2(magnetometerData.y, magnetometerData.x) * (180 / Math.PI);
      const normalizedDeviceHeading = (deviceHeading + 360) % 360;
      
      // Calculate needle rotation relative to compass
      const needleAngle = targetBearing - normalizedDeviceHeading;
      
      needleRotation.value = withSpring(needleAngle, {
        damping: 15,
        stiffness: 100,
      });
    }
  }, [sunPosition, mode, magnetometerData]);

  const compassAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${compassRotation.value}deg` }],
    };
  });

  const needleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${needleRotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        <Animated.View style={[styles.compass, compassAnimatedStyle]}>
          <CompassRose size={COMPASS_SIZE} />
        </Animated.View>
        
        <Animated.View style={[styles.needleContainer, needleAnimatedStyle]}>
          <CompassNeedle size={COMPASS_SIZE} mode={mode} sunPosition={sunPosition} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassContainer: {
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compass: {
    position: 'absolute',
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
  },
  needleContainer: {
    position: 'absolute',
    width: COMPASS_SIZE,
    height: COMPASS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});