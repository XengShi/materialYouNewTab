/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
import { MenuItemHarness } from './internal/menuitem/harness.js';
export { MenuItemHarness } from './internal/menuitem/harness.js';
/**
 * Test harness for menu.
 */
export class MenuHarness extends Harness {
    /**
     * Shows the menu and returns the first list item element.
     */
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element;
    }
    /** @return ListItem harnesses for the menu's items. */
    getItems() {
        return this.element.items.map((item) => new MenuItemHarness(item));
    }
    async show() {
        const menu = this.element;
        if (menu.open) {
            return;
        }
        const opened = new Promise((resolve) => {
            menu.addEventListener('opened', () => {
                resolve(true);
            }, { once: true });
        });
        menu.show();
        await opened;
    }
}
//# sourceMappingURL=harness.js.map