import React from 'react';
import { View, Text, Dimensions } from 'react-native';


type Props = {
    name: string,
    textColor: string,
    bgColor: string
}

function Header(props: Props): React.JSX.Element {
    const vw: number = Dimensions.get('window').width / 100;
    const vh: number = Dimensions.get('window').height / 100;

    return (
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',

            width: 100 * vw,
            height: 12 * vh,

            paddingBottom: 10,

            backgroundColor: props.bgColor
        }}>
            <Text style={{color: props.textColor, fontSize: 22, fontWeight: '700'}}>
                {props.name}
            </Text>
        </View>
    );
}


Header.defaultProps = {
    bgColor: '#fff',
    textColor: '#000',
    name: 'Page'
};


export default Header;
