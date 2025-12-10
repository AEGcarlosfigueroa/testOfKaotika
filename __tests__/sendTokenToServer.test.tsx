import { sendTokenToServer } from "../__mocks__/sendToTokenOnly";
import { getAuth } from "../__mocks__/mockFirebaseAuth";

declare const global: any;

jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
}));

global.fetch = jest.fn();

describe("sendTokenToServer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should POST the token with Authorization header", async () => {
        const mockFirebaseToken = "firebase_12345";

        (getAuth as jest.Mock).mockReturnValue({
            currentUser: {
                getIdToken: jest.fn().mockResolvedValue(mockFirebaseToken),
            },
        });

        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
        });

        const SERVER_URL = "http://example.com";
        const token = "expoPushToken123";
        const email = "test@example.com";

        await sendTokenToServer(SERVER_URL, token, email);

        expect(fetch).toHaveBeenCalledWith(
            `${SERVER_URL}/api/players/register-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${mockFirebaseToken}`,
                },
                body: JSON.stringify({ token, email }),
            }
        );
    });
});
