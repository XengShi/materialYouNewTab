/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for linear-progress.
 */
export class LinearProgressHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.querySelector('.progress');
    }
}
/**
 * Test harness for circular-progress.
 */
export class CircularProgressHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.querySelector('.progress');
    }
}
//# sourceMappingURL=harness.js.map