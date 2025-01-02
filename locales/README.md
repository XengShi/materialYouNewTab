## Adding a New Translation

1. **Create a new translation file**
    - Name the file using the appropriate language code (e.g., `de.js` for German or `ar.js` for Arabic).
    - Place this file in the `locales` directory.

2. **Add the locale to `index.html`**
    - Open `index.html` and locate the `<!-- LANGUAGES SCRIPTS -->` section.
    - Add your new locale script tag in the correct order, as follows:
      ```html
      <script src="locales/de.js"></script>
      ```

3. **Test the translation**
    - Verify that your translations are displayed correctly when the respective locale is selected.

4. **Keep translations consistent**
    - Follow the structure of existing translation files to ensure consistency across all locales.

5. **Subscribe to Translation Updates for Contributors** (optional)
   - Join the #195 channel or mailing list to receive notifications about new lines being added to translations.

6. **Update the Currently Supported Languages section in the `README.md`**
    - Add the new language to the list of supported languages in the README, following the existing format.
