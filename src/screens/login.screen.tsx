import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';
import { fontSize, height, width } from '../utils';
import { useLogin } from '@src/hooks';

export function LoginScreen(_props: RootStackScreenProps<'Login'>) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending } = useLogin();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    login(
      {
        username,
        password,
        expiresInMins: 30,
      },
      {
        onError: (err: Error) => {
          Alert.alert('Login Failed', err.message || 'Invalid credentials');
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to GetPayIn</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isPending}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isPending}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isPending && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>
                Hint: Use any user from dummyjson.com/users
              </Text>
              <Text style={styles.hintText}>
                Example: username: "emilys", password: "emilyspass"
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width(24),
    paddingVertical: height(40),
  },
  title: {
    fontSize: fontSize(32),
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: height(8),
  },
  subtitle: {
    fontSize: fontSize(18),
    color: '#666',
    textAlign: 'center',
    marginBottom: height(40),
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: height(20),
  },
  label: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#333',
    marginBottom: height(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: width(8),
    paddingHorizontal: width(16),
    paddingVertical: height(12),
    fontSize: fontSize(16),
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: width(8),
    paddingVertical: height(14),
    alignItems: 'center',
    marginTop: height(10),
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
  hintContainer: {
    marginTop: height(30),
    padding: width(16),
    backgroundColor: '#FFF3E0',
    borderRadius: width(8),
    borderLeftWidth: width(4),
    borderLeftColor: '#FF9800',
  },
  hintText: {
    fontSize: fontSize(13),
    color: '#E65100',
    marginBottom: height(4),
  },
});
