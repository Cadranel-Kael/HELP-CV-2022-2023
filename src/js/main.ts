const settings = {
    errorMessages: {
        format: {
            email: /.+@.+\..+/,
        },
        formatText: {
            email: "example@email.com",
        },
        emptyInput: 'Field can\'t be empty',
        tooShort(min:number): string {
            return `Field needs to be at least ${min} characters`;
        },
        wrongFormat(format:string): string {
            if (format) {
                return `Field format wrong, format asked ${format}`;
            }
            return `Field format wrong`;
        },
    }
};

const formCheck = {
    nameInput: document.getElementById('name') as HTMLInputElement,
    nameError: document.querySelector('#name-field .form__field__error') as HTMLElement,
    emailInput: document.getElementById('email') as HTMLInputElement,
    emailError: document.querySelector('#email-field .form__field__error') as HTMLElement,
    messageInput: document.getElementById('message') as HTMLTextAreaElement,
    messageError: document.querySelector('#message-field .form__field__error') as HTMLElement,
    form: document.querySelector('.footer__form') as HTMLFormElement,
    checker(submit:boolean, input:HTMLInputElement|HTMLTextAreaElement, error:HTMLElement, checkEmpty:boolean, min:number, checkEmailFormat:boolean): void {
        if (checkEmpty && input.value === '') {
            error.textContent = settings.errorMessages.emptyInput;
        } else if (input.value.length <= min) {
            error.textContent = settings.errorMessages.tooShort(min);
        } else if (checkEmailFormat && !input.value.match(settings.errorMessages.format.email)) {
            error.textContent = settings.errorMessages.wrongFormat(settings.errorMessages.formatText.email);
        } else {
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
    init(): void {
        this.removeRequired();
        this.nameInput.addEventListener('focusout', () => {
            this.checker(false, this.nameInput, this.nameError, true, 3, false);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.nameInput, this.nameError, true, 3, false);
            })
        })
        this.emailInput.addEventListener('focusout', (e) => {
            this.checker(false, this.emailInput, this.emailError, true, 4, true);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.emailInput, this.emailError, true, 4, true);
            })
        })
        this.messageInput.addEventListener('focusout', (e) => {
            this.checker(false, this.messageInput, this.messageError, true, 10, false);
            this.nameInput.addEventListener('input', () => {
                this.checker(false, this.messageInput, this.messageError, true, 10, false);
            })
        })
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.checker(true, this.messageInput, this.messageError, true, 10, false);
            this.checker(true, this.emailInput, this.emailError, true, 5, true);
            this.checker(true, this.nameInput, this.nameError, true, 3, false);
        })
    }
};

formCheck.init();