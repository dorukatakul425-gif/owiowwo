import { prepareGiftAudio, playGiftSound } from "@/lib/gift-audio";

export function prepareTeaAudio() { prepareGiftAudio("tea"); }
export function playTeaSound(name: "send" | "arrive") { return playGiftSound("tea", name); }