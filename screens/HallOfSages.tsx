import { TouchableOpacity, Text, Image, StyleSheet, StatusBar, View, useWindowDimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import HallOfSagesImage from "./../assets/hallOfSages.png";
import { usePlayerStore } from "../gameStore";
import socketIO from "../socketIO";
import { Player } from "../interfaces/interfaces";

export default function HallOfSages()
{

  const {height, width, scale, fontScale} = useWindowDimensions();
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
        entryImage: {
          height: 0.1*height,
          width: 0.1*height,
          position: 'relative',
          padding: '1%',
          borderRadius: 0.1*height,
          borderColor: 'lightblue',
          borderStyle: 'solid',
          borderWidth: 0.005*height
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

    const playerList = usePlayerStore(state => state.playerList);
      
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return(
    <>
        <TouchableOpacity
           style={styles.button2}
           onPress={() => {
            const socket = socketIO.getSocket();

            if(socket)
            {
              socket.emit("hallOfSages", "exit");
            }
            navigation.navigate('OldSchool')
          }}
         >
           <Text style={styles.buttonText2}>Back</Text>
         </TouchableOpacity>
         <Text style={styles.title}>HALL OF SAGES</Text>
        <Image style={styles.image} source={HallOfSagesImage}/>
        <View style={{height: '85%', marginTop: '20%', flex: 1, flexDirection: 'row', position: 'relative', width: '90%', marginLeft: '5%'}}>
          {playerList.map((elem: Player, i: any) => {
            if(elem.isInHallOfSages)
            {
              console.log(elem);
              return <Image key={i} src={elem.avatar} style={styles.entryImage}/>;
            }
            
            return <View key={i}></View>
          })}
        </View>
    </>
    );
}

