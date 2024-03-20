/* eslint-disable no-lone-blocks */
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Timeline from 'react-native-timeline-simple';
import {car2, imageNetwork} from '../assets/images';

const Time = () => {
  const timeLineData = [
    {
      time: '09:00',
      title: 'Cricket: ',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',
      imageUrl: imageNetwork,
    },
    {
      time: '10:00',
      title: 'Badminton: ',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',
      icon: car2,
      imageUrl: imageNetwork,
    },
    {
      time: '09:00',
      title: 'Table Tennis: ',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',

      icon: car2,
      imageUrl: imageNetwork,
    },
    {
      time: '09:00',
      title: 'Football: ',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',

      icon: car2,
      imageUrl: imageNetwork,
    },
    {
      time: '09:00',
      title: 'Soccer:',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',

      icon: car2,
      imageUrl: imageNetwork,
    },
    {
      time: '09:00',
      title: 'Event 6: ',
      description:
        'Badminton is a racquet sport played\nusing racquets to hit a shuttlecock\nacross a net.',

      icon: car2,
      imageUrl: imageNetwork,
    },
  ];

  function renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{uri: rowData.imageUrl}} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        {title}
        {desc}
      </View>
    );
  }

  function onEventPress(data) {
    {
      data;
    }
    console.log('Data=>>>>>', data?.time);
    Alert.alert(data?.title);
  }

  return (
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        data={timeLineData}
        lineWidth={2}
        showTime={true}
        circleSize={20}
        displayInline={true}
        iconStyle={styles.iconStyle}
        dotSize={10}
        circleColor="rgb(45,156,219)"
        lineColor="rgba(0, 122, 255, 1)"
        innerCircle={'icon'}
        timeContainerStyle={styles.timeContStyle}
        renderFullLine={true}
        separator={true}
        options={{
          removeClippedSubviews: false,
          style: {paddingTop: 5},
        }}
        isUsingFlatlist={true}
        titleStyle={styles.titleStyle}
        timeStyle={styles.timeStyle}
        descriptionStyle={styles.descStyle}
        renderDetail={renderDetail}
        onEventPress={onEventPress}
      />
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  list: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  descriptionContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  textDescription: {
    marginLeft: 20,
    color: 'black',
    textAlign: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 20,
  },
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  timeStyle: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
    borderRadius: 13,
    backgroundColor: 'black',
  },
  descStyle: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: -15,
  },
  timeContStyle: {
    minWidth: 40,
  },
});
