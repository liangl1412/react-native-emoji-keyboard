import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    emojiTouch: {
        paddingVertical: 5
    },
    emoji: {
        textAlign: 'center',
        
    }
});

const EmojiIcon = ({
    emoji,
    clickEmoji,
    longPressEmoji,
    emojiWidth,
    emojiSize
}) => {
    const {code} = emoji;

    return (
        <TouchableHighlight
            underlayColor="#f1f1f1"
            style={styles.emojiTouch}
            onLongPress={() => longPressEmoji ? longPressEmoji(emoji) : null}
            onPress={() => clickEmoji(emoji)}>
            <Text
                style={[
                    styles.emoji,
                    {
                        width: emojiWidth,
                        fontSize: emojiSize
                    }
                ]}>
                {code}
            </Text>
        </TouchableHighlight>
    );
};

EmojiIcon.propTypes = {
    emoji: PropTypes.object,
    clickEmoji: PropTypes.func,
    longPressEmoji: PropTypes.func,
    emojiWidth: PropTypes.number,
    emojiSize: PropTypes.number
};
export default EmojiIcon;
