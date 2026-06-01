export const siteConfig = {
    name: "Медицинский Центр «КВ-ДОК»",
    description: "Многопрофильная клиника экспертной медицины для всей семьи. Современная диагностика, высокоточные анализы и врачи высшей категории.",
    url: "http://localhost:3000",
    contacts: {
        phone: "+7 (495) 123-45-67",
        email: "info@kvdoc-clinic.ru",
        address: "г. Москва, ул. Центральная, д. 24",
        hours: "Ежедневно: с 8:00 до 21:00",
    },
    mainNav: [
        { title: "О клинике", href: "/about" },
        { title: "Услуги", href: "/services" },
        { title: "Врачи", href: "/doctors" },
        { title: "Блог", href: "/blog" },
        { title: "Контакты", href: "/contacts" },
    ]
};

export type SiteConfig = typeof siteConfig;
