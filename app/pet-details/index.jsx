import { View, Text ,Image, FlatList, ScrollView, Pressable, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import Ionicons from '@expo/vector-icons/Ionicons';
import MarkFav from '../../components/MarkFav';

const DogDetailsCard = ({pet})=>{
  return (
    <View className='flex-row flex-wrap mt-4'>
      <View className='bg-white flex-row items-center justify-start w-[47%] m-1 p-2 rounded-lg'>
        <Image source={images.calendar}
          className='h-10 w-10 mr-2'
        />
        <View>
          <Text className='text-gray font-outfit'>Age</Text>
          <Text className='text-black font-outfitB text-md'>{pet?.age}</Text>
        </View>
      </View>
      <View className='bg-white flex-row items-center justify-start w-[47%] m-1 p-2 rounded-lg'>
        <Image source={images.bone}
          className='h-10 w-10 mr-2'
        />
        <View>
          <Text className='text-gray font-outfit'>Breed</Text>
          <Text className='text-black font-outfitB text-md'>{pet?.breed}</Text>
        </View>
      </View>
      <View className='bg-white flex-row items-center justify-start w-[47%] m-1 p-2 rounded-lg'>
        <Image source={images.sex}
          className='h-10 w-10 mr-2'
        />
        <View>
          <Text className='text-gray font-outfit'>Sex</Text>
          <Text className='text-black font-outfitB text-md'>{pet?.gender}</Text>
        </View>
      </View>
      <View className='bg-white flex-row items-center justify-start w-[47%] m-1 p-2 rounded-lg'>
        <Image source={images.weight}
          className='h-10 w-10 mr-2'
        />
        <View>
          <Text className='text-gray font-outfit'>Weight</Text>
          <Text className='text-black font-outfitB text-md'>{pet?.weight}</Text>
        </View>
      </View>
    </View>
  )
}

const OwnerInfo = ({pet})=>{
  return (
    <View className='bg-white border border-primary rounded-lg p-2 flex-row justify-between items-center mt-5 mb-3'>
      <View className='flex-row items-center gap-2'>
        <Image
          source={{uri:pet.userImage}}
          className='h-10 w-10 rounded-full'
          resizeMode='cover'
        />
        <View>
          <Text className='text-black font-outfitB text-lg'>{pet.userName}</Text>
          <Text className='text-gray font-outfit text-sm'>Pet Owner</Text>
        </View>
      </View>
      <Ionicons name="send" size={24} color="#E8B20E" />
    </View>
  )
}

const PetDetails = () => {
    const pet = useLocalSearchParams();
    const [readMore,setReadMore] = useState(true);
  return (
    <SafeAreaView>
    <ScrollView>
      <Image
        source={{uri:pet.imageUrl}}
        className='h-[400px] w-full'
        resizeMode='cover'
      />
      <View className='pl-4 pr-4 mt-3 mb-[70px]'>
        <View className='w-full h-[70px]  flex-row justify-between items-center'>
          <View>
            <Text className='font-outfitM text-2xl'>{pet?.name}</Text>
            <Text>{pet?.address}</Text>
          </View>
          <MarkFav pet={pet}/>
        </View>
        <DogDetailsCard pet={pet} />
        <View>
          <Text className='font-outfitM text-lg pb-1 pt-3'>About {pet?.name}</Text>
          <Text className='font-outfit lin' numberOfLines={readMore?3:10}>{pet?.about}</Text>
          <Pressable onPress={()=>setReadMore(false)}>
          {readMore && <Text className='text-blue-500 font-outfitM pt-1'>Read more</Text>}
          </Pressable>
        </View>
        <OwnerInfo pet={pet}/>
      </View>
      </ScrollView>
        <TouchableOpacity className='bg-primary w-full h-[60px] p-1 items-center justify-center absolute bottom-0'>
          <Text className='text-white font-outfitB text-xl'>Adopt Me</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PetDetails