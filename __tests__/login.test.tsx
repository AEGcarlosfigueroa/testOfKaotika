// tests/login.test.tsx
jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-google-signin/google-signin');
jest.mock('../socketIO', () => ({
  connectSocket: jest.fn(),
  getSocket: jest.fn(() => ({ emit: jest.fn(), on: jest.fn() })),
}));

import { attemptLogIn } from "../__mocks__/loginFake.tsx";
declare const global: any;

describe("attemptLogIn", () => {
  let mockSetPlayer: jest.Mock;
  let mockSetLoading: jest.Mock;
  let mockSetSuccess: jest.Mock;
  let mockSetIsInTower: jest.Mock;
  let mockOnGoogleButtonPress: jest.Mock;

  beforeEach(() => {
    mockSetPlayer = jest.fn();
    mockSetLoading = jest.fn();
    mockSetSuccess = jest.fn();
    mockSetIsInTower = jest.fn();
    mockOnGoogleButtonPress = jest.fn(() =>
      Promise.resolve({ account: {}, firebaseIdToken: "fake-token" })
    );

    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ email: "test@example.com", isInTower: true })
      })
    );
  });

  it("calls setPlayer with correct data", async () => {
    await attemptLogIn({
      onGoogleButtonPress: mockOnGoogleButtonPress,
      setPlayer: mockSetPlayer,
      setLoading: mockSetLoading,
      setSuccess: mockSetSuccess,
      setIsInTower: mockSetIsInTower,
      serverURL: "http://localhost"
    });

    expect(mockSetPlayer).toHaveBeenCalledWith({ email: "test@example.com", isInTower: true });
  });

  it("calls setSuccess with true", async () => {
    await attemptLogIn({
      onGoogleButtonPress: mockOnGoogleButtonPress,
      setPlayer: mockSetPlayer,
      setLoading: mockSetLoading,
      setSuccess: mockSetSuccess,
      setIsInTower: mockSetIsInTower,
      serverURL: "http://localhost"
    });

    expect(mockSetSuccess).toHaveBeenCalledWith(true);
  });

  it("calls setIsInTower with correct value", async () => {
    await attemptLogIn({
      onGoogleButtonPress: mockOnGoogleButtonPress,
      setPlayer: mockSetPlayer,
      setLoading: mockSetLoading,
      setSuccess: mockSetSuccess,
      setIsInTower: mockSetIsInTower,
      serverURL: "http://localhost"
    });

    expect(mockSetIsInTower).toHaveBeenCalledWith(true);
  });

  it("calls setLoading twice", async () => {
    await attemptLogIn({
      onGoogleButtonPress: mockOnGoogleButtonPress,
      setPlayer: mockSetPlayer,
      setLoading: mockSetLoading,
      setSuccess: mockSetSuccess,
      setIsInTower: mockSetIsInTower,
      serverURL: "http://localhost"
    });

    expect(mockSetLoading).toHaveBeenCalledTimes(2); // true and false
  });
});
