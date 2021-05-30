import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)',
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const insert = (title, imageUri, address, latitude, longitude) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
        [title, imageUri, address, latitude, longitude],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const fetchPlaces = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      )
    );
  });
};
