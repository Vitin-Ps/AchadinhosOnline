import { StyleSheet, Text, TouchableOpacity } from "react-native"


const Teste = () => {
    return (
        <TouchableOpacity 
        style={styles.button}
        >
            <Text>oi</Text>
        </TouchableOpacity>
    )
}

export default Teste

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue'
    }
})