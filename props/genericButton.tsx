import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const buttonStyles = StyleSheet.create({
    
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: '25%',
    width: '50%',
    height: 80,
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
    bottom: 800,
    left: '5%',
    width: '25%',
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',

    
  },
    buttonText2: {
    fontFamily: 'OptimusPrincepsSemiBold',
    color: '#E2DFD2',
    fontSize: 18,
    textAlign: 'center',
    },
  
})
function GenericButton() {
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      style={buttonStyles.button2}
      onPress={() => navigation.navigate("Home")}
    >
      <Text style={buttonStyles.buttonText2}>Back</Text>
    </TouchableOpacity>
  );
}

export { buttonStyles, GenericButton };
