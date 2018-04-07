// Regex captures letters but not spaces, pushes to arr, if element.length in arr > 4
// splits to array, reverses, joins and returns the whole array joined as a string

function spinWords(str) {
  let arr;
  arr = (str.match(/[a-zA-Z]+/gi));
  arr.forEach((val, index, array) => {
    if (val.length > 4) {
      array[index] = (val.split('').reverse().join(''));
    }
    return arr;
  });
  return arr.join(' ');
}

spinWords('Hello this is a test sentence');


/*
Stop gninnipS My sdroW!

Write a function that takes in a string of one or more words, and returns the same string,
but with all five or more letter words reversed (Just like the name of this Kata). Strings
passed in will consist of only letters and spaces. Spaces will be included only when more
than one word is present

Examples:

spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" 
spinWords( "This is a test") => returns "This is a test" 
spinWords( "This is another test" )=> returns "This is rehtona test"
*/
