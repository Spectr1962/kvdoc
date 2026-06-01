/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",                // Куда складывать сгенерированный Service Worker
    disable: process.env.NODE_ENV === "development", // Отключаем в dev-режиме, чтобы не мешать hot-reload
    register: true,               // Автоматически регистрировать SW
    skipWaiting: true,            // Активировать новый SW сразу, не дожидаясь закрытия вкладок
    cacheOnFrontEndNav: true,     // Кэшировать страницы при переходах через <Link> (критично для offline)
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,         // Перезагружать страницу при восстановлении сети для синхронизации
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
    // Здесь можно разместить стандартные настройки Next.js (например, настройки изображений images.domains)
    reactStrictMode: true,
};

export default withPWA(nextConfig);
