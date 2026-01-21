import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Platform } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

//Performs biometric authentication and returns a result
export const authenticateUser = async () => {
    try {
        // Check if device supports biometric hardware
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            return { success: false, errorType: 'NO_HARDWARE' }
        }

        // Check if any biometric data is enrolled on the device
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            return { success: false, errorType: 'NOT_ENROLLED' }
        }

        //Trigger biometric authentication prompt
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to continue',
            fallbackLabel: 'Use device PIN',
        });

        if (!result.success) {
            return { success: false, errorType: 'FAILED' };
        }

        return { success: true };

    } catch (error: any) {
        return { success: false, errorType: 'NOT_ENROLLED', message: error.message };
    }
}


//Redirects user to appropriate settings screen to enable biometrics
export const redirectToSettings = () => {
    try {
        if (Platform.OS === 'ios') {
            Linking.openSettings();
        } else {
            IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.SECURITY_SETTINGS);
        }
    } catch (error) {
        Linking.openSettings();
    }
}