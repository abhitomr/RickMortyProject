export const navigate = jest.fn();
export const goBack = jest.fn();

export const useNavigation = () => ({
  navigate,
  goBack,
});
export const navigation = jest.fn(() => {});
export const createNativeStackNavigator = jest.fn(() => ({
  Navigator: 'MockStackNavigator',
  Screen: 'MockStackScreen',
}));