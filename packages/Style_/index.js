'use strict';

var React = require('react')
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
  'transform',
  'transition',
  'willChange'
]

function getStyleFromProps( props ) {
  return _pick( props, styles )
}

function getNonStyleProps( props ) {
  return _omit( props, styles )
}

module.exports = class extends React.PureComponent {
  static displayName = 'Style_'

  render() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsToPass = getNonStyleProps( this.props )

    var Child = React.Children.only(this.props.children)

    var css = _assign( {}, styleFromProps, this.props.css, Child.props.css )
    propsToPass.css = css

    // without removing children, this would infinite loop
    delete propsToPass.children

    return React.cloneElement( Child, propsToPass )
  }
}
