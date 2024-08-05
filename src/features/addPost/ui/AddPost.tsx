import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Button} from 'shared/ui';
import {Icon} from 'shared/ui/Icon';
import {AddPostForm} from './AddPostForm';

type Props = {};

export const AddPost = ({}: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const open = () => {
    bottomSheetModalRef.current?.present();
  };

  const closed = () => {
    bottomSheetModalRef.current?.close();
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={styles.backdrop}
      />
    ),
    [],
  );

  return (
    <>
      <View style={styles.containerAbs}>
        <Button leftIcon={'add'} onPress={open} />
      </View>
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Add task</Text>
              <View style={styles.close}>
                <Pressable onPress={closed}>
                  <Icon as={'close'} width={24} height={24} />
                </Pressable>
              </View>
            </View>
            <AddPostForm closed={closed} />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerAbs: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 10,
  },
  container: {
    padding: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  close: {
    position: 'absolute',
    right: 24,
  },
});
