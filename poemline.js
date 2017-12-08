var connection = new WebSocket('ws://localhost:1337');
  connection.onopen = function(){
  console.log("open connection");
}

var touchCount = 0;
var nouns = ['truth','love','dust','hope','man','star','sun','cosmos'];
var newNouns = [];

var startPoint, endPoint;

var lengthOfPattern;


// var pointx = [1000,880,680,680,640,600,480,320];
// var pointy = [600,680,400,640,480,120,360,320];

// var pointx = [50,80,130,130,140,150,180,220];
// var pointy = [50,30,100,40,80,170,110,120];

// var pointx = [50,80,130,130,150,140,180,220];
// var pointy = [50,30,100,40,170,80,110,120];

var pointx = [100,160,260,260,300,280,360,440];
var pointy = [90,50,190,70,330,150,210,230];

console.log(pointy[0]);



connection.onmessage = function(message){


  try {
       
       var pointID = message.data;
       // console.log(pointID);
       touchCount++;



// -- UTILITY FUNCTIONS
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.trim == String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/g, '');
}

// pg = Poetry Generator
var pg = {

    // -- BEGIN CONFIG ------------------------------------------------------------
    numSentences: 100,
    numSentencePatterns: null,

    // hard-coded sentence patterns is the simpler way
    // TODO: make more flexible / less artificial
    // sentencePatterns: [
    //     ['verb', 'adverb', 'preposition', 'article', 'adjective'],
    //     ['adverb', 'verb', 'noun', 'preposition', 'article'],
    //     ['verb']
    // ],

    sentencePatterns: [
                ['beverb','preverb','by','classnoun','likes','me','but','only','god','can','verb','articles'],
                ['will','never','verb','until','adjective','noun','verb'],
                ['verb', 'adverb', 'preposition', 'article', 'adjective'],
                ['adverb','verb','noun','preposition'],
                ['verb']
            ],

    languageParts: {
        'vowel': 'aeiou'.split(''),
        'article': {
            'beforeVowel': 'the|an'.split('|'),
            'beforeConsonant': 'the|a'.split('|')
        },
        'preposition': 'to|through|under|over|between|on|in|above|below|betwixt'.split('|'),
        'adjective': 'beautiful|tall|flowing|hot|cold|fragrant|misty|bare|coarse|blind|dim|dreary|elaborate|enchanting|gleaming|glistening|green|organic|tender|cloudless'.split('|'),
        'adverb': 'quickly|slowly|boldly|always|angrily|cheerfully|elegantly|frantically|innocently|nervously|powerfully|rarely|silently|wildly|warmly|solemly'.split('|'),
        'noun': 'hair|finger|field|arm|sphere|rock|sand|grass|tree|flower|orb|water|ocean|tide|sky|cloud|moon|ant|otter|elephant'.split('|'),
        //'noun': 'tree|summer|sun'.split('|'),
        'pronoun': 'he|she|it|someone'.split('|'),
        'verb': 'kicks|moves|swings|runs|walks|flies|sprays|stings|drops|breaks|explodes|diminishes|sweetens|falls|rises|hears|floats'.split('|'),
        'stop': '.|?|!'.split('|'),
        'pause': ',|;|...| - |'.split('|'),
        'beverb': 'is|was'.split('|'),
        'preverb': 'made|created|written|drawn|given|found|taken'.split('|'),
        'by': 'by|by'.split('|'),
        'classnoun': 'fools|youngs|olds|sads|sweets|cools|warms'.split('|'),
        'likes': 'likes|likes'.split('|'),
        'me': 'me|him|her|them|us|you'.split('|'),
        'but':'but|however'.split('|'),
        'only':'only|just'.split('|'),
        'god':'God|you'.split('|'),
        'can':'can|could'.split('|'),
        'will':'will|would'.split('|'),
        'never':'never|ever|hardly'.split('|'),
        'until':'until|till|while'.split('|'),
        'articles':'the|the'.split('|')
    },
    // -- END CONFIG --------------------------------------------------------------

    init: function() {
        this.numSentencePatterns = this.sentencePatterns.length;
    },

    









generateSentences: function(whichPattern, numSentences, markupBefore, markupAfter) {
        var numSentences = numSentences || this.numSentences;
        var markupBefore = markupBefore || '';
        var markupAfter = markupAfter || '';
        var sentences = [];
        console.log(whichPattern);


        while (numSentences--) {
            var sentence = '';
            var sentencePattern = this.sentencePatterns[whichPattern];
            
            // loop through sentence pattern array
            for (var i = 0, length = sentencePattern.length; i < length; i++) {
                var languagePartArray;
                var articleType;
                var nextWord = null;

                // if this word is an article, need to determine if next word starts with a vowel or consonant
                if (sentencePattern[i] === 'article') {
                    // get next word
                    var nextWordLanguagePartArray = this.languageParts[ sentencePattern[i + 1] ];
                    var nextWord = nextWordLanguagePartArray[ randomInt(0, nextWordLanguagePartArray.length - 1) ];

                    // set article type based on whether next word starts with vowel or consonant
                    if (this.languageParts['vowel'].indexOf(nextWord[0]) !== -1) {
                        articleType = 'beforeVowel';
                    } else {
                        articleType = 'beforeConsonant';
                    }

                    languagePartArray = this.languageParts[ sentencePattern[i] ][ articleType ];
                } else {
                    languagePartArray = this.languageParts[ sentencePattern[i] ];
                }

                // add this word to sentence
                sentence += languagePartArray[ randomInt(0, languagePartArray.length - 1) ] + ' ';

                // if next word was gotten, also add next word to sentence and increment the i counter
                if (nextWord !== null) {
                    sentence += nextWord + ' ';
                    i++;
                }
            }

            sentences.push(markupBefore + sentence.trim() + markupAfter);
            //console.log(sentence);

        } // end while (numSentences--)

        return sentences;

    } // end generateSentences()















} // end poetryGenerator

// ----------------------------------------------------------------------------




 // var sentences = pg.generateSentences( $('#num-sentences').val(), ' ', ' ' );
 //    $('#poetry-content').html( sentences.join('') );



console.log("pointID"+pointID);
if(touchCount==1){
  startPoint = parseInt(pointID);
}else if(touchCount==2){
  endPoint = parseInt(pointID);
}else if(touchCount>2){  
  startPoint = endPoint;
  endPoint = parseInt(pointID);
}

// console.log('startPoint:'+startPoint+';endPoint:'+endPoint);

if(touchCount>=2){

if(startPoint==2&&endPoint==5 || startPoint==6&&endPoint==7 || startPoint==5&&endPoint==2|| startPoint==7&&endPoint==6){
  lengthOfPattern=4;
}else if(startPoint==0&&endPoint==1 || startPoint==1&&endPoint==3 || startPoint==2&&endPoint==4 || startPoint==2&&endPoint==6 || startPoint==5&&endPoint==6 || startPoint==1&&endPoint==0 || startPoint==3&&endPoint==1 || startPoint==4&&endPoint==2 || startPoint==6&&endPoint==2 || startPoint==6&&endPoint==5){
  lengthOfPattern=3;
}else if(startPoint==0&&endPoint==2 || startPoint==0&&endPoint==3 || startPoint==1&&endPoint==2 || startPoint==1&&endPoint==5 || startPoint==2&&endPoint==3 || startPoint==2&&endPoint==7 || startPoint==3&&endPoint==5 || startPoint==5&&endPoint==4 || startPoint==5&&endPoint==7 || startPoint==4&&endPoint==6|| startPoint==4&&endPoint==7 || startPoint==2&&endPoint==0 || startPoint==3&&endPoint==0 || startPoint==2&&endPoint==1 || startPoint==5&&endPoint==1 || startPoint==3&&endPoint==2 || startPoint==7&&endPoint==2 || startPoint==5&&endPoint==3 || startPoint==4&&endPoint==5 || startPoint==7&&endPoint==5 || startPoint==6&&endPoint==4|| startPoint==7&&endPoint==4){
  lengthOfPattern=2;
}else if(startPoint==0&&endPoint==5 || startPoint==3&&endPoint==6 || startPoint==5&&endPoint==0 || startPoint==6&&endPoint==3){
  lengthOfPattern=1;
}else if(startPoint==0&&endPoint==4 || startPoint==0&&endPoint==6 || startPoint==0&&endPoint==7 || startPoint==1&&endPoint==4 || startPoint==1&&endPoint==6 || startPoint==1&&endPoint==7 || startPoint==3&&endPoint==4 || startPoint==3&&endPoint==7 || startPoint==4&&endPoint==0 || startPoint==6&&endPoint==0 || startPoint==7&&endPoint==0 || startPoint==4&&endPoint==1 || startPoint==6&&endPoint==1 || startPoint==7&&endPoint==1 || startPoint==4&&endPoint==3 || startPoint==7&&endPoint==3){
  lengthOfPattern=0;
}
}




// var sentences = pg.generateSentences(lengthOfPattern, $('#num-sentences').val(), ' ', ' ' );
//     $('#poetry-content').html( sentences.join('') );

//     console.log(touchCount);
    newNouns[touchCount-1] = nouns[parseInt(pointID)];

            if(touchCount==1){
              $('#poems').append("<p class='title'>"+newNouns[0]+"</p>");
           
            }

            else if(touchCount>=2){
console.log('startPoint:'+startPoint+';endPoint:'+endPoint);
console.log('number:'+pointx[startPoint]+pointy[startPoint]+pointx[endPoint]+pointy[endPoint]);
               line(pointx[startPoint], pointy[startPoint], pointx[endPoint], pointy[endPoint], document.getElementById('container'));
                 //line(1, 1, 100, 100, document.getElementById('container'));

              var sentences = pg.generateSentences(lengthOfPattern, $('#num-sentences').val(), ' ', ' ' );
                $('#poetry-content').html( sentences.join('') );

                console.log(newNouns);
                $('#poems').append("<p class='sentences'>"+newNouns[touchCount-2]+sentences[Math.floor(Math.random()*100)]+newNouns[touchCount-1]+"</p>");
            }



$(document).ready(function() {
  
  // initialize poetry generator
  pg.init();

  
  $('.generate').on('click', function() {
    var sentences = pg.generateSentences( $('#num-sentences').val(), '<p>', '</p>' );
    $('#poetry-content').html( sentences.join('') );

    //console.log(sentences[2]);

  })
  
})










   } catch (e) {
    console.log(e);
       alert("BAD JSON");
 return;
   }
       // if(pointID == 3){
       //  poem();
       // }
  
}
connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}






function line(startX, startY, endX, endY, container) {  
    if (startX == endX) {  
        if (startY > endY) {  
            var tempY = startY;  
            startY = endY;  
            endY = tempY;  
        }  
        for (var k = startY; k < endY; k++) {  
            createPoint(container, startX, k);  
        }  
    }  
    // y = ax + b  
    var a = (startY - endY) / (startX - endX);  
    var b = startY - ((startY - endY) / (startX - endX)) * startX;  
    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {  
        if (startX > endX) {  
            var tempX = endX;  
            endX = startX;  
            startX = tempX;  
        }  
        var left = container.style.left;  
        var top = container.style.top;  
        for (var i = startX; i <= endX; i++) {  
            createPoint(container, i, a * i + b);  
        }  
    } else {  
        if (startY > endY) {  
            var tempY = startY;  
            startY = endY;  
            endY = tempY;  
        }  
        for (var j = startY; j <= endY; j++) {  
            createPoint(container, (j - b) / a, j);  
        }  
    }  
      
}  
  
function createPoint(container, x, y) {  
    // console.log("x: "+x+"y: "+y);
    var node = document.createElement('div');  
    node.className = 'line';  
    node.style.top = y+"px";  
    node.style.left = x+"px";  
    container.appendChild(node);  
}  



