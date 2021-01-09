import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
  userPhoto: {
    width: 150,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userName: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  userEmail: {
    marginTop: 20,
    textAlign: 'center',
  },
});

class UserScreen extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    console.log(this.props.navigation.state.params);
    this.setState({
      user: this.props.navigation.state.params.userData,
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.userName}>
          {this.state.user.first_name} {this.state.user.last_name}
        </Text>
        <Image
          source={{uri: this.state.user.avatar}}
          style={styles.userPhoto}
        />
        <Text style={styles.userEmail}>{this.state.user.email}</Text>
      </View>
    );
  }
}

export default UserScreen;
