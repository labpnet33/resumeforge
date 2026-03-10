/* =============================================
   RESUMEFORGE — app.js
   ============================================= */

// ---- STATE ----
let currentTemplate = 'classic';
let accentColor = '#2563eb';
let zoomLevel = 0.85;
let skills = [];
let expCount = 0;
let eduCount = 0;
let langCount = 0;
let certCount = 0;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  applyZoom();
  addExperience();
  addEducation();
  addLanguage();
  updatePreview();
  // highlight first sidebar item
  highlightSidebarItem('sec-personal');
});

// ===================== TEMPLATE =====================

function toggleTemplatePanel() {
  document.getElementById('templatePanel').classList.toggle('open');
  document.getElementById('templateOverlay').classList.toggle('open');
}

function setTemplate(name, card) {
  currentTemplate = name;
  // update card highlights
  document.querySelectorAll('.tp-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  // show/hide template wrappers
  ['classic','modern','executive','minimal'].forEach(t => {
    const el = document.getElementById('tpl-' + t);
    if (el) el.style.display = (t === name) ? 'block' : 'none';
  });
  updatePreview();
  toggleTemplatePanel();
}

function setAccent(color, el) {
  accentColor = color;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  document.documentElement.style.setProperty('--accent', color);
  // derive slightly darker shade
  document.documentElement.style.setProperty('--accent-dark', color);
  updatePreview();
}

// ===================== ZOOM =====================

function changeZoom(delta) {
  zoomLevel = Math.min(1.4, Math.max(0.4, zoomLevel + delta));
  applyZoom();
}

function applyZoom() {
  document.getElementById('resumeDoc').style.transform = `scale(${zoomLevel})`;
  document.getElementById('resumeDoc').style.transformOrigin = 'top center';
  document.getElementById('zoomLabel').textContent = Math.round(zoomLevel * 100) + '%';
}

// ===================== SIDEBAR NAV =====================

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  highlightSidebarItem(id);
  return false;
}

function highlightSidebarItem(id) {
  document.querySelectorAll('.ss-item').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
}

// ===================== ENTRY BUILDERS =====================

function addExperience() {
  expCount++;
  const id = 'exp' + expCount;
  const list = document.getElementById('expList');
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = id;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-num">Position ${expCount}</span>
      <div class="entry-actions">
        <button class="entry-btn entry-btn-remove" onclick="removeEntry('${id}')">✕ Remove</button>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Job Title</label>
        <input type="text" data-eid="${id}" data-f="title" placeholder="Software Engineer" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Company</label>
        <input type="text" data-eid="${id}" data-f="company" placeholder="Acme Inc." oninput="updatePreview()"/>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Start Date</label>
        <input type="text" data-eid="${id}" data-f="start" placeholder="Jan 2022" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>End Date</label>
        <input type="text" data-eid="${id}" data-f="end" placeholder="Present" oninput="updatePreview()"/>
      </div>
    </div>
    <div class="field-group">
      <label>Location <span class="optional">(optional)</span></label>
      <input type="text" data-eid="${id}" data-f="loc" placeholder="San Francisco, CA / Remote" oninput="updatePreview()"/>
    </div>
    <div class="field-group">
      <label>Description</label>
      <textarea data-eid="${id}" data-f="desc" rows="4" placeholder="• Led a team of 5 engineers to build a real-time dashboard, reducing report generation time by 60%&#10;• Architected a microservices migration that improved system uptime to 99.9%" oninput="updatePreview()"></textarea>
    </div>
  `;
  list.appendChild(div);
  updatePreview();
}

function addEducation() {
  eduCount++;
  const id = 'edu' + eduCount;
  const list = document.getElementById('eduList');
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = id;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-num">Education ${eduCount}</span>
      <div class="entry-actions">
        <button class="entry-btn entry-btn-remove" onclick="removeEntry('${id}')">✕ Remove</button>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Degree / Qualification</label>
        <input type="text" data-eid="${id}" data-f="degree" placeholder="B.Sc. Computer Science" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Institution</label>
        <input type="text" data-eid="${id}" data-f="school" placeholder="Massachusetts Institute of Technology" oninput="updatePreview()"/>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Start Year</label>
        <input type="text" data-eid="${id}" data-f="start" placeholder="2018" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>End Year / Expected</label>
        <input type="text" data-eid="${id}" data-f="end" placeholder="2022" oninput="updatePreview()"/>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Grade / GPA <span class="optional">(optional)</span></label>
        <input type="text" data-eid="${id}" data-f="grade" placeholder="3.9 / 4.0 — Magna Cum Laude" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Field of Study <span class="optional">(optional)</span></label>
        <input type="text" data-eid="${id}" data-f="field" placeholder="Artificial Intelligence" oninput="updatePreview()"/>
      </div>
    </div>
  `;
  list.appendChild(div);
  updatePreview();
}

function addLanguage() {
  langCount++;
  const id = 'lang' + langCount;
  const list = document.getElementById('langList');
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = id;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-num">Language ${langCount}</span>
      <div class="entry-actions">
        <button class="entry-btn entry-btn-remove" onclick="removeEntry('${id}')">✕ Remove</button>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Language</label>
        <input type="text" data-eid="${id}" data-f="lang" placeholder="Spanish" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Proficiency Level</label>
        <select data-eid="${id}" data-f="level" onchange="updatePreview()">
          <option value="">Select level</option>
          <option value="Native">Native</option>
          <option value="Fluent">Fluent (C2)</option>
          <option value="Advanced">Advanced (C1)</option>
          <option value="Intermediate">Intermediate (B2)</option>
          <option value="Elementary">Elementary (B1)</option>
          <option value="Basic">Basic (A1/A2)</option>
        </select>
      </div>
    </div>
  `;
  list.appendChild(div);
  updatePreview();
}

function addCert() {
  certCount++;
  const id = 'cert' + certCount;
  const list = document.getElementById('certList');
  const div = document.createElement('div');
  div.className = 'entry-card';
  div.id = id;
  div.innerHTML = `
    <div class="entry-header">
      <span class="entry-num">Certification ${certCount}</span>
      <div class="entry-actions">
        <button class="entry-btn entry-btn-remove" onclick="removeEntry('${id}')">✕ Remove</button>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Certification Name</label>
        <input type="text" data-eid="${id}" data-f="name" placeholder="AWS Certified Solutions Architect" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Issuing Organization</label>
        <input type="text" data-eid="${id}" data-f="org" placeholder="Amazon Web Services" oninput="updatePreview()"/>
      </div>
    </div>
    <div class="field-row">
      <div class="field-group">
        <label>Date Issued</label>
        <input type="text" data-eid="${id}" data-f="date" placeholder="March 2023" oninput="updatePreview()"/>
      </div>
      <div class="field-group">
        <label>Credential ID / URL <span class="optional">(optional)</span></label>
        <input type="text" data-eid="${id}" data-f="url" placeholder="credential.net/abc123" oninput="updatePreview()"/>
      </div>
    </div>
  `;
  list.appendChild(div);
  updatePreview();
}

function removeEntry(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.transition = 'opacity 0.2s, transform 0.2s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-6px)';
    setTimeout(() => { el.remove(); updatePreview(); }, 210);
  }
}

// ===================== SKILLS =====================

function skillKeydown(e) {
  if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
}

function addSkill() {
  const input = document.getElementById('skillInput');
  const val = input.value.trim();
  if (!val || skills.includes(val)) { input.value = ''; return; }
  skills.push(val);
  input.value = '';
  renderSkillChips();
  updatePreview();
}

function removeSkill(idx) {
  skills.splice(idx, 1);
  renderSkillChips();
  updatePreview();
}

function renderSkillChips() {
  const container = document.getElementById('skillChips');
  container.innerHTML = skills.map((s, i) => `
    <div class="skill-chip">
      <span>${esc(s)}</span>
      <button onclick="removeSkill(${i})">✕</button>
    </div>
  `).join('');
}

// ===================== CHAR COUNT =====================

function charCount(el, countId) {
  const counter = document.getElementById(countId);
  if (counter) counter.textContent = el.value.length;
}

// ===================== GATHER DATA =====================

function gatherEntries(dataKey) {
  const els = document.querySelectorAll(`[data-eid][data-f]`);
  const groups = {};
  els.forEach(el => {
    const id = el.getAttribute('data-eid');
    if (!id.startsWith(dataKey)) return;
    const field = el.getAttribute('data-f');
    if (!groups[id]) groups[id] = {};
    groups[id][field] = el.value.trim();
  });
  return Object.values(groups);
}

function gatherContactItems() {
  const items = [];
  const email = v('email'), phone = v('phone');
  const loc = [v('location'), v('country')].filter(Boolean).join(', ');
  const linkedin = v('linkedin'), website = v('website');
  if (email) items.push(email);
  if (phone) items.push(phone);
  if (loc) items.push(loc);
  if (linkedin) items.push(linkedin);
  if (website) items.push(website);
  return items;
}

// ===================== EXPERIENCE HTML =====================

function expHTML_classic(entries) {
  return entries.filter(e => e.title || e.company).map(e => `
    <div class="cl-item">
      <div class="cl-item-row">
        <span class="cl-item-title">${esc(e.title||'')}</span>
        <span class="cl-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span>
      </div>
      <div class="cl-item-sub">${esc(e.company||'')}${e.loc ? ' · ' + esc(e.loc) : ''}</div>
      ${e.desc ? `<div class="cl-item-desc">${esc(e.desc)}</div>` : ''}
    </div>
  `).join('');
}

function eduHTML_classic(entries) {
  return entries.filter(e => e.degree || e.school).map(e => `
    <div class="cl-item">
      <div class="cl-item-row">
        <span class="cl-item-title">${esc(e.degree||'')}${e.field ? ', ' + esc(e.field) : ''}</span>
        <span class="cl-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span>
      </div>
      <div class="cl-item-sub">${esc(e.school||'')}</div>
      ${e.grade ? `<div class="cl-item-desc">${esc(e.grade)}</div>` : ''}
    </div>
  `).join('');
}

function certHTML_classic(entries) {
  return entries.filter(e => e.name).map(e => `
    <div class="cl-cert-item">
      <div class="cl-cert-name">${esc(e.name)}</div>
      <div class="cl-cert-org">${esc(e.org||'')}${e.date ? ' · ' + esc(e.date) : ''}</div>
    </div>
  `).join('');
}

function langHTML_classic(entries) {
  return entries.filter(e => e.lang).map(e =>
    `<div class="cl-lang-item">${esc(e.lang)}${e.level ? ' <span>— ' + esc(e.level) + '</span>' : ''}</div>`
  ).join('');
}

// ===================== MAIN UPDATE =====================

function updatePreview() {
  const firstName = v('firstName'), lastName = v('lastName');
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Your Name';
  const jobTitle = v('jobTitle');
  const summary = v('summary');
  const photoUrl = v('photoUrl');
  const contactItems = gatherContactItems();

  const expEntries = gatherEntries('exp');
  const eduEntries = gatherEntries('edu');
  const langEntries = gatherEntries('lang');
  const certEntries = gatherEntries('cert');
  const hasExp = expEntries.some(e => e.title || e.company);
  const hasEdu = eduEntries.some(e => e.degree || e.school);
  const hasLang = langEntries.some(e => e.lang);
  const hasCert = certEntries.some(e => e.name);

  // ---- CLASSIC ----
  setTxt('cl-name', fullName);
  setTxt('cl-jobtitle', jobTitle);
  setPhoto('cl-photo', 'cl-photo-wrap', photoUrl);

  // contact
  document.getElementById('cl-contact').innerHTML = contactItems.map(i => `<span class="cl-contact-item">${esc(i)}</span>`).join('');

  // summary
  toggleSection('cl-summary-wrap', !!summary);
  setTxt('cl-summary', summary);

  // exp
  toggleSection('cl-exp-wrap', hasExp);
  document.getElementById('cl-exp-list').innerHTML = expHTML_classic(expEntries);

  // edu
  toggleSection('cl-edu-wrap', hasEdu);
  document.getElementById('cl-edu-list').innerHTML = eduHTML_classic(eduEntries);

  // skills
  toggleSection('cl-skills-wrap', skills.length > 0);
  document.getElementById('cl-skills-list').innerHTML = skills.map(s => `<span class="cl-skill-tag">${esc(s)}</span>`).join('');

  // lang
  toggleSection('cl-lang-wrap', hasLang);
  document.getElementById('cl-lang-list').innerHTML = langHTML_classic(langEntries);

  // cert
  toggleSection('cl-cert-wrap', hasCert);
  document.getElementById('cl-cert-list').innerHTML = certHTML_classic(certEntries);

  // ---- MODERN ----
  setTxt('mo-name', fullName);
  setTxt('mo-jobtitle', jobTitle);
  setPhoto('mo-photo', 'mo-photo-wrap', photoUrl);
  document.getElementById('mo-contact').innerHTML = contactItems.map(i => `<div class="mo-contact-item">${esc(i)}</div>`).join('');

  toggleSection('mo-summary-wrap', !!summary);
  setTxt('mo-summary', summary);

  toggleSection('mo-exp-wrap', hasExp);
  document.getElementById('mo-exp-list').innerHTML = expEntries.filter(e => e.title || e.company).map(e => `
    <div class="mo-item">
      <div class="mo-item-row"><span class="mo-item-title">${esc(e.title||'')}</span><span class="mo-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="mo-item-sub">${esc(e.company||'')}${e.loc?' · '+esc(e.loc):''}</div>
      ${e.desc?`<div class="mo-item-desc">${esc(e.desc)}</div>`:''}
    </div>`).join('');

  toggleSection('mo-edu-wrap', hasEdu);
  document.getElementById('mo-edu-list').innerHTML = eduEntries.filter(e => e.degree || e.school).map(e => `
    <div class="mo-item">
      <div class="mo-item-row"><span class="mo-item-title">${esc(e.degree||'')}${e.field?', '+esc(e.field):''}</span><span class="mo-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="mo-item-sub">${esc(e.school||'')}</div>
      ${e.grade?`<div class="mo-item-desc">${esc(e.grade)}</div>`:''}
    </div>`).join('');

  toggleSection('mo-skills-wrap', skills.length > 0);
  document.getElementById('mo-skills-list').innerHTML = skills.map(s => `<div class="mo-skill-row">${esc(s)}</div>`).join('');

  toggleSection('mo-lang-wrap', hasLang);
  document.getElementById('mo-lang-list').innerHTML = langEntries.filter(e=>e.lang).map(e =>
    `<div class="mo-lang-item">${esc(e.lang)}<div class="mo-lang-level">${esc(e.level||'')}</div></div>`).join('');

  toggleSection('mo-cert-wrap', hasCert);
  document.getElementById('mo-cert-list').innerHTML = certEntries.filter(e=>e.name).map(e =>
    `<div class="mo-cert-item"><div class="mo-cert-name">${esc(e.name)}</div><div class="mo-cert-org">${esc(e.org||'')}${e.date?' · '+esc(e.date):''}</div></div>`).join('');

  // ---- EXECUTIVE ----
  setTxt('ex-name', fullName);
  setTxt('ex-jobtitle', jobTitle);
  document.getElementById('ex-contact').innerHTML = contactItems.map(i => `<div>${esc(i)}</div>`).join('');

  toggleSection('ex-summary-wrap', !!summary);
  setTxt('ex-summary', summary);

  toggleSection('ex-exp-wrap', hasExp);
  document.getElementById('ex-exp-list').innerHTML = expEntries.filter(e=>e.title||e.company).map(e=>`
    <div class="ex-item">
      <div class="ex-item-top"><span class="ex-item-title">${esc(e.title||'')}</span><span class="ex-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="ex-item-org">${esc(e.company||'')}${e.loc?' · '+esc(e.loc):''}</div>
      ${e.desc?`<div class="ex-item-desc">${esc(e.desc)}</div>`:''}
    </div>`).join('');

  toggleSection('ex-edu-wrap', hasEdu);
  document.getElementById('ex-edu-list').innerHTML = eduEntries.filter(e=>e.degree||e.school).map(e=>`
    <div class="ex-item">
      <div class="ex-item-top"><span class="ex-item-title">${esc(e.degree||'')}${e.field?', '+esc(e.field):''}</span><span class="ex-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="ex-item-org">${esc(e.school||'')}</div>
      ${e.grade?`<div class="ex-item-desc">${esc(e.grade)}</div>`:''}
    </div>`).join('');

  toggleSection('ex-skills-wrap', skills.length > 0);
  document.getElementById('ex-skills-list').innerHTML = skills.map(s=>`<span class="ex-skill-tag">${esc(s)}</span>`).join('');

  toggleSection('ex-cert-wrap', hasCert);
  document.getElementById('ex-cert-list').innerHTML = certEntries.filter(e=>e.name).map(e=>`
    <div class="ex-cert-item"><span class="ex-cert-name">${esc(e.name)}</span>${e.org?' — <span class="ex-cert-org">'+esc(e.org)+'</span>':''}${e.date?' · '+esc(e.date):''}</div>`).join('');

  // ---- MINIMAL ----
  setTxt('mn-name', fullName);
  setTxt('mn-jobtitle', jobTitle);
  document.getElementById('mn-contact').innerHTML = contactItems.map(i=>`<span class="mn-contact-item">${esc(i)}</span>`).join('');

  toggleSection('mn-summary-wrap', !!summary);
  setTxt('mn-summary', summary);

  toggleSection('mn-exp-wrap', hasExp);
  document.getElementById('mn-exp-list').innerHTML = expEntries.filter(e=>e.title||e.company).map(e=>`
    <div class="mn-item">
      <div class="mn-item-row"><span class="mn-item-title">${esc(e.title||'')}</span><span class="mn-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="mn-item-org">${esc(e.company||'')}${e.loc?' · '+esc(e.loc):''}</div>
      ${e.desc?`<div class="mn-item-desc">${esc(e.desc)}</div>`:''}
    </div>`).join('');

  toggleSection('mn-edu-wrap', hasEdu);
  document.getElementById('mn-edu-list').innerHTML = eduEntries.filter(e=>e.degree||e.school).map(e=>`
    <div class="mn-item">
      <div class="mn-item-row"><span class="mn-item-title">${esc(e.degree||'')}${e.field?', '+esc(e.field):''}</span><span class="mn-item-date">${esc([e.start,e.end].filter(Boolean).join(' – '))}</span></div>
      <div class="mn-item-org">${esc(e.school||'')}</div>
      ${e.grade?`<div class="mn-item-desc">${esc(e.grade)}</div>`:''}
    </div>`).join('');

  toggleSection('mn-skills-wrap', skills.length > 0);
  document.getElementById('mn-skills-list').innerHTML = skills.map(s=>`<span class="mn-skill-tag">${esc(s)}</span>`).join('');

  toggleSection('mn-cert-wrap', hasCert);
  document.getElementById('mn-cert-list').innerHTML = certEntries.filter(e=>e.name).map(e=>`
    <div class="mn-cert-item"><span class="mn-cert-name">${esc(e.name)}</span>${e.org?' — <span class="mn-cert-org">'+esc(e.org)+'</span>':''}${e.date?' · '+esc(e.date):''}</div>`).join('');
}

// ===================== PDF DOWNLOAD (FIXED) =====================

async function downloadPDF() {
  const overlay = document.getElementById('pdfOverlay');
  overlay.classList.add('show');

  try {
    // Temporarily reset zoom and make sure correct template is full-size
    const doc = document.getElementById('resumeDoc');
    const prevTransform = doc.style.transform;
    doc.style.transform = 'scale(1)';
    doc.style.transformOrigin = 'top left';

    // Wait for fonts/render
    await new Promise(r => setTimeout(r, 300));

    // Find the active template element
    const tplEl = document.getElementById('tpl-' + currentTemplate);

    const canvas = await html2canvas(tplEl, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: tplEl.scrollWidth,
      height: tplEl.scrollHeight,
      windowWidth: tplEl.scrollWidth,
      windowHeight: tplEl.scrollHeight,
    });

    // Restore zoom
    doc.style.transform = prevTransform;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageW = 210; // A4 mm
    const pageH = 297;
    const imgW = canvas.width;
    const imgH = canvas.height;
    const ratio = imgW / imgH;
    const pdfH = pageW / ratio;

    if (pdfH <= pageH) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pageW, pdfH);
    } else {
      // Multi-page: split
      let yPos = 0;
      let remainH = imgH;
      const sliceH = Math.round((pageH / pageW) * imgW);

      while (remainH > 0) {
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgW;
        sliceCanvas.height = Math.min(sliceH, remainH);
        const ctx = sliceCanvas.getContext('2d');
        ctx.drawImage(canvas, 0, yPos, imgW, sliceCanvas.height, 0, 0, imgW, sliceCanvas.height);

        if (yPos > 0) pdf.addPage();
        const sliceImg = sliceCanvas.toDataURL('image/jpeg', 0.95);
        const slicePdfH = (sliceCanvas.height / imgW) * pageW;
        pdf.addImage(sliceImg, 'JPEG', 0, 0, pageW, slicePdfH);

        yPos += sliceCanvas.height;
        remainH -= sliceCanvas.height;
      }
    }

    const firstName = v('firstName') || 'resume';
    const lastName = v('lastName') || '';
    const filename = [firstName, lastName].filter(Boolean).join('_').toLowerCase() + '_resume.pdf';
    pdf.save(filename);

  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Could not generate PDF. Please try again.');
  } finally {
    overlay.classList.remove('show');
  }
}

// ===================== CLEAR ALL =====================

function clearAll() {
  if (!confirm('Clear all fields and start fresh?')) return;
  ['firstName','lastName','jobTitle','photoUrl','email','phone','location','country','linkedin','website','summary'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('expList').innerHTML = '';
  document.getElementById('eduList').innerHTML = '';
  document.getElementById('langList').innerHTML = '';
  document.getElementById('certList').innerHTML = '';
  skills = [];
  expCount = eduCount = langCount = certCount = 0;
  renderSkillChips();
  addExperience();
  addEducation();
  updatePreview();
}

// ===================== UTILS =====================

function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function setTxt(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function toggleSection(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? '' : 'none';
}

function setPhoto(imgId, wrapId, url) {
  const img = document.getElementById(imgId);
  const wrap = document.getElementById(wrapId);
  if (!img || !wrap) return;
  if (url) {
    img.src = url;
    wrap.style.display = '';
  } else {
    wrap.style.display = 'none';
  }
}
