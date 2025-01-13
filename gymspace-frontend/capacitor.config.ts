import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'gs.gymspace.app',
  appName: 'Gymspace',
  webDir: 'dist',
  loggingBehavior: 'debug',
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
  android: {
    webContentsDebuggingEnabled: true,
    loggingBehavior: 'debug',
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
