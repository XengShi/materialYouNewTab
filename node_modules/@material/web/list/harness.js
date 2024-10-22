/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
import { ListItemHarness } from './internal/listitem/harness.js';
export { ListItemHarness } from './internal/listitem/harness.js';
const NAVIGABLE_KEYS = {
    'ArrowDown': 'ArrowDown',
    'ArrowUp': 'ArrowUp',
    'Home': 'Home',
    'End': 'End',
};
/**
 * Test harness for list.
 */
export class ListHarness extends Harness {
    /**
     * Returns the first list item element.
     */
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element;
    }
    /** @return List item harnesses. */
    getItems() {
        return this.element.items.map((item) => new ListItemHarness(item));
    }
    /**
     * Constructs keyboard events that are handled by List and makes sure that
     * they are constructed in a manner that List understands.
     *
     * @param key The key to dispatch on the list.
     */
    async pressHandledKey(key) {
        await this.keypress(key, { code: key });
    }
    /**
     * Dispatches a keypress on the list. It may or may not be a supported event.
     *
     * @param key The key to dispatch on the list.
     */
    async keypress(key, init = {}) {
        init = { code: key, ...init };
        await super.keypress(key, init);
    }
}
//# sourceMappingURL=harness.js.map