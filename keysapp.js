let keyboardUpper = $('#keyboard-upper-container');
let keyboardLower = $('#keyboard-lower-container');
//initially hides the uppercase keyboard
$('#keyboard-upper-container').hide();
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let sentenceIndex = 0;
let letterIndex = 0;
let trackSentence = sentences[sentenceIndex];
//let trackLetter = trackSentence.charAt(letterIndexStart);
let trackLetter = trackSentence[letterIndex];
let checkKeyInput = $('#feedback');
let mistakes = 0;
let numOfWords = 0;
let startTime = new Date().getTime();
let gameEnd = false;


for (let i = 0; i < sentences.length; i++) {
    numOfWords += sentences[i].split(' ').length;
}

$('body').keydown(function (e) {
    if (e.which === 16) {
        keyboardUpper.show();
        keyboardLower.hide();
    }
});

$('body').keyup(function (e) {
    if (e.which === 16) {
        keyboardUpper.hide();
        keyboardLower.show();
    }
});

$('body').keypress(function (e) {
    let keyIdent = $('#' + e.which);
    $(keyIdent).css('background-color', 'RosyBrown');
    $('body').keyup(function () {
        $(keyIdent).css('background-color', '#f5f5f5');
        if (gameEnd == true) {
            e.stopPropagation()
        }
    });

    function gameOverMan() {
        endTime = new Date().getTime();
        let timeLapsed = ((endTime - startTime) / (1000 * 60));
        let wordsPerMin = (numOfWords / timeLapsed) - (2 * mistakes);
        $('.game-over').css('margin', '5px');
        $('.game-over').append(`Your words per minute score is: ${wordsPerMin}. Your total of incorrect characters is: ${mistakes}`);
        $('.one-more-once').css('margin', '15px');
        $('.play-again').append('<button class=one-more-once>Play again?</button>');
        $('.play-again').click(function () {
            location.reload();
        });
    };

    //this if statement represents playing the current sentence. 
    if (letterIndex < trackSentence.length) {
        if (e.which == trackSentence.charCodeAt(letterIndex)) {
            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');

        } else {
            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            mistakes++;
        }
        letterIndex++;
        trackLetter = trackSentence[letterIndex]
        $('#target-letter').text(trackLetter);
        $('#yellow-block').css('left', '+=17.5px');
        //else representes hitting the end of a sentence. 
    } else {
        sentenceIndex++;
        // console.log(sentenceIndex, sentences.length);
        //represents end of the game.
        if (sentenceIndex >= sentences.length) {
            gameEnd = true;
            gameOverMan();
        } else {
            $('#feedback').empty();
            $('#yellow-block').css('left', '17.5px');
            letterIndex = 0;
            trackSentence = sentences[sentenceIndex];
            trackLetter = trackSentence[letterIndex];
            $('#sentence').text(trackSentence);
            $('#target-letter').text(trackLetter);
        }
    }
});

$('#sentence').text(trackSentence);
$('#target-letter').text(trackLetter);

