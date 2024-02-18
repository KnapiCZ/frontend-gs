import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'gs.gymspace.app',
  appName: 'Gymsapce',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
