import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
})

function Tasks() {
    return (<Image source={require("./../assets/tasks.png")} style={styles.image}/>);
}

export default Tasks