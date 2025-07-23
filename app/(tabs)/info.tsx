import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Sunway</Text>
          <Text style={styles.description}>
            Sunway uses your device's GPS and magnetometer to provide accurate directional guidance based on the sun's position. 
            The app calculates the sun's azimuth angle using astronomical algorithms and your current location.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionTitle}>Towards Sun Mode</Text>
            <Text style={styles.instructionText}>
              The compass needle points directly toward the sun's current position in the sky.
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionTitle}>Away from Sun Mode</Text>
            <Text style={styles.instructionText}>
              The compass needle points 180° opposite to the sun, helping you find shaded directions.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accuracy</Text>
          <Text style={styles.description}>
            For best results, ensure your device has:
          </Text>
          <Text style={styles.bulletPoint}>• GPS location access enabled</Text>
          <Text style={styles.bulletPoint}>• Accurate time and date settings</Text>
          <Text style={styles.bulletPoint}>• Calibrated magnetometer (move device in figure-8 pattern)</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Sunway v1.0.0
          </Text>
          <Text style={styles.footerSubtext}>
            Built By 'FranciumItIs' on Github
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FF6B35',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    color: '#94A3B8',
    fontSize: 16,
    lineHeight: 24,
  },
  instructionItem: {
    marginBottom: 16,
  },
  instructionTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  bulletPoint: {
    color: '#94A3B8',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  footerSubtext: {
    color: '#475569',
    fontSize: 12,
    marginTop: 4,
  },
});