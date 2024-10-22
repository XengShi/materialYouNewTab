/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for radio.
 */
export class RadioHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element;
    }
}
//# sourceMappingURL=harness.js.map