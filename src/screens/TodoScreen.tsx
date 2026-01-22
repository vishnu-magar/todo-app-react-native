import { Alert, KeyboardAvoidingView, StyleSheet } from "react-native";
import TodoInput from "../components/TodoInput";
import { useState } from "react";
import { Todo } from "../types/todo";
import { generateId } from "../utils/uuid";
import TodoList from "../components/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenticateUser, redirectToSettings } from "../utils/biometricAuth";
import Header from "../components/Header";

// handles biometric authentication flow and returns whether authentication succeeded
const handleAuth = async (): Promise<boolean> => {
    const result = await authenticateUser();
    // Authentication successful
    if (result.success) return true;

    //Device does not support biometric hardware
    if (result.errorType === 'NO_HARDWARE') {
        Alert.alert('Biometric not supported',
            'This device does not support biometric authentication.',
            [{ text: 'Ok' }]
        );
        return false;
    }

    // Device authentication is not enabled, alert user and redirect to settings to enable it first.
    if (result.errorType === 'NOT_ENROLLED') {
        Alert.alert('Biometric not set up',
            'Please enable biometric authentication in your device settings to continue.',
            [{ text: 'Cancel', style: 'cancel' },
            {
                text: 'Open Settings',
                onPress: () => redirectToSettings(),
            }
            ]

        );
        return false;
    }

    return false;
}

const TodoScreen = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    // adds new todo item with authentication
    const addTodo = async (title: string) => {
        const authenticated = await handleAuth();
        if (!authenticated) return;

        const newTodo: Todo = {
            id: generateId(),
            title: title
        }
        setTodos(prev => [...prev, newTodo]);
    }

    // updates existing todo item with auth
    const updateTodo = async (title: string) => {
        const authenticated = await handleAuth();
        if (!authenticated) return;

        if (!editingTodo) return;
        setTodos(prev =>
            prev.map(todo =>
                todo.id === editingTodo?.id ? { ...todo, title } : todo
            )
        );
        setEditingTodo(null);
    };

    // deletes todo by id
    const deleteTodo = async (id: string) => {
        const authenticated = await handleAuth();
        if (!authenticated) return;
        setTodos(prev => prev.filter(todo => todo.id !== id));
        setEditingTodo(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
                <Header/>
                <TodoList
                    todos={todos}
                    onUpdate={setEditingTodo}
                    onDelete={deleteTodo} />
                <TodoInput
                    onAdd={addTodo}
                    onUpdate={updateTodo}
                    editingTodo={editingTodo} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default TodoScreen;