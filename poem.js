var connection = new WebSocket('ws://localhost:1337');
  connection.onopen = function(){
  console.log("open connection");
}

var touchCount = 0;
var nouns = ['a','b','c','d','e','f','g','h'];
var newNouns = [];

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
            //     ['noun', 'verb', 'adverb', 'preposition', 'article', 'adjective','noun'],
            //     ['noun', 'adverb', 'verb', 'noun', 'preposition', 'article', 'noun'],
            //     ['noun','verb','noun']
            // ],

            sentencePatterns: [
                ['beverb','preverb','by','classnoun','likes','me','but','only','God','can','verb'],
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
                'noun': 'hair|finger|sun|field|arm|sphere|rock|sand|grass|tree|flower|orb|sea|water|ocean|tide|sky|cloud|moon|star|cosmos|ant|otter|elephant'.split('|'),
                //'noun': 'tree|summer|sun'.split('|'),
                'pronoun': 'he|she|it|someone'.split('|'),
                'verb': 'kicks|moves|swings|runs|walks|flies|sprays|stings|drops|breaks|explodes|diminishes|sweetens|falls|rises|hears|floats'.split('|'),
                'stop': '.|?|!'.split('|'),
                'pause': ',|;|...| - |'.split('|'),
                'beverb': 'is|was'.split('|'),
                'made': 'made|created|written|drawn|given|found|taken'.split('|'),
                'by': 'by',
                'classnoun': 'fools|youngs|olds|sads|sweets|cools|warms'.split('|'),
                'likes': 'likes',
                'me': 'me|him|her|them|us|you'.split('|'),
                'but':'but',
                'only':'only|just'.split('|'),
                'God':'God',
                'can':'can|could'.split('|'),
                'will':'will|would'.split('|'),
                'never':'never|never ever|hardly'.split('|'),
                'until':'until|till|while|as far as|up to'.split('|')



            },
            // -- END CONFIG --------------------------------------------------------------

            init: function() {
                this.numSentencePatterns = this.sentencePatterns.length;
            },

            generateSentences: function(numSentences, markupBefore, markupAfter) {
                var numSentences = numSentences || this.numSentences;
                var markupBefore = markupBefore || '';
                var markupAfter = markupAfter || '';
                var sentences = [];

                while (numSentences--) {
                    var sentence = '';
                    var sentencePattern = this.sentencePatterns[ randomInt(0, this.numSentencePatterns - 1) ];
                    
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


         var sentences = pg.generateSentences( $('#num-sentences').val(), ' ', ' ' );
            $('#poetry-content').html( sentences.join('') );

            // console.log(sentences);
            console.log(touchCount);
            newNouns[touchCount-1] = nouns[parseInt(pointID)];

            if(touchCount>=2){
                console.log(newNouns);
                $('#poems').append("<p class='sentences'>"+newNouns[touchCount-2]+sentences[Math.floor(Math.random()*100)]+newNouns[touchCount-1]+"</p>");
            }


        $(document).ready(function() {
          
          // initialize poetry generator
          pg.init();

          
          // $('.generate').on('click', function() {
          //   var sentences = pg.generateSentences( $('#num-sentences').val(), '<p>', '</p>' );
          //   $('#poetry-content').html( sentences.join('') );

            // console.log(sentences[2]);

          // })
          
        })

   } catch (e) {
       alert("BAD JSON");
 return;
   }
  
}
connection.onerror = function(error){
  alert("PROBLEM WITH SERVER");
}


