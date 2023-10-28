import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  messageAPI,
  getMessagesAPI,
  getReceiverProfile,
  deleteMessageAPI,
} from "../services/APIAction";
import { UserType } from "../../userContext";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import MessageInputView from "../components/MessageInputView";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const ChatMessagesScreen = ({ route, navigation }) => {
  const { userId } = useContext(UserType);
  const recepientId = route.params.receiverId;
  const [message, setMessage] = useState("");
  const [getMessages, setgetMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);

  useEffect(() => {
    (async () => {
      const request = {
        recepientId: recepientId,
        senderId: userId,
      };
      const getReceiver = await getReceiverProfile(recepientId);
      const getAllMessage = await getMessagesAPI(request);
      setgetMessages(getAllMessage);
      setRecepientData(getReceiver);
    })();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.headerView}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <Text style={styles.selectedMessageView}>
              {selectedMessages.length}
            </Text>
          ) : (
            <View style={styles.headerImageView}>
              <Image
                style={styles.headerImage}
                source={{ uri: recepientData?.image }}
              />
              <Text style={styles.headerName}>{recepientData?.name}</Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              name="delete"
              size={24}
              color="black"
              onPress={onDeletePress}
            />
          </View>
        ) : null,
    });
  }, [selectedMessages, recepientData]);

  const onDeletePress = async () => {
    try {
      const deleteRes = await deleteMessageAPI(selectedMessages);
      if (deleteRes?.message == "Messages deleted successfully") {
        const request = {
          recepientId: recepientId,
          senderId: userId,
        };
        const getAllMessage = await getMessagesAPI(request);
        setgetMessages(getAllMessage);
        setSelectedMessages([]);
      }
    } catch (error) {
      console.log("error on onDeletePress", error);
    }
  };

  const onSendTextMessage = async (messageType, imageURL) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);

      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageURL,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      const res = await messageAPI(formData);
      if (res?.message == "Message sent Successfully") {
        setMessage("");
        const request = {
          recepientId: recepientId,
          senderId: userId,
        };
        const getAllMessage = await getMessagesAPI(request);
        setgetMessages(getAllMessage);
      }
    } catch (error) {
      console.log("error on message send", error);
    }
  };

  const formateTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const onCameraPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onSendTextMessage("image", result.assets[0].uri);
    }
  };

  const onLogMessagePress = async (message) => {
    const isSelected = selectedMessages?.includes(message._id);

    if (isSelected) {
      const removeSelected = selectedMessages.filter(
        (item) => item !== message._id
      );
      setSelectedMessages(removeSelected);
    } else {
      setSelectedMessages([...selectedMessages, message._id]);
    }
  };
  const scrollViewRef = useRef(null);

  return (
    <KeyboardAvoidingView style={styles.mainView}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: false })
        }
      >
        {getMessages?.map((item, index) => {
          if (item?.messageType == "text") {
            const isSelected = selectedMessages.includes(item._id);

            return (
              <TouchableOpacity
                onLongPress={() => onLogMessagePress(item)}
                key={index}
                style={[
                  item?.senderId?._id == userId
                    ? [
                        styles.messageBoxView,
                        { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
                      ]
                    : [
                        styles.messageBoxView,
                        { backgroundColor: "white", alignSelf: "flex-start" },
                      ],
                  isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: isSelected ? "right" : "left",
                  }}
                >
                  {item?.message}
                </Text>
                <Text style={styles.messageTimeText}>
                  {formateTime(item?.timeStamp)}
                </Text>
              </TouchableOpacity>
            );
          }
          if (item.messageType === "image") {
            const baseURL =
              "/Users/mac/Documents/SVDev/messenger_project/api/files/";
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: baseURL + filename };
            return (
              <TouchableOpacity
                key={index}
                style={[
                  item?.senderId?._id == userId
                    ? [
                        styles.messageBoxView,
                        { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
                      ]
                    : [
                        styles.messageBoxView,
                        { backgroundColor: "white", alignSelf: "flex-start" },
                      ],
                ]}
              >
                <View>
                  <Image source={source} style={styles.imageMessage} />
                  <Text style={styles.imageMessageTimeFont}>
                    {formateTime(item?.timeStamp)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      <MessageInputView
        onCameraPress={onCameraPress}
        bottomInputView={{ marginBottom: showEmojiSelector ? 0 : 25 }}
        value={message}
        onChange={(txt) => setMessage(txt)}
        onEmojiPress={() => {
          setShowEmojiSelector(!showEmojiSelector);
        }}
        onSendButtonpress={() => onSendTextMessage("text")}
      />
      {showEmojiSelector && (
        <EmojiSelector
          style={{ height: 250 }}
          onEmojiSelected={(emoji) =>
            setMessage((prevMessage) => prevMessage + emoji)
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  headerView: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  selectedMessageView: {
    fontSize: 16,
    fontWeight: "500",
  },
  headerImageView: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "cover",
  },
  headerName: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  messageBoxView: {
    margin: 10,
    padding: 10,
    maxWidth: "60%",
    borderRadius: 7,
  },
  messageTimeText: {
    fontSize: 9,
    marginTop: 5,
    color: "gray",
    textAlign: "right",
  },
  imageMessageTimeFont: {
    right: 10,
    bottom: 7,
    fontSize: 9,
    marginTop: 5,
    color: "white",
    textAlign: "right",
    position: "absolute",
  },
  imageMessage: {
    width: 200,
    height: 200,
    borderRadius: 7,
  },
});
