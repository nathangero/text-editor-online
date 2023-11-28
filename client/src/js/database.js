import { openDB } from 'idb';
const DB_NAME = 'jate';
const KEY_ONE = 1; // Only ever updating the same value; 

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log("adding to db:", content);

  const jateDb = await openDB(DB_NAME, 1);
  const dbCount = await jateDb.count(DB_NAME, 1);
  console.log("dbCount:", dbCount);
  const transaction = jateDb.transaction(DB_NAME, 'readwrite');
  const store = transaction.objectStore(DB_NAME);
  
  // Check if there's already an item in the db. If yes then update it, if not add to the db.
  const request = (dbCount > 0) ? store.put({ id: KEY_ONE, text: content}) : store.add({ text: content });
  
  const result = await request;
  // console.log("saved to db:", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.log("getting from db");
  
  const jateDb = await openDB(DB_NAME, 1);
  const transaction = jateDb.transaction(DB_NAME, 'readwrite');
  const store = transaction.objectStore(DB_NAME);
  const request = store.getAll();
  const result = await request;
  // console.log("got data:", result);
  // console.log("got data:", result[0].text);

  return result[0].text;
};

initdb();
