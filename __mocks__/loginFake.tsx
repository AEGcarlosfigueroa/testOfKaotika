
import socketIO from "../socketIO";
import React from "react";

export async function attemptLogIn({
  onGoogleButtonPress,
  setPlayer,
  setLoading,
  setSuccess,
  setIsInTower,
  serverURL,
  fetchFn = fetch 
}: {
  onGoogleButtonPress: () => Promise<{ account: any; firebaseIdToken: string }>,
  setPlayer: (player: any) => void,
  setLoading: (loading: boolean) => void,
  setSuccess: (success: boolean) => void,
  setIsInTower: (isInTower: boolean) => void,
  serverURL: string,
  fetchFn?: typeof fetch
}) {
  try {
    setLoading(true);

    const { account, firebaseIdToken } = await onGoogleButtonPress();

    // Use the injected fetch function
    const response = await fetchFn(`${serverURL}/login`, {
      method: "POST",
      headers: { Authorization: `Bearer ${firebaseIdToken}` }
    });

    const data = await response.json();

    socketIO.connectSocket(firebaseIdToken, serverURL);

    setPlayer(data);
    setSuccess(true);
    setIsInTower(data.isInTower);

    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
}