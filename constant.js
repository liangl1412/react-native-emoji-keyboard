export const IconType = {
    material: 'material',
    fontAwesome: 'fontAwesome'
};

export const defaultProps = {
    categories: [
        {
            name: 'Smileys & Emotion',
            iconType: IconType.material,
            icon: 'sticker-emoji'
        },
        {
            name: 'People & Body',
            iconType: IconType.material,
            icon: 'hail'
        },
        {
            name: 'Animals & Nature',
            iconType: IconType.material,
            icon: 'dog'
        },
        {
            name: 'Food & Drink',
            iconType: IconType.material,
            icon: 'food'
        },
        {
            name: 'Activities',
            iconType: IconType.material,
            icon: 'soccer'
        },
        {
            name: 'Travel & Places',
            iconType: IconType.material,
            icon: 'train-car'
        },
        {
            name: 'Objects',
            iconType: IconType.material,
            icon: 'lightbulb-outline'
        },
        {
            name: 'Symbols',
            iconType: IconType.material,
            icon: 'music-note'
        },
        {
            name: 'Flags',
            iconType: IconType.material,
            icon: 'flag-variant-outline'
        }
    ],
    blackList: ['white_frowning_face']
};
