import {
    View,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,
    StatusBar,
    Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import Input from "./components/Input";
import { useState } from "react";
import Button from "./components/Button";
import colors from "../../constants/colors";
import {
    useSelector,
    useDispatch,
    connect,
} from "react-redux";
import {
    addToQueue,
    setQueue,
    Subscriber,
    updateQueue,
    submitQueueAndClear,
} from "../../store/subscriptionQueue";
// import { Button } from 'react-native-paper'

// import axios from "axios";
// import { getAllShows } from "../../utils/https";

const Form = ({
    submitButtonLabel,
    onSubmit,
    onCancel,
    defaultValues,
}) => {
    // const data = useSelector(
    //     (state) => state.subscriptionQueue.queue
    // );

    const dispatch = useDispatch();

    const [values, setValues] = useState({
        name: "",
        email: "",
    });

    const handleSubscriber = (res) => {
        // console.log("update queue", res);
        dispatch(setQueue(res));
    };

    const handleSubmit = () => {
        if (!values.name || !values.email) {
            Alert.alert(
                "Requires both fields",
                "Name & Email"
            );
            return;
        }
        AsyncStorage.getItem(
            "SubscriptionQueue"
        ).then((res) => {
            const newData = Object.assign(
                {},
                entry
            );

            if (!res)
                AsyncStorage.setItem(
                    "SubscriptionQueue",
                    JSON.stringify([newData])
                )
                    .then((res) =>
                        // // console.log(res)
                        handleSubscriber([
                            newData,
                        ])
                    )
                    .catch((err) =>
                        console.error(err)
                    );
            else {
                const allData = [
                    newData,
                    ...JSON.parse(res),
                ];
                AsyncStorage.setItem(
                    "SubscriptionQueue",
                    JSON.stringify(allData)
                )
                    .then((res) =>
                        // // console.log(res)
                        handleSubscriber(allData)
                    )
                    .catch((err) =>
                        console.error(err)
                    );
            }
        });

        const entry = new Subscriber(
            values.name.trim(),
            values.email.trim()
        );
        // dispatch(
        //     addToQueue(Object.assign({}, entry))
        // );

        setValues({
            name: "",
            email: "",
        });
        Keyboard.dismiss();
    };

    // useEffect(() => {
    //     AsyncStorage.getItem(
    //         "SubscriptionQueue"
    //     ).then((res) => {
    //         // // console.log('subQue', res, JSON.parse(res));
    //         if (res) {
    //             dispatch(
    //                 setQueue(JSON.parse(res))
    //             );
    //         }
    //     });
    // }, []);

    return (
        <>
            <View style={styles.formContainer}>
                <View style={styles.form}>
                    <Input
                        label={"Full Name"}
                        textInputConfig={{
                            autoCapitalize:
                                "words",
                            value: values.name,
                            onChangeText: (e) =>
                                setValues(
                                    (vals) => ({
                                        ...vals,
                                        name: e,
                                    })
                                ),
                        }}
                    />
                    <Input
                        label={"Email"}
                        textInputConfig={{
                            keyboardType:
                                "email-address",
                            autoCapitalize:
                                "none",
                            value: values.email,
                            onChangeText: (e) =>
                                setValues(
                                    (vals) => ({
                                        ...vals,
                                        email: e,
                                    })
                                ),
                        }}
                    />
                    <Button
                        mode='contained'
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        {submitButtonLabel}
                    </Button>
                </View>
            </View>
        </>
    );
};
// const mapDispatchToProps = (dispatch) => ({
//     dispatch,
// });

// export default connect(
//     null,
//     mapDispatchToProps
// )(Form);

export default Form;

const styles = StyleSheet.create({
    form: {
        width: 250,
    },
    button: {
        borderRadius: 4,
        marginHorizontal: 4,
        paddingVertical: 12,
        backgroundColor: colors.primary500,
    },
    formContainer: {
        backgroundColor: "#ffffff88",
        padding: 40,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 4,
    },
});
