// __tests__/socket.test.ts
import socketIO from "../socketIO";

jest.mock("../socketIO", () => ({
    connectSocket: jest.fn(),
    getSocket: jest.fn(() => ({
        emit: jest.fn(),
        on: jest.fn(),
    })),
}));

describe("Socket interactions", () => {
    it("should emit coordinates", () => {
        const socket = socketIO.getSocket();
        const message = { playerEmail: "test@example.com", latitude: 1, longitude: 2 };

        socket?.emit("sendCoordinates", message);

        expect(socket?.emit).toHaveBeenCalledWith("sendCoordinates", message);
    });

    it("should register listener for authorization", () => {
        const socket = socketIO.getSocket();
        const callback = jest.fn();

        socket?.on("authorization", callback);

        expect(socket?.on).toHaveBeenCalledWith("authorization", callback);
    });
});

//test function from the navigator
const sendIsInTower = (isInTower: boolean) => {
    const socket = socketIO.getSocket();
    socket?.emit("inTower", isInTower);
};

describe("sendIsInTower", () => {
    it("should emit the isInTower boolean", () => {
        const mockEmit = jest.fn();
        (socketIO.getSocket as jest.Mock).mockReturnValue({ emit: mockEmit });

        sendIsInTower(true);
        expect(mockEmit).toHaveBeenCalledWith("inTower", true);

        sendIsInTower(false);
        expect(mockEmit).toHaveBeenCalledWith("inTower", false);
    });
});


