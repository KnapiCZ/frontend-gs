import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "gs.gymspace.app",
    appName: "Gymspace",
    webDir: "dist",
    plugins: {
        CapacitorCookies: {
            enabled: true,
        },
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: "#000000",
            androidScaleType: "CENTER_CROP",
            splashFullScreen: true,
            useDialog: false,
        },
        Media: {
            androidGalleryMode: true,
        },
    },
    android: {
        // Removed for production
        webContentsDebuggingEnabled: true,
        loggingBehavior: "debug",
    },
    server: {
        androidScheme: "https", // Keep this for secure connections
    },
}

export default config
