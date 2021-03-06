import { AsyncStorage } from "react-native";

/*

To manage your AsyncStorage database, you'll want to create four different helper methods.

getDecks: return all of the decks along with their titles, questions, and answers. 
getDeck: take in a single id argument and return the deck associated with that id. 
saveDeckTitle: take in a single title argument and add it to the decks. 
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

*/

const STORAGE_KEY = "UdaciCards:storage";

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({ [key]: entry }));
}

export function removeEntry(key) {
  return AsyncStorage.getItem(STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
}
