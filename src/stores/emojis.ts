import { emojiKey } from "../environments/environment";
import { writable } from "svelte/store";

interface catergory {
    id: number,
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

categories.forEach((category, index) => {
    fetch("https://emoji-api.com/categories/" + category + "?access_key=" + emojiKey)
    .then((res) => res.json())
    .then((data) => {
        let emojiData = data;
        if (category === "people-body") {
            emojiData = data.filter((elemet: any) => elemet.variants != undefined);
        }
        const insertData: catergory = {
            id: index,
            name: category,
            emojis: emojiData,
        } 
        tmp.push(insertData);
        emojis.set(tmp);
    });
});



