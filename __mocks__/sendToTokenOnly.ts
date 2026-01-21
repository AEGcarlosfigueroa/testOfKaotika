import AsyncStorageMock from "@react-native-async-storage/async-storage/jest/async-storage-mock";

export interface MockFirebaseUser {
    getIdToken: () => Promise<string>;
}

export interface MockFirebaseAuth {
    currentUser: MockFirebaseUser | null;
}

export const getAuth = (): MockFirebaseAuth => ({
    currentUser: {
        getIdToken: jest.fn().mockResolvedValue("mockToken123")
    }
});

export const sendTokenToServer = async (SERVER_URL: string, token: string | null, playerEmail: string) => {
    try {
        const fakeJwtToken = await AsyncStorageMock.getItem('accessToken');
        await fetch(`${SERVER_URL}/api/players/register-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "jwtauthorization": `Bearer ${fakeJwtToken}` },
            body: JSON.stringify({ token, email: playerEmail }),
        });
    } catch (error) {
        console.error("could not post the data", error);
    }  
};
