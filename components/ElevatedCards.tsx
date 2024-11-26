import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElevatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>ElevatedCards</Text>
      <ScrollView horizontal={true}  style={styles.container}>
        <View style={[styles.card, styles.cardOne]}>
            <Text>Tap</Text>
        </View>
        <View style={[styles.card, styles.cardTwo]}>
            <Text>to</Text>
        </View>
        <View style={[styles.card, styles.cardThree]}>
            <Text>Scroll</Text>
        </View>
        <View style={[styles.card, styles.cardOne]}>
            <Text>Red</Text>
        </View>
        <View style={[styles.card, styles.cardTwo]}>
            <Text>Blue</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 8
    },
    container:{
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 8,
        elevation: 4,
        textShadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#EF5354',
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    cardOne:{
        backgroundColor: '#EF5354' 
    },
    cardTwo:{
        backgroundColor: '#50DBB4' 
    },
    cardThree:{
        backgroundColor: '#5DA3FA' 
    },
})