import { useEffect } from 'react';

function ModeSelector({ modes, mode, setMode }) {

    useEffect(() => {
        document.getElementsByClassName('primary-mode')[0].classList.toggle('active-mode');
        document.getElementsByClassName('secondary-mode')[0].classList.toggle('active-mode');
    }, [mode]);

    return (
        <div className="mode-section">
                    <div className="mode-buttons">
                        <button className="primary-mode active-mode" onClick={() => setMode(modes[0])}>{modes[0]}</button>
                        <button className="secondary-mode" onClick={() => setMode(modes[1])}>{modes[1]}</button>
                    </div>
        </div>
    );
}

export default ModeSelector;