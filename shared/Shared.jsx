import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

 const GetFavList = async(user)=>{
    const docSnap = await getDoc(doc(db,'userFavPet',user?.primaryEmailAddress?.emailAddress));
    if(docSnap.exists()){
        return docSnap.data();
    }else{
        await setDoc(doc(db,'userFavPet',user?.primaryEmailAddress?.emailAddress,{
            email:user?.primaryEmailAddress?.emailAddress,
            favourites:[],
        }));
    }
}

const UpdateFavList = async(user,favList)=>{
    const docRef = doc(db,'userFavPet',user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef,{
            favourites:favList,
        });
    } catch (error) {
        console.log(error);
    }
}

export default {GetFavList,UpdateFavList}