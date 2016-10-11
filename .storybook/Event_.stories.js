import React from 'react'
import Radium, { StyleRoot } from 'radium'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Text from '../packages/Text'
import Style_ from '../packages/Style_'
import Event_ from '../packages/Event_'

class Hoverable extends React.Component {

  static defaultProps = {
    component: View,
  }

  state = {
    isHovering: false,
  }

  handleHover = (isHovering) => {
    this.setState({ isHovering })
  }

  render() {
    const { component, children, ...passedProps } = this.props

    return (
      <Event_ onHover={this.handleHover}>
        {
          React.createElement(
            component,
            passedProps,
            children(this.state.isHovering)
          )
        }
      </Event_>
    )
  }
}

storiesOf('Event_', module)
  .add('Rotate onClick Event_View', () => {
    class EventView extends React.Component {
      state = {
        isRotated: false,
      }

      handleClick = () => {
        this.setState({isRotated: !this.state.isRotated})
      }

      render() {
        return (
          <Event_ onClick={this.handleClick}>
            <View
              tag='button'
              height='200px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
              transform={`rotate(${this.state.isRotated ? '90deg' : '0deg'})`}
              transition='transform 1000ms ease'
            >
              <Text>Click me</Text>
            </View>
          </Event_>
        )
      }
    }

    return (
      <EventView />
  )})
  .add('Hover Event_Style_View joined transitions', () => {
    class EventStyleView extends React.Component {
      state = {
        backgroundColor: 'lightGrey',
        translateX: '-50px',
      }

      handleHover = (isHovering) => {
        this.setState({
          backgroundColor: (isHovering) ? 'red' : 'lightGrey',
          translateX: (isHovering) ? '0px' : '-50px',
        })
      }

      render() {
        return (
          <Event_ onHover={this.handleHover}>
            <Style_
              backgroundColor={this.state.backgroundColor}
              border='1px solid black'
              transition='background-color 1000ms ease'
            >
              <View
                height='500px'
                width='200px'
                alignHorizontal='center'
                alignVertical='center'
                transform={`translateX(${this.state.translateX})`}
                transition='transform 2000ms ease'
              >
                <Text>Hover me</Text>
              </View>
            </Style_>
          </Event_>
        )
      }
    }

    return (
      <EventStyleView />
  )})
  .add('Hoverable Style_View', () => (
    <Style_ backgroundColor='grey'>
      <Hoverable>
        {(isHovering) => (
          <Style_
            backgroundColor={isHovering ? 'red' : 'blue'}
            border='1px solid black'
            transition='background-color 1000ms ease'
          >
            <View
              height='500px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
            >
              <Text>Hover me</Text>
            </View>
          </Style_>
        )}
      </Hoverable>
    </Style_>
  ))
