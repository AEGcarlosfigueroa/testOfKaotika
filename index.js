/**
 * @format
 */
import { LogBox } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreAllLogs(false);

// Capture global JS errors
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.error("Caught global error:", error, isFatal);
});

AppRegistry.registerComponent(appName, () => App);
