/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        "bg-slate-400",
        "bg-slate-500",
        "bg-slate-700",
        "border-slate-400",
        "border-slate-500",
        "border-slate-700",
        "border-emerald-500",
    ],
};
