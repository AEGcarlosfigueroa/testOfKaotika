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
          fontSize: 30,
          textAlign: 'center',
        },
        title: {
        fontSize: 40,
        marginBottom: '5%',
        marginTop: '20%',
        color: '#E2DFD2',
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 2, height: 4 },
        textShadowRadius: 4,
        fontFamily: 'OptimusPrincepsSemiBold',
        boxShadow: '5px 5px 5px 5px black',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '5%',
        textAlign: 'center'
        // elevation: 2
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
         <Text style={styles.title}>HALL OF SAGES</Text>
        <Image style={styles.image} source={HallOfSagesImage}/>
    </>
    );
}