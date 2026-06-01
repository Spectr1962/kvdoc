import React from "react";

interface IconProps {
    slug: string;
}

export default function DirectionIcon({ slug }: IconProps) {
    const baseClass = "w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-200 flex-shrink-0";

    switch (slug) {
        case "analizy":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M16 3H8v1a4 4 0 0 0 8 0V3Z" />
                    <path d="M12 7v14M9 11h6M9 16h6" />
                </svg>
            );
        case "ginekologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
            );
        case "gastroenterologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            );
        case "dermatologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 2a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z" />
                    <path d="M12 14v7" />
                </svg>
            );
        case "nevrologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
                    <path d="M12 14v6M9 17h6" />
                </svg>
            );
        case "trihologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 2v16M9 6c0 4.5 6 4.5 6 9" />
                </svg>
            );
        case "allergologiya-immunologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            );
        case "uzi":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            );
        case "lazernaya-epilyaciya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 2v4M12 18v4M4 12h4M16 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
                </svg>
            );
        case "endokrinologiya":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="m12 3-1.912 5.886a1 1 0 0 1-.951.691H2.93a1 1 0 0 0-.588 1.81l5.017 3.645a1 1 0 0 1 .363 1.118L5.81 22.035a1 1 0 0 0 1.54 1.118L12 19.507l4.65 3.376a1 1 0 0 0 1.54-1.118l-1.912-5.885a1 1 0 0 1 .363-1.118l5.017-3.645a1 1 0 0 0-.588-1.81h-6.207a1 1 0 0 1-.951-.69M12 3v16.5" />
                </svg>
            );
        case "massazh":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5M12 2v10M8 6h8" />
                </svg>
            );
        case "procedurnyj-kabinet":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                </svg>
            );
        case "vyezdnye-uslugi":
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v6c0 .6.4 1 1 1h2m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM6 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                </svg>
            );
        default:
            return (
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={baseClass}>
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );
    }
}
