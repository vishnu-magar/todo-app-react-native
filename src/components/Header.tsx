import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const Header =()=>{
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Todos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:colors.primary,
    },
    title:{
        fontSize:20,
        fontWeight:'600',
        color:'#FFFFFF'
    }
});

export default Header;