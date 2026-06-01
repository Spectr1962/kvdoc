'use client';

export function ContactsBlock() {
    return (
        <section id="contacts" className="py-20 bg-white border-t border-slate-100 scroll-mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Ждем вас</span>
                            <h2 className="text-3xl font-extrabold text-slate-950 mt-1 tracking-tight">
                                Контакты и запись
                            </h2>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                Медицинский центр КВ-ДОК расположен в доступной локации города Зеленограда. Свяжитесь с нами для предварительной записи.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Адрес клиники</h4>
                                <p className="text-sm text-slate-600 mt-0.5">г. Москва, г. Зеленоград, Георгиевский проспект, д. 37, к. 3</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Регистратура</h4>
                                <a href="tel:+74951222178" className="text-sm text-slate-600 hover:text-blue-600 font-semibold block mt-0.5 transition">
                                    +7 (495) 122-21-78
                                </a>
                                <a href="mailto:citilabzel@yandex.ru" className="text-xs text-slate-400 hover:text-blue-600 block mt-1 transition">
                                    citilabzel@yandex.ru
                                </a>
                            </div>

                            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 space-y-1">
                                <p className="font-medium text-slate-500">ООО "ВЕРБМЕД"</p>
                                <p>ИНН: 8603243520</p>
                                <p>Лицензия: Л041-01137-77/00336955</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 w-full h-[450px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-xs relative">
                        <iframe
                            src="https://yandex.ru"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            loading="lazy"
                            title="Схема проезда КВ-ДОК Зеленоград"
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
