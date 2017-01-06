import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Event_ from '../packages/Event_'
// import ViewNative from '../packages/View/View.native.js'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

storiesOf('View', module)
  .add('with children divs and inline style', () => (
    <View height='500px' style={style}>
      <div style={{height: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, backgroundColor: 'blue'}} />
    </View>
  ))
  .add('with children flex=1 Views', () => (
    <View height='500px' style={style}>
      <View flex={1} style={{backgroundColor: 'red'}} />
      <View flex={1} style={{backgroundColor: 'green'}} />
      <View flex={1} style={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('with children Views and style prop', () => (
    <View height='500px' style={style}>
      <View flex={1} style={{backgroundColor: 'red'}} />
      <View flex={1} style={{backgroundColor: 'green'}} />
      <View flex={1} style={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('only using inlineStyle', () => (
    <View inlineStyle={{height: 500, backgroundColor: 'lightgrey', border: '1px solid black'}}>
      <View inlineStyle={{flex: 1, backgroundColor: 'red'}} />
      <View inlineStyle={{flex: 1, backgroundColor: 'green'}} />
      <View inlineStyle={{flex: 1, backgroundColor: 'blue'}} />
    </View>
  ))
  .add('alignVertical center alignHorizontal right', () => (
    <View
      height='500px'
      alignHorizontal='right'
      alignVertical='center'
      style={style}
    >
      <View height={40} width={40} backgroundColor='red' />
      <View height={40} width={40} backgroundColor='green' />
      <View height={40} width={40} backgroundColor='blue' />
    </View>
  ))
  .add('center shorthand', () => (
    <View
      center
      height='500px'
      style={style}
    >
      <View height={40} width={40} style={{backgroundColor:'red'}} />
      <View height={40} width={40} style={{backgroundColor:'green'}} />
      <View height={40} width={40} style={{backgroundColor:'blue'}} />
    </View>
  ))
  .add('inline green and blue', () => (
    <div>
      <View height={40} width={40} style={{backgroundColor:'red'}} />
      <View inline height={40} width={40} style={{backgroundColor:'green'}} />
      <View inline height={40} width={40} style={{backgroundColor:'blue'}} />
    </div>
  ))
  .add('fit shorthand', () => (
    <div style={{height: 500, width: 500, border: '5px solid lightgrey'}}>
      <View fit style={{backgroundColor:'blue'}} />
    </div>
  ))
  .add('click to set `hidden`', () => {
    class HideAfterTime extends React.Component {
      state = {
        isHidden: false,
      }

      render() {
        return (
          <Event_ onClick={() => this.setState( {isHidden: true} )} >
            <View hidden={this.state.isHidden} height={40} width={40} style={{backgroundColor:'green'}} />
          </Event_>
        )
      }
    }

    return (
      <HideAfterTime />
    )
  }
  )
  .add('console.logs refNode', () => (
    <View refNode={action('refNode')} />
  ))
//
// be sure to uncomment the require line in View.native.js to get the correct displayComponentFactory
//
  // .add('Native View', () => (
  //   <ViewNative height='500px' >
  //     <ViewNative flex={1} style={{backgroundColor: 'red'}} />
  //     <ViewNative flex={1} style={{backgroundColor: 'green'}} />
  //     <ViewNative flex={1} style={{backgroundColor: 'blue'}} />
  //   </ViewNative>
  // ))
