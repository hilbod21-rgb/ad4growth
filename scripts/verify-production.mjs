import assert from 'node:assert/strict';
const base = process.env.TEST_ORIGIN || 'http://127.0.0.1:3000';
let checks = 0;
const verify = (condition, message) => { assert.ok(condition, message); checks++; };
const links = new Set();
for (const lang of ['de','en','uk','ru']) {
 for (const path of ['', '/google-ads','/chatgpt-ads','/about','/contact','/impressum','/datenschutz']) {
  const r = await fetch(`${base}/${lang}${path}`); const html = await r.text();
  verify(r.status === 200, `${lang}${path}: ${r.status}`);
  verify((html.match(/<h1[ >]/g)||[]).length === 1, 'one H1 '+path);
  verify(html.includes(`lang="${lang}"`), 'html language '+lang);
  verify(html.includes(`href="https://ad4growth.com/${lang}${path}"`), 'canonical '+path);
  verify(!html.includes(`href="/${lang}/insights`), 'blog hidden '+path);
  if (!path || path.includes('-ads')) verify((html.match(/>netto</g)||[]).length >= 2, 'net prices '+path);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) if(!m[1].startsWith('/_next')) links.add(m[1]);
 }
 for (const path of ['/insights','/insights/cpa-vs-cac','/missing-page']) {
  const r=await fetch(`${base}/${lang}${path}`); const html=await r.text();
  verify(r.status===404, 'hidden route '+lang+path);
  verify(html.includes('noindex'), 'noindex '+path);
 }
}
for (const path of links) verify((await fetch(base+path)).ok, 'internal asset/link '+path);
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
verify(!sitemap.includes('/insights'), 'sitemap excludes empty blog');
verify(sitemap.includes('https://ad4growth.com/de'), 'sitemap domain');
const root=await fetch(base,{redirect:'manual'});
verify([307,308].includes(root.status) && root.headers.get('location')==='/de','default German');
async function post(body, origin=base){return fetch(base+'/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body});}
verify((await post('{}')).status===422,'form validation');
verify((await post('{')).status===400,'malformed JSON');
verify((await post('{}','https://invalid.example')).status===403,'cross-origin rejected');
verify((await post('x'.repeat(21000))).status===413,'oversized request');
const inquiry={name:'QA Test',email:'qa@example.invalid',language:'de',services:['google_ads'],message:'Local verification without real delivery',website_confirm:''};
const result=await post(JSON.stringify(inquiry));
verify(result.status===503 && (await result.json()).error==='unconfigured','honest missing email config');
console.log(`${checks} production checks passed. Real email receipt remains unverified.`);
