function animatedForm() {
    const arrows = document.querySelectorAll(".fa-arrow-down");

    arrows.forEach(arrow => {
        arrow.addEventListener("click", () => {
            const input = arrow.previousElementSibling;
            const parent = arrow.parentElement;
            const nextForm = parent.nextElementSibling;

            //Check for validation
            if (input.type === "text" && validateUser(input)) {
                nextSlide(parent, nextForm);
            } else if (input.type === 'email' && validateEmail(input)) {
                nextSlide(parent, nextForm);
            } else if (input.type === 'password' && validatePass(input)) {
                nextSlide(parent, nextForm);
            } else {
                parent.style.animation = "shake 0.5s ease";
            }
            //To get rid of animation
            parent.addEventListener("animationend", () => {
                parent.style.animation = "";
            });
        });
    });
}

function validateUser(user) {
    if (user.value.length < 6) {
        showToast("Not enough characters!");
        error('rgb(189,87,87)');
    } else {
        error('rgb(87,189,130)');
        return true;
    }
}
function validatePass(pass) {
    if (pass.value.length < 6) {
        showToast("Longer password required!");
        error('rgb(189,87,87)');
    } else {
        error('rgb(87,189,130)');
        return true;
    }
}

function validateEmail(email) {
    const validation =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validation.test(email.value)) {
        error('rgb(87,189,130)');
        return true;
    } else {
        error('rgb(189,87,87)');
        showToast("Enter a valid email address!");
    }

}

function error(color) {
    document.body.style.backgroundColor = color;
}

function nextSlide(parent, nextForm) {
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
}

function showToast(message) {
    const toast = document.getElementById("snackbar");
    toast.innerText = message;
    // Add the "show" class to DIV
    toast.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

animatedForm();