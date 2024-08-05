import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from 'app/store';
import {Post} from 'entities/model';
import {FormValues, schema} from 'features/addPost/ui/AddPostForm';
import React, {useState} from 'react';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {View, StyleSheet, Pressable} from 'react-native';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {NavProp} from 'shared/routes';
import {Button, Input, VariantButton} from 'shared/ui';

type Props = {
  removeAction: (id: number) => void;
  submitAction: (id: number, data: FormValues) => void;
} & Post;

export const PostItem = React.memo(
  ({title, body, id, removeAction, submitAction}: Props) => {
    const disabledId = useAppSelector(
      state => state.profileReducer.disabled.id,
    );
    const disabledAction = useAppSelector(
      state => state.profileReducer.disabled.action,
    );

    const {navigate} = useNavigation<NavProp<'Posts'>>();

    const onTaskPress = () => navigate('Post', {id, title, body});

    const method = useForm<FormValues>({
      defaultValues: {title, body},
      resolver: yupResolver(schema),
    });

    const {handleSubmit} = method;

    const [editable, setEditable] = useState(false);

    const editModeOn = () => setEditable(true);

    const submit: SubmitHandler<FormValues> = data => {
      if (data.title === title && data.body === body) {
        setEditable(false);
        return;
      }
      submitAction(id, data);
      setEditable(false);
    };

    return (
      <Animated.View entering={FadeInLeft} exiting={FadeOutRight}>
        <Pressable style={styles.wrapper} onPress={onTaskPress}>
          <FormProvider {...method}>
            <View style={styles.container}>
              <View style={styles.fieldBox}>
                <Input
                  style={styles.title}
                  name={'title'}
                  editable={editable}
                />

                <Input style={styles.body} name={'body'} editable={editable} />
              </View>
            </View>
          </FormProvider>

          <View style={styles.actionsBox}>
            <Button
              leftIcon={editable ? 'done' : 'edit'}
              variant={VariantButton.dark}
              onPress={() => {
                if (editable) {
                  handleSubmit(submit)();
                  return;
                }
                editModeOn();
              }}
            />
            <Button
              leftIcon={'remove'}
              disabled={disabledId === id && disabledAction === 'remove'}
              variant={VariantButton.dark}
              onPress={() => removeAction(id)}
            />
          </View>
        </Pressable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    gap: 24,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  fieldBox: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: undefined,
  },
  body: {
    fontSize: 12,
    lineHeight: undefined,
  },
  actionsBox: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  action: {
    backgroundColor: '#000',
    padding: 4,
    borderRadius: (24 + 4) / 4,
  },
  test: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
  },
});
