import { StyleSheet, ViewStyle, Text, TouchableOpacity, useColorScheme } from 'react-native';

type Props = {
    isLoading: boolean;
    bgColor?: string;
    btnText?: string;
    btnTextColor?: string;
    btnStyles?: ViewStyle;
    handlePress: () => void;
};

const ThemedButtonLink = ({
    handlePress,
    isLoading,
    btnStyles = {},
    bgColor = "#087EA4",
    btnText = "Button",
    btnTextColor = "#fff" }: Props) => {

    const btnStyle = {
        ...{ backgroundColor: bgColor, },
        ...btnStyles
    }

    return (
        <TouchableOpacity
            style={{ ...styles.button, ...btnStyle }}
            onPress={handlePress}
            disabled={isLoading}
        >
            <Text style={{ ...styles.btnText, ...{ color: btnTextColor } }}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export default ThemedButtonLink;

const styles = StyleSheet.create({
    btnText: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    }
})