import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import EmojiIcon from './EmojiIcon';

const styles = StyleSheet.create({
    skinBox: {
        flex: 1,
        position: 'absolute',
        top: 0,
        height: 40,
        backgroundColor: '#EAEBEF',
        zIndex: 9999,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10
    }
});

const SkinBox = ({emoji, ...props}) => {
    const {code, name, skins} = emoji;
    if (!skins) {
        return null;
    }
    const defaultSkin = {code, name};
    const skinEmojis = [defaultSkin, ...skins];
    return (
        <View style={styles.skinBox}>
            {skinEmojis.map((value, key) => {
                return <EmojiIcon emoji={value} {...props} key={key} />;
            })}
        </View>
    );
};

SkinBox.propTypes = {
    emoji: PropTypes.object
};

export default SkinBox;
