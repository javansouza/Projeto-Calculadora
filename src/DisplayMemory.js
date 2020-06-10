import React from 'react'
import {StyleSheet, Text, View, ScrollView} from 'react-native'

const styles = StyleSheet.create({
    display:{
        flex:0.5,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-start',
    },

    displayValue:{
        fontSize: 20,
        color: '#fff',

    }
})

export default porps => 

    <View style={styles.display}>
        <ScrollView horizontal={true}> 
        <Text style={styles.displayValue} numberOfLines={1}>
            {porps.value}
        </Text>
        </ScrollView>        
    </View>