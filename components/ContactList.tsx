import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

type Contact = {
  uid: number;
  name: string;
  status: string;
  imageUrl: string;
  role: string;
  isOnline: boolean;
  lastSeen: string;
};

const ContactList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const contacts: Contact[] = [
    {
      uid: 1,
      name: 'Hitesh Choudhary',
      status: 'Just an extraordinary teacher',
      imageUrl: 'https://avatars.githubusercontent.com/u/11613311?v=4',
      role: 'Senior Educator',
      isOnline: true,
      lastSeen: 'Active now',
    },
    {
      uid: 2,
      name: 'Anurag Tiwari',
      status: 'I ❤️ To Code and Teach!',
      imageUrl: 'https://avatars.githubusercontent.com/u/94738352?v=4',
      role: 'Full Stack Developer',
      isOnline: true,
      lastSeen: 'Active now',
    },
    {
      uid: 3,
      name: 'Sanket Singh',
      status: 'Making your GPay smooth',
      imageUrl: 'https://avatars.githubusercontent.com/u/29747452?v=4',
      role: 'Product Manager',
      isOnline: false,
      lastSeen: '2 hours ago',
    },
    {
      uid: 4,
      name: 'Anirudh Jwala',
      status: 'Building secure Digital banks',
      imageUrl: 'https://avatars.githubusercontent.com/u/25549847?v=4',
      role: 'Security Engineer',
      isOnline: false,
      lastSeen: '1 day ago',
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactPress = (contact: Contact) => {
    Alert.alert(
      contact.name,
      `Role: ${contact.role}\nStatus: ${contact.status}\nLast seen: ${contact.lastSeen}`,
      [
        { text: 'Message', onPress: () => console.log('Message pressed') },
        { text: 'Call', onPress: () => console.log('Call pressed') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderContactItem = (contact: Contact) => (
    <TouchableOpacity
      key={contact.uid}
      style={styles.contactCard}
      onPress={() => handleContactPress(contact)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: contact.imageUrl }}
          style={styles.avatar}
        />
        {contact.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.contactInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.contactName} numberOfLines={1}>
            {contact.name}
          </Text>
          <Text style={styles.lastSeen}>{contact.lastSeen}</Text>
        </View>
        
        <Text style={styles.contactRole} numberOfLines={1}>
          {contact.role}
        </Text>
        
        <Text style={styles.contactStatus} numberOfLines={2}>
          {contact.status}
        </Text>
      </View>
      
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
        <Text style={styles.subtitle}>
          {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
        />
        <View style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </View>
      </View>

      {/* Online Status Banner */}
      <View style={styles.statusBanner}>
        <View style={styles.onlineCount}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>
            {contacts.filter(c => c.isOnline).length} online
          </Text>
        </View>
      </View>

      {/* Contact List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredContacts.length > 0 ? (
          filteredContacts.map(renderContactItem)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No contacts found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search terms
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  searchContainer: {
    margin: 16,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color: '#374151',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  searchIconText: {
    fontSize: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  onlineCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  onlineText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e2e8f0',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contactInfo: {
    flex: 1,
    paddingRight: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  lastSeen: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  contactRole: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 4,
  },
  contactStatus: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 18,
  },
  chevron: {
    paddingLeft: 8,
  },
  chevronText: {
    fontSize: 20,
    color: '#cbd5e1',
    fontWeight: '300',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default ContactList;