import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const deliveryFrequencies = [ { label: 'Every Day', value: 1 }, { label: 'Every 2 Days', value: 2 }, { label: 'Every 3 Days', value: 3 } ];
const timeSlots = ['10:30 AM - 12:30 PM', '04:30 PM - 06:30 PM', '06:30 PM - 08:30 PM'];

export default function SubscriptionCard() {
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState(2);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(timeSlots[0]);
  const [isActivating, setIsActivating] = useState(false);
  const { activateSubscription } = useApp();

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleActivate = async () => {
    setIsActivating(true);
    const subDetails = {
      quantity: quantity,
      frequency: `Every ${frequency} Day${frequency > 1 ? 's' : ''}`,
      timeSlot: selectedTimeSlot,
      price: `₹${quantity * 37} per delivery`
    };
    
    const { error } = await activateSubscription(subDetails);
    
    if (!error) {
      Alert.alert("Subscription Activated!", "You can manage it in the profile section.");
    }
    setIsActivating(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Never Run Out of Water!</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="repeat" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Frequency</Text>
        </View>
        <View style={styles.optionsContainer}>
          {deliveryFrequencies.map(item => (
            <TouchableOpacity key={item.value} style={[styles.optionButton, frequency === item.value && styles.optionButtonSelected]} onPress={() => setFrequency(item.value)}>
              <Text style={[styles.optionButtonText, frequency === item.value && styles.optionButtonTextSelected]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <Ionicons name="time-outline" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Preferred Time Slot</Text>
        </View>
        <View style={styles.optionsContainer}>
          {timeSlots.map(slot => (
             <TouchableOpacity key={slot} style={[styles.optionButton, selectedTimeSlot === slot && styles.optionButtonSelected]} onPress={() => setSelectedTimeSlot(slot)}>
              <Text style={[styles.optionButtonText, selectedTimeSlot === slot && styles.optionButtonTextSelected]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <Ionicons name="cube" size={24} color="#001f3f" />
          <Text style={styles.rowTitle}>Quantity per Delivery</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityAdjustButton} onPress={() => handleQuantityChange(-1)}><Ionicons name="remove" size={24} color="#001f3f" /></TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityAdjustButton} onPress={() => handleQuantityChange(1)}><Ionicons name="add" size={24} color="#001f3f" /></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.activateButton} onPress={handleActivate} disabled={isActivating}>
            {isActivating ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.activateButtonText}>Activate Subscription</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30, paddingHorizontal: 15 },
  sectionTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#333', marginBottom: 10 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333', marginLeft: 10 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  optionButton: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: '#F0F4F8', alignItems: 'center', marginHorizontal: 5 },
  optionButtonSelected: { backgroundColor: '#001f3f' },
  optionButtonText: { fontFamily: 'Poppins_400Regular', color: '#333', fontSize: 12, textAlign: 'center' },
  optionButtonTextSelected: { color: '#ffffff', fontFamily: 'Poppins_600SemiBold' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  quantityAdjustButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F4F8', justifyContent: 'center', alignItems: 'center' },
  quantityText: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#001f3f', marginHorizontal: 20 },
  activateButton: { backgroundColor: '#2E8B57', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 30, height: 55, justifyContent: 'center' },
  activateButtonText: { color: '#ffffff', fontFamily: 'Poppins_600SemiBold', fontSize: 16 },
});