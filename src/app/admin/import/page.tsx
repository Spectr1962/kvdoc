'use client';

import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'; // Только векторный Lucide

export default function AdminImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus(null);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setStatus(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/import', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', text: data.message });
                setFile(null);
            } else {
                setStatus({ type: 'error', text: data.error || 'Произошла ошибка при импорте.' });
            }
        } catch (err) {
            setStatus({ type: 'error', text: 'Сбой соединения с сервером базы данных.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 transition-all duration-300">

                {/* Журнальный минималистичный заголовок Apple Style */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Обновление прейскуранта
                    </h2>
                    <p className="medical-description mt-2">
                        Загрузите файл прейскуранта в формате .csv для мгновенного обновления цен на сайте.
                    </p>
                </div>

                <form onSubmit={handleUpload} className="space-y-6">
                    <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-xl p-6 text-center cursor-pointer transition-colors relative group bg-slate-50/50">
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={loading}
                        />
                        <div className="space-y-2">
                            <div className="mx-auto w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                                <Upload className="w-5 h-5 text-slate-600 stroke-[2]" />
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                {file ? file.name : 'Выберите файл прейскуранта'}
                            </p>
                            <p className="text-xs text-slate-500">
                                Поддерживаются файлы CSV с разделителем «Точка с запятой»
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!file || loading}
                        className={`w-full h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 ${!file || loading
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                            }`}
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Обработка базы данных...
                            </>
                        ) : (
                            'Запустить обновление цен'
                        )}
                    </button>
                </form>

                {/* Информационные плашки статуса */}
                {status && (
                    <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 border ${status.type === 'success'
                            ? 'bg-emerald-50/60 border-emerald-100 text-emerald-800'
                            : 'bg-rose-50/60 border-rose-100 text-rose-800'
                        }`}>
                        {status.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <p className="text-xs font-medium leading-relaxed">{status.text}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
