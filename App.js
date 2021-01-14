import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native';
import { Icon, Root } from 'native-base';

// Pantallas
import Home from './views/Home';
import Add from './views/Add';
import Graphics from './views/Graphics';

// Context
import FirebaseState from './context/firebaseState';

// Navigation
const Tab = createBottomTabNavigator();


const App = () => {

  const scheme = useColorScheme();
  
  // Light Theme
  const light = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000',
      card: "#ffda00",
      border: "#ffda00",
      background: "#fff",
      text: "#1a202c"
    }
  }
  
  // Dark Theme
  const dark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#edf2f7',
      card: "#1a202c",
      border: "#1a202c",
      background: "#2d3748",
      text: "#edf2f7"
    }
  }

  const tabBarOptions = {
    activeBackgroundColor: '#718096',
    inactiveBackgroundColor: '#2d3748',
    activeTintColor: '#2d3748', // tab text color
    inactiveTintColor: '#edf2f7',
    tabStyle: {
      paddingTop: 10,
    },
    style: {
      height: 78,
    },
    labelPosition: 'below-icon',
    labelStyle: {
      marginTop: 5,
      marginBottom: 14,
      fontSize: 14
    },
  }

  const setUpIcons = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case "Home":
          iconName = focused
          ? 'ios-home'
          : 'ios-home-outline';
          break;
        case "Add":
          iconName = focused
          ? 'ios-add-circle'
          : 'ios-add-circle-outline';
          break;
        case "Graphics":
            iconName = focused
            ? 'stats-chart'
            : 'stats-chart-outline';
            break
        default:
          break;
      }

      return <Icon name={iconName} />;
    },
  })

  return (
    <>
      <FirebaseState>
        <Root>
          <NavigationContainer theme={ scheme === 'dark' ? dark : light }>
            <Tab.Navigator
              tabBarOptions = { tabBarOptions }
              screenOptions={ setUpIcons }
            >
    
              <Tab.Screen 
                name = "Home" 
                component = { Home }
                options = {{ 
                  title: "Inicio" 
                }}
              />
    
              <Tab.Screen 
                name = "Add" 
                component = { Add }
                options = {{ 
                  title: "Nuevo registro" 
                }}
              />

              <Tab.Screen 
                name = "Graphics" 
                component = { Graphics }
                options = {{ 
                  title: "Gráficos" 
                }}
              />
    
            </Tab.Navigator>
          </NavigationContainer>
        </Root>
      </FirebaseState>
    </>
  );
};

export default App;
