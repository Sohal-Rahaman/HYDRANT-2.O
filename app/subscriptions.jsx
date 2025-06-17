import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const deliveryFrequencies = [
  { label: 'Every Day', value: 1 },
  { label: 'Every 2 Days', value: 2 },
  { label: 'Every 3 Days', value: 3 },
];
const timeSlots = ['10:30 AM - 12:30 PM', '04:30 PM - 06:30 PM', '06:30 PM - 08:30 PM'];

export default function SubscriptionCard() {
  const {
    subscription,
    activateSubscription,
    updateSubscription,
    pauseSubscription,
    deleteSubscription,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState(2);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);

  useEffect(() => {
    if (subscription) {
      setQuantity(subscription.quantity || 1);
      const freq = subscription.frequency?.match(/\d+/)?.[0];
      setFrequency(freq ? parseInt(freq) : 2);
      setSelectedTimeSlot(subscription.timeSlot || timeSlots[0]);
    }
  }, [subscription]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleActivateOrUpdate = async () => {
    const subDetails = {
      product: '20L Water Jar',
      quantity,
      frequency: `Every ${frequency} Day${frequency > 1 ? 's' : ''}`,
      timeSlot: selectedTimeSlot,
      price: `₹${quantity * 37} per delivery`,
      status: 'Active',
    };

    if (subscription) {
      const { error } = await updateSubscription(subDetails);
      if (!error) Alert.alert('Subscription Updated!');
    } else {
      const { error } = await activateSubscription(subDetails);
      if (!error) Alert.alert('Subscription Activated!', 'You can manage it anytime.');
    }
  };

  const confirmPause = () => {
    const handlePause = async () => {
      await pauseSubscription();
      Alert.alert('Subscription Paused');
    };

    Alert.alert('Pause Subscription?', 'You can resume it later.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Pause', style: 'default', onPress: handlePause },
    ]);
  };

  const confirmDelete = () => {
    const handleDelete = async () => {
      await deleteSubscription();
      Alert.alert('Subscription Deleted');
    };

    Alert.alert('Delete Subscription?', 'This will remove your subscription permanently.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: handleDelete },
    ]);
  };

  const resumeSubscription = async () => {
    const { error } = await updateSubscription({ status: 'Active' });
    if (!error) Alert.alert('Subscription Resumed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Never Run Out of Water!</Text>
      <View style={styles.card}>
        {/* Frequency */}
        <View style={styles.row}>
          <Ionicons name="repeat" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Frequency</Text>
        </View>
        <View style={styles.optionsContainer}>
          {deliveryFrequencies.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[styles.optionButton, frequency === item.value && styles.optionButtonSelected]}
              onPress={() => setFrequency(item.value)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  frequency === item.value && styles.optionButtonTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Slot */}
        <View style={[styles.row, { marginTop: 20 }]}>
          <Ionicons name="time-outline" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Preferred Time Slot</Text>
        </View>
        <View style={styles.optionsContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.optionButton,
                selectedTimeSlot === slot && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedTimeSlot(slot)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  selectedTimeSlot === slot && styles.optionButtonTextSelected,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <View style={[styles.row, { marginTop: 20 }]}>
          <Ionicons name="cube" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Quantity per Delivery</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityAdjustButton} onPress={() => handleQuantityChange(-1)}>
            <Ionicons name="remove" size={24} color="#001f3f" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityAdjustButton} onPress={() => handleQuantityChange(1)}>
            <Ionicons name="add" size={24} color="#001f3f" />
          </TouchableOpacity>
        </View>

        {/* Activate or Update */}
        <TouchableOpacity style={styles.activateButton} onPress={handleActivateOrUpdate}>
          <Text style={styles.activateButtonText}>
            {subscription ? 'Update Subscription' : 'Activate Subscription'}
          </Text>
        </TouchableOpacity>

        {/* If subscription exists: Pause / Resume / Delete */}
        {subscription && (
          <View style={{ marginTop: 20 }}>
            {subscription.status === 'Paused' ? (
              <TouchableOpacity
                style={[styles.activateButton, { backgroundColor: '#4CAF50' }]}
                onPress={resumeSubscription}
              >
                <Text style={styles.activateButtonText}>Resume Subscription</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.activateButton, { backgroundColor: '#FFA500' }]}
                onPress={confirmPause}
              >
                <Text style={styles.activateButtonText}>Pause Subscription</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.activateButton, { backgroundColor: '#DC3545', marginTop: 10 }]}
              onPress={confirmDelete}
            >
              <Text style={styles.activateButtonText}>Delete Subscription</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingHorizontal: 15 },
  sectionTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#333', marginBottom: 10 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333', marginLeft: 10 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  optionButtonSelected: { backgroundColor: '#001f3f' },
  optionButtonText: { fontFamily: 'Poppins_400Regular', color: '#333', fontSize: 12 },
  optionButtonTextSelected: { color: '#ffffff', fontFamily: 'Poppins_600SemiBold' },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  quantityAdjustButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#001f3f', marginHorizontal: 20 },
  activateButton: {
    backgroundColor: '#2E8B57',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  activateButtonText: { color: '#ffffff', fontFamily: 'Poppins_600SemiBold', fontSize: 16 },
});
