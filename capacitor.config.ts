
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d4f5398adc5546538f5ccab8ab9cdbb4',
  appName: 'bento-browse-explorer',
  webDir: 'dist',
  server: {
    url: 'https://d4f5398a-dc55-4653-8f5c-cab8ab9cdbb4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Haptics: {
      selectionStarted: true,
      selectionChanged: true,
      selectionEnded: true
    }
  }
};

export default config;
