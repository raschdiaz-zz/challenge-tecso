import React from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ReactLogo from '../../assets/react-logo.png';

const styles = StyleSheet.create({
  errorView: {
    backgroundColor: '#d32f2f',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20
  },
  errorText: {
    color: '#FFFFFF',
  },
  loginLogo: {
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  loginButton: {
    height: 40,
    width: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {width: '80%', marginLeft: 'auto', marginRight: 'auto'},
  activityIndicator: {
    marginTop: 10,
  },
});

class LoginScreen extends React.Component {
  state = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
    error: {
      showError: false,
      message: '',
    },
    loading: false,
  };

  setEmail(email) {
    this.setState({
      email,
    });
  }

  setPassword(password) {
    this.setState({
      password,
    });
  }

  showMessageError(error) {
    this.setState({
      error: {
        showError: true,
        message: error.error,
      },
      loading: false,
    });
  }

  login() {
    this.setState(
      {
        error: {
          showError: false,
          message: '',
        },
        loading: true,
      },
      () => {
        setTimeout(() => {
          fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              if (json.error) {
                this.showMessageError(json);
              } else {
                this.props.navigation.navigate('UsersScreen');
              }
            })
            .catch((error) => {
              this.showMessageError(error);
            });
        }, 2000);
      },
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={ReactLogo} style={styles.loginLogo} />
        <TextInput
          value={this.state.email}
          onChangeText={(text) => this.setEmail(text)}
          autoCompleteType={'username'}
          style={styles.textInput}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(text) => this.setPassword(text)}
          autoCompleteType={'password'}
          secureTextEntry={true}
          style={styles.textInput}
        />
        <Button onPress={() => this.login()} title="Login" />
        {this.state.loading && (
          <ActivityIndicator
            color="#1976d2"
            size="large"
            style={styles.activityIndicator}
          />
        )}
        {this.state.error.showError && (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>Error: {this.state.error.message}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
