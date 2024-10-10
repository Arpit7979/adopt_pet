import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import MarkFav from './MarkFav';

const PetCard = ({pet}) => {
    const router = useRouter();
  return (
    <TouchableOpacity className='p-2 bg-white mr-2 rounded-xl mt-2' onPress={()=>router.push({
        pathname:'/pet-details',
        params:pet
    })}>
      <View className='absolute top-3 z-10 right-3'>
      <MarkFav pet={pet}/>
      </View>
      <Image
        source={{uri:pet.imageUrl}}
        className='h-[150px] w-[135px] rounded-xl relative'
        resizeMode='cover'
      />
      <Text className='font-outfitM text-lg mt-1'>{pet.name}</Text>
      <View className='flex-row justify-between items-center'>
        <Text className='text-gray font-outfit'>{pet?.breed}</Text>
        <Text className='bg-light_primary text-primary rounded-md p-[2px] font-outfit'>{pet?.age} yrs</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PetCard