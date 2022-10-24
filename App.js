import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { faker } from "@faker-js/faker";
import { useRef } from "react";
const AVATAR_SIZE = 70;
const SPACING = 20;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    id: faker.random.alphaNumeric(10),
    name: faker.name.fullName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
      "women",
      "men",
    ])}/${faker.random.numeric(2)}.jpg`,
  };
});

const BG_IMG =
  "https://images.pexels.com/photos/879656/pexels-photo-879656.jpeg?cs=srgb&dl=pexels-quang-anh-ha-nguyen-879656.jpg&fm=jpg&_gl=1*1gvabch*_ga*MTAxMzEwNTU0MS4xNjU4MDA3Njc5*_ga_8JE65Q40S6*MTY2NjYxOTA1MS4yMS4xLjE2NjY2MTkwODYuMC4wLjA.";

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="auto" />
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        contentContainerStyle={{
          padding: SPACING,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 3),
          ];

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flex: 1,
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "white",
                borderRadius: 12,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 10,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: AVATAR_SIZE,
                  width: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{ fontWeight: "700", fontSize: 20 }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ color: "gray" }}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
