var swiper = new Swiper(".swiper", {
    loop: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        380: {
            slidesPerView: 1,
            spaceBetween: 18
        },
        580: {
            slidesPerView: 2,
            spaceBetween: 18
        },
        855: {
            slidesPerView: 3,
            spaceBetween: 18
        },
        1188: {
            slidesPerView: 4,
            spaceBetween: 24
        }
    }
});

// console.log("Script do carrossel carregado!");

// const swiper = new Swiper('#container-membros-carrossel', {
//     loop: true,
//     grabCursor: true,
//     slidesPerView: 3,       // Número de slides visíveis
//     spaceBetween: 30,       // Espaço entre os slides
//     centeredSlides: false,  // Não centraliza o slide ativo

//     // If we need pagination
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,

//     },

//     // Navigation arrows
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },

//     breakpoints: {
//         0: {
//             slidesPerView: 1
//         },
//         620: {
//             slidesPerView: 2
//         },
//         1024: {
//             slidesPerView: 1
//         }
//     },

//     slideToClickedSlide: true,
//     watchSlidesProgress: true,
// });