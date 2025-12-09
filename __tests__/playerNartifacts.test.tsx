import { getDistanceInMeters } from '../__mocks__/distanceUtensil'

describe("getDistanceInMeters", () => {
  it("should return 0 if coordinates are the same", () => {
    const lat = 40.7128;
    const lon = -74.0060;

    const distance = getDistanceInMeters(lat, lon, lat, lon);
    expect(distance).toBe(0);
  });

  it("should return a positive distance between two points", () => {
    const nycLat = 40.7128;
    const nycLon = -74.0060;
    const laLat = 34.0522;
    const laLon = -118.2437;

    const distance = getDistanceInMeters(nycLat, nycLon, laLat, laLon);

    // Distance between NYC and LA is roughly 3940000 meters
    expect(distance).toBeGreaterThan(3900000);
    expect(distance).toBeLessThan(4000000);
  });

  it("should handle coordinates in reverse order (distance is symmetric)", () => {
    const aLat = 48.8566;
    const aLon = 2.3522; // Paris
    const bLat = 51.5074;
    const bLon = -0.1278; // London

    const d1 = getDistanceInMeters(aLat, aLon, bLat, bLon);
    const d2 = getDistanceInMeters(bLat, bLon, aLat, aLon);

    expect(d1).toBeCloseTo(d2, 5);
  });
});
