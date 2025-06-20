import { useState } from 'react';
import {
    View,
    stylesheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    Alert,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { WightLogo, Backgroundsmall } from '../../utils/Image';
import { scale } from '../../utils/responsive';
import { MinusButton } from '../../utils/Image';
import { PlusButton } from '../../utils/Image';
import { Background, CellPhone, Location, Mail, World, Italyflag } from '../../utils/Image';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { colors } from '../../utils/colors';

export default function HolidaysScreen() {
    const [tableHead, setTableHead] = useState(['DATE', 'DAY', 'HOLIDAY']);
    const [tableData, setTableData] = useState([
        ['1st January', 'Sunday', 'New Year'],
        ['4th April', 'Tuesday', 'National Day of S'],
        ['10th April', 'Monday', 'Angel Monday'],
        ['21st April', 'Friday', 'Korite'],
        ['1st May', 'Monday', 'Labor Day'],
        ['2nd June', 'Friday', 'Republic Day'],
        ['28th June', 'Monday', 'Labor Day'],
        ['2nd June', 'Friday', 'Republic Day'],
    ]);

    const columnFlex = [7, 6, 10];
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <Backgroundsmall />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#828181" />
                    </TouchableOpacity>
                    <WightLogo height={scale(39)} width={scale(79)} style={styles.logo} />
                </View>
                <View style={styles.subcaionter}>
                    <View style={styles.topRow}>
                        <View style={styles.flagRow}>
                            <Italyflag height={scale(15)}
                                width={scale(35)} />
                            <Text style={styles.country}>Italy</Text>
                        </View>

                        <View style={styles.iconGroup}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <CellPhone />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Mail />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}>
                                <World />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.locationRow}>
                        <Location
                            style={{}} />
                        <Text style={styles.locationText}>Senegal</Text>
                    </View>
                    <View style={{ borderWidth: 0.50, marginTop: 20, borderColor: "#D9D9D9", marginBottom: 20 }} />
                    <Text style={styles.title}>
                        <Text style={styles.highlight}>Holidays</Text>
                    </Text>
                    <Text style={styles.faqSubtitle}>
                        Kindly note that centre will remain closed on all of the above mentioned dates, so please plan your visa
                        application accordingly.
                    </Text>
                    <Table borderStyle={{ borderWidth: 0.50, borderColor: colors.tableboder }}>
                        <Row
                            data={tableHead} // Access state directly
                            style={styles.head}
                            flexArr={columnFlex}
                            textStyle={styles.headText}
                        />
                        <Rows
                            data={tableData} // Access state directly
                            style={styles.row}
                            flexArr={columnFlex}
                            textStyle={styles.text}
                        />
                    </Table>
                </View>
            </ScrollView>
        </View>
    );
}


