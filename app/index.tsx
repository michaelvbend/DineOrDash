import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, SafeAreaView } from 'react-native';

interface Event {
  date: string;
  time: string;
  location: string;
}

interface User {
  name: string;
  preferences: string;
}

export default function Index() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({ date: '', time: '', location: '' });
  const [user, setUser] = useState<User>({ name: '', preferences: '' });

  const createEvent = () => {
    if (newEvent.date && newEvent.time && newEvent.location) {
      setEvents([...events, newEvent]);
      setNewEvent({ date: '', time: '', location: '' });
      Alert.alert('Event Created', 'Your event has been created successfully!');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  const rsvpEvent = (index: number) => {
    Alert.alert('RSVP', `You have RSVP'd to the event on ${events[index].date}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.title}>DineOrDash</Text>
      
      {/* User Profile */}
      <TextInput
        placeholder="Name"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Preferences"
        value={user.preferences}
        onChangeText={(text) => setUser({ ...user, preferences: text })}
        style={styles.input}
      />

      {/* Create Event */}
      <TextInput
        placeholder="Date"
        value={newEvent.date}
        onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Time"
        value={newEvent.time}
        onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={newEvent.location}
        onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
        style={styles.input}
      />
      <Button title="Create Event" onPress={createEvent} />

      {/* Event List */}
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{`Event on ${item.date} at ${item.time}, Location: ${item.location}`}</Text>
            <Button title="RSVP" onPress={() => rsvpEvent(index)} />
          </View>
        )}
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  eventItem: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  eventText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});