import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#616161',
    borderBottomWidth: 1,
  },
  listItemChild: {
    flexDirection: 'row',
  },
  listItemPhoto: {
    width: 75,
    height: 75,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10
  },
  listItemTextContainer: {
    padding: 10,
  },
});

class UsersScreen extends React.Component {
  state = {
    users: [],
    refreshing: false,
  };

  componentDidMount() {
    this.getUsers();
  }

  showMessageError(error) {
    this.setState({
      error: {
        showError: true,
        message: error.error,
      },
      refreshing: false,
    });
  }

  getUsers() {
    console.log('getUsers()!');
    this.setState({refreshing: true}, () => {
      fetch('https://reqres.in/api/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            this.showMessageError(json);
          } else {
            this.setState({
              users: json.data,
              refreshing: false,
            });
          }
        })
        .catch((error) => {
          this.showMessageError(error);
        });
    });
  }

  goToDetail = (user) => {
    console.log(user);
    this.props.navigation.navigate('UserScreen', {userData: user});
  };

  renderItem = (user) => (
    <View style={styles.listItem}>
      <TouchableOpacity onPress={() => this.goToDetail(user)}>
        <View style={styles.listItemChild}>
          <Image source={{uri: user.avatar}} style={styles.listItemPhoto} />
          <View style={styles.listItemTextContainer}>
            <Text>
              {user.first_name} {user.last_name}
            </Text>
            <Text>{user.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.state.users}
        renderItem={(item) => this.renderItem(item.item)}
        keyExtractor={(user) => user.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.getUsers()}
            enabled={true}
          />
        }
      />
    );
  }
}

export default UsersScreen;
