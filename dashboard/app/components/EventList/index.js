import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import Swipeable from 'react-native-swipeable'

export default class EventList extends React.Component {
  render () {
    const { width } = Dimensions.get('window')
    return (
      <ScrollView onScroll={ this.handleScroll } style={ [ styles.container, { width } ] }>
        <Text>thingy</Text>
        {
          this.props.events.map((event) => <EventItem key={ event } event={ event } />)
        }
      </ScrollView>
    )
  }
}

function EventItem ({ event }) {
  return (
    <Swipeable
      leftContent={ (
        <View style={ [styles.leftSwipeItem, {backgroundColor: 'lightskyblue'}] }>
          <Text>Pull action</Text>
        </View>
      ) }
      rightButtons={ [
        <TouchableOpacity style={ [styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}] }>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={ [styles.rightSwipeItem, {backgroundColor: 'orchid'}] }>
          <Text>2</Text>
        </TouchableOpacity>,
      ] }
    >
      <View style={ [styles.listItem, {backgroundColor: 'salmon'}] }>
        <Text>Example 1</Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },

})
