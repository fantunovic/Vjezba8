import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export function SettingsScreen({ route, navigation }) {

  const [isloading, setloading] = useState(true);
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=2")
      const json = await response.json();
      setData(json.data)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getUsers();
  }, [])



  function handleHomePress() {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.screen}>
      <ScrollView>
      

      <View>
        {isloading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWraper}>
                <View style={styles.itemImage}>
                  <Image style={styles.image} source={{uri: `${item.avatar}`}}/>
                </View>
                <View style={styles.itemText}>
                  <Text>{item.first_name}</Text>
                  <Text>{item.last_name}</Text>
                  <Text>{item.email}</Text>
                </View>
              </View>
            )} />
        )}

      </View>

</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  itemWraper: {
    flexDirection: "row",
    margin: 10
  },
  image:{
    height: 100,
    width: 100,
    resizeMode: "contain"
  },
});