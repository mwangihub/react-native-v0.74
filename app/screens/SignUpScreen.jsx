import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Dimensions, useColorScheme, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuthContext } from '@/context/authContext';
import { DeviceContainer } from '@/components/DeviceContainer';

// DRY: has been violated here for simplicity

export const SignUpScreen = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        password1: '',
        password2: ''
    });
    const [showPass, setShowPass] = useState(true);
    const [press, setPress] = useState(false);
    const colorScheme = useColorScheme();
    const { signIn, signOut, session, isLoading } = useAuthContext();

    const inputTextColorStyles = {
        color: colorScheme === 'light' ? "#000" : "#fff"
    };

    const pass = () => {
        if (press == false) {
            setShowPass(false)
            setPress(true)
        } else {
            setShowPass(true)
            setPress(false)
        }
    }

    const handleRegister = async () => {
        signIn();
    };

    return (
        <ParallaxScrollView>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Create Account</ThemedText>
                <ThemedText>
                    This app includes example code to help you get started.
                </ThemedText>
            </ThemedView>


            <DeviceContainer>

                <ThemedView style={styles.colStyles}>

                    <ThemedView>
                        <Icon name={'person'}
                            size={28}
                            color={Colors[colorScheme].icon}
                            style={styles.inputIcon} />
                        <TextInput
                            onChangeText={(text) => { setData({ ...data, username: text }) }}
                            value={data.username}
                            style={{ ...styles.inputStyles, ...inputTextColorStyles }}
                            placeholder={'Username'}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                        />
                    </ThemedView>

                    <ThemedView>
                        <Icon
                            name={'power'}
                            size={28}
                            color={Colors[colorScheme].icon}
                            style={styles.inputIcon} />
                        <TextInput
                            onChangeText={(text) => { setData({ ...data, password1: text }) }}
                            value={data.password1}
                            style={styles.inputStyles}
                            placeholder={'Password'}
                            secureTextEntry={showPass}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                        />
                    </ThemedView>

                    <ThemedView>
                        <Icon
                            name={'power'}
                            size={28}
                            color={Colors[colorScheme].icon}
                            style={styles.inputIcon} />
                        <TextInput
                            onChangeText={(text) => { setData({ ...data, password2: text }) }}
                            value={data.password2}
                            style={styles.inputStyles}
                            placeholder={'Password again'}
                            secureTextEntry={showPass}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                        />
                    </ThemedView>

                    <ThemedView>
                        <TouchableOpacity
                            style={styles.btnEye}
                            onPress={() => pass()}
                        >
                            <Icon
                                name={press == false ? 'person' : 'person-plus'}
                                size={40}
                                color={Colors[colorScheme].icon} />
                        </TouchableOpacity>
                    </ThemedView>

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={() => handleRegister()}
                    >
                        <ThemedText style={styles.textSubmit}> CREATE ACCOUNT </ThemedText>
                    </TouchableOpacity>

                    <ThemedView style={styles.toSignInContainer}>
                        <ThemedText>Already Have Account?</ThemedText>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignIn') }}>
                            <ThemedText style={{ fontWeight: 'bold', color: '#2bb358' }}>
                                Sign in Now
                            </ThemedText>
                        </TouchableOpacity>
                    </ThemedView>

                </ThemedView>

                <ThemedView style={styles.colStyles}>


                </ThemedView>
            </DeviceContainer>

        </ParallaxScrollView>
    );
};



const styles = StyleSheet.create({
    colStyles: {
        flex: 1
    },

    toSignInContainer: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLogin: {
        width: 120,
        height: 120,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50
    },
    logoText: {
        color: 'white',
        fontSize: 26,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8
    },
    inputStyles: {
        // width: WIDTH - 75,
        height: 53,
        borderRadius: 45,
        fontSize: 20,
        backgroundColor: 'rgb(161, 206, 220)',
        color: 'black',
        paddingLeft: 48,
        marginTop: 15,
        // marginHorizontal: 25,
        opacity: 0.5
    },
    inputIcon: {
        position: 'absolute',
        top: 25,
        left: 15
    },
    btnEye: {
        // position: 'absolute',
        // top: 24,
        // right: 43
    },
    btnLogin: {
        // width: WIDTH - 75,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#2bb358',
        justifyContent: 'center',
        marginTop: 30
    },
    textSubmit: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textLogin: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 30,
    }
});
