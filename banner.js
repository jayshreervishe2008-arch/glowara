document.addEventListener("DOMContentLoaded", () => {

    const slides =
        document.querySelectorAll(".glowara-slide");

    const dots =
        document.querySelectorAll(".glowara-dot");

    const prev =
        document.getElementById("bannerPrev");

    const next =
        document.getElementById("bannerNext");

    if (!slides.length) return;

    let current = 0;
    let timer;


    function showSlide(index) {

        if (index >= slides.length) {
            current = 0;
        }

        else if (index < 0) {
            current = slides.length - 1;
        }

        else {
            current = index;
        }


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === current
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === current
            );

        });

    }


    function startSlider() {

        clearInterval(timer);

        timer = setInterval(() => {

            showSlide(current + 1);

        }, 5000);

    }


    next?.addEventListener(
        "click",
        () => {

            showSlide(current + 1);

            startSlider();

        }
    );


    prev?.addEventListener(
        "click",
        () => {

            showSlide(current - 1);

            startSlider();

        }
    );


    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

                startSlider();

            }
        );

    });


    showSlide(0);

    startSlider();

});