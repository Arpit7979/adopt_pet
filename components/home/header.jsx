import { View, Text,Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

const Header = () => {
    const {user} = useUser();
  return (
    <View className='flex-row justify-between items-center w-full pt-3 pb-6'>
     <View>
        <Text>Welcome!</Text>
        <Text className='font-outfitB text-2xl'>{user?.fullName}</Text>
     </View>
     <Image source={{uri:user?.imageUrl}}
       className='h-12 w-12 rounded-full'
     />
    </View>
  )
}

export default Header