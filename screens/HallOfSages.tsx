import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { buttonStyles } from "../props/genericButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import HallOfSagesImage from "./../assets/hallOfSages.png"


export default function HallOfSages()
{
    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: -10,
        }
    })

    type RootStackParamList = {
          Home: undefined,
          Entrance: undefined,
          Tower: undefined,
          TowerEntrance: undefined,
          SpyCam: undefined,
          OldSchool: undefined
        }
      
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return(
    <>
        <TouchableOpacity
           style={buttonStyles.button2}
           onPress={() => navigation.navigate('OldSchool')}
         >
           <Text style={buttonStyles.buttonText2}>Back</Text>
         </TouchableOpacity>
        <Image style={styles.image} source={HallOfSagesImage}/>
    </>
    );
}