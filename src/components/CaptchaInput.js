import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Svg, { Text as SvgText, Line } from 'react-native-svg';
import { scale } from '../utils/responsive'; // Optional, can replace with direct numbers
import Icon from 'react-native-vector-icons/MaterialIcons';

const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const CaptchaInput = ({ value, onChange }) => {
    const [captcha, setCaptcha] = useState(generateCaptcha());

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        onChange('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <Svg height={scale(40)} width={scale(120)}>
                    {/* Draw random lines as noise */}
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Line
                            key={index}
                            x1={Math.random() * 100}
                            y1={Math.random() * 40}
                            x2={Math.random() * 100}
                            y2={Math.random() * 40}
                            stroke="red"
                            strokeWidth="1"
                        />
                    ))}
                    {/* Draw captcha text */}
                    {captcha.split('').map((char, i) => (
                        <SvgText
                            key={i}
                            fill="black"
                            fontSize="20"
                            fontWeight="bold"
                            x={10 + i * 15}
                            y={30 - Math.random() * 10}
                        >
                            {char}
                        </SvgText>
                    ))}
                </Svg>
                <TouchableOpacity onPress={refreshCaptcha} style={styles.refresh}>
                    <Icon name="refresh" size={18} color="#333" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Captcha"
                value={value}
                onChangeText={onChange}
                autoCapitalize="characters"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        margin: scale(10),
    },
    svgContainer: {
        marginTop: scale(10),
        position: 'relative',
        marginRight: scale(10),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.1,
        borderRadius: 4,
        borderColor: '#ccc',
    },
    refresh: {
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 2,
        elevation: 2,
    },
    input: {
        width: scale(200),
        height: scale(40),
        marginTop: scale(10),
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: scale(10),
        borderRadius: 4,
        fontSize: scale(14),
    },
});

export default CaptchaInput;
