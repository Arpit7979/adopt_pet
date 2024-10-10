import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './category'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import PetCard from '../PetCard'

const PetListByCategory = () => {
    const [petList,setPetList] = useState([]);
    const [loader,setLoader] = useState(false);
    const [petName,setPetName] = useState('Dogs');

    useEffect(()=>{
        getPetList("Dogs");
    },[])

    const getPetList = async(category)=>{
       setLoader(true);
       setPetList([]);
       const q = query(collection(db,'pets'),where('category','==',category))
       const querySnapshot = await getDocs(q);
       querySnapshot.forEach((item)=>setPetList(
              petList => [...petList, item.data()]
       ))
       setLoader(false);
    }

  return (
    <View>
      <Category category={(value)=>{
        getPetList(value);
        setPetName(value);
      }}/>
      <FlatList 
        data={petList}
        style={{marginTop:10,marginBottom:20}}
        renderItem={({item})=>(
            <PetCard pet={item} />
        )}
        horizontal
        refreshing={loader}
        onRefresh={()=>getPetList(petName)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default PetListByCategory