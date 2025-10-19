import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontSize, height, width } from '@src/utils';
import { useNetworkStatus } from '@src/hooks';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  rightComponent,
  leftComponent,
}) => {
  const { isConnected } = useNetworkStatus();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>{leftComponent}</View>

        <View style={styles.centerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {isConnected === false && (
              <View style={styles.offlineIcon}>
                <View style={styles.wifiIconContainer}>
                  <Text style={styles.wifiIcon}>📶</Text>
                  <View style={styles.crossLine} />
                </View>
              </View>
            )}
          </View>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.rightSection}>{rightComponent}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width(16),
    paddingVertical: height(12),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: height(60),
  },
  leftSection: {
    width: width(50),
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: width(50),
    alignItems: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width(8),
  },
  title: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: fontSize(14),
    color: '#666',
    marginTop: height(2),
  },
  offlineIcon: {
    backgroundColor: '#FFF3E0',
    borderRadius: width(12),
    paddingHorizontal: width(6),
    paddingVertical: height(2),
  },
  wifiIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wifiIcon: {
    fontSize: fontSize(14),
  },
  crossLine: {
    position: 'absolute',
    width: width(18),
    height: 2,
    backgroundColor: '#d32f2f',
    transform: [{ rotate: '45deg' }],
  },
});
