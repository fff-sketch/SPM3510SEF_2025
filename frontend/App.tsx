/**
 * Department Store Shopping App UI
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type ProductCardProps = PropsWithChildren<{
  title: string;
  price: number;
  category: string;
}>;

function ProductCard({title, price, category}: ProductCardProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.productCard}>
      <Text style={styles.categoryText}>{category}</Text>
      <Text
        style={[
          styles.productTitle,
          {color: isDarkMode ? Colors.white : Colors.black},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.productPrice,
          {color: isDarkMode ? Colors.light : Colors.dark},
        ]}>
        ${price.toFixed(2)}
      </Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

function DepartmentStoreApp(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MegaMart</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Cart (0)</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.productsContainer}>
            {/* Electronics Department */}
            <Text style={styles.departmentTitle}>Electronics</Text>
            <ProductCard title="4K Smart TV 55'" price={499.99} category="Electronics" />
            <ProductCard title="Wireless Earbuds" price={79.99} category="Electronics" />
            <ProductCard title="Gaming Laptop" price={1299.99} category="Electronics" />
            
            {/* Clothing Department */}
            <Text style={styles.departmentTitle}>Clothing</Text>
            <ProductCard title="Men's Leather Jacket" price={149.99} category="Clothing" />
            <ProductCard title="Women's Running Shoes" price={89.99} category="Clothing" />
            <ProductCard title="Kids' Winter Coat" price={59.99} category="Clothing" />
            
            {/* Home Department */}
            <Text style={styles.departmentTitle}>Home & Kitchen</Text>
            <ProductCard title="Cookware Set 10-piece" price={199.99} category="Home" />
            <ProductCard title="Memory Foam Pillow" price={39.99} category="Home" />
            <ProductCard title="Vacuum Cleaner" price={159.99} category="Home" />
            
            {/* Beauty Department */}
            <Text style={styles.departmentTitle}>Beauty</Text>
            <ProductCard title="Perfume Gift Set" price={69.99} category="Beauty" />
            <ProductCard title="Skincare Bundle" price={45.99} category="Beauty" />
            <ProductCard title="Professional Hair Dryer" price={89.99} category="Beauty" />
            
            {/* Sports Department */}
            <Text style={styles.departmentTitle}>Sports & Outdoors</Text>
            <ProductCard title="Yoga Mat Premium" price={34.99} category="Sports" />
            <ProductCard title="Camping Tent 4-person" price={129.99} category="Sports" />
            <ProductCard title="Mountain Bike" price={399.99} category="Sports" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  productsContainer: {
    padding: 16,
  },
  departmentTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  productCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DepartmentStoreApp;