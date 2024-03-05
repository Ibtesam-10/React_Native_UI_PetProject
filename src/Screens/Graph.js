import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';

const Graph = () => {
  const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 2,
      },
    ],
  };
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const pieData = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.sectionContainer}>
        <Text>Line Chart</Text>

        <LineChart
          data={line}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text>Bar Chart</Text>
        <BarChart
          data={barData}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              marginVertical: 8,
            },
          }}
        />

        <Text>Pie Chart</Text>
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          absolute
        />
      </View>
    </ScrollView>
  );
};

export default Graph;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  containerCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  container: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  slideCarousel: {
    width: '100%',
    height: 400,
  },
  imageCarousel: {
    marginTop: 20,
    width: '95%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 20,
    marginLeft: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  textAlign: {
    textAlign: 'start',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
  },
  scrollContainer: {
    marginTop: 10,
  },
  iconContainer: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
  },
  iconContainerCategory: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
  },
  iconCategory: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  imageCategory: {
    width: 170,
    height: 125,
    resizeMode: 'cover',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // padding: 8,
  },
  labelCategory: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtnStyle: {
    shadowRadius: 5,
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 240,
    marginTop: 10,
    marginBottom: 20,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    textDecorationLine: 'underline',
  },
  seeAll: {
    marginTop: 20,
    marginRight: 10,
    fontSize: 15,
    fontWeight: 'normal',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  iconContainerGrid: {
    marginRight: 7,
    alignItems: 'center',
    padding: 3,
    marginTop: 5,
  },
  imagegrid: {
    width: 170,
    height: 125,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'blue',
  },
  labelContainerGrid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  labelGrid: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  iconGrid: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  iconCategoryGrid: {
    width: 175,
    height: 125,
    borderRadius: 10,
  },
  backgroundImageStyle: {
    flex: 1,
    height: 300,
    borderRadius: 10,
  },
  grdiViewListStyle: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});
