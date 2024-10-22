/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for slider.
 */
export class SliderHarness extends Harness {
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.renderRoot.querySelector('input.end');
    }
    getInputs() {
        return [
            this.element.renderRoot.querySelector('input.end'),
            this.element.renderRoot.querySelector('input.start'),
        ];
    }
    getHandles() {
        return [
            this.element.renderRoot.querySelector('.handle.end'),
            this.element.renderRoot.querySelector('.handle.start'),
        ];
    }
    getLabels() {
        return Array.from(this.element.renderRoot.querySelectorAll('.label'));
    }
    isLabelShowing() {
        const labels = this.getLabels();
        return labels.some((l) => {
            // remove transition to avoid the need to wait for it.
            l.style.setProperty('transition', 'none');
            const { width } = l.getBoundingClientRect();
            l.style.removeProperty('transition');
            return width > 0;
        });
    }
    async simulateValueInteraction(value, el) {
        if (!el) {
            el = this.getInputs()[0];
        }
        el.focus();
        el.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }));
        el.value = String(value);
        el.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        el.dispatchEvent(new Event('pointerup', { bubbles: true, composed: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        await this.element.updateComplete;
    }
    positionEventAtHandle(init, startHandle = false) {
        const handle = this.getHandles()[startHandle ? 1 : 0];
        const { x, y } = handle.getBoundingClientRect();
        return { ...init, clientX: x, clientY: y, screenX: x, screenY: y };
    }
    simulateStartHover(element, init = {}) {
        const i = this.getInputs().indexOf(element);
        if (i >= 0 || element === this.element) {
            init = this.positionEventAtHandle(init, i === 1);
        }
        super.simulateStartHover(element, init);
    }
    simulateMousePress(element, init = {}) {
        super.simulateMousePress(element, init);
        // advance beyond RAF, which is used by the element's pointerDown handler.
        jasmine.clock().tick(1);
    }
}
//# sourceMappingURL=harness.js.map