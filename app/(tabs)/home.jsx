
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/home/header'
import Slider from '../../components/home/slider'
import PetListByCategory from '../../components/home/petListByCategory'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link, router } from 'expo-router'

const home = () => {
  return (
    <SafeAreaView className='pl-5 pr-5'>
      <FlatList
        data={[{id:1},{id:2}]}
        keyExtractor={(item)=>item.id.toString()}
        ListHeaderComponent={()=>(
          <View>
            <Header/>
            <Slider/>
            <PetListByCategory/>
            <Link href={'add-new-pet'} className=' bg-light_primary border border-primary border-dashed text-center pb-4'>
              <View className='flex-row items-center justify-center gap-4 w-full'>
              <MaterialIcons name="pets" size={24} color="#E8B20E" />
              <Text className='text-primary font-outfitM'>Add new pet</Text>
              </View>
            </Link>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        style={{marginBottom:20}}
      />
    </SafeAreaView>
  )
}

export default home