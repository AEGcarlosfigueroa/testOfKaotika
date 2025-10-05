import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    image: {
    height: '100%',
    position: 'absolute',
    zIndex: -10,
    width: '100%'
  }
})
type Player = { profile: {
      role: "ACOLITO" | "ISTVAN" | "MORTIMER" | "VILLANO";
}}

function Home({ player }: {player : Player}) {
  let imageSource;

  if(player.profile.role === "ACOLITO")
  {
    imageSource = require("./../assets/Acolytes.webp");
  }
  else if (player.profile.role === "ISTVAN")
  {
    imageSource = require("./../assets/home.webp");
  }
  else if (player.profile.role === "MORTIMER")
  {
    imageSource = require("./../assets/hallOfPower.png");
  }
  else if (player.profile.role === "VILLANO")
  {
    imageSource = require("./../assets/dungeon.png")
  }
  return <Image source={imageSource} style={styles.image} />;
}

export default Home