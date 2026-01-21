import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Todo } from "../types/todo";
import { useEffect, useState } from "react";
import { colors } from "../theme/colors";

type Props = {
    onAdd: (title: string) => void;
    onUpdate: (title: string) => void;
    editingTodo: Todo | null;
}

const TodoInput = ({ onAdd, onUpdate, editingTodo }: Props) => {
    const [text, setText] = useState('');

    // set existing todo for input text in case of updating
    useEffect(() => {
        if (editingTodo) {
            setText(editingTodo.title);
        }
    }, [editingTodo]);

    // add a new todo or update the existing one.
    const handleSubmit = () => {
        if (!text.trim()) return;
        editingTodo ? onUpdate(text) : onAdd(text);
        setText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Add a todo..."
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text>{editingTodo ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
        </View>
    );

};

export default TodoInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        backgroundColor: "#FFF"
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
    }
});