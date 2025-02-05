class DarkModeScheduler {
    constructor() {
        this.scheduleEnabled = false;
        this.startTime = '20:00'; // Default start time (8 PM)
        this.endTime = '06:00';   // Default end time (6 AM)
        this.init();
    }

    init() {
        this.loadSettings();
        this.cacheDOMElements();
        this.setupEventListeners();
        this.initializeUIState();
        
        // Inject CSS for dark mode scheduling
        this.injectCSS();

        if (this.scheduleEnabled) {
            this.checkSchedule();
            this.startScheduleCheck();
        }
    }

    cacheDOMElements() {
        this.scheduleToggle = document.getElementById('darkModeSchedule');
        this.scheduleSettings = document.getElementById('darkModeScheduleSettings');
        this.startTimeInput = document.getElementById('darkModeStart');
        this.endTimeInput = document.getElementById('darkModeEnd');
        this.darkModeCheckbox = document.getElementById('enableDarkModeCheckbox');
    }

    setupEventListeners() {
        this.scheduleToggle.addEventListener('change', () => this.toggleSchedule());
        this.startTimeInput.addEventListener('change', () => this.updateSchedule());
        this.endTimeInput.addEventListener('change', () => this.updateSchedule());
    }

    initializeUIState() {
        this.scheduleToggle.checked = this.scheduleEnabled;
        this.scheduleSettings.style.display = this.scheduleEnabled ? 'block' : 'none';
        this.startTimeInput.value = this.startTime;
        this.endTimeInput.value = this.endTime;
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('darkModeSettings') || '{}');
        this.scheduleEnabled = settings.enabled || false;
        this.startTime = settings.startTime || '20:00';
        this.endTime = settings.endTime || '06:00';
    }

    saveSettings() {
        const settings = {
            enabled: this.scheduleEnabled,
            startTime: this.startTime,
            endTime: this.endTime
        };
        localStorage.setItem('darkModeSettings', JSON.stringify(settings));
    }

    toggleSchedule() {
        this.scheduleEnabled = this.scheduleToggle.checked;
        this.scheduleSettings.style.display = this.scheduleEnabled ? 'block' : 'none';

        if (this.scheduleEnabled) {
            this.checkSchedule();
            this.startScheduleCheck();
        } else {
            this.stopScheduleCheck();
            this.setDarkMode(this.darkModeCheckbox.checked);
        }

        this.saveSettings();
    }

    updateSchedule() {
        this.startTime = this.startTimeInput.value;
        this.endTime = this.endTimeInput.value;
        this.checkSchedule();
        this.saveSettings();
    }

    checkSchedule() {
        if (!this.scheduleEnabled) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const shouldBeDark = this.isTimeBetween(currentTime, this.startTime, this.endTime);

        this.setDarkMode(shouldBeDark);
    }

    setDarkMode(enabled) {
        this.darkModeCheckbox.checked = enabled;
        this.darkModeCheckbox.dispatchEvent(new Event('change'));

        if (enabled) {
            document.documentElement.classList.add('dark-theme');
            document.body.setAttribute('data-bg', 'color');
        } else {
            document.documentElement.classList.remove('dark-theme');
            document.body.setAttribute('data-bg', 'color');
        }
    }

    isTimeBetween(current, start, end) {
        const currentMinutes = this.timeToMinutes(current);
        const startMinutes = this.timeToMinutes(start);
        const endMinutes = this.timeToMinutes(end);

        return startMinutes <= endMinutes
            ? currentMinutes >= startMinutes && currentMinutes <= endMinutes
            : currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }

    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    startScheduleCheck() {
        this.scheduleInterval = setInterval(() => this.checkSchedule(), 60000); // Check every minute
    }

    stopScheduleCheck() {
        if (this.scheduleInterval) {
            clearInterval(this.scheduleInterval);
        }
    }

    // Function to inject CSS styles into the document
    injectCSS() {
        const style = document.createElement('style');
        style.type = 'text/css';
        const css = `
            /* Dark Mode Schedule Settings */
            .dark-mode-schedule-settings {
                margin-top: 15px;
                padding: 10px 15px;
                background-color: var(--accentLightTint-blue);
                border-radius: 15px;
                display: none;
            }

            .time-settings {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 10px;
            }

            .time-input {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }

            .time-input input[type="time"] {
                padding: 5px 10px;
                border: 1px solid var(--darkColor-blue);
                border-radius: 8px;
                background-color: var(--whitishColor-blue);
                color: var(--textColorDark-blue);
                font-size: 14px;
            }

            .time-input input[type="time"]:focus {
                outline: none;
                border-color: var(--darkerColor-blue);
            }

            /* Dark mode schedule switch specific styles */
            .dark-mode-schedule .switch {
                margin-left: 10px;
            }

            /* When dark mode is scheduled and active */
            body.dark-mode-scheduled {
                background-color: var(--bg-color-dark);
                color: var(--textColorDark-dark);
            }

            body.dark-mode-scheduled .time-input input[type="time"] {
                background-color: var(--darkColor-dark);
                color: var(--textColorDark-dark);
                border-color: var(--darkerColor-dark);
            }
        `;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
    }
}

// Initialize dark mode scheduler when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeScheduler = new DarkModeScheduler();
});
