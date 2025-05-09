import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/screens/OnboardingScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import TodoScreen from './src/screens/TodoScreen';
import TeamsScreen from './src/screens/TeamsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CollectionDetailsScreen from './src/screens/CollectionDetailsScreen';
import GameScreen from './src/screens/GameScreen';
import GameInfoScreen from './src/screens/GameInfoScreen';
import GamePlayScreen from './src/screens/GamePlayScreen';
import NavBar from './src/navigation/NavBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <NavBar {...props} />} initialRouteName="Calendar">
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Todo" component={TodoScreen} />
            <Tab.Screen name="Teams" component={TeamsScreen} />
            <Tab.Screen name="Game" component={GameScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

function RootNavigator() {
    const hasSeen = useSelector(state => state.settings.hasSeenOnboarding);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!hasSeen && <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="CollectionDetails" component={CollectionDetailsScreen} />
                <Stack.Screen name="GameInfo" component={GameInfoScreen} />
                <Stack.Screen name="GamePlay" component={GamePlayScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootNavigator />
            </PersistGate>
        </Provider>
    );
}
