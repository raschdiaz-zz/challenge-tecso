import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '15%',
    marginRight: '15%'
  }
});

class SettingsScreen extends React.Component {
  logout() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.logout()} title="Logout" />
      </View>
    );
  }
}

export default SettingsScreen;
