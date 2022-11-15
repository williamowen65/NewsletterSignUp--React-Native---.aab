import { StatusBar } from "expo-status-bar";
import {
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Keyboard,
    ScrollView,
    BackHandler,
    Linking,
    Alert,
} from "react-native";

import {
    Provider,
    useDispatch,
    useSelector,
} from "react-redux";
import { store } from "./store/store";
import {
    NavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/Forms/components/IconButton";
// import ManageBackground from "./screens/ManageBackground";
import SubscriptionQueue from "./screens/SubscriptionQueue";
import {
    setClearQueue,
    setPasswordApprove,
    setQueue,
    setSendEmails,
} from "./store/subscriptionQueue";
// import { setShowSettings } from "./store/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Dropdown } from "react-native-element-dropdown";
import { submitQueueAndClear } from "./store/subscriptionQueue";
import Form from "./components/Forms/Form";
// import RNFS from 'react-native-fs'

function NavigationStacks() {
    const dispatch = useDispatch();
    const Stack = createNativeStackNavigator();
    const [showHeader, setShowHeader] =
        useState(true);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    // const Drawer = createDrawerNavigator()

    const handleOpenWebsite = async () => {
        await Linking.openURL(
            "https://www.bethowenwatercolors.com/"
        );
    };

    useEffect(() => {
        AsyncStorage.getItem("SubscriptionQueue")
            .then((res) => {
                dispatch(
                    setQueue(JSON.parse(res))
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='home'
                    component={MainScreen}
                    options={{
                        headerShown: showHeader,
                        headerTitle: () => {
                            const navigation =
                                useNavigation();
                            // const [
                            //     drawerOpen,
                            //     setDrawerOpen,
                            // ] = useState(false);
                            return (
                                <>
                                    <ScrollView
                                        horizontal={
                                            true
                                        }
                                        style={
                                            styles.reset
                                        }
                                    >
                                        <View
                                            style={[
                                                styles.scroll,
                                                styles.reset,
                                            ]}
                                        >
                                            {/* <View
                                                style={
                                                    styles.headerButton
                                                }
                                            >
                                                <IconButton
                                                    icon='image-outline'
                                                    label='Manage Background'
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "ManageBackground"
                                                        )
                                                    }
                                                />
                                            </View> */}
                                            <View
                                                style={
                                                    styles.headerButton
                                                }
                                            >
                                                <IconButton
                                                    icon='rose-outline'
                                                    label='My website'
                                                    onPress={
                                                        handleOpenWebsite
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.headerButton
                                                }
                                            >
                                                <IconButton
                                                    icon='cloud-upload-outline'
                                                    label='Subscription Queue'
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "SubscriptionQueue"
                                                        )
                                                    }
                                                />
                                            </View>
                                            <View
                                                style={
                                                    styles.headerButton
                                                }
                                            >
                                                <IconButton
                                                    icon='remove-circle-outline'
                                                    label='Hide header'
                                                    onPress={() =>
                                                        setShowHeader(
                                                            !showHeader
                                                        )
                                                    }
                                                />
                                            </View>
                                            {/* <View
                                                style={[
                                                    styles.headerButton,
                                                    styles.dropdown,
                                                ]}
                                            >
                                                <IconButton
                                                    icon='remove-circle-outline'
                                                    label='Settings'
                                                    onPress={() =>
                                                        dispatch(
                                                            setShowSettings()
                                                        )
                                                    }
                                                />
                                            </View> */}
                                        </View>
                                    </ScrollView>
                                </>
                            );
                        },
                    }}
                />

                {/* <Stack.Screen
                    name='ManageBackground'
                    component={ManageBackground}
                    options={{
                        headerLeft: () => <></>,
                        headerTitle:
                            "Backgrounds",
                    }}
                /> */}
                <Stack.Screen
                    name='SubscriptionQueue'
                    component={SubscriptionQueue}
                    options={{
                        headerLeft: () => <></>,
                        headerTitle:
                            "Subscription Queue",
                        headerRight: () => {
                            const [
                                clicked,
                                setClicked,
                            ] = useState(false);
                            const {
                                sendEmails,
                                passwordApproval,
                                clearQueue,
                                queue,
                                isClearedToView,
                            } = useSelector(
                                (state) =>
                                    state.subscriptionQueue
                            );

                            if (
                                !isClearedToView
                            ) {
                                return (
                                    <Text>
                                        Enter
                                        passphrase
                                        to view
                                        this page
                                    </Text>
                                );
                            }

                            if (!queue.length) {
                                return (
                                    <Text>
                                        Empty List
                                    </Text>
                                );
                            }

                            if (!clicked) {
                                return (
                                    <>
                                        <IconButton
                                            icon='add'
                                            label='Submit Queue'
                                            onPress={() => {
                                                dispatch(
                                                    submitQueueAndClear()
                                                );
                                                setClicked(
                                                    true
                                                );
                                                dispatch(
                                                    setSendEmails(
                                                        true
                                                    )
                                                );
                                            }}
                                        />
                                    </>
                                );
                            }

                            return (
                                <>
                                    <Text>
                                        Email Sent
                                        to You
                                    </Text>
                                    {sendEmails}
                                    <IconButton
                                        icon=''
                                        label='Clear Queue'
                                        onPress={() => {
                                            if (
                                                passwordApproval
                                            ) {
                                                // console.log(
                                                //     "pass word approved"
                                                // );
                                                dispatch(
                                                    setQueue(
                                                        []
                                                    )
                                                );
                                                dispatch(
                                                    setPasswordApprove(
                                                        false
                                                    )
                                                );
                                            }
                                            dispatch(
                                                setClearQueue(
                                                    !clearQueue
                                                )
                                            );
                                        }}
                                    />
                                </>
                            );
                        },
                    }}
                />
                {/* <Stack.Screen name='DrawerNav' component={DrawerNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationStacks />
        </Provider>
    );
}
const styles = StyleSheet.create({
    headerButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    show: {
        flexDirection: "column",
        // alignItems: 'center'
        // justifyContent: 'center'
    },
    showText: {
        position: "absolute",
        bottom: 3,
        // left: 25,
        opacity: 0.5,
        fontSize: 10,
    },
    dropdown: {
        width: 250,
    },
    scroll: {
        flexDirection: "row",
    },
    reset: {
        margin: 0,
        padding: 0,
        transform: [{ translateX: -16 }],
    },
});

const MainScreen = () => {
    const [keyboardStatus, setKeyboardStatus] =
        useState(undefined);
    // const dispatch = useDispatch();

    useLayoutEffect(() => {
        const showSubscription =
            Keyboard.addListener(
                "keyboardDidShow",
                () => {
                    setKeyboardStatus(
                        "Keyboard Shown"
                    );
                }
            );
        const hideSubscription =
            Keyboard.addListener(
                "keyboardDidHide",
                () => {
                    setKeyboardStatus(
                        "Keyboard Hidden"
                    );
                }
            );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            // alignItems: 'center',
        },
        bethOwen: {
            // resizeMode: 'contain'
            width: 500,
        },
        header: {
            transform: [
                {
                    translateY:
                        keyboardStatus ==
                        "Keyboard Shown"
                            ? 0
                            : -50,
                },
            ],
        },
        logo: {
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textAlign: "center",
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            // color: 'white',
            marginVertical: 24,
            textAlign: "center",
        },
        img: {
            // width: '100%'
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
    });

    // const [showSetting, setShowSetting] =
    //     useState(false);

    // const { showSettings } = useSelector(
    //     (state) => state.app
    // );

    const handlePress = () => {
        // dispatch(setShowSettings());
    };

    // useEffect(() => {
    //     dispatch(setSendEmails(false));
    // }, []);

    return (
        <>
            <View style={styles.container}>
                <StatusBar style='auto' />
                <ImageBackground
                    source={require("./assets/CafeAuLait-min.jpg")}
                    resizeMode='cover'
                    style={styles.img}
                >
                    <View style={styles.header}>
                        <Image
                            source={require("./assets/mom-sig.png")}
                            style={
                                styles.bethOwen
                            }
                            resizeMode='center'
                        />
                        <Text
                            style={styles.title}
                        >
                            Newsletter Signup
                        </Text>
                    </View>
                    <Form
                        submitButtonLabel={
                            "SUBMIT"
                        }
                    />
                </ImageBackground>
            </View>
        </>
    );
};

// const styles = StyleSheet.create({})
