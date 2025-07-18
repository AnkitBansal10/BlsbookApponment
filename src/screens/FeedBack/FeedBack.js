import React, { useState } from "react";
import {
    Text,
    View,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native";
import { styles } from "./styles";
import ContactCard from "../../components/ContactCard";
import { getStoredAuthData } from "../../features/auth/authService";
import { BackgroundGradient } from "../../utils/Image";
import CustomButton from "../../components/CustomButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { emojiData } from "../../utils/MockData";
import { share_feedback } from "../../features/auth/authThunks";
import { useDispatch } from "react-redux";
export default function FeedBack({ navigation }) {
    const [selectedRating, setSelectedRating] = useState(null);
    const [feedbackText, setFeedbackText] = useState('');
    const dispatch = useDispatch()
    const handleRatingPress = (ratingId) => {
        setSelectedRating(ratingId);
    };

   const handleSubmit = async () => {
  try {
    const authData = await getStoredAuthData();
    const result =  await dispatch(share_feedback({
      name: authData.user.name,
      email: authData.user.email,
      mobile: authData.user.mobile_number,
      purpose: feedbackText,
    })).unwrap();
    console.log("Success",result)
    Alert.alert('Success', 'Feedback submitted!')
  } catch (error) {
    Alert.alert('Error', error.message || 'Submission failed');
  }
};

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
                    <BackgroundGradient
                        style={{ position: "absolute", width: '100%', height: '100%' }}
                    />

                    <View style={styles.logo}>
                    </View>

                    <ContactCard />
                    <SafeAreaView style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Give us your feedback</Text>
                            <Text style={styles.modalSubtitle}>What was your experience while using our product?</Text>

                            {/* Emoji Rating Section */}
                            <View style={styles.emojiContainer}>
                                {emojiData.map((emoji) => (
                                    <View key={emoji.id} style={styles.emojiItem}>
                                        <TouchableOpacity
                                            onPress={() => handleRatingPress(emoji.id)}
                                            style={[
                                                styles.emojiButton,
                                                selectedRating === emoji.id && {
                                                    backgroundColor: `${emoji.color}20`,
                                                    borderRadius: 50,
                                                    padding: 8
                                                }
                                            ]}
                                            activeOpacity={0.7}
                                        >
                                            <Icon
                                                name={emoji.icon}
                                                size={32}
                                                color={selectedRating === emoji.id ? emoji.color : '#aaa'}
                                            />
                                        </TouchableOpacity>
                                        <Text style={[
                                            styles.emojiLabel,
                                            selectedRating === emoji.id && { color: emoji.color }
                                        ]}>
                                            {emoji.label}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Feedback Input Section */}
                            <Text style={styles.feedbackTitle}>
                                Write your feedback
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Please write here..."
                                placeholderTextColor="#C7C7CD"
                                multiline={true}
                                numberOfLines={5}
                                value={feedbackText}
                                onChangeText={setFeedbackText}
                                textAlignVertical="top"
                            />

                            {/* Submit Button */}
                            <CustomButton
                                label="Submit"
                                onPress={handleSubmit}
                                disabled={!selectedRating}
                                style={[
                                    styles.submitButton,
                                    !selectedRating && { backgroundColor: '#ccc' }
                                ]}
                                textStyle={styles.submitButtonText}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}