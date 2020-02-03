import {Dimensions, Platform} from 'react-native';
require('string.fromcodepoint');

export const toEmoji = code => {
    return String.fromCodePoint(...code.split('-').map(u => '0x' + u));
};

export const isIphoneXorAbove = () => {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}