import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useApp } from '../context/AppContext'; // 1. Corrected: Import from AppContext
import { Ionicons } from '@expo/vector-icons';

export default function ConfirmationScreen() {
  const { orderId } = useLocalSearchParams();
  // 2. Corrected: Use the useApp() hook
  const { orders, cancelOrder } = useApp(); 

  const [countdown, setCountdown] = useState(5);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Find the specific order we are dealing with from the global state
  const currentOrder = orders.find(o => o.id === orderId);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    const redirectTimer = setTimeout(() => {
      router.replace('/home');
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup timers when the screen is left
    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleCancel = () => {
    if (currentOrder) {
      // This will now correctly call the function to change the order status
      cancelOrder(currentOrder.id);
      Alert.alert("Order Canceled", "Your order has been successfully canceled.");
      router.replace('/home');
    } else {
      Alert.alert("Error", "Could not find the order to cancel.");
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Ionicons name="checkmark-circle" size={120} color="#2E8B57" />
      </Animated.View>
      <Text style={styles.title}>Order Confirmed!</Text>
      <Text style={styles.subtitle}>Your order is now in progress. You can track it in the "Orders" section.</Text>
      
      {countdown > 0 && (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel Order ({countdown})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#001f3f',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: '#FFD2D2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#DC143C',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
});