import * as LocalAuthentication from 'expo-local-authentication';
import { authenticateUser } from '../src/utils/biometricAuth';


jest.mock('expo-local-authentication');

describe('authenticateUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns NO_HARDWARE when device has no biometric support', async () => {

        LocalAuthentication.hasHardwareAsync.mockResolvedValue(false);

        const result = await authenticateUser();

        expect(result).toEqual({
            success: false,
            errorType: 'NO_HARDWARE'
        })

    });

    it('returns success when authentication succeeds', async () => {
        LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
        LocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
        LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

        const result = await authenticateUser();

        expect(result).toEqual({ success: true });
    });
});