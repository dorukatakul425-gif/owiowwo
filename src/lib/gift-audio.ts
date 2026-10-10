import teaSend from "@/assets/tea-send.wav.asset.json";
import teaArrive from "@/assets/tea-arrive.wav.asset.json";
import crownSend from "@/assets/crown-send.wav.asset.json";
import crownArrive from "@/assets/crown-arrive.wav.asset.json";
import rocketSend from "@/assets/rocket-send-reference.wav.asset.json";
import rocketArrive from "@/assets/rocket-arrive-reference.wav.asset.json";
const tomatoSend = "/game-assets/current/tomato-send.wav";
const tomatoArrive = "/game-assets/current/tomato-arrive.wav";
const recordings = { tea: { send: teaSend.url, arrive: teaArrive.url }, crown: { send: crownSend.url, arrive: crownArrive.url }, tomato: { send: tomatoSend, arrive: tomatoArrive }, rocket: { send: rocketSend.url, arrive: rocketArrive.url } };
type Gift = keyof typeof recordings;
type Sound = "send" | "arrive";
let context: AudioContext | undefined;
const buffers = new Map<string, Promise<AudioBuffer>>();
/** One browser-only context, resumed synchronously by the gift tap on mobile. */
export function prepareGiftAudio(gift: Gift) {
  try {
    context ??= new AudioContext();
    void context.resume().catch(() => undefined);
    const audio = context;
    for (const sound of ["send", "arrive"] as const) {
      const key = `${gift}:${sound}`;
      if (buffers.has(key)) continue;
      const buffer = fetch(recordings[gift][sound]).then(response => {
        if (!response.ok) throw new Error("Gift sound unavailable");
        return response.arrayBuffer();
      }).then(data => audio.decodeAudioData(data));
      buffers.set(key, buffer);
      void buffer.catch(() => buffers.delete(key));
    }
  } catch { /* Audio failure never prevents delivery. */ }
}
export async function playGiftSound(gift: Gift, sound: Sound) {
  const audio = context;
  const buffer = buffers.get(`${gift}:${sound}`);
  if (!audio || !buffer) return;
  try {
    const source = audio.createBufferSource();
    source.buffer = await buffer;
    source.connect(audio.destination);
    source.start();
  } catch { /* Audio failure never prevents delivery. */ }
}
