import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import ImageSlider from '../../components/ImageSlider';
import ProductHero from '../../components/ProductHero';
import SubscriptionCard from '../../components/SubscriptionCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageSlider />
        <ProductHero />
        <SubscriptionCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
});