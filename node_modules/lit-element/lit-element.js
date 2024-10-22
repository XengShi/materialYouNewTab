import{ReactiveElement as t}from"@lit/reactive-element";export*from"@lit/reactive-element";import{render as e,noChange as s}from"lit-html";export*from"lit-html";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class r extends t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=e(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return s}}r._$litElement$=!0,r["finalized"]=!0,globalThis.litElementHydrateSupport?.({LitElement:r});const i=globalThis.litElementPolyfillSupport;i?.({LitElement:r});const o={_$AK:(t,e,s)=>{t._$AK(e,s)},_$AL:t=>t._$AL};(globalThis.litElementVersions??=[]).push("4.1.1");export{r as LitElement,o as _$LE};
//# sourceMappingURL=lit-element.js.map
