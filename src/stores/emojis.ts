import { emojiKey } from "../environments/environment";
import { writable } from "svelte/store";

interface catergory {
    name: string,
    emojis: any,
}

export const emojis = writable<any[]>([]);
export const skinColor = writable<"" | "light" | "medium-light" | "medium" | "medium-dark" | "dark">("");

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
        const insertData: catergory = {
            name: category,
            emojis: data,
        } 
        tmp.push(insertData);
        i++;
        if (i < categories.length) sort();
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



