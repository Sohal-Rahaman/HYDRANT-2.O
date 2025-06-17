import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { supabase } from '../../lib/supabase';

// This line is the important one
export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleDetectLocation = async () => {
    setIsLocating(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied.');
      setIsLocating(false);
      return;
    }

    try {
      let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.EXPO_PUBLIC_Maps_API_KEY}`);
      const data = await response.json();

      if (data.status === 'OK' && data.results[0]) {
        setAddress(data.results[0].formatted_address);
        const postalCodeComponent = data.results[0].address_components.find(c => c.types.includes('postal_code'));
        if (postalCodeComponent) {
          setPincode(postalCodeComponent.long_name);
        }
      } else {
        throw new Error(data.error_message || 'Could not find address.');
      }
    } catch (error) {
      Alert.alert('Error', `Could not fetch location: ${error.message}`);
    } finally {
      setIsLocating(false);
    }
  };
  
  const handleSignUp = async () => {
    const serviceablePincodes = ['700074', '700030'];
    if (!fullName || !email || !password || !address || !landmark || !pincode) {
      Alert.alert('Incomplete Form', 'Please fill in all mandatory fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.');
      return;
    }
    if (!serviceablePincodes.includes(pincode)) {
      Alert.alert('Not Serviceable', 'We are coming to your area soon!');
      return;
    }

    setIsSigningUp(true);

    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      Alert.alert('Sign Up Failed', authError.message);
      setIsSigningUp(false);
      return;
    }
    
    if (!user) {
        Alert.alert('Sign Up Successful!', 'Please check your email to confirm your account.');
        router.replace('/login');
        setIsSigningUp(false);
        return;
    }
    
    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        phone: phone,
        address: address,
        landmark: landmark,
        pincode: pincode,
        referral_code: referralCode,
        coins: 0,
    });

    if (profileError) {
      Alert.alert('Sign Up Failed', `Could not save profile: ${profileError.message}`);
    } else {
      Alert.alert('Sign Up Successful!', 'Your account has been created.');
      router.replace('/login');
    }

    setIsSigningUp(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Let's get you started</Text>
        </View>
        
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="rgba(255, 255, 255, 0.5)" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="rgba(255, 255, 255, 0.5)" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="rgba(255, 255, 255, 0.5)" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="rgba(255, 255, 255, 0.5)" secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="rgba(255, 255, 255, 0.5)" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          
          <View style={styles.addressContainer}>
            <TextInput style={[styles.input, styles.addressInput]} placeholder="Address" placeholderTextColor="rgba(255, 255, 255, 0.5)" value={address} onChangeText={setAddress} multiline />
            <TouchableOpacity style={styles.locationButton} onPress={handleDetectLocation} disabled={isLocating}>
              {isLocating ? <ActivityIndicator color="#87CEEB" /> : <Ionicons name="navigate-circle-outline" size={28} color="#87CEEB" />}
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} placeholder="Landmark" placeholderTextColor="rgba(255, 255, 255, 0.5)" value={landmark} onChangeText={setLandmark} />
          <TextInput style={styles.input} placeholder="Pincode" placeholderTextColor="rgba(255, 255, 255, 0.5)" keyboardType="number-pad" value={pincode} onChangeText={setPincode} />
          <TextInput style={styles.input} placeholder="Referral Code (Optional)" placeholderTextColor="rgba(255, 255, 255, 0.5)" value={referralCode} onChangeText={setReferralCode} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isSigningUp}>
          {isSigningUp ? <ActivityIndicator color="#001f3f" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001f3f' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff' },
  subtitle: { fontSize: 16, color: '#87CEEB', marginTop: 8 },
  form: { marginBottom: 20 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', minHeight: 55, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(135, 206, 235, 0.5)' },
  addressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  addressInput: { flex: 1, paddingRight: 50, marginBottom: 0 },
  locationButton: { position: 'absolute', right: 15, height: 55, justifyContent: 'center' },
  button: { backgroundColor: '#87CEEB', paddingVertical: 18, borderRadius: 12, alignItems: 'center', height: 58, justifyContent: 'center' },
  buttonText: { color: '#001f3f', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30, paddingBottom: 20 },
  footerText: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 16 },
  link: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});