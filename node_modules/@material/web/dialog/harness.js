/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for dialog.
 */
export class DialogHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return (this.element.querySelector('[autocomplete]') ?? this.element);
    }
}
//# sourceMappingURL=harness.js.map