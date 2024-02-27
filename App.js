import { StyleSheet, Text, View } from 'react-native';
import { API_KEY } from '@env'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddTask from './src/screens/AddTask';
import TasksStack from './src/navigation/stackNavigation/TasksStack';

const Tab = createBottomTabNavigator();

export default function App() {
  console.log(API_KEY || 'not found')
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TasksStack" component={TasksStack} />
          <Tab.Screen name="Add Task" component={AddTask} />

        </Tab.Navigator>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
