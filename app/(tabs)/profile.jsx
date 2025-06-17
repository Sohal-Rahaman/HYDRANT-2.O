import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

const ProfileOption = ({ icon, text, onPress, isLogout }) => (
  <TouchableOpacity style={styles.optionButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color={isLogout ? '#DC143C' : '#555'} />
    <Text style={[styles.optionText, isLogout && styles.logoutText]}>{text}</Text>
    {!isLogout && <Ionicons name="chevron-forward" size={22} color="#ccc" />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useApp(); // Get the signOut function from context

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        // This now correctly calls the signOut function
        { text: "Log Out", style: "destructive", onPress: signOut }
      ]
    );
  };

  const menuOptions = [
    { icon: 'person-circle-outline', text: 'My Info', path: '/user-info' },
    { icon: 'repeat-outline', text: 'My Subscriptions', path: '/subscriptions' },
    { icon: 'card-outline', text: 'Payment Methods', path: '/payment-methods' },
    { icon: 'gift-outline', text: 'Refer a Friend', path: '/referral' },
    { icon: 'logo-whatsapp', text: 'HYDRANT Community', path: '/community' },
    { icon: 'information-circle-outline', text: 'About Us', path: '/about-us' },
    { icon: 'call-outline', text: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Settings</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.userInfoSection}>
          <Image source={require('/Users/sohalrahaman/HYDRA02/sohal8/assets/images/hydrant-icon.png')} style={styles.avatarImage} />
          <Text style={styles.userName}>{user?.full_name || 'Guest'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'No Email'}</Text>
        </View>

        <View style={styles.optionsSection}>
          {menuOptions.map((item) => (
             <TouchableOpacity key={item.text} style={styles.optionButton} onPress={() => router.push(item.path)}>
                <Ionicons name={item.icon} size={24} color={'#555'} />
                <Text style={styles.optionText}>{item.text}</Text>
                <Ionicons name="chevron-forward" size={22} color="#ccc" />
             </TouchableOpacity>
          ))}
          <ProfileOption icon="log-out-outline" text="Log Out" onPress={handleLogout} isLogout />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  header: { padding: 20 },
  headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 24, color: '#001f3f', textAlign: 'center' },
  content: { paddingHorizontal: 20 },
  userInfoSection: { alignItems: 'center', marginBottom: 30 },
  avatarImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  userName: { fontFamily: 'Poppins_600SemiBold', fontSize: 22, color: '#333' },
  userEmail: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#888' },
  optionsSection: { backgroundColor: '#ffffff', borderRadius: 12 },
  optionButton: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  optionText: { flex: 1, fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#333', marginLeft: 15 },
  logoutText: { color: '#DC143C', fontFamily: 'Poppins_600SemiBold' },
});