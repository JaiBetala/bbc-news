
// Create an async function to load our model into tfjs
var modelFunctions = {

  stringTokens:

// Create a function that uses regular expressions to clean up user input/strings
function (certainString)
{
    // Declare a variable that will be used to hold the parsed string
    var cleanString = certainString;

    // Replace anything that is not a letter
    cleanString = certainString.replace(/[^a-zA-Z ]/g, '');

    // Replace all single letters
    cleanString = cleanString.replace(/ [^ ](?= )/g, '');

    /* Now that we have replaced characters with spaces, there may be
        groups of spaces, so just replace them with single spaces. */
    cleanString = cleanString.replace(/\s\s+/g, ' ');

    // Convert all the text to lowercase
    cleanString.toLowerCase();

    // Convert the string to an array
    var wordsArray = cleanString.split(' ');

    // Return the array
    return wordsArray;

}, indexWords:

/* Creating a function that will index the words returned by the previous array.
There are 4 paramaters taken in, which will be modified in the function. Returns
an array with numeric placeholders of words */
function (arrayOfWords, wordIndex, indexWords, wordCounts, max_words)
{
  /* This for loop goes through each word in the array and assigns it a key, value
  in the object. It also notes down word frequencies in the wordFreq object. */
  for (let i = 0; i <= arrayOfWords.length; i++)
  {
    for (var word in arrayOfWords[i]){
    // This checks if the object has the word already in the object.
    if (wordIndex.hasOwnProperty(arrayOfWords[i][word]))
      {

      }

    else
      {
        /* This adds to the wordIndex, creates a new 'property' in the indexWords
        object, and creates a new object in the wordIndex object. The last line
        switches the word of arrays into the words. */
        wordCounts++;
        //wordFreqs[arrayOfWords[word]] = 1;
        indexWords[wordCounts] = arrayOfWords[i][word];
        wordIndex[arrayOfWords[i][word]] = wordCounts;
      }
    }
  }
  let keys = Object.keys(wordIndex);
  let vals = []
  for (let i = 1; i <= max_words-1; i++){
    vals.push(keys[i-1]);
  }

  // Return arrayOfWords
  return vals;

}, binaryWord:

/* This function iterates through each part of user input and then returns a matrix
of the words in a binary representation. It takes in the paramaters of the indexWords,
and wordsArray which have been either declared or returned from a function in the file. */
function (indexWords, arrayOfWords)
{
  // Turning the word index object into an array of its keys.


  //Each matrix usually starts with a zero, for this purpose. Same as Keras.
  let matrix = [0];

  /* This for loop goes through each object in the wordIndex and wordsArray list
  and then returns a final matrix. The count variable makes it easy to eliminate
  duplicates. */

  for (var indexY in indexWords)
  {
    // Check if the count is greater than zero. If yes, push 1 to the matrix, else push 0
    if (arrayOfWords.includes(indexWords[indexY]))
    {
      matrix.push(1);
    }
    else
    {
      matrix.push(0);
    }
  }

  // Returns a matrix
  return matrix;
}}

// Export 'makePrediction' as a module
module.exports = modelFunctions;
