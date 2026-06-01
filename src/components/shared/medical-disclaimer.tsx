import React from 'react';

export default function MedicalDisclaimer() {
    return (
        <div className="my-8 rounded-xl bg-slate-50 p-6 border border-slate-100 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
                {/* Иконка предупреждающего знака (!) */}
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                    !
                </span>
                <h4 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                    Обязательный медицинский дисклеймер
                </h4>
            </div>

            <div className="text-sm md:text-base text-slate-600 leading-relaxed italic space-y-2">
                <p className="font-extrabold text-slate-900 tracking-wider uppercase">
                    ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ. НЕОБХОДИМО ПРОКОНСУЛЬТИРОВАТЬСЯ СО СПЕЦИАЛИСТОМ.
                </p>
                <p>
                    Предоставленная информация носит ознакомительный характер и не может
                    быть использована для самодиагностики или самолечения.
                </p>
            </div>
        </div>
    );
}