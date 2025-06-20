import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { colors } from '../../../utils/colors';
import { Geist_Fonts, Poppins_Fonts } from '../../../utils/fonts';
import { Check } from '../../../utils/Image';

const VisaFeesCard = () => {
    const tableData = [
        ['Above 12 years of age', '80.00', ""],
        ['Between 6 years and\nless than 12 years of age', '40.00', ""],
        ['Less than 6 years of age', '–', ""],
    ];
    const flexArr = [1, 0, 3];
    const columnFlex = [6, 6, 4];
   const widthArr= [200, 140, 130]

    const _renderCell = (data, index) => {
        let cellStyle = styles.cellText;
        let textStyle = styles.rowText;
        if (index === 1) {
            textStyle = [styles.rowText, styles.cellValueText];
        }

        return (
            <View style={cellStyle}>
                <Text style={textStyle}>{data}</Text>
            </View>
        );
    };

    return (
        <View style={styles.card}>
            <Text style={styles.header}>Visa Fees</Text>
            <Text style={styles.subText}>
                Schengen Short Term Type C Visa{'\n'}
                (Senegal Nationals and other countries)
            </Text>
            <ScrollView horizontal>
                <Table borderStyle={styles.tableBorder}>
                    <Row
                        data={['', 'VISA FEE (EUR)', "Visa Fees in Nepalese currency"]}
                        // flexArr={flexArr}
                         widthArr={widthArr}
                        style={styles.head}
                        textStyle={styles.headText}
                        renderCell={(data, colIndex) => _renderCell(data, colIndex, true)}
                    />
                    <TableWrapper style={styles.wrapper}>
                        {
                            tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    // flexArr={flexArr}
                                     widthArr={widthArr}
                                    style={[styles.row, index === 1 && styles.highlightRow, index === 0 && { backgroundColor: 'white' },
                                    index === 1 && { backgroundColor: colors.indexcolor }]}
                                    textStyle={styles.rowText}
                                    renderCell={(data, cellIndex) => _renderCell(data, cellIndex)}
                                />
                            ))
                        }
                    </TableWrapper>
                </Table>
            </ScrollView>

            <Text style={styles.noteHeading}>Note:-</Text>
            <View style={styles.bulletRow}>
                <Check style={styles.bullet} />
                <Text style={styles.bulletText}>
                    Applicants will be paying a service fee of FCA 10496 (inclusive of VAT 12%)
                </Text>
            </View>
            <View style={styles.bulletRow}>
                <Check style={styles.bullet} />
                <Text style={styles.bulletText}>
                    The applicable Visa Fee and Service fee are as per the current rate of exchange set by the Embassy of Italy. They are subject to change without any notice.
                </Text>
            </View>
            <View style={styles.bulletRow}>
                <Check style={styles.bullet} />
                <Text style={styles.bulletText}>All the Fees are non-refundable.</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    header: {
        fontSize: 24,
        fontFamily: Geist_Fonts.Geist_SemiBold,
        color: colors.commonTextColor,
        marginBottom: 6,
    },
    subText: {
        fontSize: 14,
        color: colors.comanTextcolor2,
        marginBottom: 12,
        fontFamily: Poppins_Fonts.Poppins_Regular,
    },

    tableBorder: {
        borderWidth: 0.50,
        backgroundColor: "red",
        borderColor: colors.tableboder,
    },
    head: {
        height: 50,
        backgroundColor: colors.primary,
        overflow: 'hidden',
    },
    headText: {
        margin: 6,
        color: '#fff',
        fontFamily: Poppins_Fonts.Poppins_Bold,
        textAlign: "left",
        fontSize: 14,
    },
    wrapper: {

    },
    row: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: colors.text,
    },
    highlightRow: {
    },
    cellText: {
        paddingHorizontal: 6,
        justifyContent: 'center',
    },
    rowText: {
        fontSize: 16,
        color: colors.comanTextcolor2,
        textAlign: "center",
    },
    cellValueText: {
        textAlign: 'right',
    },
    noteHeading: {
        marginTop: 14,
        marginBottom: 6,
        fontSize: 16,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2,
    },
    bulletRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    bullet: {
        fontSize: 14,
        marginTop: 5,
        color: '#a87f1c',
        marginRight: 8,
        lineHeight: 20,
    },
    bulletText: {
        fontSize: 15,
        fontFamily: Poppins_Fonts.Poppins_Regular,
        color: colors.comanTextcolor2,
        flex: 1,
        lineHeight: 20,
    },
});

export default VisaFeesCard;