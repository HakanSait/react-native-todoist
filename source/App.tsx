import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header, Task } from './components';


function App(): React.JSX.Element {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    const addNewTask = async (NewTask: string): Promise<void> => {
        if (!NewTask) {
            return;
        }

        const Tasks: object[] = JSON.parse(await AsyncStorage.getItem('tasks') as string);
        Tasks.push({
            definition: NewTask,
            isDone: false
        });

        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));

        setNewTask('');

        return;
    }


    useEffect(() => {
        const onRender = async (): Promise<void> => {
            const Tasks = JSON.parse(await AsyncStorage.getItem('tasks') as string);

            if (!Tasks) {
                await AsyncStorage.setItem('tasks', JSON.stringify([]));

                onRender();
            } else {
                setTasks(Tasks);
            }
        }

        onRender();
    });


    return (
        <View style={styles.container}>
            <Header
                name='Tasks'
                bgColor='#080808'
                textColor='#0d8294'
            />

            <FlatList
                contentContainerStyle={styles.tasks}
                data={tasks}
                renderItem={({ item, index }) => (
                    <Task
                        task={item}
                        index={index}
                        key={index}
                    />
                )}
            />

            <View style={styles.newTask}>
                <TextInput
                    style={styles.inputTask}
                    placeholder='New Task'
                    placeholderTextColor='#262626'
                    value={newTask}
                    onChangeText={(task) => setNewTask(task)}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addNewTask(newTask)}
                >
                    <Image
                        style={styles.addButtonContent}
                        source={require('./images/add.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const vw: number = Dimensions.get('window').width / 100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080808'
    },

    tasks: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10
    },

    newTask: {
        width: 100 * vw,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        paddingVertical: 30,
        paddingHorizontal: 15,

        backgroundColor: '#080808'
    },

    inputTask: {
        fontSize: 20,
        width: 62.5 * vw,

        color: '#f3f3f3',

        paddingVertical: 10,
        paddingLeft: 10,

        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#202020'
    },

    addButton: {
        marginRight: 5 * vw
    },

    addButtonContent: {
        width: 8 * vw,
        height: 8 * vw
    }
});


export default App;
