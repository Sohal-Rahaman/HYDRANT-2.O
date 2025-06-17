import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext'; // --- CORRECTED IMPORT PATH ---

// A reusable component for each info row
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <Ionicons name={icon} size={22} color="#555" style={styles.icon} />
    <View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export default function UserInfoScreen() {
  const { user } = useApp(); // Get user data from the context

  if (!user) {
    // Show a loading or empty state while user data is being fetched
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading user information...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Details</Text>
          <InfoRow icon="person-outline" label="Full Name" value={user.full_name} />
          <InfoRow icon="id-card-outline" label="User ID" value={user.id} />
          <InfoRow icon="call-outline" label="Phone Number" value={user.phone} />
          <InfoRow icon="mail-outline" label="Email Address" value={user.email || 'Not available'} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>My Addresses</Text>
          {/* We will implement the multi-address system here later */}
          <InfoRow icon={'home-outline'} label={'Primary Address'} value={user.address} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Status</Text>
          <InfoRow icon="wallet-outline" label="Wallet Balance" value={`₹${user.wallet_balance?.toFixed(2) || '0.00'}`} />
          <InfoRow icon="water-outline" label="Jars Currently Held" value={user.jars_occupied?.toString() || '0'} />
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
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
    marginTop: 3,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333',
  },
});