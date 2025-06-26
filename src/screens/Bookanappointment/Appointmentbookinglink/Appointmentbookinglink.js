import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
  ScrollView
} from "react-native";
import { styles } from "./styles";
import { BackgroundGradient } from "../../../utils/Image";
import ProfileMenuModal from "../../../components/ProfileMenuModal";
import ContactCard from "../../../components/ContactCard";
import { scale } from "../../../utils/responsive";
import SuccessMessageCard from "../../../components/SuccessMessageCard";


export default function Appointmentbookinglink({ navigation }) {
  const [name, setName] = useState("");
  const [input, setInput] = useState('');

  return (
    <View style={styles.container} >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <BackgroundGradient
          style={{ position: "absolute", width: '100%', height: '100%' }}
        />
        <View style={styles.logo}>
          <ProfileMenuModal />
        </View>
        <View style={styles.inputview}>
        <ContactCard />
    </View>
         <View style={{ justifyContent: "center", alignItems: "center", marginTop: scale(4),width:"100%" }}>
              <Text style={styles.title}>Appointment booking link</Text>
              <Text style={styles.title}>generated successfully</Text>
            </View>
            <SuccessMessageCard />
        </View>

  );
}