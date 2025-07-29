import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const cardData = [
  { id: 1, title: 'Primary', color: '#6366F1', textColor: '#FFFFFF' },
  { id: 2, title: 'Success', color: '#10B981', textColor: '#FFFFFF' },
  { id: 3, title: 'Warning', color: '#F59E0B', textColor: '#FFFFFF' },
  { id: 4, title: 'Danger', color: '#EF4444', textColor: '#FFFFFF' },
  { id: 5, title: 'Info', color: '#3B82F6', textColor: '#FFFFFF' },
  { id: 6, title: 'Dark', color: '#1F2937', textColor: '#FFFFFF' },
]

export default function FlatCards() {
  const handleCardPress = (cardTitle: any) => {
    console.log(`${cardTitle} card pressed`)
    // Add your navigation or action logic here
  }

  const renderCard = (item: any, index: any) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.card,
        { backgroundColor: item.color },
        index === 0 && styles.firstCard,
        index === cardData.length - 1 && styles.lastCard
      ]}
      onPress={() => handleCardPress(item.title)}
      activeOpacity={0.8}
    >
      <Text style={[styles.cardText, { color: item.textColor }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Flat Cards</Text>
        <Text style={styles.subHeading}>Tap any card to interact</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.container}
      >
        {cardData.map((item, index) => renderCard(item, index))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 20,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  subHeading: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '400',
  },
  container: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.28, // Responsive width
    height: 120,
    borderRadius: 16,
    marginHorizontal: 6,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Modern gradient-like effect with border
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  firstCard: {
    marginLeft: 4,
  },
  lastCard: {
    marginRight: 4,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})