let testString = "He [audience laughing] went [audience laughing]"
  let removeBrackets = testString.match(/laugh/g)
  //testString.match(/(?<=\[)audience laughing/g)
//look ahead look behind
  console.log(removeBrackets)