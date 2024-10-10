import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '@clerk/clerk-expo';
import Shared from '../shared/Shared';

const MarkFav = ({pet}) => {
    const [favList,setFavList] = useState();
    const {user} = useUser();
    useEffect(()=>{user && GetFav()},[user]);

    const GetFav = async ()=>{
        const result = await Shared.GetFavList(user);
        setFavList(result?.favourites?result?.favourites:[]);
    }

    const addToFav = async ()=>{
        const favResult = favList;
        favResult.push(pet.id);
        await Shared.UpdateFavList(user,favResult);
        GetFav();
    }

    const removeFromFav = async()=>{
        const favResult = favList.filter((item)=>item!==pet.id);
        await Shared.UpdateFavList(user,favResult);
        GetFav();
    }

  return (
    <View>
        {
            favList?.includes(pet.id)?(
                <TouchableOpacity onPress={()=>removeFromFav()}>
                 <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
             ):(<TouchableOpacity onPress={()=>addToFav()}>
               <AntDesign name="hearto" size={24} color="black" />
               </TouchableOpacity>)
        }
    </View>
  )
}

export default MarkFav