import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';
import emojiSource from 'emoji-datasource';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {toEmoji} from './utils';
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
        right: 0
    }
});

const EmojiPicker = ({
    showEmoji = false,
    categories = defaultProps.categories,
    blackList = defaultProps.blackList,
    perPage = 40,
    numCols = 5,
    emojiSize = 24,
    onClick,
    onRemove,
    tabBarPosition = 'bottom',
    hideBackSpace = false,
    categoryDefautColor = '#aaa',
    categoryHighlightColor = '#000',
    categoryIconSize = 20,
    containerStyle,
    tabBarStyle,
    labelStyle
}) => {
    // emoji height + label + categoryBar
    const containerHeight = numCols * 40 + 40 + 30;

    const [emojiData, setEmojiData] = useState(null);
    useEffect(() => {
        const filteredData = emojiSource.filter(
            e => !_.includes(blackList, e.short_name)
        );
        const sortedData = _.orderBy(filteredData, 'sort_order');
        const groupedData = _.groupBy(sortedData, 'category');

        const transformData = _.mapValues(groupedData, group =>
            group.map(value => {
                return {
                    code: toEmoji(value.unified),
                    name: value.short_name,
                    skins: value.skin_variations || null
                };
            })
        );
        setEmojiData(Object.assign({}, transformData));
    }, [blackList]);

    const [position] = useState(
        new Animated.Value(showEmoji ? 0 : -containerHeight)
    );
    useEffect(() => {
        if (showEmoji) {
            Animated.timing(position, {
                duration: 300,
                toValue: 0
            }).start();
        } else {
            Animated.timing(position, {
                duration: 300,
                toValue: -containerHeight
            }).start();
        }
    }, [showEmoji, position, containerHeight]);

    if (!emojiData) {
        return null;
    }
    let groupsView = [];
    _.each(categories, (category, key) => {
        const {name} = category;
        groupsView.push(
            <CategoryView
                category={name}
                emojis={emojiData[name]}
                perPage={perPage}
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
                {bottom: position, height: containerHeight},
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

EmojiPicker.propTypes = {
    showEmoji: PropTypes.bool,
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
    perPage: PropTypes.number,
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

export default EmojiPicker;
