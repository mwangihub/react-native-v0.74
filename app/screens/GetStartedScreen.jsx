import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemedButtonLink from '@/components/ThemedButtonLink';
import { DeviceContainer } from '@/components/DeviceContainer';
import { Card } from '@rneui/themed';

export const GetStartedScreen = ({ navigation }) => {
    return (
        <>
            <ParallaxScrollView>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">
                        Get started.
                    </ThemedText>
                </ThemedView>

                <ThemedText>
                    This app includes example code to help you get started.
                </ThemedText>

                <DeviceContainer
                    containerStyles={styles.container}
                    smallWidthStyles={styles.overrideContainer}
                >

                    <Card containerStyle={{ ...styles.card }}>
                        <Card.Title style={{ textAlign: 'left' }}>
                            <ThemedText>SIGN UP</ThemedText>
                        </Card.Title>
                        <ThemedText style={styles.textStyle}>
                            If you have an account, sign in to get started
                        </ThemedText>
                        <ThemedButtonLink
                            btnText='Sign up'
                            handlePress={() => navigation.navigate("SignUp")}
                        />
                    </Card>

                    <Card containerStyle={{ ...styles.card }}>
                        <Card.Title style={{ textAlign: 'left' }}>
                            <ThemedText>SIGN IN</ThemedText>
                        </Card.Title>
                        <ThemedText style={styles.textStyle}>
                            Sign up to have an active account.
                        </ThemedText>

                        <ThemedButtonLink
                            btnText='Sign in'
                            handlePress={() => navigation.navigate("SignIn")}
                        />

                    </Card>

                </DeviceContainer>

            </ParallaxScrollView>
        </>

    );
}


const styles = StyleSheet.create({
    container: {
        height: '50vh',
        display: 'flex',
        alignContent: 'space-between',
        alignItems: "center"
    },
    overrideContainer: {
        alignItems: 'flex-start',

    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    textStyle: {
        marginBottom: 20
    },
    card: {
        flex: 1,
        borderColor: null,
        borderWidth: 0,
        backgroundColor: "transparent",
        shadowColor: "transparent",
        padding: 0,
        marginBottom: 20,
        width: "100%"
    },


});
