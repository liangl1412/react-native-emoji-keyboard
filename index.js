import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';
import emojiSource from 'emoji-datasource';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
    isIphoneXorAbove,
    isAndroid,
    handleDefaultEmoji,
    handleCustomEmoji
} from './utils';
import CategoryTabBar from './component/CategoryTabBar';
import CategoryView from './component/CategoryView';
import {defaultProps, IconType} from './constant';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEBEF',
        width: width,
        position: 'absolute',
        zIndex: 10,
        overflow: 'visible',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: isIphoneXorAbove() ? 15 : 0
    }
});

const EmojiBoard = ({
    showBoard = false,
    customEmoji = [],
    categories = defaultProps.categories,
    blackList = defaultProps.blackList,
    numRows = 8,
    numCols = 5,
    emojiSize = 24,
    onClick,
    onRemove,
    tabBarPosition = 'bottom',
    hideBackSpace = false,
    categoryDefautColor = '#aaa',
    categoryHighlightColor = '#000',
    categoryIconSize = 20,
    containerStyle = {},
    tabBarStyle = {},
    labelStyle = {}
}) => {
    // emoji board height only for android
    const containerHeight = numCols * 40 + 40 + 40;
    const animationOffset = containerHeight + 100;

    const [emojiData, setEmojiData] = useState(null);
    useEffect(() => {
        let data;
        if (customEmoji.length) {
            data = handleCustomEmoji(customEmoji, blackList);
        } else {
            data = handleDefaultEmoji(emojiSource, blackList);
        }
        setEmojiData(Object.assign({}, data));
    }, []);

    const [position] = useState(
        new Animated.Value(showBoard ? 0 : -animationOffset)
    );
    useEffect(() => {
        if (showBoard) {
            Animated.timing(position, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(position, {
                duration: 300,
                toValue: -animationOffset,
                useNativeDriver: false
            }).start();
        }
    }, [showBoard, position, animationOffset]);

    if (!emojiData) {
        return null;
    }
    let groupsView = [];
    _.each(categories, (category, key) => {
        const {name} = category;
        groupsView.push(
            <CategoryView
                category={name}
                emojis={emojiData[name] || []}
                numRows={numRows}
                numCols={numCols}
                emojiSize={emojiSize}
                key={name}
                tabLabel={name}
                labelStyle={labelStyle}
                onClick={onClick}
            />
        );
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    bottom: position,
                    height: isAndroid() ? containerHeight : 'auto'
                },
                containerStyle
            ]}>
            <ScrollableTabView
                tabBarPosition={tabBarPosition}
                renderTabBar={() => (
                    <CategoryTabBar
                        categories={categories}
                        onRemove={onRemove}
                        hideBackSpace={hideBackSpace}
                        tabBarStyle={tabBarStyle}
                        categoryDefautColor={categoryDefautColor}
                        categoryHighlightColor={categoryHighlightColor}
                        categoryIconSize={categoryIconSize}
                    />
                )}
                initialPage={0}
                style={styles.scrollTable}>
                {groupsView}
            </ScrollableTabView>
        </Animated.View>
    );
};

EmojiBoard.propTypes = {
    showBoard: PropTypes.bool,
    customEmoji: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            img: PropTypes.string,
            name: PropTypes.string,
            category: PropTypes.string,
            sort_order: PropTypes.number,
            skins: PropTypes.array
        })
    ),
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            iconType: PropTypes.oneOf([
                IconType.material,
                IconType.fontAwesome
            ]),
            icon: PropTypes.string
        })
    ),
    blackList: PropTypes.array,
    numRows: PropTypes.number,
    numCols: PropTypes.number,
    emojiSize: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    onRemove: PropTypes.func,
    tabBarPosition: PropTypes.string,
    hideBackSpace: PropTypes.bool,
    categoryDefautColor: PropTypes.string,
    categoryHighlightColor: PropTypes.string,
    categoryIconSize: PropTypes.number,
    containerStyle: PropTypes.object,
    tabBarStyle: PropTypes.object,
    labelStyle: PropTypes.object
};

export default EmojiBoard;
