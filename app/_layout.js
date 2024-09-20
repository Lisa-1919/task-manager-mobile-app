import { Stack } from 'expo-router';
import { View } from 'react-native'; 

const Layout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack initialRouteName="home">
                <Stack.Screen name="home" />
            </Stack>
        </View>
    );
};

export default Layout;