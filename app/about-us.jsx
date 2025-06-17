import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ValuePillar = ({ icon, title, text }) => (
    <View style={styles.pillar}>
        <Ionicons name={icon} size={30} color="#001f3f" style={styles.pillarIcon} />
        <View style={styles.pillarContent}>
            <Text style={styles.pillarTitle}>{title}</Text>
            <Text style={styles.pillarText}>{text}</Text>
        </View>
    </View>
);

export default function AboutUsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
            <Image source={require('../assets/images/hydrant-icon.png')} style={styles.logo} />
            <Text style={styles.title}>Our Mission: No More Daily Calls</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>The Frustration We Solve</Text>
            <Text style={styles.paragraph}>
                We've all been there. The daily hassle of calling the water man, the frustration of forgetting, and the inconvenience of being without water for hours. For bachelors and busy households, it's a recurring disruption.
            </Text>
            <Text style={styles.paragraph}>
                HYDRANT 2.O was born from a simple mission: to eliminate this system. We replace frustrating phone calls with a seamless, one-tap ordering experience.
            </Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>Our Solution: Tap & Relax</Text>
            <Text style={styles.paragraph}>
                Our bouncing strategy is the subscription model. It goes beyond one-tap ordering by removing the need to tap at all. Simply subscribe based on your household's requirement—edit the days, time, and quantity—and let our delivery partners serve you without a single call.
            </Text>
        </View>
        
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Our Values</Text>
             <View style={styles.pillarsContainer}>
                <ValuePillar 
                    icon="water-outline"
                    title="Purity"
                    text="We adhere to the highest standards of purification to ensure every drop is safe and healthy."
                />
                <ValuePillar 
                    icon="time-outline"
                    title="Punctuality"
                    text="Your time is valuable. We guarantee on-time delivery, every time."
                />
                 <ValuePillar 
                    icon="flash-outline"
                    title="Seamlessness"
                    text="From one-tap orders to automated subscriptions, our goal is an effortless experience."
                />
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
      width: 80,
      height: 80,
      marginBottom: 15,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    color: '#001f3f',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  pillarsContainer: {
      marginTop: 10,
  },
  pillar: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
  },
  pillarIcon: {
      marginRight: 15,
      marginTop: 5,
  },
  pillarContent: {
      flex: 1,
  },
  pillarTitle: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
  },
  pillarText: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
  },
});