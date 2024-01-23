import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


type Props = {
    task: { definition: string },
    index: number
}

function Task(props: Props): React.JSX.Element {
    const [app, renderApp] = useState(false);


    const deleteTask = async (): Promise<void> => {
        const Tasks: object[] = JSON.parse(await AsyncStorage.getItem('tasks') as string);
        Tasks.splice(props.index, 1);

        await AsyncStorage.setItem('tasks', JSON.stringify(Tasks));

        renderApp(!app);
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => deleteTask()} style={styles.removeButton}>
                <Image source={require('../images/remove.png')} style={styles.removeImage}/>
            </TouchableOpacity>

            <Text style={styles.taskText}>
                {props.task.definition}
            </Text>

            { /* TODO: Prepare checkbox */}
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
        margin: (100 * vw) / 15
    },

    removeImage: {
        width: 5 * vw,
        height: 5 *  vw
    },

    taskText: {
        color: '#f6f6f6',
        marginVertical: 10,
        marginRight: 150
    }
});


export default Task;
