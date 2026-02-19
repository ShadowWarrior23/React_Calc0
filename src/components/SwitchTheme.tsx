import React from 'react';
import {useState} from 'react';

const SwitchTheme = () => {
    const [theme, setTheme] = useState<boolean>(false);

    function themeHandler() {
        setTheme(prev => !prev);
    }

    return (
        <button type="button">{"☀️""🦫"}</button>
    )
}

export default SwitchTheme;