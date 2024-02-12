// Funkcija koja se izvršava nakon što se DOM učita
document.addEventListener('DOMContentLoaded', function () {
  // Dohvati trenutnu URL adresu
  const currentUrl = window.location.href;

  // Pronađi sve linkove u navbaru
  const navLinks = document.querySelectorAll('#main-nav li a');
  // Pronađi sve linkove u dropdown meniju
  const dropdownLinks = document.querySelectorAll('.dropdown-menu li a');

  // Proveri svaki link i dodaj event listener na klik
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      // Ukloni sve postojeće indikatore
      const existingIndicators = document.querySelectorAll('.current-indicator');
      existingIndicators.forEach(indicator => indicator.remove());
      // Ukloni klasu "current" sa svih linkova pre postavljanja na kliknuti link
      navLinks.forEach(link => link.classList.remove('currentLink'));
      dropdownLinks.forEach(dropdownLink => dropdownLink.classList.remove('currentLink'));
      // Dodaj klasu "current" kliknutom linku
      this.classList.add('currentLink');
      // Dodaj <span> element s klasom "current-indicator" ispod kliknutog linka
      const indicator = document.createElement('span');
      indicator.classList.add('current-indicator');
      this.appendChild(indicator);
    });
    // Proveri da li je link jednak trenutnoj URL adresi i postavi klasu "current" ako odgovara
    if (link.href === currentUrl || !dropdownLinks) {
      link.classList.add('currentLink');
      // Dodaj <span> element s klasom "current-indicator" ispod aktivnog linka
      const indicator = document.createElement('span');
      indicator.classList.add('current-indicator');
      link.appendChild(indicator);
    }
  });

  // Proveri da li je trenutna URL adresa unutar dropdown menija i postavi klasu "current" ako odgovara
  dropdownLinks.forEach(dropdownLink => {
    if (dropdownLink.href === currentUrl) {
      // Dodaj klasu "currentLink" kliknutom linku iz dropdown menija
      dropdownLink.classList.add('currentLink');
      // Pronađi roditeljski (glavni) link koji pokreće ovaj dropdown
      const parentNavLink = dropdownLink.closest('.dropdown').querySelector('a');
      if (parentNavLink) {
        // Dodaj indikator na roditeljski (glavni) link
        const indicator = document.createElement('span');
        indicator.classList.add('current-indicator');
        parentNavLink.appendChild(indicator);
        parentNavLink.classList.add('currentLink');
      }
    }
  });

  // Dodaj indikator na "SERVICES" link ako je bilo koji od linkova iz dropdown menija selektovan
  // dropdownLinks.forEach(dropdownLink => {
  //   dropdownLink.addEventListener('click', function () {
  //     // Pronađi "SERVICES" link
  //     const servicesLink = document.querySelector('#main-nav li a[href="/services"]');
  //     if (servicesLink) {
  //       // Dodaj indikator na "SERVICES" link
  //       const indicator = document.createElement('span');
  //       indicator.classList.add('current-indicator-inside');
  //       servicesLink.appendChild(indicator);
  //     }
  //   });
  // });
});