export const getAuth = jest.fn(() => ({
  currentUser: null,
}));

export const GoogleAuthProvider = {
  credential: jest.fn(),
};

export const signInWithCredential = jest.fn();
export const signOut = jest.fn();
export const onAuthStateChanged = jest.fn();
