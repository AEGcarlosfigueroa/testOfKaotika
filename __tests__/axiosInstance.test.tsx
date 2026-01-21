import axiosInstance, { refreshToken } from "../__mocks__/axiosInstanceFake";
import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

describe("axiosInstance tests", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    test("when receiving a response that is not 403, it should not attempt to refresh token", async() => {
        
        jest.spyOn(axiosInstance, 'get').mockImplementation(async() => { return { status: 200 }});

        jest.spyOn(AsyncStorage, 'setItem');

        const response = await axiosInstance.get("/get");

        expect(AsyncStorage.setItem).not.toHaveBeenCalled();

        expect(response.status).toBe(200)
    });

    test("when receiving a response that is 403, it should attempt to refresh token and save the token to asyncStorage", async() => {

        const fakeResponseData = { accessToken: "owivn98wenv89ewio", refreshToken: "fn20fn2ieo" };

        await AsyncStorage.setItem("refreshToken", "12345");
        
        jest.spyOn(axiosInstance, 'get').mockImplementation(async() => { return { status: 200, data: fakeResponseData }});

        jest.spyOn(AsyncStorage, 'setItem');

        await refreshToken({ response: { status: 403 }, config: { headers: [] } })

        expect(AsyncStorage.setItem).toHaveBeenCalledWith("accessToken", fakeResponseData.accessToken);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith("refreshToken", fakeResponseData.refreshToken);
    });

    test("when receiving a response that is 403, but does not have a refreshToken, it should not attempt to refresh token", async() => {

        const fakeResponseData = { accessToken: "owivn98wenv89ewio", refreshToken: "fn20fn2ieo" };

        await AsyncStorage.removeItem("refreshToken");
        
        jest.spyOn(axiosInstance, 'get').mockImplementation(async() => { return { status: 200, data: fakeResponseData }});

        jest.spyOn(AsyncStorage, 'setItem');

        try
        {
            await refreshToken({ response: { status: 403 }, config: { headers: [] } })
        }
        catch(error)
        {
            
        }

        expect(AsyncStorage.setItem).not.toHaveBeenCalled();
        expect(axiosInstance.get).not.toHaveBeenCalled();
    });
})