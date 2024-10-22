/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for chips.
 */
export class ChipHarness extends Harness {
    constructor() {
        super(...arguments);
        this.action = 'primary';
    }
    async getInteractiveElement() {
        await this.element.updateComplete;
        const { primaryId } = this.element;
        const primaryAction = primaryId &&
            this.element.renderRoot.querySelector(`#${primaryId}`);
        // Retrieve MultiActionChip's trailingAction
        const { trailingAction } = this.element;
        // Default to trailing action if there isn't a primary action and the user
        // didn't explicitly set `harness.action = 'trailing'` (remove-only input
        // chips).
        if (this.action === 'trailing' || !primaryAction) {
            if (!trailingAction) {
                throw new Error('`ChipHarness.action` is "trailing", but the chip does not have a trailing action.');
            }
            return trailingAction;
        }
        if (!primaryAction) {
            throw new Error('`ChipHarness.action` is "primary", but the chip does not have a primary action.');
        }
        return primaryAction;
    }
}
//# sourceMappingURL=harness.js.map