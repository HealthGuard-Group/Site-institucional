class NavbarMobile {

    // Inicializando os elementos
    constructor(menuMobile, navList, navLinks, camadaEscura) {
        this.menuMobile = document.querySelector(menuMobile)
        this.navList = document.querySelector(navList)
        this.navLinks = document.querySelectorAll(navLinks)
        this.camadaEscura = document.querySelector(camadaEscura)
        this.activeClass = "active"

        this.handleClick = this.handleClick.bind(this);
    }

    // animateLinks() {
    //     this.navLinks.forEach(link) => {
    //         link.style.animation
    //             ? (link.style.animation = "")
    //             : (link.style.animation = )
    //     }
    // }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.menuMobile.classList.toggle(this.activeClass);
        this.camadaEscura.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.menuMobile.addEventListener("click", () => this.handleClick())
    }

    // Verifica se o menu existe
    init() {
        if (this.menuMobile) {
            this.addClickEvent();
        }
        return this;
    }
}

const navbarMobile = new NavbarMobile(
    ".menu-mobile",
    "#nav-list",
    "#nav-list li",
    ".camada-escura"
);

navbarMobile.init();
