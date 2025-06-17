import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 30;

// --- Use your local images ---
const sliderImages = [
  { id: '1', image: require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/slide1.png') },
  { id: '2', image: require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/slide2.png') },
  { id: '3', image: require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/slide3.png') },
];

export default function ImageSlider() {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const autoScroll = () => {
      scrollViewRef.current?.scrollTo({
        x: ((scrollViewRef.current?.scrollX || 0) + SLIDER_WIDTH) % (sliderImages.length * SLIDER_WIDTH),
        animated: true,
      });
    };

    const interval = setInterval(autoScroll, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {sliderImages.map(item => (
          <Image
            key={item.id}
            source={item.image}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    width: SLIDER_WIDTH,
  },
  scrollView: {
    width: SLIDER_WIDTH,
    height: 150,
  },
  image: {
    width: SLIDER_WIDTH,
    height: 150,
    resizeMode: 'cover',
  },
});