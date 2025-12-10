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
        const firebaseIdToken = await getAuth().currentUser?.getIdToken();
        await fetch(`${SERVER_URL}/api/players/register-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${firebaseIdToken}` },
            body: JSON.stringify({ token, email: playerEmail }),
        });
    } catch (error) {
        console.error("could not post the data", error);
    }  
};
