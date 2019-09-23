export enum DrawerConfiguration {
    SingleHigh = 0,
    SingleShort = 1,
    TwoHigh = 2,
    TwoHighOneShort = 3,
    OneHighThreeShort = 4,
    FiveShort = 5
}

enum DrawerConfigurationString {
    SingleHigh = 'furnitures.step1.drawers.singleHigh',
    SingleShort = 'furnitures.step1.drawers.singleShort',
    TwoHigh = 'furnitures.step1.drawers.twoHigh',
    TwoHighOneShort = 'furnitures.step1.drawers.twoHighOneShort',
    OneHighThreeShort = 'furnitures.step1.drawers.oneHighThreeShort',
    FiveShort = 'furnitures.step1.drawers.fiveShort'
}

export const DrawerConfigurationTranslated = [
    {
        id: DrawerConfiguration.TwoHighOneShort,
        name: DrawerConfigurationString.TwoHighOneShort
    },
    {
        id: DrawerConfiguration.OneHighThreeShort,
        name: DrawerConfigurationString.OneHighThreeShort
    },
    {
        id: DrawerConfiguration.FiveShort,
        name: DrawerConfigurationString.FiveShort
    }
];
