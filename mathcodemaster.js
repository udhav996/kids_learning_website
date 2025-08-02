document.querySelectorAll('.quiz-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        let color = card.getAttribute('data-color');
        card.style.background = `linear-gradient(135deg, ${color}, rgba(255, 255, 255, 0.2))`;
        card.style.transform = "translateY(-5px)";
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = "rgba(255, 255, 255, 0.1)";
        card.style.transform = "translateY(0)";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartoon = document.getElementById("cartoon");
    const links = document.querySelectorAll(".nav-link");
    let idleTimer;

    const expressions = {
        home: "happy.gif",
        "learn math": "angel.gif",
        "numbers & counting": "happy.gif",
        addition: "happy.gif",
        subtraction: "happy.gif",
        multiplication: "sweat.gif",
        division: "happy.gif",
        shapes: "happy.gif",
        fractions: "happy.gif",
        measurements: "happy.gif",
        "learn english": "sweat.gif",
        "alphabet & phonics": "happy.gif",
        "sight words & spelling": "tongue-out.gif",
        grammar: "angel.gif",
        "sentence formation": "happy.gif",
        "grammar 2": "happy.gif",
        exams: "sick.gif",
        games: "tongue-out.gif",
        tools: "angel.gif",
        sleepy: "sleep.gif",
        angry: "angry.gif"
    };

    function setExpression(expression) {
        clearTimeout(idleTimer);
        cartoon.src = expression;
        idleTimer = setTimeout(() => {
            cartoon.src = expressions.sleepy;
        }, 4000);
    }

    function moveCartoon(target, expression) {
        setExpression(expression);

        const rect = target.getBoundingClientRect();
        const navbarRect = document.querySelector(".navbar").getBoundingClientRect();
        let newX = rect.left + rect.width / 2 - navbarRect.left;

        gsap.to(cartoon, {
            x: newX - 50,
            duration: 0.5,
            ease: "power2.out"
        });
    }

    // Move to default active link on page load
    let activeLink = document.querySelector(".nav-link.active");
    if (activeLink) moveCartoon(activeLink, expressions.home);

    // Hover + click on menu items
    links.forEach(link => {
        link.addEventListener("mouseenter", function () {
            let menuId = link.innerText.toLowerCase();
            moveCartoon(link, expressions[menuId] || expressions.home);
        });

        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            let menuId = link.innerText.toLowerCase();
            moveCartoon(link, expressions[menuId] || expressions.home);
        });
    });

    // Hover effect on cartoon itself
    cartoon.addEventListener("mouseenter", function () {
        setExpression(expressions.angry);
    });

    cartoon.addEventListener("mouseleave", function () {
        // Do NOT reset to active menu manually, let sleep happen naturally
    });
});
