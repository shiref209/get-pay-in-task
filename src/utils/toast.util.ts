import Toast from 'react-native-toast-message';

interface ToastMessageProps {
  type: 'success' | 'error' | 'info';
  text: string;
  fontSize?: number;
}
export function toastMessage(props: ToastMessageProps) {
  Toast.show({
    type: props.type,
    text1: props.text,
    position: 'bottom',
    visibilityTime: 2000,
    props: {
      text: props.text,
      fontSize: props.fontSize,
    },
  });
}
