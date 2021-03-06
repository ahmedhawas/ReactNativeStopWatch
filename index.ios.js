import React, { Component } from 'react';
import formatTime from 'minutes-seconds-milliseconds';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView
} from 'react-native';

class stopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {timeElapsed: null, running: false, startTime: null, laps: []};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[ styles.header ]}>
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <ScrollView style={styles.footer}>
          {this.laps()}
        </ScrollView>
      </View>
    );
  }

  laps = () => {
    return this.state.laps.map((time, index) => {
      return(
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}> Lap #{index + 1}</Text>
          <Text style={styles.lapText}> {formatTime(time)}</Text>
        </View>);
    });
  }

  startStopButton = () => {
    let style = this.state.running ? styles.stopButton : styles.startButton;
    console.log('style', style);
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleStartPress}
        style={[styles.button, style]}>
        <Text>
          {this.state.running ? 'Stop' : 'Start'}
        </Text>
      </TouchableHighlight>
    );
  }

  handleStartPress = () => {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
      return
    }

    this.setState({startTime:  new Date()})
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      });
    }, 30);
  }

  lapButton = () => {
    return (
      <TouchableHighlight
        underlayColor='gray'
        onPress={this.handleLapPress}
        style={[styles.button]}>
        <Text>Lap</Text>
      </TouchableHighlight>
    );
  }

  handleLapPress = () => {
    const lapTime = this.state.timeElapsed;
    this.setState(
      {
        startTime: new Date(),
        laps: this.state.laps.concat([lapTime])
      });
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3, // 3/8 of space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderColor: '#00CC00',
  },
  stopButton: {
    borderColor: '#CC0000',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText: {
    fontSize: 30,
  }
});

AppRegistry.registerComponent('stopWatch', () => stopWatch);
