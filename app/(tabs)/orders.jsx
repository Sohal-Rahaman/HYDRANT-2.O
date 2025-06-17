import React, { useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const TABS = ['Cart', 'Progress', 'Completed', 'Canceled'];

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState('Progress');
  
  // Now also get the markAsDelivered function
  const { user, cart, orders, updateQuantity, fetchOrders, markAsDelivered } = useApp();

  useFocusEffect(useCallback(() => { if (user?.id) fetchOrders(user.id); }, [user]));

  const listData = useMemo(() => {
    if (activeTab === 'Cart') return cart;
    return orders.filter(order => order.status === activeTab);
  }, [cart, orders, activeTab]);

  const cartTotal = useMemo(() => { /* ... (this function is unchanged) ... */ }, [cart]);

  const renderOrderItem = ({ item }) => {
    const isCartItem = activeTab === 'Cart';
    const displayName = isCartItem ? item.name : (item.items?.[0]?.name || 'Order');
    const displayTotal = isCartItem ? (parseFloat(String(item.price || '0').replace('₹', '')) * item.quantity).toFixed(2) : item.total_amount?.toFixed(2);
    const displayDate = isCartItem ? 'Item in Cart' : new Date(item.created_at).toLocaleDateString();

    return (
      <View style={styles.orderCard}>
        <FontAwesome5 name={isCartItem ? 'shopping-cart' : 'box'} size={24} color="#001f3f" style={styles.orderIcon} />
        <View style={styles.orderDetails}>
          <Text style={styles.orderDate}>{displayDate}</Text>
          <Text style={styles.orderItems}>{displayName}</Text>
        </View>
        <View style={styles.rightSection}>
            <Text style={styles.orderTotal}>₹{displayTotal}</Text>
            {/* --- ADD THIS BUTTON FOR TESTING --- */}
            {item.status === 'Progress' && (
                <TouchableOpacity style={styles.deliveryButton} onPress={() => markAsDelivered(item)}>
                    <Text style={styles.deliveryButtonText}>Mark Delivered</Text>
                </TouchableOpacity>
            )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* ... (The rest of the JSX is unchanged) ... */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (All other styles are unchanged, just add these new ones)
  rightSection: {
    alignItems: 'flex-end',
  },
  deliveryButton: {
    backgroundColor: '#d4edda',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  deliveryButtonText: {
    color: '#155724',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
  },
});