import React from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {isIphoneXorAbove} from '../utils';
import {IconType} from '../constant';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    tabs: {
        height: 30,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: isIphoneXorAbove() ? 15 : 5
    },
    scrollView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tab: {
        marginLeft: 10
    },
    backsplace: {
        marginRight: 20
    }
});

const CategoryTabBar = ({
    goToPage,
    activeTab,
    tabs,
    tabBarStyle,
    categories,
    onRemove,
    hideBackSpace,
    categoryDefautColor,
    categoryHighlightColor,
    categoryIconSize
}) => {
    // set default method for remove
    const clickRemove = () => {
        if (typeof onRemove !== 'function') {
            console.log('missing remove callback');
        } else {
            onRemove();
        }
    };
    return (
        <View style={[styles.tabs, tabBarStyle]}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {tabs.map((tab, i) => {
                    const iconColor =
                        activeTab === i
                            ? categoryHighlightColor
                            : categoryDefautColor;
                    const iconObj =
                        categories.find(item => tab === item.name) || {};
                    const {iconType, icon} = iconObj;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => goToPage(i)}
                            style={styles.tab}>
                            {iconType === IconType.material ? (
                                <MaIcon
                                    name={icon}
                                    size={categoryIconSize}
                                    color={iconColor}
                                />
                            ) : iconType === IconType.fontAwesome ? (
                                <FontIcon
                                    name={icon}
                                    size={categoryIconSize}
                                    color={iconColor}
                                />
                            ) : null}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            {!hideBackSpace && (
                <TouchableOpacity
                    style={styles.backsplace}
                    onPress={() => clickRemove()}>
                    <MaIcon
                        name={'backspace-outline'}
                        size={24}
                        color={'#000'}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CategoryTabBar;
