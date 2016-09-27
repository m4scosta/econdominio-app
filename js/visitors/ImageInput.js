import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';


const options = {
  title: '',
  takePhotoButtonTitle: 'Tirar foto',
  chooseFromLibraryButtonTitle: 'Escolher da galeria',
  cancelButtonTitle: 'Cancelar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}


class ImageInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    }
  }

  render() {
    const button = this.renderButton();
    const image = this.renderImage();

    return (
      <View>
        {button}
        {image}
      </View>
    );
  }

  renderButton() {
    var buttonProps = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: 'black',
      style: styles.button,
    }
    var label;
    if (this.state.image) {
      buttonProps.name = 'close';
      buttonProps.onPress = () => this.clearImage();
      label = 'Limpar';
    } else {
      buttonProps.name = 'camera';
      buttonProps.onPress = () => this.pickImage();
      label = 'Foto do Visitante';
    }
    return (
      <Icon.Button {...buttonProps}>
        <Text style={styles.label}>{label}</Text>
      </Icon.Button>
    );
  }

  renderImage() {
    if (this.state.image) {
      const imageSource = {uri: 'data:image/jpeg;base64,' + this.state.image};
      return (
        <Image
          source={imageSource}
          style={styles.image} />
      );
    }
    return null;
  }

  pickImage() {
    ImagePicker.showImagePicker(options, (response) => {
      if (!(response.didCancel || response.error)) {
        const image = response.data;
        this.setState({image});
        if (this.props.onChangeImage) {
          this.props.onChangeImage(image);
        }
      }
    });
  }

  clearImage() {
    this.setState({image: null});
  }
}


const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  label: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black'
  },
});

export default ImageInput;
