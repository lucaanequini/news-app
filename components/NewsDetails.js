import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { onValue, ref, off } from 'firebase/database';
import { db } from '../config/config';

const NewsDetails = ({ route }) => {
  const { newsId } = route.params;
  const [news, setNews] = useState(null);

  useEffect(() => {
    const newsRef = ref(db, 'novaNoticia');

    const handleData = (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        const newsWithId = Object.values(data).find(item => item.id === newsId);
        
        if (newsWithId) {
          setNews(newsWithId);
        }
      }
    };

    const newsListener = onValue(newsRef, handleData);

    // Retorna uma função de limpeza que será executada quando o componente for desmontado
    return () => {
      off(newsRef, 'value', handleData);
    };
  }, [newsId]);

  if (!news) {
    return (
      <View style={styles.container}>
        <Text>Notícia não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{news.title}</Text>
      <Image
        source={{ uri: news.imagemUrl }}
        style={styles.image}
      />
      <Text style={styles.content}>{news.content}</Text>
      <Image
        source={{ uri: news.imagemUrl2 }}
        style={styles.image}
      />
      <Text style={styles.content}>{news.content2}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
});

export default NewsDetails;
