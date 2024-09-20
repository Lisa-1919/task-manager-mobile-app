import { Stack } from 'expo-router';
import { View } from 'react-native';

const Layout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack initialRouteName="home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}>
                <Stack.Screen name="home" options={{
                    title: "Your Tasks",
                }} />
            </Stack>
        </View >
    );
};

export default Layout;