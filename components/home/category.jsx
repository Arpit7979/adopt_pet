import { View, Text, FlatList ,Image, TouchableOpacity} from 'react-native'
import React, { useEffect,useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'

const Category = ({category}) => {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState("Dogs");

    const getCategory = async()=>{
        setCategoryList([]);
        const snapShot = await getDocs(collection(db,'categorys'));
        snapShot.forEach((doc)=>setCategoryList(
            categoryList => [...categoryList, doc.data()]
        ))
    }

    useEffect(()=>{getCategory()},[])

  return (
    <View>
          <Text className='font-outfitM text-xl mt-3 mb-2'>Category</Text>
          <FlatList
            data={categoryList}
            renderItem={({item})=>(
            <TouchableOpacity className='flex-1 m-2' onPress={()=>{
                setSelectedCategory(item.name)
                category(item.name)
            }}>
                <View className={`w-full bg-light_primary items-center border border-primary rounded-xl p-1 ${selectedCategory === item.name?'border-blue-500 bg-blue-500':'' }`}>
                    <Image
                        source={{uri: item.imageUrl}}
                        className='h-14 w-14 rounded-full'
                        resizeMode='cover'
                    />
                </View>
                <Text className='text-center'>{item.name}</Text>
            </TouchableOpacity>)}
            numColumns={4}
          />
    </View>
  )
}

export default Category