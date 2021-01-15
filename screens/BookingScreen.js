import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, SafeAreaView, Text, FlatList } from "react-native";
import { selectTimeSlots } from "../features/booking/bookingSlice";
import { GenericButton } from "../components/GenericButton";

const Booking = ({ route }) => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedPeriod, setSelectedPeriod] = useState(undefined);
  const [selectedHour, setSelectedHour] = useState(undefined);
  const accessBookingCode = route.params.accessCode;
  const timeSlots = useSelector((state) =>
    selectTimeSlots(state, accessBookingCode)
  );
  const days = Object.keys(timeSlots);
  const periods = selectedDay ? Object.keys(timeSlots[selectedDay]) : undefined;
  const hours =
    selectedDay && selectedPeriod
      ? Object.keys(timeSlots[selectedDay][selectedPeriod])
      : undefined;
  const daySelected = (day) => {
    setSelectedDay(day);
  };
  const periodSelected = (period) => {
    setSelectedPeriod(period);
  };
  const hourSelected = (hour) => {
    setSelectedHour(hour);
  };
  const renderDay = ({ item }) => (
    <GenericButton
      onPress={() => daySelected(item)}
      name={item}
    ></GenericButton>
  );
  const renderPeriod = ({ item }) => (
    <GenericButton
      onPress={() => periodSelected(item)}
      name={item}
    ></GenericButton>
  );
  const renderHour = ({ item }) => (
    <GenericButton
      onPress={() => hourSelected(item)}
      name={item}
    ></GenericButton>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>Booking {accessBookingCode}</Text>
      <FlatList
        data={days}
        renderItem={renderDay}
        keyExtractor={(item) => item}
        initialNumToRender={7}
      />
      {Boolean(daySelected) && (
        <>
          <FlatList
            data={periods}
            renderItem={renderPeriod}
            keyExtractor={(item) => item}
          />
          {Boolean(periodSelected) && (
            <FlatList
              data={hours}
              renderItem={renderHour}
              keyExtractor={(item) => item}
              initialNumToRender={20}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Booking;