// Dark Mode Scheduling
class DarkModeScheduler {
    constructor() {
        this.scheduleEnabled = false;
        this.startTime = '20:00'; // Default start time (8 PM)
        this.endTime = '06:00';   // Default end time (6 AM)
        
        this.init();
    }

    init() {
        // Load saved settings
        this.loadSettings();
        
        // Initialize UI elements
        this.scheduleToggle = document.getElementById('darkModeSchedule');
        this.scheduleSettings = document.getElementById('darkModeScheduleSettings');
        this.startTimeInput = document.getElementById('darkModeStart');
        this.endTimeInput = document.getElementById('darkModeEnd');
        this.darkModeCheckbox = document.getElementById('enableDarkModeCheckbox');

        // Set up event listeners
        this.scheduleToggle.addEventListener('change', () => this.toggleSchedule());
        this.startTimeInput.addEventListener('change', () => this.updateSchedule());
        this.endTimeInput.addEventListener('change', () => this.updateSchedule());

        // Initialize UI state
        this.scheduleToggle.checked = this.scheduleEnabled;
        this.scheduleSettings.style.display = this.scheduleEnabled ? 'block' : 'none';
        this.startTimeInput.value = this.startTime;
        this.endTimeInput.value = this.endTime;

        // Start checking schedule
        if (this.scheduleEnabled) {
            this.checkSchedule();
            this.startScheduleCheck();
        }
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
            // Reset to manual dark mode state
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
        // Update the checkbox state
        this.darkModeCheckbox.checked = enabled;
        
        // Trigger the dark mode change
        const event = new Event('change');
        this.darkModeCheckbox.dispatchEvent(event);
        
        // Apply dark mode directly
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

        if (startMinutes <= endMinutes) {
            return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
        } else {
            // Handles cases where the time range crosses midnight
            return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
        }
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
}

// Initialize dark mode scheduler when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.darkModeScheduler = new DarkModeScheduler();
}); 