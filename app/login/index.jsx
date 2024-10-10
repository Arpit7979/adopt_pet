import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { images } from '../../constants'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


export const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
}
WebBrowser.maybeCompleteAuthSession()

const Login = () => {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
        setActive({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])


  return (
    <View className='w-full h-full bg-white'>
      <Image source={images.login} 
        className="w-full h-[400px]"
        resizeMode='cover'
      />
      <View className="p-7 items-center">
        <Text className="text-center font-outfitB text-2xl">Ready to make a new friend?</Text>
        <Text className="text-gray mt-3">Let's adopt the pet which you like and make their life happy again</Text>
        <TouchableOpacity onPress={onPress} className='p-5 bg-primary rounded-lg w-[100%] mt-[100px]'>
            <Text className='text-lg font-outfitB text-center'>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login