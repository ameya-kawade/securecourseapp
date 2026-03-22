import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSessionCreationStore } from '../../../store/useSessionCreationStore';
import { Avatar } from 'react-native-paper';

// Mock Data
export const MOCK_TRAINEES = [
  { id: '#TR-90210', name: 'Alexander Wright', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: '#TR-88431', name: 'Sarah Jenkins', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: '#TR-77290', name: 'Marcus Thorne', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: '#TR-66512', name: 'Elena Rodriguez', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: '#TR-44329', name: 'Jameson Cole', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
  { id: '#TR-33215', name: 'Olivia Martinez', avatarUrl: 'https://i.pravatar.cc/150?u=6' },
  { id: '#TR-22194', name: 'Daniel Kim', avatarUrl: 'https://i.pravatar.cc/150?u=7' },
  { id: '#TR-11083', name: 'Samantha Lee', avatarUrl: 'https://i.pravatar.cc/150?u=8' },
  { id: '#TR-99072', name: 'Michael Chen', avatarUrl: 'https://i.pravatar.cc/150?u=9' },
  { id: '#TR-88961', name: 'Emily Davis', avatarUrl: 'https://i.pravatar.cc/150?u=10' },
];

const TraineeItem = React.memo(({ item, isSelected, onToggle }: any) => {
  return (
    <TouchableOpacity 
      style={[styles.itemCard, isSelected && styles.itemCardSelected]} 
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Avatar.Image size={48} source={{ uri: item.avatarUrl }} />
        {isSelected && (
          <View style={styles.checkBadge}>
            <MaterialCommunityIcons name="check" size={12} color="#FFF" />
          </View>
        )}
      </View>
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemId}>ID: {item.id}</Text>
      </View>

      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <MaterialCommunityIcons name="check" size={16} color="#FFF" />}
      </View>
    </TouchableOpacity>
  );
});

export default function SessionStep2() {
  const { sessionData, toggleTraineeSelection, selectAllTrainees, clearTraineeSelection } = useSessionCreationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrainees = useMemo(() => {
    return MOCK_TRAINEES.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedCount = sessionData.selectedTraineeIds.length;
  const allSelected = filteredTrainees.length > 0 && 
    filteredTrainees.every(t => sessionData.selectedTraineeIds.includes(t.id));

  const handleSelectAll = () => {
    if (allSelected) {
      clearTraineeSelection();
    } else {
      selectAllTrainees(filteredTrainees.map(t => t.id));
    }
  };

  const handleToggle = useCallback((id: string) => {
    toggleTraineeSelection(id);
  }, [toggleTraineeSelection]);

  const renderItem = useCallback(({ item }: any) => {
    const isSelected = sessionData.selectedTraineeIds.includes(item.id);
    return <TraineeItem item={item} isSelected={isSelected} onToggle={handleToggle} />;
  }, [sessionData.selectedTraineeIds, handleToggle]);

  const keyExtractor = useCallback((item: any) => item.id, []);

  // Compute selected chips
  const selectedTraineesFull = MOCK_TRAINEES.filter(t => sessionData.selectedTraineeIds.includes(t.id));
  const VISIBLE_CHIPS = 3;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search trainees by name or ID..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Trainee Roster</Text>
          {selectedCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{selectedCount} SELECTED</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.selectAllText}>{allSelected ? 'DESELECT ALL' : 'SELECT ALL'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTrainees}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Selected Chips Area */}
      {selectedTraineesFull.length > 0 && (
        <View style={styles.chipsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
            {selectedTraineesFull.slice(0, VISIBLE_CHIPS).map(t => (
              <View key={t.id} style={styles.chip}>
                <Text style={styles.chipText}>{t.name.split(' ')[0][0]}. {t.name.split(' ')[1]}</Text>
                <TouchableOpacity onPress={() => handleToggle(t.id)} style={styles.chipClose}>
                  <Feather name="x" size={14} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            ))}
            {selectedTraineesFull.length > VISIBLE_CHIPS && (
              <View style={styles.moreChip}>
                <Text style={styles.moreChipText}>+{selectedTraineesFull.length - VISIBLE_CHIPS} more</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginRight: 12,
  },
  badge: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  selectAllText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemCardSelected: {
    backgroundColor: '#162032',
    borderColor: '#3B82F6',
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#3B82F6',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  itemId: {
    fontSize: 12,
    color: '#94A3B8',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  chipsContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  chipsScroll: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 8,
  },
  chipText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
  },
  chipClose: {
    padding: 2,
  },
  moreChip: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  moreChipText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
  },
});
