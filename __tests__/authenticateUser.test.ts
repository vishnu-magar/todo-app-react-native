import * as LocalAuthentication from 'expo-local-authentication';
import { authenticateUser } from '../src/utils/biometricAuth';


jest.mock('expo-local-authentication');

const mockedLocalAuthentication = LocalAuthentication as jest.Mocked<typeof LocalAuthentication>;

describe('authenticateUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('returns NO_HARDWARE when device has no biometric support', async () => {

        mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(false);

        const result = await authenticateUser();

        expect(result).toEqual({
            success: false,
            errorType: 'NO_HARDWARE'
        })

    });

    it('returns success when authentication succeeds', async () => {
        mockedLocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
        mockedLocalAuthentication.isEnrolledAsync.mockResolvedValue(true);
        mockedLocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

        const result = await authenticateUser();

        expect(result).toEqual({ success: true });
    });
});