import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";


interface OtpViewProps {
    OTP: string[];
    setOTP: (prev) => void
}
export const OtpView: React.FC<OtpViewProps> = ({ OTP, setOTP }) => {
    const { colors } = useTheme()
    const inputRefs = useRef<TextInput[]>([])
    const [focusIndex, setFocusIndex] = useState(0)

    useEffect(() => {
        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus()
        }
    }, [focusIndex])


    const handleChange = (index: number, text: string) => {
        let _otp: string[] = [...OTP]
        _otp[index] = text.substring(text.length - 1)
        setOTP(_otp)

        if (_otp.indexOf("") >= 0) {
            inputRefs.current[_otp.indexOf("")].focus()
            setFocusIndex(_otp.indexOf(""))
        }
    }
    const handleKeyDown = (index, evt) => {
        if (evt.nativeEvent.key == "Backspace" && index > 0 && inputRefs.current[index - 1] && OTP[index] == "") {
            inputRefs.current[index - 1].focus()
            setFocusIndex(index - 1)
        }
    }
    const handlePress = (index) => {
        inputRefs.current[index].focus()
        setFocusIndex(index)
        inputRefs.current[index].setNativeProps({ selection: { start: 0, end: 1 } })
    }

    return (<View style={{
        flexDirection: 'row'
    }}>
        {OTP.map((_, index) =>
            <TouchableOpacity onPress={() => handlePress(index)} key={index}>
                <View pointerEvents="none">
                    <TextInput
                        style={{
                            color: colors.text,
                            width: 55,
                            aspectRatio: 1 / 1.15,
                            borderColor: colors.primary,
                            borderWidth: inputRefs?.current[index]?.isFocused() ? 2 : 0,
                            borderBottomWidth: 2,
                            margin: 5,
                            marginBottom: 20,
                            backgroundColor: colors.disabled,
                            borderRadius: 3,
                            fontSize: 25,
                        }}
                        cursorColor={colors.primary}
                        textAlign="center"
                        ref={input =>
                            inputRefs.current[index] = input
                        }
                        inputMode="numeric"
                        value={OTP[index]}
                        onChangeText={(text) => handleChange(index, text)}
                        onKeyPress={(e) => handleKeyDown(index, e)}
                    />
                </View>
            </TouchableOpacity>
        )}
    </View>)
}