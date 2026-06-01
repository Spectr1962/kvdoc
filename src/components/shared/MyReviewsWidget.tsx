'use client';

import Script from "next/script";

export default function MyReviewsWidget() {
    return (
        <>
            {/* 
        ИСПРАВЛЕНО: Инлайн-стили с ошибкой justifyInformer полностью удалены.
        Выравнивание и структура переведены на чистые, надежные классы Tailwind.
      */}
            <div className="w-full bg-white rounded-3xl shadow-xs transition-shadow duration-300 hover:shadow-md overflow-hidden p-2 flex justify-center">
                <div
                    id="myReviews__block-widget"
                    className="w-full max-w-[1170px] min-h-[140px] flex justify-center [&_iframe]:!border-none [&_iframe]:!outline-none"
                />
            </div>

            {/* Скачиваем ядро виджета MyReviews */}
            <Script
                src="https://myreviews.dev"
                strategy="afterInteractive"
            />

            {/* Циклический скрипт контроля рендеринга */}
            <Script id="myreviews-init-script" strategy="afterInteractive">
                {`
          (function() {
            var checkInterval = setInterval(function() {
              if (window.myReviews && window.myReviews.BlockWidget && document.getElementById('myReviews__block-widget')) {
                clearInterval(checkInterval);
                try {
                  new window.myReviews.BlockWidget({
                    uuid: "d7ee3db3-89fb-49b8-816b-bf7e31eb14fd",
                    name: "g59830716",
                    additionalFrame: "none",
                    lang: "ru",
                    widgetId: "1"
                  }).init();
                } catch(e) {
                  console.error("Ошибка карусели MyReviews:", e);
                }
              }
            }, 50);

            setTimeout(function() {
              clearInterval(checkInterval);
            }, 5000);
          })();
        `}
            </Script>
        </>
    );
}