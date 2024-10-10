import { View, Text, ScrollView,TouchableOpacity, Alert ,Image, ActivityIndicator} from "react-native";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const AddNewPet = () => {
  const router = useRouter();
  const {user} = useUser();
  const [uploading,setUploading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: null,
    name: "",
    breed:"",
    category: "Dogs",
    age: "",
    gender: "Male",
    weight: "",
    address: "",
    about: "",
  });

  const uploadImage = async()=>{
    setUploading(true);
    const res = await fetch(form.imageUrl.uri);
    const blobImg = await res.blob();
    const storageRef = ref(storage,"/adoptPet/"+Date.now()+".jpg");
    uploadBytes(storageRef,blobImg).then(()=>{
      console.log("file uploaded");
    }).then((res)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        saveFormData(downloadUrl);
      })
    })
  }

  const saveFormData = async(imageUrl)=>{
    const docId = Date.now().toString();
    await setDoc(doc(db,"pets",docId),{
      ...form,
      id:docId,
      imageUrl:imageUrl,
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl,
    })
    setUploading(false);
    router.replace("/(tabs)/home");
  }

  const submit = ()=>{
    if(!form.name || !form.category || !form.age || !form.gender || !form.weight || !form.address || !form.about){
      Alert.alert("Note","All field are required");
    };

    try {
      //uploading
      form.imageUrl && uploadImage();
    } catch (error) {
      Alert.alert("error",error.message);
    }finally{
      setForm({
        imageUrl: null,
        name: "",
        category: "Dogs",
        age: "",
        gender: "Male",
        weight: "",
        address: "",
        about: "",
      })
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({...form,imageUrl:result.assets[0]});
    }
  };

  return (
    <ScrollView className="pl-5 pr-5 mt-2">
      <Text className="font-outfitM text-xl">Add new pet</Text>

      {form.imageUrl ? (
        <Image
          source={{uri:form.imageUrl.uri}}
          className='h-[150px] w-[150px] mt-5 rounded-md'
          resizeMode="cover"
        />) : (
        <TouchableOpacity className='h-[150px] w-[150px] bg-white mt-5 justify-center items-center rounded-md' onPress={pickImage}>
        <Entypo name="upload-to-cloud" size={35} color="#E8B20E" />
        </TouchableOpacity>
      )}


      <InputField
        label="Pet name"
        placeholder="Enter pet name"
        value={form.name}
        handleChangeText={(e) => setForm({ ...form, name: e })}
      />
      <InputField
        label="Breed"
        value={form.breed}
        handleChangeText={(e) => setForm({ ...form, breed: e })}
      />


      <View>
        <Text className="font-outfitM mt-3">Category</Text>
        <Picker
        style={{height: 50, width:"100%" , backgroundColor: 'white',marginTop:5}}
        selectedValue={form.category}
        onValueChange={(itemValue, itemIndex) =>
          setForm({...form,category:itemValue})
        }>
        <Picker.Item label="Dogs" value="Dogs" />
        <Picker.Item label="Fish" value="Fish" />
        <Picker.Item label="Birds" value="Birds" />
        <Picker.Item label="Cats" value="Cats" />
        </Picker>
      </View>
      
      <InputField
        label="Age"
        value={form.age}
        handleChangeText={(e) => setForm({ ...form, age: e })}
        keyboardType={"numeric"}
      />

      <View>
        <Text className="font-outfitM mt-3">Gender</Text>
        <Picker
        style={{height: 50, width:"100%" , backgroundColor: 'white',marginTop:5}}
        selectedValue={form.gender}
        onValueChange={(itemValue, itemIndex) =>
          setForm({...form,gender:itemValue})
        }>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <InputField
        label="Weight"
        value={form.weight}
        handleChangeText={(e) => setForm({ ...form, weight: e })}
        keyboardType={"numeric"}
      />
      <InputField
        label="Address"
        value={form.address}
        handleChangeText={(e) => setForm({ ...form, address: e })}
      />
      <InputField
        label="About"
        value={form.about}
        handleChangeText={(e) => setForm({ ...form, about: e })}
      />
      <TouchableOpacity className='bg-primary h-[50px] w-full justify-center items-center rounded-xl mt-5 mb-5 ' onPress={submit} 
      disabled={uploading}
      >
        {uploading ? (<ActivityIndicator size='large' color='white' />) : <Text className='font-outfitB text-white text-lg'>Submit</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddNewPet;
