import { StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from 'react';
import { isInTowerContext } from "../context";

const buttonStyles = StyleSheet.create({
    
  buttonContainer: {
    position: 'absolute',
    bottom: '10%',
    left: '25%',
    width: '50%',
    height: '8%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'OptimusPrincepsSemiBold',
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
function GenericButton() {
  type RootStackParamList = {
        Home: undefined,
        Entrance: undefined,
        Tower: undefined,
        TowerEntrance: undefined,
        SpyCam: undefined,
        Map: undefined
      }
    
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const towerContext = React.useContext(isInTowerContext);
  const {isInTower, setIsInTower} = towerContext;

  return (
    <TouchableOpacity
      style={buttonStyles.button2}
      onPress={() => {
        navigation.navigate("Map");
        setIsInTower(false);
      }}
    >
      <Text style={buttonStyles.buttonText2}>Back</Text>
    </TouchableOpacity>
  );
}

export { buttonStyles, GenericButton };
