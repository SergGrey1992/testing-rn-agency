import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch} from 'app/store';
import {CommentType, editComment} from 'entities/comments/model';
import {
  commentSchema,
  FormCommentValues,
} from 'features/addComment/ui/AddComment';
import React, {useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';
import {COLORS} from 'shared/config/colors';
import {global} from 'shared/config/global/styles';
import {Button, Input, VariantButton} from 'shared/ui';

type Props = {
  removeAction: (id: string) => void;
} & CommentType;

const DOT_SIZE = 5;

export const Comment = ({text, id, postId, removeAction}: Props) => {
  const dispatch = useAppDispatch();
  const [editable, setEditable] = useState(false);

  const method = useForm<FormCommentValues>({
    defaultValues: {text},
    resolver: yupResolver(commentSchema),
  });

  const {setValue, handleSubmit} = method;

  const editModeOn = () => setEditable(true);

  const resetEditMode = () => {
    setEditable(false);
    setValue('text', text);
  };

  const submit: SubmitHandler<FormCommentValues> = data => {
    if (data.text === text) {
      resetEditMode();
      return;
    }
    dispatch(editComment({...data, id, postId}));
    setEditable(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.dot} />
        <View style={global.full}>
          <FormProvider {...method}>
            <Input style={styles.text} name={'text'} editable={editable} />
          </FormProvider>
        </View>
      </View>

      <View style={styles.actionsBox}>
        {!editable && (
          <>
            <Button
              leftIcon={'remove'}
              variant={VariantButton.dark}
              onPress={() => removeAction(id)}
            />
            <Button
              leftIcon={'edit'}
              variant={VariantButton.dark}
              onPress={editModeOn}
            />
          </>
        )}
        {editable && (
          <>
            <Button
              leftIcon={'done'}
              variant={VariantButton.dark}
              onPress={handleSubmit(submit)}
            />
            <Button
              leftIcon={'close'}
              variant={VariantButton.dark}
              onPress={resetEditMode}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexGrow: 1,
  },
  actionsBox: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    backgroundColor: COLORS.bgrPrimary,
    borderRadius: DOT_SIZE / 2,
  },
  text: {
    fontSize: 16,
    color: COLORS.dark,
  },
});
