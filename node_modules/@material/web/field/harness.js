/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for field elements.
 */
export class FieldHarness extends Harness {
    async focusWithKeyboard(init = {}) {
        this.element.focused = true;
        await super.focusWithKeyboard(init);
    }
    async focusWithPointer() {
        this.element.focused = true;
        await super.focusWithPointer();
    }
    async blur() {
        this.element.focused = false;
        await super.blur();
    }
    async getInteractiveElement() {
        await this.element.updateComplete;
        return (this.element.querySelector(':not([slot])') ||
            this.element.renderRoot.querySelector('.field'));
    }
}
//# sourceMappingURL=harness.js.map