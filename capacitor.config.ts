import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.luxurylife.charity',
  appName: 'Luxury Life',
  webDir: 'dist',
  server: {
    // For development - comment this out for production build
    // url: 'https://9d438e66-10e6-47aa-bf9d-9d02532e948d.lovableproject.com?forceHideBadge=true',
    // cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: process.env.KEYSTORE_PATH || 'upload-keystore.jks',
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreAlias: process.env.KEYSTORE_ALIAS || 'upload',
      keystoreAliasPassword: process.env.KEYSTORE_ALIAS_PASSWORD,
    }
  }
};

export default config;
