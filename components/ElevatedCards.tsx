import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const { width } = Dimensions.get('window')

const cardData = [
  { 
    id: 1, 
    title: 'Premium', 
    subtitle: 'Most Popular',
    color: '#8B5CF6', 
    lightColor: '#F3E8FF',
    textColor: '#FFFFFF',
    icon: '💎'
  },
  { 
    id: 2, 
    title: 'Business', 
    subtitle: 'For Teams',
    color: '#059669', 
    lightColor: '#ECFDF5',
    textColor: '#FFFFFF',
    icon: '🏢'
  },
  { 
    id: 3, 
    title: 'Enterprise', 
    subtitle: 'Advanced',   
    color: '#DC2626', 
    lightColor: '#FEF2F2',
    textColor: '#FFFFFF',
    icon: '🚀'
  },
  { 
    id: 4, 
    title: 'Starter', 
    subtitle: 'Basic Plan',
    color: '#2563EB', 
    lightColor: '#EFF6FF',
    textColor: '#FFFFFF',
    icon: '⭐'
  },
  { 
    id: 5, 
    title: 'Developer', 
    subtitle: 'For Creators',
    color: '#7C3AED', 
    lightColor: '#F5F3FF',
    textColor: '#FFFFFF',
    icon: '⚡'
  },
]

export default function ElevatedCards() {
  const [activeCard, setActiveCard] = useState(null)

  const handleCardPress = (card: any) => {
    setActiveCard(activeCard === card.id ? null : card.id)
    console.log(`${card.title} card selected`)
    // Add your navigation or action logic here
  }

  const renderCard = (item: any, index: any) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.card,
        { backgroundColor: item.color },
        activeCard === item.id && styles.activeCard,
        index === 0 && styles.firstCard,
        index === cardData.length - 1 && styles.lastCard
      ]}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.iconText}>{item.icon}</Text>
        <View style={[styles.badge, { backgroundColor: item.lightColor }]}>
          <Text style={[styles.badgeText, { color: item.color }]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: item.textColor }]}>
          {item.title}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={[styles.indicator, styles.activeIndicator]} />
        </View>
      </View>

      {/* Elevated overlay effect */}
      <View style={[styles.overlay, { backgroundColor: item.color }]} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Elevated Cards</Text>
        <Text style={styles.subHeading}>Premium card collection with depth</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.container}
        decelerationRate="fast"
        snapToInterval={width * 0.75 + 12}
        snapToAlignment="start"
      >
        {cardData.map((item, index) => renderCard(item, index))}
      </ScrollView>

      {/* Bottom summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {activeCard ? `${cardData.find(c => c.id === activeCard)?.title} Selected` : 'Select a plan above'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    marginTop: 8,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
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
    justifyContent: 'space-between',
    width: width * 0.75,
    height: 180,
    borderRadius: 20,
    marginHorizontal: 6,
    padding: 20,
    // Enhanced elevation
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    // Modern styling
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  activeCard: {
    transform: [{ scale: 1.02 }],
    elevation: 16,
    shadowOpacity: 0.35,
  },
  firstCard: {
    marginLeft: 4,
  },
  lastCard: {
    marginRight: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconText: {
    fontSize: 32,
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginRight: 6,
  },
  activeIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    borderRadius: 20,
  },
  summaryContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    overflow: 'hidden',
  },
})