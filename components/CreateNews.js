import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Vibration } from 'react-native';
import { onValue, ref, set, getDatabase, push } from 'firebase/database';

class CreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastId: null,
      title: '',
      content: '',
      imageUrl: '',
      content2: '',
      imageUrl2: ''
    };
  }

  componentDidMount() {
    // Busca as notícias existentes para determinar o último ID
    const database = getDatabase();
    onValue(ref(database, 'novaNoticia'), (snapshot) => {
      if (snapshot.val()) {
        const news = Object.values(snapshot.val());
        const lastNews = news[news.length - 1];
        this.setState({ lastId: lastNews.id });
      }
    });
  }

  cNews() {
    const { lastId, title, content, imageUrl, content2, imageUrl2 } = this.state;

    const newId = lastId + 1; // aumenta o ID
    const database = getDatabase();
    const newNewsRef = push(ref(database, 'novaNoticia'));

    // Salva os dados
    set(newNewsRef, {
      id: newId,
      title,
      content,
      imageUrl,
      content2,
      imageUrl2
    });

    Vibration.vibrate(); // vibração

    // Atualiza o último ID e limpa os campos
    this.setState({ lastId: newId, title: '', content: '', imageUrl: '', imageUrl2: '', content2: '' });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Insert Title"
          value={this.state.title}
          onChangeText={(text) => this.setState({ title: text })}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Insert Content"
          value={this.state.content}
          onChangeText={(text) => this.setState({ content: text })}
        />

        <Text style={styles.label}>Image 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Insert Image URL"
          value={this.state.imageUrl}
          onChangeText={(text) => this.setState({ imageUrl: text })}
        />

        <Text style={styles.label}>Remaining Content</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Insert Remaining Content"
          value={this.state.content2}
          onChangeText={(text) => this.setState({ content2: text })}
        />

        <Text style={styles.label}>Image 2</Text>
        <TextInput
          style={styles.input}
          placeholder="Insert Image URL"
          value={this.state.imageUrl2}
          onChangeText={(text) => this.setState({ imageUrl2: text })}
        />

        <Button title="Create News" onPress={() => this.cNews()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default CreateNews;
