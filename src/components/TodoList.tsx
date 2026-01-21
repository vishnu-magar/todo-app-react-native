import { FlatList, Text, View } from "react-native";
import { Todo } from "../types/todo"
import TodoItem from "./TodoItem";

type Props = {
    todos: Todo[];
    onUpdate: (todo: Todo) => void;
    onDelete: (id: string) => void;
}
const TodoList = ({ todos, onUpdate, onDelete }: Props) => {
    return (
        <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TodoItem
                    todo={item}
                    onUpdate={onUpdate}
                    onDelete={onDelete} />
            )}
            ListEmptyComponent={
                <View style={{ marginTop: 50, alignItems: 'center' }}>
                    <Text>No todos yet</Text>
                </View>
            } />
    );

};

export default TodoList;