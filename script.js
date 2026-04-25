// 1. We find our HTML elements and give them nicknames in JS
const searchBtn = document.getElementById("search-button");
const wordInput = document.getElementById("user-input");

// 2. This function is the 'Brain'. It's 'async' because fetching takes time.
async function getWordData() {
    // Get the exact word the user typed
    const word = wordInput.value; 
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        // 'fetch' is like sending a letter to the API's address
        const response = await fetch(url);
        // We turn the response into a JSON object (the 'package')
        const data = await response.json();

        // 3. Now we 'dig' into the data and put it in our HTML drawers
        document.getElementById("word-title").innerText = data[0].word;
        document.getElementById("phonetic-display").innerText = data[0].phonetic || "N/A";
        document.getElementById("definition-display").innerText = data[0].meanings[0].definitions[0].definition;

        // 4. Handle Synonyms (they come as a list/array)
        const synonyms = data[0].meanings[0].synonyms;
        document.getElementById("synonyms-display").innerText = synonyms.length > 0 ? synonyms.join(", ") : "None found";

        // 5. Handle Audio (Requirement: Providing audio playback)
        // We look for the first audio link that isn't empty
        const audioSrc = data[0].phonetics.find(p => p.audio !== "").audio;
        
        // We tell the button what to play when clicked
        const audioBtn = document.getElementById("audio-button");
        audioBtn.onclick = () => {
            const audio = new Audio(audioSrc);
            audio.play();
        };

    } catch (error) {
        // If the user types a fake word, we show an error
        document.getElementById("word-title").innerText = "Word not found!";
    }
}

// 6. Listen for the click! When button is clicked, run the Brain function.
searchBtn.addEventListener("click", getWordData);