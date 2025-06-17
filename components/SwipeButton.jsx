import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const SWIPE_BUTTON_WIDTH = 300;
const SWIPEABLE_DIMENSIONS = 50;

export default function SwipeButton({ onSwipeSuccess }) {
  const X = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: X.value }],
    };
  });

  const handleGesture = (event) => {
    const newX = event.nativeEvent.translationX;
    if (newX >= 0 && newX <= SWIPE_BUTTON_WIDTH - SWIPEABLE_DIMENSIONS) {
      X.value = newX;
    }
  };

  const handleGestureEnd = () => {
    if (X.value < SWIPE_BUTTON_WIDTH / 2) {
      X.value = withSpring(0);
    } else {
      X.value = withSpring(SWIPE_BUTTON_WIDTH - SWIPEABLE_DIMENSIONS);
      // Run the success callback on the JavaScript thread
      runOnJS(onSwipeSuccess)();
    }
  };

  return (
    <View style={styles.swipeContainer}>
      <PanGestureHandler onGestureEvent={handleGesture} onEnded={handleGestureEnd}>
        <Animated.View style={[styles.swipeable, animatedStyle]}>
          <Ionicons name="arrow-forward" size={24} color="#2E8B57" />
        </Animated.View>
      </PanGestureHandler>
      <Text style={styles.swipeText}>Swipe to Place Order</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeContainer: {
    height: 60,
    width: SWIPE_BUTTON_WIDTH,
    backgroundColor: '#2E8B57',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  swipeable: {
    position: 'absolute',
    left: 5,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: 25,
    backgroundColor: '#fff',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    zIndex: 2,
  },
});