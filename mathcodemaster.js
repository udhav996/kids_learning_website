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

    let lastActivityTime = Date.now();  // Track last interaction
    let currentExpression = "happy.gif"; // Default expression
    let isSleeping = false;

    function setExpression(expression) {
        currentExpression = expression;
        cartoon.src = expression;
        lastActivityTime = Date.now();
        isSleeping = false;
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

    // Move to active menu at start
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) moveCartoon(activeLink, expressions.home);

    // Menu hover/click
    links.forEach(link => {
        link.addEventListener("mouseenter", function () {
            const menuId = link.innerText.toLowerCase();
            moveCartoon(link, expressions[menuId] || expressions.home);
        });

        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            const menuId = link.innerText.toLowerCase();
            moveCartoon(link, expressions[menuId] || expressions.home);
        });
    });

    // Hover on cartoon triggers angry
    cartoon.addEventListener("mouseenter", function () {
        setExpression(expressions.angry);
    });

    // Periodic sleep checker
    setInterval(() => {
        const now = Date.now();
        if (!isSleeping && now - lastActivityTime > 4000) {
            cartoon.src = expressions.sleepy;
            isSleeping = true;
        }
    }, 1000); // check every second
});
