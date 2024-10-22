/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../../../testing/harness.js';
/**
 * Test harness for list item.
 */
export class ListItemHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.renderRoot.querySelector('.list-item');
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
}
//# sourceMappingURL=harness.js.map