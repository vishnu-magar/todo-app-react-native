import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Todo } from "../types/todo";
import { colors } from "../theme/colors";

type Props = {
    todo: Todo;
    onUpdate: (todo: Todo) => void;
    onDelete: (id: string) => void;
}
const TodoItem = ({ todo, onUpdate, onDelete }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{todo.title}</Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onUpdate(todo)}>
                    <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(todo.id)}>
                    <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        padding:16,
        marginHorizontal:16,
        marginVertical:8,
        borderRadius:10,
        shadowColor:'#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation:2,
        backgroundColor: colors.background
    },
    actions:{
        flexDirection: 'row',
        marginTop:12,
        justifyContent: 'flex-end',
    },
    text:{
        color:colors.text,
    },
    edit:{
        color:colors.secondary,
        marginRight:16,
    },
    delete:{
        color:colors.danger
    }
});

export default TodoItem;