import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from '@react-native-community/checkbox';


type Task = {
    definition: string,
    isDone: boolean
}

type Props = {
    task: Task,
    index: number
}

function Task(props: Props): React.JSX.Element {
    const [app, renderApp] = useState(false);


    const deleteTask = async (): Promise<void> => {
        const Tasks: Task[] = JSON.parse(await AsyncStorage.getItem('tasks') as string);
        Tasks.splice(props.index, 1);

        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));

        renderApp(!app);
    }

    const checkboxHandler = async (): Promise<void> => {
        const Tasks: Task[] = JSON.parse(await AsyncStorage.getItem('tasks') as string);
        Tasks[props.index].isDone = !Tasks[props.index].isDone;

        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));

        renderApp(!app);
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.removeButton} onPress={() => deleteTask()}>
                <Image style={styles.removeImage} source={require('../images/remove.png')} />
            </TouchableOpacity>

            <Text style={props.task.isDone ? [styles.taskText, styles.lineThrough] : styles.taskText}>
                {props.task.definition}
            </Text>

            <CheckBox
                style={styles.checkbox}
                value={props.task.isDone}
                onValueChange={() => checkboxHandler()}
            />
        </View>
    );
}


const vw: number = Dimensions.get('window').width / 100;

const styles = StyleSheet.create({
    container: {
        width: (100 * vw) - 25,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 10,

        backgroundColor: '#191919'
    },

    removeButton: {
        margin: (100 * vw) / 20
    },

    removeImage: {
        width: 5 * vw,
        height: 5 *  vw
    },

    taskText: {
        flex: 1,

        fontSize: 20,
        color: '#f3f3f3',

        paddingVertical: 15,
    },

    checkbox: {
        width: 5 * vw,
        height: 5 * vw,

        margin: (100 * vw) / 22.5,
    },

    lineThrough: {
        textDecorationLine: 'line-through'
    }
});


export default Task;
