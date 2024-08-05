import React from 'react';
import {View, Text, StyleSheet, Pressable, PressableProps} from 'react-native';
import {Icon} from '../Icon';
import {IconName} from 'shared/config/assets/icons/_list';
import {COLORS} from 'shared/config/colors';

export enum VariantButton {
  primary = 'primary',
  secondary = 'secondary',
  dark = 'dark',
}

type Props = {
  variant?: VariantButton;
  label?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & PressableProps;

const color = {
  [VariantButton.primary]: COLORS.colorPrimary,
  [VariantButton.secondary]: COLORS.coloreSecondary,
  [VariantButton.dark]: COLORS.light,
};

export const Button = ({
  variant = VariantButton.primary,
  label,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}: Props) => {
  const icon = (
    <Icon
      as={leftIcon || rightIcon || 'close'}
      color={color[variant]}
      width={24}
      height={24}
    />
  );

  const disabledStyles = disabled ? styles.disabled : undefined;
  const resetContainerStyles =
    label === undefined && (leftIcon !== undefined || rightIcon !== undefined)
      ? styles.resetIconPadding
      : undefined;

  return (
    <Pressable {...rest} disabled={disabled}>
      <View
        style={[
          styles.container,
          styles[variant],
          disabledStyles,
          resetContainerStyles,
        ]}>
        {leftIcon && icon}
        {label && (
          <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
        )}
        {rightIcon && icon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: COLORS.bgrPrimary,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetIconPadding: {
    paddingHorizontal: 4,
    borderRadius: (24 + 4) / 4,
    borderWidth: 0,
  },
  primary: {
    backgroundColor: COLORS.bgrPrimary,
  },
  secondary: {
    backgroundColor: COLORS.bgrSecondary,
  },
  dark: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.colorPrimary,
  },
  secondaryText: {
    color: COLORS.coloreSecondary,
  },
  darkText: {
    color: '#FFF',
  },
  disabled: {
    opacity: 0.3,
  },
});
