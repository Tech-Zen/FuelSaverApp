import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../private/firebase-fs-private";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getDatabase, onValue, ref, set, push, remove } from 'firebase/database';

export function initFuelSaverDB() {
  initializeApp(firebaseConfig);
}

export function initFuelSaverAnalytics() {
  getAnalytics(analytics);
}

export function storeFuelAppItem(item) {
  const db = getDatabase();
  const reference = ref(db, 'fuelAppData/');
  push(reference, item);
}

export function setupFuelAppListener(updateFunc) {
  const db = getDatabase();
  const reference = ref(db, "fuelAppData/");
  onValue(reference, (snapshot) => {
    console.log("setupFuelAPpListener fires up with: ", snapshot);
    if (snapshot?.val()) {
      const fbObject = snapshot.val();
      const newArr = [];
      Object.keys(fbObject).map((key, index) => {
        console.log(key, "||", index, "||", fbObject[key]);
        newArr.push({ ...fbObject[key], id: key });
      });
      updateFunc(newArr);
    } else {
      updateFunc([]);
    }
  });
}

export function updateHistory(item) {
  const key = item.id;
  delete item.id;
  const db = getDatabase();
  const reference = ref(db, `fuelAppData/${key}`);
  set(reference, item);
}

export function deleteHistory(item) {
  const db = getDatabase();
  const reference = ref(db, `fuelAppData/${item.id}`);
  remove(reference);
}
