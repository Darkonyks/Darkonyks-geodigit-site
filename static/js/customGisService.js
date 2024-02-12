const arckServiceItems = document.querySelectorAll('.arck-service-item');
const section = document.getElementById('archx-project-2'); // ID sekcije koju želite ažurirati
const servicesTitle = document.querySelector('.title-serial-service');

arckServiceItems.forEach(item => {
    const hoverImg = item.querySelector('.hover-img img');
    const serviceLink = item.querySelector('a');

    item.addEventListener('mouseenter', () => {
        const newBackgroundImage = hoverImg.src;
        const newTitle = serviceLink.innerText;
        servicesTitle.innerText = newTitle;
        // Ažurirajte vrednost data-background atributa u section elementu
        section.setAttribute('data-background', newBackgroundImage);

        // Ažurirajte background-image stil u section elementu
        section.style.backgroundImage = `url(${newBackgroundImage})`;
    });

    // Dodajte sledeće linije ako želite vratiti originalne vrednosti kada korisnik prestane da hoveruje
    item.addEventListener('mouseout', () => {
        const originalBackgroundImage = section.getAttribute('data-background');
        
        // Vratite originalnu vrednost data-background atributa u section elementu
        section.setAttribute('data-background', originalBackgroundImage);

        // Vratite originalni background-image stil u section elementu
        section.style.backgroundImage = `url(${originalBackgroundImage})`;
    });
});