import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
})

function Home() {
    return (<Image source={require("./../assets/home.webp")} style={styles.image}/>);
}

export default Home