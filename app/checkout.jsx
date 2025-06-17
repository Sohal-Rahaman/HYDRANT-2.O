import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import SwipeButton from '../components/SwipeButton';

export default function CheckoutScreen() {
  const { cart, updateQuantity, placeOrder } = useApp();

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (parseFloat(String(item.price || '0').replace('₹', '')) * item.quantity), 0), [cart]);

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={{padding: 20}}>
            <Text style={styles.emptyText}>Your cart is empty. Go back.</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const deliveryDetails = { name: 'Sohal Rahaman', address: 'Dum Dum, Kolkata - 700074', phone: '(+91) 79080 13185' };

  const handleOrderPlaced = async () => {
    const { data, error } = await placeOrder(cart, cartTotal);
    if (!error && data) {
      router.replace({ pathname: '/confirmed', params: { orderId: data.id } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Confirm Order</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}><Ionicons name="close" size={28} color="#333" /></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deliver to</Text>
          <Text style={styles.cardText}>{deliveryDetails.name}</Text>
          <Text style={styles.cardText}>{deliveryDetails.address}</Text>
          <Text style={styles.cardText}>{deliveryDetails.phone}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          {cart.map(item => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.quantityButton}><Ionicons name="remove" size={20} color="#001f3f" /></TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.quantityButton}><Ionicons name="add" size={20} color="#001f3f" /></TouchableOpacity>
                </View>
              </View>
              <Text style={styles.itemPrice}>₹{(parseFloat(String(item.price||'0').replace('₹', '')) * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>
          <View style={styles.paymentRow}><Text style={styles.cardText}>Cash on Delivery</Text><Ionicons name="checkmark-circle" size={24} color="#2E8B57" /></View>
        </View>
      </ScrollView>
      <View style={styles.footer}><SwipeButton onSwipeSuccess={handleOrderPlaced} /></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  headerTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 20, color: '#001f3f' },
  closeButton: { position: 'absolute', right: 15 },
  content: { flexGrow: 1, padding: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, marginBottom: 20 },
  cardTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#333', marginBottom: 10 },
  cardText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#555', lineHeight: 24 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemDetails: { flex: 1 },
  itemName: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  quantityButton: { padding: 5 },
  quantityText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333', marginHorizontal: 15 },
  itemPrice: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, marginTop: 10 },
  totalLabel: { fontFamily: 'Poppins_400Regular', fontSize: 18, color: '#333' },
  totalAmount: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#001f3f' },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#EFEFEF', backgroundColor: '#ffffff' },
  emptyText: { textAlign: 'center', marginTop: 50, fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#888' }
});