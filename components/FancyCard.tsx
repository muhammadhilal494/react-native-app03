import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'

const { width } = Dimensions.get('window')

const placesData = [
  {
    id: 1,
    title: 'Hawa Mahal',
    location: 'Pink City, Jaipur',
    description: 'The Hawa Mahal is a palace in the city of Jaipur, India. Built from red and pink sandstone, it is on the edge of the City Palace.',
    image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    distance: '12 mins away',
    rating: 4.8,
    price: '$25',
    category: 'Historical',
    isFavorite: false
  },                
  {
    id: 2,
    title: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. UNESCO World Heritage Site.',
    image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    distance: '2 hours away',
    rating: 4.9,
    price: '$35',
    category: 'UNESCO Site',
    isFavorite: true
  },
  {
    id: 3,
    title: 'Kerala Backwaters',
    location: 'Alleppey, Kerala',
    description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast of Kerala state in southern India.',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    distance: '45 mins away',
    rating: 4.7,
    price: '$20',
    category: 'Nature',
    isFavorite: false
  }
]

export default function FancyCard() {
  const [favorites, setFavorites] = useState<any>(
    placesData.reduce((acc: any, place: any) => ({ ...acc, [place.id]: place.isFavorite }), {})
  )

  const toggleFavorite = (id: any) => {
    setFavorites((prev: any) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCardPress = (place: any) => {
    console.log(`Navigating to ${place.title}`)
    // Add navigation logic here
  }

  const renderCard = (place: any) => (
    <TouchableOpacity
      key={place.id}
      style={[styles.card, styles.cardElevated]}
      onPress={() => handleCardPress(place)}
      activeOpacity={0.95}
    >
      {/* Image Container with Overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: place.image }}
          style={styles.cardImage}
          resizeMode="cover"    
        />
        
        {/* Image Overlay with Controls */}
        <View style={styles.imageOverlay}>
          <View style={styles.topControls}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{place.category}</Text>
            </View>
            <TouchableOpacity
              style={[styles.favoriteButton, favorites[place.id] && styles.favoriteActive]}
              onPress={() => toggleFavorite(place.id)}
            >
              <Text style={styles.favoriteIcon}>
                {favorites[place.id] ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bottomOverlay}>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{place.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Card Content */}
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <Text style={styles.cardTitle}>{place.title}</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.cardLabel}>{place.location}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{place.price}</Text>
            <Text style={styles.priceLabel}>per person</Text>
          </View>
        </View>
        
        <Text style={styles.cardDescription} numberOfLines={3}>
          {place.description}
        </Text>
        
        <View style={styles.cardFooter}>
          <View style={styles.distanceContainer}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.distanceText}>{place.distance}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <Text style={styles.headingText}>Trending Places</Text>
        <Text style={styles.subHeading}>Discover amazing destinations</Text>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={width * 0.85 + 16}
        snapToAlignment="start"
      >
        {placesData.map(renderCard)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    letterSpacing: -0.5,
  },
  subHeading: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '400',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  card: {
    width: width * 0.85,
    height: 420,
    borderRadius: 20,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  cardElevated: {
    backgroundColor: '#FFFFFF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  imageContainer: {
    position: 'relative',
    height: 220,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  favoriteActive: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  favoriteIcon: {
    fontSize: 18,
  },
  bottomOverlay: {
    padding: 16,
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardBody: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  cardTitle: {
    color: '#1E293B',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  cardLabel: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#059669',
    fontSize: 20,
    fontWeight: '700',
  },
  priceLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '400',
  },
  cardDescription: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontWeight: '400',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  distanceText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
})