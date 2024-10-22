/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for Tab.
 */
export class TabHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element;
    }
    async completeIndicatorAnimation() {
        await this.element.updateComplete;
        const indicator = this.element.renderRoot.querySelector('.indicator');
        const animations = indicator.getAnimations();
        for (const animation of animations) {
            animation.finish();
        }
    }
    async isIndicatorShowing() {
        await this.completeIndicatorAnimation();
        const indicator = this.element.renderRoot.querySelector('.indicator');
        const opacity = getComputedStyle(indicator)['opacity'];
        return opacity === '1';
    }
}
/**
 * Test harness for Tabs.
 */
export class TabsHarness extends Harness {
    // Note, Tabs interactive element is the interactive element of the
    // selected tab.
    async getInteractiveElement() {
        await this.element.updateComplete;
        if (!this.element.activeTab) {
            return this.element;
        }
        const selectedItemHarness = this.element.activeTab
            .harness ?? new TabHarness(this.element.activeTab);
        return await selectedItemHarness.getInteractiveElement();
    }
    get harnessedItems() {
        return this.element.tabs.map((item) => {
            return (item.harness ?? new TabHarness(item));
        });
    }
}
//# sourceMappingURL=harness.js.map