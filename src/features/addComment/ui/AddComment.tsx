import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from 'app/store';
import {createComment} from 'entities/comments/model';
import React from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {View, StyleSheet, Text} from 'react-native';
import {global} from 'shared/config/global/styles';
import {Button, Input} from 'shared/ui';
import {object, string} from 'yup';

type Props = {
  postId: number;
};

export const commentSchema = object({
  text: string()
    .required()
    .min(5, 'Minimum 5 charset')
    .max(150, 'Maximum 150 charset'),
});

export type FormCommentValues = {
  text: string;
};

export const AddComment = ({postId}: Props) => {
  const dispatch = useAppDispatch();
  const method = useForm<FormCommentValues>({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      text: '',
    },
  });

  const {handleSubmit, resetField} = method;

  const submit: SubmitHandler<FormCommentValues> = data => {
    dispatch(createComment({...data, postId}));
    resetField('text');
  };

  return (
    <FormProvider {...method}>
      <Text>Add comment</Text>
      <View style={styles.container}>
        <View style={global.full}>
          <Input name={'text'} editable />
        </View>
        <Button leftIcon={'add'} onPress={handleSubmit(submit)} />
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
