import React, { useEffect } from 'react';
import { useState } from 'react';

type ThemeType = 'dark' | 'light';

function saveTheme(themeMode: ThemeType) {
    localStorage.setItem('currTheme', themeMode);
}

function getTheme(): ThemeType{
    const t = localStorage.getItem('currTheme');
    if (!t) {
        return 'dark';
    }
    return t as ThemeType;
}

document.documentElement.classList.add('.dark');
const SwitchTheme = () => {
    const [theme, setTheme] = useState<ThemeType>('dark');

    useEffect(() => {
        const savedTheme = getTheme();
        document.documentElement.classList.toggle('light');
        if (savedTheme === 'light') document.documentElement.classList.add('light');
    }, [])

    function themeHandler() {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
        saveTheme(theme);
    }

    return (
        <button type="button" onClick={themeHandler}>{theme === 'light' ? "🦫" : "☀️"}</button>
    )
}

export default SwitchTheme;