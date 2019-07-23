const get_data = require("./text-preprocesing/get_data.js");
const model = 'https://raw.githubusercontent.com/ml-maker/bbc_news/hardcoded-tokenization/model.json'
const data_link = "https://storage.googleapis.com/dataset-uploader/bbc/bbc-text.csv"
const z = require("zebras");
const tf = require("@tensorflow/tfjs");
//const fs = require("fs");
//initializing the variables for preprocesing
let indexWord = {};
let wordIndex = {};
let wordCounts = 0
let defaultModel;
//data preprocesing.
//reading the dataset, splitting the strings into arrays, creating a word dictionary, and convert them to binary
let data = z.readCSV('bbc-text.csv');
//console.log(data[6]);
let values = data.map(items => get_data.stringTokens(items.text));
let dictionary = get_data.indexWords(values, wordIndex, indexWord, wordCounts);
let encodedWords = values.map(item =>get_data.binaryWord(dictionary, item));
 //converting to trainable data
   function trainingData (data, encodedWords){
     let dataTrained = [];
     for(let varib in data){
       let dict = {}
       dict["input"] = encodedWords[varib];
         if (data[varib].category === 'tech'){
         dict["output"] = [0, 0, 0, 0, 1];
       } else if (data[varib].category === 'politics'){
          dict["output"] = [0, 0, 1, 0, 0,];
       } else if (data[varib].category === 'business'){
              dict["output"] = [1, 0, 0, 0, 0];
       } else if (data[varib].category === 'entertainment'){
          dict["output"] = [0, 1, 0, 0, 0];
       } else{
         dict["output"] = [0, 0, 0, 1, 0];
       }

       dataTrained.push(dict);
     }
     return dataTrained;
   }

   //console.log(wordIndex);
//let jsondata = {"data": training};

/*fs.writeFile("dataset.json", JSON.stringify(jsondata), function(err,result){
  if(err){console.log("error", err)}
});*/

async function loadModels (model, input, defaultModel)
{
    // Load the model -> it is on GitHub
    defaultModel = await tf.loadLayersModel(model);
    let confidenceScores = defaultModel.predict(tf.tensor([input])).dataSync();
    let bestIndex = confidenceScores.indexOf(Math.max.apply(null, confidenceScores));

        // Based on the index, return a different category
        if (bestIndex === 0)
        {
          console.log("Technology");
        }

        else if (bestIndex === 1)
        {
          console.log("Politics");
        }

        else if (bestIndex === 2)
        {
          console.log("Business");
        }

        else if (bestIndex === 3)
        {
          console.log("Entertainment");
        }

        else
        {
          console.log("Sports");
      }
}

function input(string, indexWords, wordIndex, wordCounts){
  let tokens = get_data.stringTokens(string);
  console.log(tokens)
  let dict = get_data.indexWords(tokens, wordIndex, indexWord, wordCounts, 1000);
  console.log(dict)
  let final = get_data.binaryWord(dict, tokens);
  return final
}

let sample_input = "souness delight at euro progress boss graeme souness felt newcastle were never really in danger of going out of the uefa cup against heerenveen.  an early own goal followed by an alan shearer strike earned them a 2-1 win and a place in the uefa cup last 16.  obviously with winning in the first leg it gave us a great advantage   he said after the 4-2 aggregate victory.  we got our goals early and in the minds of some players the job was done but then they got a goal and perhaps made us a bit nervous.  shearer s goal moved him within 12 of jackie milburn s club scoring record of 200 for the magpies. but souness said he did not think beating the record would have any bearing on his decision to retire at the end of the season.  i think if he got it this year he would want to stay next year anyway   he added.   he struck the ball very well - he always has done - and i think it was the power and pace that beat the goalkeeper.  souness also paid tribute to laurent robert  who was at the heart of much of united s attacking play.  in the first half he did really well and did everything you want from a wide player. more of the same in future please   he said"

let cleaned = input(sample_input, indexWord, wordIndex, wordCounts);
//console.log(cleaned);
loadModels(model, cleaned, defaultModel);
