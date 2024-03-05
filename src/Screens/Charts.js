import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
import Modal from 'react-native-modal';
// import BottomSheet from 'react-native-raw-bottom-sheet';

import RBSheet from 'react-native-raw-bottom-sheet';

const Charts = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();

  //   let obj = {
  //     a: 1,
  //     b: 2,
  //     c: 3,
  //     d: 4,
  //     e: 5,
  //     f: 6,
  //     g: 7,
  //     h: 8,
  //     i: 9,
  //     j: 9,
  //     k: 10,
  //     l: 11,
  //   };

  //   var convert = Object.keys(obj).map(function (key) {
  //     // return [key, obj[key]];
  //     return ['key', key, 'value', obj[key]];

  //     // return [{ label: 'key', value: key }, { label: 'value', value: obj[key] }];
  //   });
  //   console.log('Object to Array=>>>>>>>>>>', convert);

  //   var converts = Object.keys(obj).map(function (key) {
  //     return {key: key, value: obj[key]};
  //   });
  //   console.log('Array to Object =>>>>>>>>>>', converts);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderBottomSheetContent = () => (
    <View>
      <Text style={styles.textStyle}>Customize Bar Chart</Text>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
        }}>
        <BarChart
          data={stackData}
          barBorderRadius={3}
          yAxisThickness={0}
          xAxisThickness={0}
          noOfSections={5}
          spacing={50}
          hideRules
          isAnimated
          capColor={'rgba(78, 0, 142)'}
          capThickness={4}
          frontColor="lightgray"
          showLine
          barMarginBottom={5}
          // side="right"
          // showFractionalValue
          // showYAxisIndices
          // rotateLabel
          // showGradient
          // isThreeD
          // cappedBars
          // gradientColor={'rgba(200, 100, 244,0.8)'}
          // showReferenceLine3
          // referenceLine1Position={100}
          // referenceLine1Config={{
          //   color: 'gray',
          //   dashWidth: 29,
          //   dashGap: 6,
          // }}
        />
      </View>
    </View>
  );

  const data = [
    {value: 20, label: ' 09/23', frontColor: '#177AD5'},
    {value: 40, label: ' 05/09/23', frontColor: '#177AD5'},
    {value: 30, label: ' 07/09/23', frontColor: '#177AD5'},
    {value: 10, label: ' 01/01/24', frontColor: '#177AD5'},
    {value: 50, label: ' 12/02/24', frontColor: '#177AD5'},
  ];

  const pieData = [
    {left: 10, right: 12},
    {left: 25, right: 30},
    {left: 40, right: 45},
    {left: 50, right: 55},
    {left: 60, right: 65},
    {left: 70, right: 75},
    {left: 80, right: 85},
    {left: 90, right: 100},
    {left: 110, right: 120},
  ];

  const stackData = [
    {
      value: 20,
      label: ' 09/23',
      frontColor: '#00ABF0',
      topLabelComponent: () => (
        <Text style={{color: 'black', fontSize: 18, marginBottom: 6}}>2</Text>
      ),
    },
    {
      value: 40,
      label: ' 05/09/23',
      frontColor: '#00ABF0',
      topLabelComponent: () => (
        <Text style={{color: 'black', fontSize: 18, marginBottom: 6}}>4</Text>
      ),
    },
    {
      value: 30,
      label: ' 07/09/23',
      topLabelComponent: () => (
        <Text style={{color: 'black', fontSize: 18, marginBottom: 6}}>3</Text>
      ),
    },
    {
      value: 10,
      label: ' 01/01/24',
      frontColor: '#00ABF0',
      topLabelComponent: () => (
        <Text style={{color: 'black', fontSize: 18, marginBottom: 6}}>1</Text>
      ),
    },
    {
      value: 50,
      label: ' 12/02/24',
      topLabelComponent: () => (
        <Text style={{color: 'black', fontSize: 18, marginBottom: 6}}>5</Text>
      ),
    },
  ];

  const stackedData = [
    {
      stacks: [
        {value: 10, color: 'orange'},
        {value: 20, color: '#4ABFF4', marginBottom: 2},
      ],
      label: 'Jan',
    },
    {
      stacks: [
        {value: 10, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        {value: 15, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
    {
      stacks: [
        {value: 14, color: 'orange'},
        {value: 18, color: '#4ABFF4', marginBottom: 2},
      ],
      label: 'Feb',
    },
    {
      stacks: [
        {value: 7, color: '#4ABFF4'},
        {value: 11, color: 'orange', marginBottom: 2},
        {value: 10, color: '#28B2B3', marginBottom: 2},
      ],
      label: 'Mar',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.textStyle}>Bar Chart</Text>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <BarChart
            data={data}
            barBorderRadius={3}
            yAxisThickness={0}
            xAxisThickness={0}
            noOfSections={5}
            spacing={40}

            // showGradient
          />
        </View>

        <Text style={styles.textStyle}>Customize Bar Chart</Text>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <BarChart
            data={stackData}
            barBorderRadius={3}
            yAxisThickness={0}
            xAxisThickness={0}
            noOfSections={5}
            spacing={50}
            hideRules
            isAnimated
            onPress={() => {
              refRBSheet?.current?.open();
            }}
            capColor={'rgba(78, 0, 142)'}
            capThickness={4}
            frontColor="lightgray"
            showLine
            barMarginBottom={5}
            // side="right"
            // showFractionalValue
            // showYAxisIndices
            // rotateLabel
            // showGradient
            // isThreeD
            // cappedBars
            // gradientColor={'rgba(200, 100, 244,0.8)'}
            // showReferenceLine3
            // referenceLine1Position={100}
            // referenceLine1Config={{
            //   color: 'gray',
            //   dashWidth: 29,
            //   dashGap: 6,
            // }}
          />
        </View>

        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={false}
          closeOnDragDown={true}
          height={400}
          customStyles={{
            container: {
              flex: 1,
              flexDirection: 'column',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            },
            wrapper: {
              backgroundColor: '#00000080',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          {renderBottomSheetContent()}
        </RBSheet>

        <Text style={styles.textStyle}>Line Chart</Text>
        <LineChart data={data} areaChart />
        <Text style={styles.textStyle}>Pie Chart</Text>
        <View style={{alignSelf: 'center'}}>
          <PieChart strokeWidth={2} data={data} donut />
        </View>
        <Text style={styles.textStyle}>PopulationPyramid Chart</Text>

        <PopulationPyramid data={pieData} />
        <Text style={styles.textStyle}>Stack Bar Chart</Text>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
          }}>
          <BarChart
            width={340}
            spacing={40}
            barBorderRadius={6}
            noOfSections={4}
            stackData={stackedData}
            showGradient
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Charts;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    width: '100%',
    padding: 3,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
    marginBottom: 20,
    marginTop: 30,
  },
  container: {
    flexGrow: 1,
  },
});

{
  /* //for neon colors */
}
{
  /* <BarChart
            data={stackData}
            isThreeD
            initialSpacing={20}
            barMarginBottom={10}
            showGradient
            gradientColor={'#fc84ff'}
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={6}
            xAxisColor={'#c919ff'}
            frontColor={'transparent'}
            sideColor={'#ff00d0'}
            topColor={'#ff66f4'}
            barStyle={{
              borderWidth: 4,
              borderColor: '#fc84ff',
              shadowColor: '#fc84ff',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 10,
            }}
            hideRules
            height={120}
            barWidth={20}
          /> */
}
