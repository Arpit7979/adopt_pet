import { View, Text, FlatList,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';

const Slider = () => {

  const [sliderList, setSliderList] = useState([]);
  useEffect(()=>{getSlider()},[])

  const getSlider = async ()=>{
     setSliderList([]);
    const snapShot = await getDocs(collection(db,'sliders'));
    snapShot.forEach((doc)=>{
      setSliderList(sliderList => [...sliderList, doc.data()])
    })
  }


  return (
    <View className='h-[162px] w-full '>
      <FlatList
        data={sliderList}
        renderItem={({item})=>(
            <View className="h-[160px] w-[310px] rounded-2xl border border-primary bg-primary mx-1">
              <Image
              source={{uri: item.imageUrl}}
              className="h-[100%] w-[100%] rounded-2xl"
              resizeMode='cover'
              />
            </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Slider