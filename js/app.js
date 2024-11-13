// Get references to HTML elements
const inputText = document.getElementById("inputText");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const readingTime = document.getElementById("readingTime");
const sentenceCount = document.getElementById("sentenceCount");
const paragraphCount = document.getElementById("paragraphCount");
const textPreview = document.getElementById("textPreview");
const wordCountStats = document.getElementById("wordCountStats");
const charCountStats = document.getElementById("charCountStats");


// Define history stacks for undo/redo functionality
let historyStack = [];
let redoStack = [];

// Function to update statistics and preview text
function updateStats() {
    const text = inputText.value;

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCountNum = words.length;

    // Character count
    const charCountNum = text.length;

    // Sentence count (splits at periods, exclamation marks, or question marks)
    const sentences = text.split(/[.!?]+\s*/).filter(sentence => sentence.length > 0);
    const sentenceCountNum = sentences.length;

    // Paragraph count (splits at line breaks)
    const paragraphs = text.trim().split(/\n+/).filter(paragraph => paragraph.length > 0);
    const paragraphCountNum = paragraphs.length;

    // Estimated reading time in seconds (assuming 3.33 words per second)
    const readingTimeSec = Math.ceil(wordCountNum / 3.33);

    // Convert reading time to minutes and seconds
    const minutes = Math.floor(readingTimeSec / 60);
    const seconds = readingTimeSec % 60;

    // Format reading time (e.g., "1 min 12 sec")
    let readingTimeText = "";
    if (minutes > 0) {
        readingTimeText += `${minutes} min `;
    }
    if (seconds > 0) {
        readingTimeText += `${seconds} sec`;
    }

    // Update counts in the DOM
    wordCount.textContent = "Word Count: " + wordCountNum;
    wordCountStats.textContent = "Word Count: " + wordCountNum;
    charCount.textContent = "Character Count: " + charCountNum; 
    charCountStats.textContent = "Character Count: " + charCountNum; 
    sentenceCount.textContent = "Sentence Count: " + sentenceCountNum;
    paragraphCount.textContent = "Paragraph Count: " + paragraphCountNum;
    readingTime.textContent = "Estimated Reading Time: " + readingTimeText;

    // Text preview (optional)
    textPreview.textContent = text || "Your live preview will appear here...";
}
function toUpperCase() {
    historyStack.push(inputText.value); // Save current state to history
    redoStack = []; // Clear redo stack
    inputText.value = inputText.value.toUpperCase();
    updateStats();

    // Show success toast
    Toastify({
        text: "Text converted to uppercase!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}

// Function to convert text to lowercase
function toLowerCase() {
    historyStack.push(inputText.value); // Save current state to history
    redoStack = []; // Clear redo stack
    inputText.value = inputText.value.toLowerCase();
    updateStats();

    // Show success toast
    Toastify({
        text: "Text converted to lowercase!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}

// Function to remove extra spaces
function removeSpaces() {
    historyStack.push(inputText.value); // Save current state to history
    redoStack = []; // Clear redo stack
    inputText.value = inputText.value.replace(/\s+/g, ' ').trim();
    updateStats();

    // Show success toast
    Toastify({
        text: "Extra spaces removed!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}


function copyText() {
    navigator.clipboard.writeText(inputText.value).then(() => {
        Toastify({
            text: "Text copied to clipboard!",
            duration: 3000,  // Duration in milliseconds (3 seconds)
            gravity: "top",  // Position of the toast (top or bottom)
            position: "right", // Position of the toast (left, center, right)
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)" // Toast background color
        }).showToast();
    });
}


function capitalizeWords() {
    historyStack.push(inputText.value);
    redoStack = [];
    inputText.value = inputText.value.replace(/\b\w/g, char => char.toUpperCase());
    updateStats();

    // Show success toast
    Toastify({
        text: "Text capitalized (First letter of each word)",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}


function sentenceCase() {
    historyStack.push(inputText.value);
    redoStack = [];
    inputText.value = inputText.value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
    updateStats();

    // Show success toast
    Toastify({
        text: "Text converted to Sentence Case",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}


function removePunctuation() {
    historyStack.push(inputText.value);
    redoStack = [];
    inputText.value = inputText.value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    updateStats();

    // Show success toast
    Toastify({
        text: "Punctuation removed from the text",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}


function clearText() {
    historyStack.push(inputText.value);
    redoStack = [];
    inputText.value = "";
    updateStats();

    // Show success toast
    Toastify({
        text: "Text cleared",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5c5c, #ff1a1a)"
    }).showToast();
}


// Function to generate random text
function generateText() {
    const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "integer", "nec", "odio", "praesent", "libero", "sed", "cursus", "ante", "dapibus", "diam", "phasellus", "imperdiet", "nulla", "malesuada"];
    let randomText = "";

    // Generate a random number of sentences (between 3 and 7 sentences)
    const numSentences = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numSentences; i++) {
        let sentence = [];

        // Generate a random number of words per sentence (between 5 and 12 words)
        const numWords = Math.floor(Math.random() * 8) + 5;
        for (let j = 0; j < numWords; j++) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            sentence.push(randomWord);
        }

        // Capitalize the first word of each sentence and add a period at the end
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        randomText += sentence.join(" ") + ". ";
    }

    // Update the text area with the generated random text
    inputText.value = randomText;
    updateStats();

    // Show success toast
    Toastify({
        text: "Random text generated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();
}


// Undo function
function undo() {
    if (historyStack.length > 0) {
        redoStack.push(inputText.value); 
        inputText.value = historyStack.pop();
        updateStats();
    }
}

// Redo function
function redo() {
    if (redoStack.length > 0) {
        historyStack.push(inputText.value);
        inputText.value = redoStack.pop(); 
        updateStats();
    }
}

// Automatically update stats and preview as user types
inputText.addEventListener("input", updateStats);
