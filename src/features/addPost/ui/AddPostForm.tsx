import React, {useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from 'shared/ui';
import {object, string} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from 'app/store';
import {addTask} from 'entities/model';

export const schema = object({
  title: string()
    .required('Title is a required field')
    .max(20, 'Title max lenght 20 charset'),
  body: string()
    .required('Body is a required field')
    .max(100, 'Body max lenght 100 charset'),
});

type Props = {
  closed: () => void;
};

export type FormValues = {
  title: string;
  body: string;
};

export const AddPostForm = ({closed}: Props) => {
  const dispatch = useAppDispatch();
  const method = useForm<FormValues>({resolver: yupResolver(schema)});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {handleSubmit} = method;

  const sumbit: SubmitHandler<FormValues> = async data => {
    setIsSubmitting(true);
    await dispatch(addTask(data));
    setIsSubmitting(false);
    closed();
  };

  return (
    <FormProvider {...method}>
      <View style={styles.inner}>
        <View style={styles.container}>
          <Input name={'title'} placeholder={'Title'} editable />
          <Input name={'body'} placeholder={'Task description'} editable />
        </View>
        <Button
          label={'Add task'}
          disabled={isSubmitting}
          onPress={handleSubmit(sumbit)}
        />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  inner: {
    paddingHorizontal: 24,
    gap: 12,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 30,
  },
});
