import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {

  useFonts({
     "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
     "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
     "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  })

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
          <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="login/index" options={{headerShown:false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
          <Stack.Screen name="pet-details/index" options={{headerTransparent:true,headerTitle:''}}/>
          <Stack.Screen name="add-new-pet/index" options={{headerTitle:'Add new pet'}}/>
          </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
