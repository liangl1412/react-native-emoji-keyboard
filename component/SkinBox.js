import React from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {toEmoji} from '../utils';
import EmojiIcon from './EmojiIcon';

const styles = StyleSheet.create({
    skinBox: {
        flex: 1,
        height: 40,
        position: 'absolute',
        top: 0,
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
    const skinEmojis = _.toArray(skins).map(skin => {
        return {
            code: toEmoji(skin.unified),
            name
        };
    });
    skinEmojis.push(defaultSkin);
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
