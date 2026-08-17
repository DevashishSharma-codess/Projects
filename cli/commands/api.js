import axios from "axios";
import { showBox } from "../ui/box.js";
import { colors } from "../ui/theme.js";

// Fetch a joke from API
export async function fetchJoke() {
  console.log(colors.muted("Fetching joke..."));
  try {
    const res = await axios.get("https://official-joke-api.appspot.com/random_joke");
    showBox("RANDOM JOKE", [
      colors.secondary(res.data.setup),
      colors.success("👉 " + res.data.punchline)
    ]);
  } catch (err) {
    showBox("RANDOM JOKE", [
      colors.secondary("Why do programmers prefer dark mode?"),
      colors.success("👉 Because light attracts bugs!")
    ]);
  }
}

// Fetch weather from API
export async function fetchWeather(city = "London") {
  console.log(colors.muted(`Fetching weather for ${city}...`));
  try {
    const res = await axios.get(`https://wttr.in/${city}?format=%C+%t+%w`);
    showBox(`WEATHER IN ${city.toUpperCase()}`, colors.success(res.data.trim()));
  } catch (err) {
    console.log(colors.error("Error fetching weather data."));
  }
}

// Fetch daily advice / tech quote from API
export async function fetchQuote() {
  console.log(colors.muted("Fetching daily quote..."));
  try {
    const res = await axios.get("https://api.adviceslip.com/advice");
    showBox("DAILY ADVICE", colors.success(`"${res.data.slip.advice}"`));
  } catch (err) {
    showBox("DAILY ADVICE", colors.success('"Keep code clean and simple!"'));
  }
}
