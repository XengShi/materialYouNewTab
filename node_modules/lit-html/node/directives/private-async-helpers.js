/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=async(t,s)=>{for await(const i of t)if(!1===await s(i))return};class s{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class i{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){this.Z??=new Promise((t=>this.q=t))}resume(){this.q?.(),this.Z=this.q=void 0}}export{i as Pauser,s as PseudoWeakRef,t as forAwaitOf};
//# sourceMappingURL=private-async-helpers.js.map
