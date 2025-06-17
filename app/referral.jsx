import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Share, ScrollView, Image } from 'react-native';
import { useApp } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

// Mock data for redeemable items
const redeemItems = [
    { id: '1', name: 'HYDRANT Coffee Mug', cost: 1000, image: 'https://i.postimg.cc/Pq53Mv2g/mug.png' },
    { id: '2', name: 'HYDRANT Fridge Bottles (Pack of 6)', cost: 1200, image: 'https://i.postimg.cc/d1yCg1k5/bottle-pack.png' },
];

export default function ReferralScreen() {
  const { user } = useApp();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(user.id);
    Alert.alert('Copied!', 'Your referral code has been copied to the clipboard.');
  };

  const shareOnWhatsApp = async () => {
    try {
      const message = `Hey! I'm using HYDRANT 2.O for hassle-free water delivery. Sign up with my code *${user.id}* to get rewards on your first order! Download the app here: [Your App Link]`;
      await Share.share({ message });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Refer & Earn</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Referral Code</Text>
          <TouchableOpacity style={styles.codeContainer} onPress={copyToClipboard}>
            <Text style={styles.codeText}>{user.id}</Text>
            <Ionicons name="copy-outline" size={22} color="#001f3f" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton} onPress={shareOnWhatsApp}>
            <Ionicons name="logo-whatsapp" size={22} color="#ffffff" />
            <Text style={styles.shareButtonText}>Share via WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
            <View style={styles.balanceContainer}>
                <Text style={styles.cardTitle}>My Coins</Text>
                <View style={styles.coinDisplay}>
                    <Ionicons name="server" size={24} color="#FFA500" />
                    <Text style={styles.coinBalance}>{user.coins}</Text>
                </View>
            </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Redeem Rewards</Text>
          {redeemItems.map(item => (
            <View key={item.id} style={styles.redeemItem}>
                <Image source={{uri: item.image}} style={styles.redeemImage} />
                <View style={styles.redeemDetails}>
                    <Text style={styles.redeemName}>{item.name}</Text>
                    <Text style={styles.redeemCost}>{item.cost} Coins</Text>
                </View>
                <TouchableOpacity disabled={user.coins < item.cost} style={[styles.redeemButton, user.coins < item.cost && styles.disabledButton]}>
                    <Text style={styles.redeemButtonText}>Redeem</Text>
                </TouchableOpacity>
            </View>
          ))}
           <View style={styles.redeemItem}>
                <Ionicons name="cash-outline" size={40} color="#2E8B57" style={styles.redeemImage} />
                <View style={styles.redeemDetails}>
                    <Text style={styles.redeemName}>Convert to Cash</Text>
                    <Text style={styles.redeemCost}>Min. 500 Coins</Text>
                </View>
                <TouchableOpacity disabled={user.coins < 500} style={[styles.redeemButton, user.coins < 500 && styles.disabledButton]}>
                    <Text style={styles.redeemButtonText}>Convert</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  content: { padding: 20 },
  title: { fontFamily: 'Poppins_700Bold', fontSize: 26, color: '#001f3f', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, marginBottom: 20 },
  cardTitle: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, color: '#333', marginBottom: 15 },
  codeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F4F8', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  codeText: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#001f3f', letterSpacing: 2 },
  shareButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#25D366', paddingVertical: 15, borderRadius: 12 },
  shareButtonText: { color: '#ffffff', fontFamily: 'Poppins_600SemiBold', fontSize: 16, marginLeft: 10 },
  balanceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  coinDisplay: { flexDirection: 'row', alignItems: 'center'},
  coinBalance: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#FFA500', marginLeft: 10 },
  redeemItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  redeemImage: { width: 50, height: 50, marginRight: 15, resizeMode: 'contain' },
  redeemDetails: { flex: 1 },
  redeemName: { fontFamily: 'Poppins_600SemiBold', fontSize: 16, color: '#333' },
  redeemCost: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#888' },
  redeemButton: { backgroundColor: '#001f3f', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  redeemButtonText: { color: '#fff', fontFamily: 'Poppins_600SemiBold' },
  disabledButton: { backgroundColor: '#ccc' },
});