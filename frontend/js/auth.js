document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    const loginForm =
        document.getElementById("loginForm");


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            handleRegister
        );

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }

});


async function handleRegister(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value.trim();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById(
            "registerConfirmPassword"
        ).value;

    const message =
        document.getElementById("registerMessage");
        // Name validation - only letters and spaces allowed
const namePattern = /^[A-Za-z ]+$/;

if (!namePattern.test(name)) {

    message.textContent =
        "Name should contain only characters.";

    message.style.color = "#d62828";

    return;
}


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.style.color = "#d62828";

        return;

    }


    try {

        const response = await fetch(
            "/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Registration failed"
            );

        }


        message.textContent =
            "Account created successfully!";

        message.style.color = "#198754";


        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1200);


    } catch (error) {

        console.error(error);

        message.textContent =
            error.message;

        message.style.color =
            "#d62828";

    }

}


async function handleLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");


    try {

        const response = await fetch(
            "/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Login failed"
            );

        }


        localStorage.setItem(
            "glowaraUser",
            JSON.stringify(data.user)
        );


        if (data.token) {

            localStorage.setItem(
                "glowaraToken",
                data.token
            );

        }


        message.textContent =
            "Login successful!";

        message.style.color =
            "#198754";


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 800);


    } catch (error) {

        console.error(error);

        message.textContent =
            error.message;

        message.style.color =
            "#d62828";

    }

}
// =========================
// LOGOUT FUNCTION
// =========================

function logoutGlowaraUser() {

    localStorage.removeItem("glowaraUser");
    localStorage.removeItem("glowaraToken");

    window.location.href = "login.html";
}