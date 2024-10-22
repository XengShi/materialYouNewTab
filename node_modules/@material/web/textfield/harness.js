/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Harness } from '../testing/harness.js';
/**
 * Test harness for text field elements.
 */
export class TextFieldHarness extends Harness {
    constructor() {
        super(...arguments);
        /** Used to track whether or not a change event should be dispatched. */
        this.valueBeforeChange = '';
    }
    /**
     * Simulates a user typing a value one character at a time. This will fire
     * multiple input events.
     *
     * Use focus/blur to ensure change events are fired.
     *
     * @example
     * await harness.focusWithKeyboard();
     * await harness.inputValue('value'); // input events
     * await harness.blur(); // change event
     *
     * @param value The value to simulating typing.
     */
    async inputValue(value) {
        for (const char of value) {
            this.simulateKeypress(await this.getInteractiveElement(), char);
            this.simulateInput(await this.getInteractiveElement(), char);
        }
    }
    /**
     * Simulates a user deleting part of a value with the backspace key.
     * By default, the entire value is deleted. This will fire a single input
     * event.
     *
     * Use focus/blur to ensure change events are fired.
     *
     * @example
     * await harness.focusWithKeyboard();
     * await harness.deleteValue(); // input event
     * await harness.blur(); // change event
     *
     * @param beginIndex The starting index of the value to delete.
     * @param endIndex The ending index of the value to delete.
     */
    async deleteValue(beginIndex, endIndex) {
        this.simulateKeypress(await this.getInteractiveElement(), 'Backspace');
        this.simulateDeletion(await this.getInteractiveElement(), beginIndex, endIndex);
    }
    async reset() {
        this.element.reset();
        this.valueBeforeChange = this.element.value;
        await super.reset();
    }
    async blur() {
        await super.blur();
        this.simulateChangeIfNeeded(await this.getInteractiveElement());
    }
    simulatePointerFocus(input) {
        const textField = this.element;
        if (textField.disabled) {
            return;
        }
        this.valueBeforeChange = textField.value;
        super.simulatePointerFocus(input);
    }
    simulateInput(element, charactersToAppend, init) {
        element.value += charactersToAppend;
        if (!init) {
            init = {
                inputType: 'insertText',
                composed: true,
                bubbles: true,
                isComposing: false,
                data: charactersToAppend,
            };
        }
        element.dispatchEvent(new InputEvent('input', init));
    }
    simulateDeletion(element, beginIndex, endIndex, init) {
        const deletedCharacters = element.value.slice(beginIndex, endIndex);
        element.value =
            element.value.substring(0, beginIndex ?? 0) +
                element.value.substring(endIndex ?? element.value.length);
        if (!init) {
            init = {
                inputType: 'deleteContentBackward',
                composed: true,
                bubbles: true,
                isComposing: false,
                data: deletedCharacters,
            };
        }
        element.dispatchEvent(new InputEvent('input', init));
    }
    simulateChangeIfNeeded(element) {
        if (this.valueBeforeChange === element.value) {
            return;
        }
        this.valueBeforeChange = element.value;
        element.dispatchEvent(new Event('change'));
    }
    async getInteractiveElement() {
        await this.element.updateComplete;
        return this.element.renderRoot.querySelector('.input');
    }
}
//# sourceMappingURL=harness.js.map