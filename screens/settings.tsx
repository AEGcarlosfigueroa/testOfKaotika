import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { View } from "react-native";

const styles = StyleSheet.create({
    button: {
    top: '45%',
    left: '25%',
    width: '50%',
    height : '5%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    borderRadius: '25%',
    borderWidth: 2,
    borderColor: 'grey'
  },
  text: {
    color: 'yellow',
    alignSelf: 'center',
    margin: '5%'
  },
  view: {
    backgroundColor: 'grey',
    height: '100%',
    width: '100%'
  },
  image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
});

function Settings() {
    return (
          <>
            <Image source={require("./../assets/settings.png")} style={styles.image}/>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            signOut(getAuth());
            GoogleSignin.revokeAccess();
          }}
        >
          <Text style={styles.text}>SIGN OUT</Text>
        </TouchableOpacity>
        </>
    );
}

export default Settings