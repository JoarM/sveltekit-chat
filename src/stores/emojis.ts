import { emojiKey } from "../environments/environment";
import { writable } from "svelte/store";

interface catergory {
    name: string,
    emojis: any,
}

export const emojis = writable<any[]>([]);
export const skinColor = writable<number>(0);

let i = 0;
let tmp: catergory[] = [];
let sorted: catergory[] = [];
const categories: string[] = [
    "smileys-emotion",
    "people-body",
    "animals-nature",
    "food-drink",
]

categories.forEach((category) => {
    fetch("https://emoji-api.com/categories/" + category + "?access_key=" + emojiKey)
    .then((res) => res.json())
    .then((data) => {
        let emojiData = data;
        if (category === "people-body") {
            emojiData = data.filter((elemet: any) => elemet.variants != undefined);
        }
        const insertData: catergory = {
            name: category,
            emojis: emojiData,
        } 
        tmp.push(insertData);
        emojis.set(tmp);
    });
});

function sort() {
    sorted.push(tmp.filter((e) => e.name === "smileys-emotion")[0]);
    const peopleTmp = tmp.filter((e) => e.name === "people-body")[0];
    const people = peopleTmp;
    sorted.push(people);
    console.log(people);
    sorted.push(tmp.filter((e) => e.name === "animals-nature")[0]);
    sorted.push(tmp.filter((e) => e.name === "food-drink")[0]);

    emojis.set(sorted);
}



