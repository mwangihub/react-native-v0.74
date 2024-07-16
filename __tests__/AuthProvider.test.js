
import { AuthProvider, useAuthContext } from '../context/authContext';
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Button, Text, View } from 'react-native';

const TestComponent = () => {
    const { signIn, signOut, session, isLoading } = useAuthContext();
    console.log("LOADING: ", isLoading)
    return (
        <View>
            <Button title="Sign In" onPress={signIn} />
            <Button title="Sign Out" onPress={signOut} />
            <Text>{session ? "SessionPresent" : 'NoSession'}</Text>
            <Text>{isLoading ? 'Loading' : 'NotLoading'}</Text>
        </View>
    );
};

jest.setTimeout(30000);

describe('AuthProvider', () => {
    it('should handle signIn and signOut correctly', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        const signInButton = getByText('Sign In');
        const signOutButton = getByText('Sign Out');

        await act(async () => {
            fireEvent.press(signInButton);
        });

        // await waitFor(() => expect(getByText('Loading')).toBeTruthy(), { timeout: 4000 });

        await waitFor(() => expect(getByText('SessionPresent')).toBeTruthy(), { timeout: 4000 });

        await act(async () => {
            fireEvent.press(signOutButton);
        });

        await waitFor(() => expect(getByText('NotLoading')).toBeTruthy(), { timeout: 4000 });

        await waitFor(() => expect(getByText('NoSession')).toBeTruthy(), { timeout: 4000 });
    });
});
