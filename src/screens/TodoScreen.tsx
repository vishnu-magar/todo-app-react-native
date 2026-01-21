import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import TodoInput from "../components/TodoInput";
import { useState } from "react";
import { Todo } from "../types/todo";
import { generateId } from "../utils/uuid";
import TodoList from "../components/TodoList";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoScreen = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const addTodo = (title: string) => {
        console.log(title)
        const newTodo: Todo = {
            id: generateId(),
            title: title
        }
        setTodos(prev => [...prev, newTodo]);
    }

    const updateTodo = (title: string) => {
        console.log(title)
        if (!editingTodo) return;
        setTodos(prev =>
            prev.map(todo =>
                todo.id === editingTodo?.id ? { ...todo, title } : todo
            )
        );
        setEditingTodo(null);
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        setEditingTodo(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container}>
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
    container:{
        flex:1,
    }
});

export default TodoScreen;