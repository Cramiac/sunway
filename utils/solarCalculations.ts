import { SunPosition } from '@/types';

/**
 * Calculate the sun's position (azimuth and elevation) for a given location and time
 * Uses astronomical algorithms for accurate solar positioning
 */
export function calculateSunPosition(
  latitude: number,
  longitude: number,
  date: Date
): SunPosition {
  // Convert date to Julian day number
  const julianDay = getJulianDay(date);
  
  // Calculate centuries since J2000.0
  const n = julianDay - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  
  // Mean anomaly
  const g = toRadians((357.528 + 0.9856003 * n) % 360);
  
  // Ecliptic longitude
  const lambda = toRadians(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  
  // Obliquity of ecliptic
  const epsilon = toRadians(23.439 - 0.0000004 * n);
  
  // Right ascension and declination
  const alpha = Math.atan2(Math.cos(epsilon) * Math.sin(lambda), Math.cos(lambda));
  const delta = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
  
  // Greenwich sidereal time
  const gmst = (18.697374558 + 24.06570982441908 * n) % 24;
  
  // Local sidereal time
  const lst = (gmst + longitude / 15) % 24;
  
  // Hour angle
  const h = toRadians(15 * (lst - toDegrees(alpha) / 15));
  
  // Convert to local coordinates
  const latRad = toRadians(latitude);
  
  // Elevation angle
  const elevation = Math.asin(
    Math.sin(latRad) * Math.sin(delta) + 
    Math.cos(latRad) * Math.cos(delta) * Math.cos(h)
  );
  
  // Azimuth angle
  const azimuth = Math.atan2(
    -Math.sin(h),
    Math.tan(delta) * Math.cos(latRad) - Math.sin(latRad) * Math.cos(h)
  );
  
  // Convert to degrees and normalize azimuth to 0-360
  let azimuthDeg = (toDegrees(azimuth) + 180) % 360;
  const elevationDeg = toDegrees(elevation);
  
  return {
    azimuth: azimuthDeg,
    elevation: elevationDeg,
    isVisible: elevationDeg > 0
  };
}

function getJulianDay(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + 
              Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  const dayFraction = (hour - 12) / 24 + minute / 1440 + second / 86400;
  
  return jdn + dayFraction;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Calculate the target bearing based on sun position and mode
 */
export function getTargetBearing(sunPosition: SunPosition | null, mode: 'towards' | 'away'): number {
  if (!sunPosition) return 0;
  
  let bearing = sunPosition.azimuth;
  
  if (mode === 'away') {
    bearing = (bearing + 180) % 360;
  }
  
  return bearing;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Calculate the difference between two angles, accounting for circular nature
 */
export function angleDifference(angle1: number, angle2: number): number {
  let diff = angle2 - angle1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff;
}