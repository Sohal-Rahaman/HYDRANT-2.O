import React, { createContext, useState, useContext, useEffect } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'react-native';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- STATE MANAGEMENT ---
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscription, setSubscription] = useState(null);

  // --- SESSION & INITIAL DATA FETCHING ---
  useEffect(() => {
    const fetchSessionAndData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session?.user) {
          await fetchInitialData(session.user.id, session);
        }
      } catch (e) {
        console.error("Error fetching initial data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndData();

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        fetchInitialData(newSession.user.id, newSession);
      } else {
        setUser(null);
        setOrders([]);
        setSubscription(null);
        setCart([]);
      }
    });

    return () => authSub.unsubscribe();
  }, []);

  const fetchInitialData = async (userId, currentSession) => {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
    setUser({ ...profile, email: currentSession.user.email }); // Combine profile and auth email

    await fetchOrders(userId);
    await fetchSubscription(userId);
  };
  const updateProfile = async (updatedInfo) => {
    if (!user) return { error: { message: "No user logged in" } };

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: updatedInfo.full_name,
        phone: updatedInfo.phone,
      })
      .eq('id', user.id);

    if (error) {
      Alert.alert("Error", "Could not update profile.");
    } else {
      // Update local user state immediately for a fast UI response
      setUser(prevUser => ({ ...prevUser, ...updatedInfo }));
      Alert.alert("Success", "Profile updated!");
    }
  };
  
  const fetchOrders = async (userId) => {
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) console.error("Error fetching orders:", error);
    else setOrders(data || []);
  };

  const fetchSubscription = async (userId) => {
    const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', userId).single();
    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching subscription:", error);
    } else {
      setSubscription(data || null);
    }
  };
  
  // --- LOCAL CART FUNCTIONS ---
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, id: uuidv4(), productId: product.id, quantity: 1 }];
    });
    Alert.alert('Item Added', `${product.name} has been added to your cart.`);
  };
  
  const updateQuantity = (cartItemId, amount) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === cartItemId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  // --- DATABASE FUNCTIONS ---
  const placeOrder = async (cartItems, total) => {
    if (!user) return { error: { message: 'You must be logged in.' } };
    const { data, error } = await supabase.from('orders').insert({
      user_id: user.id,
      status: 'Progress',
      items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total_amount: total,
    }).select().single();
    if (error) { Alert.alert("Error Placing Order", error.message); return { error }; }
    setCart([]);
    await fetchOrders(user.id);
    return { data };
  };

  const cancelOrder = async (orderId) => {
    const { error } = await supabase.from('orders').update({ status: 'Canceled' }).eq('id', orderId);
    if (error) Alert.alert("Error Canceling Order", error.message);
  };
  
  const activateSubscription = async (subDetails) => {
      if (!user) return { error: { message: 'You must be logged in.' } };
      const { data, error } = await supabase.from('subscriptions').upsert({ user_id: user.id, ...subDetails }, { onConflict: 'user_id' }).select().single();
      if (error) Alert.alert("Error Activating Subscription", error.message);
      else setSubscription(data);
      return { data, error };
  };

  const updateSubscription = async (subDetails) => {
    if (!subscription) return;
    const { data, error } = await supabase.from('subscriptions').update(subDetails).eq('id', subscription.id).select().single();
    if (error) Alert.alert("Error Updating Subscription", error.message);
    else setSubscription(data);
  };

  const toggleSubscriptionHold = async () => {
    if (!subscription) return;
    const newStatus = subscription.status === 'Active' ? 'Paused' : 'Active';
    const { data, error } = await supabase.from('subscriptions').update({ status: newStatus }).eq('id', subscription.id).select().single();
    if (error) Alert.alert("Error Updating Status", error.message);
    else setSubscription(data);
  };

  const deleteSubscription = async () => {
    if (!subscription) return;
    const { error } = await supabase.from('subscriptions').delete().eq('id', subscription.id);
    if (error) Alert.alert("Error Deleting Subscription", error.message);
    else setSubscription(null);
  };
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // --- VALUE PROVIDED TO APP ---
  const value = {
    session,
    user,
    loading,
    cart,
    orders,
    subscription,
    addToCart,
    updateQuantity,
    placeOrder,
    cancelOrder,
    activateSubscription,
    updateSubscription,
    toggleSubscriptionHold,
    deleteSubscription,
    fetchOrders,
    signOut,
    updateProfile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}