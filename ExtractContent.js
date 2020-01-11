

const ExtractContent =  function(str){
	console.log('EXTRACTING')
	//let headerPattern = new RegExp('(\<heading>)[a-zA-Z0-9 \']\+<&heading>', 'g');
	let headerPattern =  /<heading>\s*(.*?)<&heading>/g

	var headingArray = [];
	var parArray = [];
	var quoteArray = [];

    headingArray = str.match(headerPattern);
	
    if(headingArray !== null ){
	for(let i=0; i<headingArray.length; i++){
		headingArray[i] = headingArray[i].substring(9, headingArray[i].length - 10);
	 }
	}
    

    //let parPattern = new RegExp('(\<par>)[a-zA-Z0-9 \'.]\+<&par>', 'gmi');
    let parPattern = /<par>\s*(.*?)<&par>/g
	parArray = str.match(parPattern);

    if(parArray !== null){
	for(let j=0; j<parArray.length; j++){
		parArray[j] = parArray[j].substring(5, parArray[j].length - 6);
	}
}
  
   
    
	//let quotePattern = new RegExp('(\<quote>)[a-zA-Z0-9 \'.]\+<&quote>', 'g')
    let quotePattern = /<quote>\s*(.*?)<&quote>/g

	quoteArray = str.match(quotePattern);

    if(quoteArray !== null){
	for(let k=0; k<quoteArray.length; k++){
		quoteArray[k] = quoteArray[k].substring(7, quoteArray[k].length - 8);
	}
   }


	return arrangeContent(str, headingArray, parArray, quoteArray);
	
}



function arrangeContent(str, headingsArray, parArray, quotesArray){

	console.log('ARRANGING CONTENT');

	let regx = new RegExp('<[a-z]\+>', 'g');
	let matches = str.match(regx);
	let contents = [];

	if(matches === null){
		contents.push({ content_type:'paragraph', value: str});
		return contents;
	}
	var parTrack = 0, headingTrack = 0, quoteTrack = 0;
	for(let i = 0; i < matches.length; i++){
		switch(matches[i]){
			case '<par>':
			  contents.push({content_type: 'paragraph', value: parArray[parTrack++]});
			  break;
			case '<heading>':
			  contents.push({content_type: 'heading', value: headingsArray[headingTrack++]});
			  break;
			case '<quote>':
			  contents.push({content_type: 'quote', value: quotesArray[quoteTrack++]});
			  break;
			case '<img>':
			  contents.push({content_type: 'img', value: 'img'});
			  break;
		}
	}

	return contents;
}

module.exports = ExtractContent;

