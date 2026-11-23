import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync('app.js','utf8');
for (const [hash, expected] of [['#/join','Where do we begin?'],['#/signin','Find your workspace.'],['#/join/intern','Start with curiosity.'],['#/join/company','Let’s bring it to life.'],['#/signin/intern','Good to see you.'],['#/admin-login','Admin sign in']]) {
 const root={innerHTML:''};
 const context={window:{supabase:{createClient:()=>({auth:{getSession:()=>new Promise(()=>{})}})},addEventListener(){}},document:{querySelector:s=>s==='#app'?root:{innerHTML:''},addEventListener(){}},location:{hash},sessionStorage:{},console};
 vm.runInNewContext(source+'\nroute();',context);
 assert.ok(root.innerHTML.includes(expected), `${hash} should show ${expected}`);
}
console.log('Account route checks passed.');
