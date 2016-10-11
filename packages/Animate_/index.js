'use strict';

var React = require('react')
var Radium = require('radium')
var shallowCompare = require('react-addons-shallow-compare')
var raf = require('raf')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var styles = [
  'keyframes',
  'duration',
  'easing',
  'delay',
  'direction',
  'repeat',
  'type'
]

var types = {
  fadeIn: {
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  },
  fadeOut: {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0
    }
  }
}

function getAnimationProps( props ) {
  return _pick( props, styles )
}

function getNonAnimationProps( props ) {
  return _omit( props, styles )
}

var Animate_ = React.createClass({
  displayName: 'Animate_',

  getDefaultProps: function() {
    return {
      duration: '1000ms',
    }
  },

  getInitialState: function() {
    var keyframes

    if (this.props.keyframes) {
      keyframes = this.props.keyframes
    }
    else if (this.props.type) {
      keyframes = types[this.props.type]
    }

    return {
      animation: Radium.keyframes(keyframes)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.keyframes !== this.props.keyframes) {
      this.setState({animation: Radium.keyframes(nextProps.keyframes)})
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  },

  // PUBLIC
  trigger: function() {
    var animation = this.state.animation

    this.setState({animation: ''}, function() {
      raf(function() {
        this.setState({ animation })
      }.bind(this))
    }.bind(this))
  },

  render: function() {
    var animationProps = getAnimationProps( this.props )
    var otherProps = getNonAnimationProps( this.props )

    var Child = React.Children.only(this.props.children)

    // without removing children, this would infinite loop
    delete otherProps.children

    var animation = 'x ' + animationProps.duration

    if (animationProps.easing) {
      animation += ' ' + animationProps.easing
    }

    if (animationProps.delay) {
      animation += ' ' + animationProps.delay
    }

    if (animationProps.direction) {
      animation += ' ' + animationProps.direction
    }

    if (animationProps.repeat === true) {
      animation += ' infinite'
    }
    else if (animationProps.repeat > 0) {
      animation += ' ' + animationProps.repeat
    }

    var passedProps = _assign( {}, otherProps, {style: {
      animation: animation,
      animationName: this.state.animation,
    }})

    return React.cloneElement( Child, passedProps )
  }
})

module.exports = Animate_