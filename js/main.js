$(() => {
    function checkAnswer() {
        $('.alert').hide();
        const submission = $('#guess-box').val();
        $('#guess-box').val(submission.trim());
        if (!submission.trim()) {
            return;
        }
        $('#guess-box').val('');
        const answerified = submission.toUpperCase().replace(/[^A-Z]/g, '');
        if (CryptoJS.MD5(answerified).toString() === '591fa712da0f4ccccab851306d3c4a0d') {
            $('.correct').fadeIn();
        } else {
            $('.incorrect').fadeIn();
        }
    }

    $('#submit').click(checkAnswer);

    for (let i = 0; i < document.getElementsByTagName("input").length - 1; i++) {
        let elem = document.getElementsByTagName("input")[i];
        if (elem.maxLength !== 1) {
            continue;
        }
        elem.oninput = function() {
            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(this.value.toLocaleUpperCase()) === -1) {
                this.value = '';
                return;
            }
            if (this.classList.contains("l")) {
                return;
            }
            if (this.value.length === 1) {
                try {
                    document.getElementsByTagName("input")[i + 1].focus();
                } catch (e) {

                }
            }
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 8 || e.keyCode === 46) {
            let activeIndex = -1;
            for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
                if (document.getElementsByTagName("input")[i] == document.activeElement) {
                    activeIndex = i;
                }
            };
            if (activeIndex > -1 && document.activeElement.maxLength === 1) {
                document.activeElement.value = '';
                if (!document.activeElement.classList.contains('l')) {
                    try {
                        let prevElement = document.getElementsByTagName("input")[activeIndex - 1];
                        if (prevElement.maxLength === 1 && !prevElement.classList.contains('l')) {
                            prevElement.focus();
                        }
                    } catch (e) {

                    }
                }
            }
        }

        if (
            e.keyCode === 13 &&
            document.activeElement.id === 'guess-box'
        ) {
            checkAnswer();
        }
    });
});
