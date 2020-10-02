import React from 'react';

class Welcome extends React.Component {
    render() {
      return <h1>Hello World, this is a component.{this.props.name}</h1>;
    }
  }

export default Welcome;