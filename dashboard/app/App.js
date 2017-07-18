import React from 'react'
import { StatusBar } from 'react-native'
import { AppLoading } from 'expo'
import { StyleSheet, Text, View } from 'react-native'
import { Font } from 'expo'
import { Header } from 'react-native-elements'
import EventList from './components/EventList'
import FloatingMenu from './components/FloatingMenu'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fontLoaded: false,
    }
  }
  async componentDidMount () {
    await Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    })

    this.setState({ fontLoaded: true })
  }
  render () {
    if (!this.state.fontLoaded) {
      return <AppLoading />
    }
    return (
      <View style={ styles.container }>
        <View style={{ height: 100 }}>
          <Header
            leftComponent={ { icon: 'menu' } }
            centerComponent={ { text: 'Dashboard' } }
            rightComponent={ { icon: 'home' } }
            backgroundColor='#6c0'
            statusBarProps={{ barStyle: 'light-content' }}
          />
        </View>
        <Text>My text is crazy</Text>
        <EventList events={ [ 'seth', 'tippetts' ] } />
        <FloatingMenu />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
})
