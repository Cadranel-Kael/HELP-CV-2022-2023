"use strict";
const settings = {
    errorMessages: {
        format: {
            email: /.+@.+\..+/,
        },
        formatText: {
            email: "example@email.com",
        },
        emptyInput: 'Field can\'t be empty',
        tooShort(min) {
            return `Field needs to be at least ${min} characters`;
        },
        wrongFormat(format) {
            if (format) {
                return `Field format wrong, format asked ${format}`;
            }
            return `Field format wrong`;
        },
    }
};
const formCheck = {
    nameInput: document.getElementById('name'),
    nameError: document.querySelector('#name-field .form__field__error'),
    emailInput: document.getElementById('email'),
    emailError: document.querySelector('#email-field .form__field__error'),
    messageInput: document.getElementById('message'),
    messageError: document.querySelector('#message-field .form__field__error'),
    form: document.querySelector('.footer__form'),
    checker(submit, input, error, checkEmpty, min, checkEmailFormat) {
        if (checkEmpty && input.value === '') {
            error.textContent = settings.errorMessages.emptyInput;
        }
        else if (input.value.length <= min) {
            error.textContent = settings.errorMessages.tooShort(min);
        }
        else if (checkEmailFormat && !input.value.match(settings.errorMessages.format.email)) {
            error.textContent = settings.errorMessages.wrongFormat(settings.errorMessages.formatText.email);
        }
        else {
            error.textContent = '';
            return;
        }
        if (submit) {
            input.focus();
        }
    },
    removeRequired() {
        this.nameInput.required = false;
        this.emailInput.required = false;
        this.messageInput.required = false;
    },
    init() {
        this.removeRequired();
        this.nameInput.addEventListener('focusout', () => {
            this.checker(false, this.nameInput, this.nameError, true, 3, false);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.nameInput, this.nameError, true, 3, false);
            });
        });
        this.emailInput.addEventListener('focusout', () => {
            this.checker(false, this.emailInput, this.emailError, true, 4, true);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.emailInput, this.emailError, true, 4, true);
            });
        });
        this.messageInput.addEventListener('focusout', () => {
            this.checker(false, this.messageInput, this.messageError, true, 10, false);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.messageInput, this.messageError, true, 10, false);
            });
        });
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.checker(true, this.messageInput, this.messageError, true, 10, false);
            this.checker(true, this.emailInput, this.emailError, true, 5, true);
            this.checker(true, this.nameInput, this.nameError, true, 3, false);
        });
    }
};
const closeMenu = {
    menuCheckbox: document.getElementById('burger-menu'),
    menuLinks: document.querySelectorAll('.burger-menu__nav__container__item'),
    init() {
        this.menuCheckbox.addEventListener('change', () => {
            if (this.menuCheckbox.checked) {
                this.menuCheckbox.ariaExpanded = "true";
                window.addEventListener('keyup', e => {
                    if (e.key === 'Esc' || e.key === 'Escape') {
                        this.menuCheckbox.checked = false;
                        this.menuCheckbox.ariaExpanded = "false";
                    }
                });
            }
            else {
                this.menuCheckbox.ariaExpanded = "false";
                if (document.activeElement === this.menuCheckbox) {
                    window.addEventListener('keyup', e => {
                        if (e.key === 'Enter' || e.key === 'Space') {
                            this.menuCheckbox.checked = true;
                            this.menuCheckbox.ariaExpanded = "true";
                        }
                    });
                }
            }
        });
        for (const menuLink of this.menuLinks) {
            menuLink.addEventListener('click', () => {
                this.menuCheckbox.checked = false;
                this.menuCheckbox.ariaExpanded = "false";
            });
        }
    }
};
closeMenu.init();
formCheck.init();
//# sourceMappingURL=main.js.map