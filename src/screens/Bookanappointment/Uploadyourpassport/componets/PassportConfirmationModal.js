import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import { Geist_Fonts, Poppins_Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';
import { Cancelicon } from '../../../../utils/Image';
import { scale } from '../../../../utils/responsive';

const PassportConfirmationModal = ({ visible, data, onConfirm, onEdit, isLoading }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.modalOverlay}>
        <View style={{justifyContent:"flex-end",alignItems:"flex-end",width:"90%"}}>
            <TouchableOpacity  style={{marginBottom:10}} onPress={()=>onConfirm()} >          
                <Cancelicon width={scale(21)} height={scale(21)}/>
            </TouchableOpacity>

        </View>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm your details</Text>
          <Text style={styles.editPrompt}>Click to edit the information</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Surname</Text>
              <TouchableOpacity onPress={() => onEdit('surname')}>
                <Text style={styles.detailValue}>{data.surname || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>First name</Text>
              <TouchableOpacity onPress={() => onEdit('firstName')}>
                <Text style={styles.detailValue}>{data.firstName || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of birth</Text>
              <TouchableOpacity onPress={() => onEdit('dateOfBirth')}>
                <Text style={styles.detailValue}>{data.dateOfBirth || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sex</Text>
              <TouchableOpacity onPress={() => onEdit('sex')}>
                <Text style={styles.detailValue}>{data.sex || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nationality</Text>
              <TouchableOpacity onPress={() => onEdit('nationality')}>
                <Text style={styles.detailValue}>{data.nationality || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Place of birth</Text>
              <TouchableOpacity onPress={() => onEdit('placeOfBirth')}>
                <Text style={styles.detailValue}>{data.placeOfBirth || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of issue</Text>
              <TouchableOpacity onPress={() => onEdit('dateOfIssue')}>
                <Text style={styles.detailValue}>{data.dateOfIssue || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of expiry</Text>
              <TouchableOpacity onPress={() => onEdit('dateOfExpiry')}>
                <Text style={styles.detailValue}>{data.dateOfExpiry || 'Not available'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomButton  label='CONFIRM' onPress={onConfirm}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    color:colors.commonTextColor,
    // textAlign: 'center',
    marginBottom: 5,
    fontFamily:Geist_Fonts.Geist_Bold,
  },
  editPrompt: {
    fontSize: 14,
    color:colors.borderColor,
    marginBottom: 20,
    fontFamily:Poppins_Fonts.Poppins_Medium,
  },
  detailsContainer: {
    marginBottom: 25,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color:colors.comanTextcolor2,
    fontFamily:Poppins_Fonts.Poppins_Medium,
  },
  detailValue: {
    fontSize: 16,
    color:colors.comanTextcolor2,
    fontFamily:Poppins_Fonts.Poppins_SemiBold,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default PassportConfirmationModal;