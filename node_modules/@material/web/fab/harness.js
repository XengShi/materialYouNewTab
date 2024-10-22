/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for floating action buttons.
 */
export class FabHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.renderRoot.querySelector('.fab');
    }
}
//# sourceMappingURL=harness.js.map