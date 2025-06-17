import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// A reusable component for the payment option row
const PaymentOptionRow = ({ icon, name, selected }) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={28} color="#001f3f" style={styles.icon} />
    <Text style={styles.name}>{name}</Text>
    {selected && (
      <View style={styles.checkContainer}>
        <Ionicons name="checkmark" size={20} color="#ffffff" />
      </View>
    )}
  </View>
);

export default function PaymentMethodsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Available Methods</Text>
          <PaymentOptionRow 
            icon="cash-outline" 
            name="Cash on Delivery" 
            selected={true} 
          />
        </View>

        <View style={styles.comingSoonContainer}>
          <Ionicons name="card-outline" size={30} color="#888" />
          <Text style={styles.comingSoonText}>
            More payment options like UPI, Credit & Debit Cards are coming soon!
          </Text>
        </View>
      </View>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    marginRight: 20,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E8B57', // Success Green
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonContainer: {
    marginTop: 30,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  comingSoonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});