import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header, Task } from './components';


function App(): React.JSX.Element {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');


    const addNewTask = async (NewTask: string): Promise<boolean> => {
        if (!NewTask) {
            return false;
        }

        const Tasks: object[] = JSON.parse(await AsyncStorage.getItem('tasks') as string);
        Tasks.push({
            definition: NewTask
        });

        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));

        setNewTask('');

        return true;
    }


    useEffect(() => {
        const initializeTasks = async (): Promise<void> => {
            const Tasks = JSON.parse(await AsyncStorage.getItem('tasks') as string);

            if (!Tasks) {
                await AsyncStorage.setItem('tasks', JSON.stringify([]));

                initializeTasks();
            } else {
                setTasks(Tasks);
            }
        }

        initializeTasks();
    });


    return (
        <View style={styles.container}>
            <Header
                name='Tasks'
                bgColor='#000'
                textColor='#0d8294'
            />

            <ScrollView>
                <View style={styles.tasks}>
                    {
                        tasks.map((item, index) => {
                            return (
                                <Task
                                    task={item}
                                    index={index}
                                    key={index}
                                />
                            );
                        })
                    }
                </View>
            </ScrollView>

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
        backgroundColor: '#000'
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

        backgroundColor: '#000'
    },

    inputTask: {
        fontSize: 20,
        width: 62.5 * vw,

        color: '#f6f6f6',

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
