import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ScrollView, Button, StyleSheet} from 'react-native';
import { onValue, ref, off } from 'firebase/database';
import { db } from '../config/config';

const Creations = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsRef = ref(db, 'novaNoticia');

    const handleData = (snapshot) => {
      if (snapshot.val()) { // retorna os dados do banco de dados do FireBase
        const data = Object.values(snapshot.val()); //transforma em array
        const filteredNews = data.filter(item => item.id > 3);
        setNews(filteredNews);
      }
    };

    const newsListener = onValue(newsRef, handleData);
    return () => {
      off(newsListener);
    };
  }, []);

  return (
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsContainer}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Image
              source={{ uri: item.imagemUrl }}
              style={styles.newsImage}
            />
            <Button
              title="Saiba mais!"
              onPress={() => navigation.navigate('Details', { newsId: item.id })}
            />
            <View style={styles.separator} />
          </View>
        )}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default Creations;
