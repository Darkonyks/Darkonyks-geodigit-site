// HTMX and PAGINATE FIRST AND LAST
document.body.addEventListener('htmx:afterRequest', function(event) {
    if (event.target === document.getElementById('search-form')) {
        var inputElement = document.getElementById('search-input');
        inputElement.value = ''; 
    }
});


var clickableButtons = document.querySelectorAll('.paginate_button');
clickableButtons.forEach(function(button) {
    button.addEventListener('click', function() {

        clickableButtons.forEach(function(element) {
            element.classList.remove('active');
        });

        button.classList.add('active');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        const contentDiv = document.querySelector('.arck-blog-feed-content');
        contentDiv.setAttribute('id', 'posts-content');
    });
});

// SMOOTH SCROLL ON MAIN PAGE
document.addEventListener("DOMContentLoaded", function() {
    var servicesLink = document.getElementById("services-link");
    var dropdownButton = document.querySelector(".dropdown-btn"); 

    servicesLink.addEventListener("click", function(event) {
        event.preventDefault();
        dropdownButton.click();
    });

    const links = document.querySelectorAll("a[href^='#']");
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    const currentURL = window.location.href;
    const iconSr = document.getElementById('language-sr');
    const iconDe = document.getElementById('language-de');
    const iconEn = document.getElementById('language-en');

    switch (true) {
        case currentURL.includes('/sr/'):
            iconSr.style.display = 'none';
            break;
        case currentURL.includes('/de/'):
            iconDe.style.display = 'none';
            break;
        case currentURL.includes('/en/'):
            iconEn.style.display = 'none';
            break;
        default:
            iconEn.style.display = 'none';
            break;
    }
});

