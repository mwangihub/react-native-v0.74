import Ionicons from '@expo/vector-icons/Ionicons';
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme, Image } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { Link, useNavigation } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { View } from 'react-native';


const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { light: string, dark: string };
}>;


const DefaultHeaderImage = () => (
  < Ionicons size={310} name="code-slash" style={styles.headerImage} />
);


const ALTDefaultHeaderImage = () => (
  <></>
);


export default function ParallaxScrollView({
  children,
  headerImage = <ALTDefaultHeaderImage />,
  headerBackgroundColor = { light: 'rgb(8, 126, 164)', dark: '#1D3D47' },
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  reactLogo: {
    height: 200,
    width: 400,
    bottom: 0,
    left: -50,
    right: 0,
    position: 'absolute',
  },

  backArrow: {
    position: 'absolute',
    color: "#087EA4",
    top: 60,
    left: 40,
    fontSize: 30,
  }
});
