import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Shared from '../../shared/Shared';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDoc, getDocs, query, where,doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetCard from '../../components/PetCard';

const favorite = () => {

  const {user} = useUser();
  const [favItem,setFavItem] = useState([])
  const [loader,setLoader] = useState(false);

  useEffect(()=>{
    user && getFavId()
  },[user])

  //get favourite id
  const getFavId = async ()=>{
    setLoader(true);
    const result = await getDoc(doc(db, "userFavPet",'arpitbuxar79@gmail.com'));
    setLoader(false);
    getFavItem(result.data()?.favourites);
  }
 

  //getfavItem
  const getFavItem = async(favId)=>{
    setFavItem([]);
    setLoader(true);
    const q = query(collection(db,'pets'), where('id',"in",favId));
    const querySnapshot = await getDocs(q);
    setLoader(false);
    querySnapshot.forEach((doc)=>setFavItem((prev=>[...prev,doc.data()])))
  }


  return (
    <SafeAreaView className='p-5'>
      <Text className='font-outfitM text-2xl'>favourite</Text>
      <FlatList
        data={favItem}
        renderItem={({item})=>(
        <View>
          <PetCard pet={item}/>
        </View>)}
        numColumns={2}
        onRefresh={getFavId}
        refreshing={loader}
      />
    </SafeAreaView>
  )
}

export default favorite