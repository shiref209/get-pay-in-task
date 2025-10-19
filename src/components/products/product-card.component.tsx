import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontSize, height, width } from '@src/utils';
import { useAppSelector } from '@src/store/store';
import { USER_TYPES } from '@src/constants';
import { IProduct } from '@src/models';

interface ProductCardProps {
  product: IProduct;
  onDelete?: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
}) => {
  const user = useAppSelector(state => state.auth.user);
  const isSuperAdmin = user?.type === USER_TYPES.ADMIN;

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.title}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) {
              onDelete(product.id);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product?.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product?.price ?? ''}</Text>
      </View>
      {isSuperAdmin && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: width(12),
    marginBottom: height(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: height(200),
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: width(16),
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#333',
    marginBottom: height(8),
  },
  price: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
    color: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: height(12),
    paddingHorizontal: width(16),
    marginHorizontal: width(16),
    marginBottom: height(16),
    borderRadius: width(8),
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});
