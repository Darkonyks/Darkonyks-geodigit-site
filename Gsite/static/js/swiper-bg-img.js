var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(index){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

	// On Hover Show text in point area
	document.addEventListener('DOMContentLoaded', function() {
		var pointerIndicators = document.querySelectorAll('.archx-point-area .archx-pointer-indicatior');
		var pointerTexts = document.querySelectorAll('.archx-point-area .archx-pointer-text');

		pointerIndicators.forEach(function(pointerIndicator, index) {
			var pointerText = pointerTexts[index];


			pointerIndicator.addEventListener('mouseover', function() {
			 pointerText.classList.add('show');
			});

			pointerIndicator.addEventListener('mouseout', function() {
			pointerText.classList.remove('show');
			});
		});
		
	});

    // Pronalazi sve elemente sa klasom "arck-service-item"
    var serviceItems = document.getElementsByClassName("arck-service-item");
	// Pronalazi sekciju sa odgovarajućim ID-om
	var section = document.getElementById("archx-project-2");

	var titleSerialService = document.querySelector(".title-serial-service")

    // Iterira kroz sve pronađene elemente
    for (var i = 0; i < serviceItems.length; i++) {
        // Dodaje slušaoca događaja hover na svaki element
        serviceItems[i].addEventListener("mouseover", function() {
            // Uklanja klasu "active" sa svih elemenata
            for (var j = 0; j < serviceItems.length; j++) {
                serviceItems[j].classList.remove("active");
            }
            // Dodaje klasu "active" na hoverovani element
            this.classList.add("active");

            // Pronalazi sliku unutar hoverovanog elementa
            var img = this.querySelector("img");
			
            if (img) {
                // Dohvata vrednost atributa "src" iz slike
                var imgUrl = img.getAttribute("src");
				var title = this.querySelector(".oldsite-font-service").firstChild.textContent;
                // Ažurira vrednost atributa "data-background" sa vrednošću "src" iz slike
                section.setAttribute("data-background", imgUrl);
                section.style.backgroundImage = "url('" + imgUrl + "')";
				setTimeout(function() {
					titleSerialService.innerText = title	
				}, 200);
				
					 
            }
			
        });
    }