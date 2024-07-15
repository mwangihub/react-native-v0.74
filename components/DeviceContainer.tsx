import React from 'react';
import { StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    containerStyles: ViewStyle;
    smallWidthStyles?: ViewStyle;
    largeWidthStyles?: ViewStyle;
    xlWidthStyles?: ViewStyle;
}>;

const breakpoints = {
    sm: 810,
    lg: 920,
    xl: 1440,
};

export const DeviceContainer: React.FC<Props> = ({
    children,
    containerStyles,
    smallWidthStyles = {},
    largeWidthStyles = {},
    xlWidthStyles = {},
}) => {
    const { width } = useWindowDimensions();

    const getResponsiveStyles = (): ViewStyle => {
        if (width <= breakpoints.sm) {
            return { ...containerStyles, ...smallWidthStyles };
        } else if (width <= breakpoints.lg) {
            return { ...containerStyles, ...largeWidthStyles };
        } else {
            return { ...containerStyles, ...xlWidthStyles };
        }
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: width > breakpoints.sm ? 'row' : 'column',
            ...getResponsiveStyles(),
        },
    });

    return <View style={styles.container}>{children}</View>;
};
