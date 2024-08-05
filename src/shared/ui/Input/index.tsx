import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StyleSheet, TextInput, Text, TextInputProps} from 'react-native';
import {COLORS} from 'shared/config/colors';

type Props = {
  name: string;
  placeholder?: string;
} & TextInputProps;

export const Input = ({name, placeholder, style, editable, ...rest}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const resetInputStyles = !editable ? styles.reset : undefined;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value, onBlur}}) => (
          <TextInput
            {...rest}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[styles.input, style, resetInputStyles]}
            editable={editable}
          />
        )}
      />
      {errors[name] && (
        <Text style={styles.errorText}>
          {errors[name]?.message?.toString() || 'Opps...'}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 3,
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  reset: {
    borderColor: COLORS.light,
    pointerEvents: 'none',
  },
});
