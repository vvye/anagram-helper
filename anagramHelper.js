/*
 I have a hunch this thing would lend itself to being written in Lisp.
 */


function containsChar(string, char) {
    return string.toLowerCase().indexOf(char.toLowerCase()) > -1;
}

function containsCharCaseSensitive(string, char) {
    return string.indexOf(char) > -1;
}

function isAlphanumeric(char) {
    return /[A-Za-z0-9]/.test(char);
}

function isEmpty(string) {
    for (var i = 0; i < string.length; i++) {
        if (isAlphanumeric(string[i])) {
            return false;
        }
    }
    return true;
}

function showError(msg) {
    $anagram.addClass('error');
    $message.html(msg).show();
}

function resetState() {
    $anagram.removeClass('error').removeClass('success');
    $message.html('').hide();
}

function showSuccess(msg) {
    $anagram.addClass('success');
    $message.html(msg).show();
}

function removeOneChar(string, char) {
    var lcChar = char.toLowerCase();
    var ucChar = char.toUpperCase();

    // lowercase character
    if (char === lcChar) {
        if (containsCharCaseSensitive(string, char)) {
            return string.replace(char, '');
        }
        return string.replace(ucChar, '');
    }

    // uppercase character
    if (containsCharCaseSensitive(string, char)) {
        return string.replace(char, '');
    }
    return string.replace(lcChar, '');


}

/* --- */

var $source = $('#source');
var $anagram = $('#anagram');
var $message = $('#message');
var $toggle = $('#toggle');

var sourceText = '';

$source.val('');
$anagram.val('');
$source.prop('disabled', false);
$anagram.prop('disabled', true);
resetState();

$toggle.on('click', function () {

    resetState();

    if ($source.prop('disabled')) {
        $source.prop('disabled', false);
        $anagram.prop('disabled', true);
        $(this).html('Edit anagram');
        $anagram.val('');
    } else {
        $source.prop('disabled', true);
        $anagram.prop('disabled', false);
        $(this).html('Edit source');
    }

});

$source.on('keyup', function () {

    resetState();
    sourceText = $(this).val();

});

$anagram.on('keyup', function () {

    resetState();
    var error = false;

    $source.val(sourceText);
    var tmpSourceText = sourceText;
    var anagramText = $(this).val();

    if (isEmpty(anagramText)) {
        return;
    }

    for (var i = 0; i < anagramText.length; i++) {
        var char = anagramText[i];
        if (!isAlphanumeric(char)) {
            continue;
        }
        if (!containsChar(sourceText, char)) {
            showError('You can\'t use <strong>' + char + '</strong> here; it\'s not in the source text.');
            error = true;
            continue;
        }
        if (!containsChar(tmpSourceText, char)) {
            showError('You can\'t use <strong>' + char + '</strong> here; there isn\'t enough of it in the source text.');
            error = true;
            continue;
        }
        tmpSourceText = removeOneChar(tmpSourceText, char);
        $source.val(tmpSourceText);
    }

    if (!error && isEmpty(tmpSourceText)) {
        showSuccess('The text you entered is a valid anagram!')
    }

});
