import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { boxData } from '../utils/MockData';
import { Poppins_Fonts } from '../utils/fonts';
import { colors } from '../utils/colors';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemMargin = 16;
const itemWidth = (screenWidth - (numColumns + 1) * itemMargin) / numColumns;



const BoxUIWithFlatList = () => {
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.box,
        { backgroundColor: item.backgroundColor },
        item.span === 2 ? styles.fullWidthBox : styles.halfWidthBox,
      ]}
      activeOpacity={0.9}>
    <item.IconComponent width={27} height={27} />
      <Text style={styles.boxText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={boxData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  flatListContent: {
  },
  row: {
    justifyContent: 'space-between',
  },
  box: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: itemMargin,
  },
  halfWidthBox: {
    width: itemWidth,
  },
  fullWidthBox: {
    width: itemWidth,
    left:"26%",
    alignSelf: 'center',
  },
  boxText: {
    color:colors.text,
    fontSize: 11,
    marginTop: 8,
  fontFamily:Poppins_Fonts.Poppins_Medium
  },
});

export default BoxUIWithFlatList;
