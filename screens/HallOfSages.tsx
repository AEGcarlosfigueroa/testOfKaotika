import { TouchableOpacity, Text, Image, StyleSheet, StatusBar } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import HallOfSagesImage from "./../assets/hallOfSages.png";


export default function HallOfSages()
{
    const styles = StyleSheet.create({
        image: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: -10,
        },
        button2: {
          position: 'absolute',
          top: StatusBar.currentHeight,
          left: '5%',
          width: '25%',
          height: '5%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 5,
          borderWidth: 2,
          borderColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 15
    
        },
        buttonText2: {
          fontFamily: 'OptimusPrincepsSemiBold',
          color: '#E2DFD2',
          fontSize: 18,
          textAlign: 'center',
            },
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
           style={styles.button2}
           onPress={() => navigation.navigate('OldSchool')}
         >
           <Text style={styles.buttonText2}>Back</Text>
         </TouchableOpacity>
        <Image style={styles.image} source={HallOfSagesImage}/>
    </>
    );
}