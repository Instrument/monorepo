'use strict';

var React = require('react')
var shallowCompare = require('react-addons-shallow-compare')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var styles = [
  'background',
  'backgroundColor',
  'boxShadow',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderStyle',
  'borderRadius',
  'borderWidth',
  'opacity',
  'outline',
  'transition',
  'willChange'
]

function getStyleFromProps( props ) {
  return _pick( props, styles )
}

function getNonStyleProps( props ) {
  return _omit( props, styles )
}

var Style_ = React.createClass({
  displayName: 'Style_',

  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  },

  render: function() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsWithoutStyle = getNonStyleProps( this.props )

    var Child = React.Children.only(this.props.children)
    // var style = [].concat.call( styleFromProps, this.props.style, Child.props.style )
    var style = _assign( {}, styleFromProps, this.props.style, Child.props.style)


    // without removing children, this would infinite loop
    delete propsWithoutStyle.children

    var passedProps = _assign( {}, propsWithoutStyle, {style: style} )

    return React.cloneElement( Child, passedProps )
  }
})

module.exports = Style_
