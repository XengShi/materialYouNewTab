/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for icon buttons.
 */
export class IconButtonHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        if (this.element.href) {
            return this.element.renderRoot.querySelector('a');
        }
        return this.element.renderRoot.querySelector('button');
    }
}
//# sourceMappingURL=harness.js.map