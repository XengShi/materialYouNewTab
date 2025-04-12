# Contributing to the Project

## Adding a New Feature

1. **Create a new script file**
    - Name the file appropriately to reflect the feature you're adding. For example, if your feature involves animations, the file could be named `animation-feature.js`.
    - Place this new file in the `scripts` directory.

2. **Include the copyright comment**
    - Add the following copyright block at the top of your new script file:
      ```javascript
      /* 
       * Material You NewTab
       * Copyright (c) 2023-2025 XengShi
       * Licensed under the GNU General Public License v3.0 (GPL-3.0)
       * You should have received a copy of the GNU General Public License along with this program. 
       * If not, see <https://www.gnu.org/licenses/>.
       */
      ```  

3. **Integrate the script into the project**
    - Open `index.html` and locate the `<!-- SCRIPTS -->` section.
    - Add your script as follows:
      ```html
      <script defer src="scripts/animation-feature.js"></script>
      ```

4. **Develop your feature**
    - Implement your functionality within the script. Write clean, maintainable code and follow any existing coding standards used in the project.

5. **Update the changelog**
    - Edit [CHANGELOG.md](../CHANGELOG.md) and add your changes under the [Unreleased] section.
    - Group all your changes under the most appropriate categories.

---

## Additional Notes
Ensure you've read the [code of conduct](../CODE_OF_CONDUCT.md) and the [contributing](../CONTRIBUTING.md).
