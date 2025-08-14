document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle-fill");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percentage = circle.getAttribute("data-percentage");
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;

                // Set initial strokeDasharray and dashoffset
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = circumference;

                // Trigger animation
                setTimeout(() => {
                    const offset = circumference - (percentage / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                }, 100);

                // Unobserve after animation
                observer.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => observer.observe(circle));
});