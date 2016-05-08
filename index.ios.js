import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class stopWatch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[ styles.header, this.border('yellow') ]}>
          <View style={[this.border('red'), styles.timerWrapper]}>
            <Text>
              00:00:00
            </Text>
          </View>
          <View style={[this.border('green'), styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={[styles.footer, , this.border('blue')]}>
          <Text>
            List of laps
          </Text>
        </View>
      </View>
    );
  }

  startStopButton = () => {
    return (
      <View>
        <Text>Start</Text>
      </View>
    );
  }

  lapButton = () => {
    return (
      <View>
        <Text>Lap</Text>
      </View>
    );
  }

  border = (color) => {
    return {
      borderColor: color,
      borderWidth: 4
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fill entire screen
    alignItems: 'stretch', //take up as much space in flexDirection
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5, // 5/8 of space
  },
  buttonWrapper: {
    flex: 3, // 3/8 of space
  }
});

AppRegistry.registerComponent('stopWatch', () => stopWatch);
