import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function Main() {
  // 방 목록을 관리할 상태 변수
  const [rooms, setRooms] = useState([]);

  // 방을 만들 때 호출되는 함수
  const createRoom = () => {
    const newRoom = `방 ${rooms.length + 1}`; // 간단한 방 이름 생성
    setRooms([...rooms, newRoom]);  // 방 목록에 새로운 방 추가
  };

  // 방 목록을 실시간으로 업데이트하는 함수 (실시간 기능을 구현하려면 서버 연동 필요)
  useEffect(() => {
    // 실시간 목록을 갱신하는 로직 (Firebase나 Socket.io와 같은 실시간 서비스 사용 가능)
    // 서버에서 데이터를 받아온다면, 이곳에서 실시간으로 rooms 상태를 업데이트
  }, [rooms]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="방 만들기" onPress={createRoom} />
      <Text style={{ fontSize: 20, marginTop: 20 }}>방 목록</Text>
      <FlatList
        data={rooms}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={{ fontSize: 18 }}>{item}</Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
    },
});