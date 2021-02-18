module.exports = function toReadable (n) {
    let string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
        /* Если число ноль */
        if (parseInt(string) === 0) {
            return 'zero';
        }
        /* Диапазон единиц ввиде слов */
        units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        /* Десятичные множство ввиде слов */
        tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        /* Маштабные множества ввиде слов */
        scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

        /* Разделяем аргумент пользователя на З блоки  справа налево */
        start = string.length;
        chunks = [];
        while (start > 0) {
            end = start;
            chunks.push(string.slice((start = Math.max(0, start - 3)), end));
        }
        /*Проверяем, достаточно ли у функции масштабных слов, чтобы можно было преобразовать аргумент пользователя в
         строку*/
        chunksLen = chunks.length;
        if (chunksLen > scales.length) {
            return '';
        }

        /* Преобразуем каждое целое число в строку ,в каждом куске*/
        words = [];
        for (i = 0; i < chunksLen; i++) {

            chunk = parseInt(chunks[i]);

            if (chunk) {

                /* Разделяем массив на куски отдельных целых чисел */
                ints = chunks[i].split('').reverse().map(parseFloat);

                /*Если целое число десятков равно 1, то есть 10, то прибавляем 10 к целому числу единиц.*/
                if (ints[1] === 1) {
                    ints[0] += 10;
                }

                /*Добавляем масштабное слово, если кусок не равен нулю и существует элемент массива*/
                if ((word = scales[i])) {
                    words.push(word);
                }

                /* Добавляем единичное слово, если элемент массива существует */
                if ((word = units[ints[0]])) {
                    words.push(word);
                }

                /* Добавляем десятичное слово, если элемент массива существует */
                if ((word = tens[ints[1]])) {
                    words.push(word);
                }
                /* Добавляем сотое слово, если элемент массива существует*/
                if ((word = units[ints[2]])) {
                    words.push(word + ' hundred');
                }

            }
        }
        return words.reverse().join(' ');
}
