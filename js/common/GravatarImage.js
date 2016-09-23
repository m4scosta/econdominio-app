import React from 'react';
import { Image } from 'react-native';


class GravatarImage extends React.Component {

  constructor(props) {
    super(props);
    const number = this.genEmailNumber();
    this.url = `http://www.gravatar.com/avatar/${number}?s=48&d=identicon`;
  }

  render() {
    return (
      <Image source={{uri: this.url}} {...this.props} />
    );
  }

  genEmailNumber() {
    let result = '';
    const { email } = this.props;
    for (var i = 0; i < email.length; i++) {
      result += email.charCodeAt(i);
    }
    return result;
  }
}


export default GravatarImage;
