// =============================================
// RESUME FORGE — APPLICATION LOGIC
// =============================================

let expCount = 0;
let eduCount = 0;

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  addExperience();
  addEducation();
  updatePreview();
});

// ==================== DYNAMIC ENTRIES ====================

function addExperience() {
  expCount++;
  const id = `exp_${expCount}`;
  const container = document.getElementById('experienceList');
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.id = id;
  card.innerHTML = `
    <button class="entry-remove" onclick="removeEntry('${id}')" title="Remove">✕</button>
    <div class="form-row">
      <div class="form-field">
        <label>Job Title</label>
        <input type="text" data-exp="${id}" data-field="title" placeholder="e.g. Software Engineer" oninput="updatePreview()" />
      </div>
      <div class="form-field">
        <label>Company / Organisation</label>
        <input type="text" data-exp="${id}" data-field="company" placeholder="e.g. Acme Corp" oninput="updatePreview()" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <label>Start Date</label>
        <input type="text" data-exp="${id}" data-field="start" placeholder="Jan 2022" oninput="updatePreview()" />
      </div>
      <div class="form-field">
        <label>End Date</label>
        <input type="text" data-exp="${id}" data-field="end" placeholder="Present" oninput="updatePreview()" />
      </div>
    </div>
    <div class="form-field">
      <label>Description <span class="label-hint">(responsibilities & achievements)</span></label>
      <textarea data-exp="${id}" data-field="desc" rows="3" placeholder="• Led a team of 5 engineers to deliver a microservices migration, reducing latency by 40%..." oninput="updatePreview()"></textarea>
    </div>
  `;
  container.appendChild(card);
  updatePreview();
}

function addEducation() {
  eduCount++;
  const id = `edu_${eduCount}`;
  const container = document.getElementById('educationList');
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.id = id;
  card.innerHTML = `
    <button class="entry-remove" onclick="removeEntry('${id}')" title="Remove">✕</button>
    <div class="form-row">
      <div class="form-field">
        <label>Degree / Qualification</label>
        <input type="text" data-edu="${id}" data-field="degree" placeholder="e.g. B.Sc. Computer Science" oninput="updatePreview()" />
      </div>
      <div class="form-field">
        <label>Institution</label>
        <input type="text" data-edu="${id}" data-field="school" placeholder="e.g. MIT" oninput="updatePreview()" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-field">
        <label>Graduation Year</label>
        <input type="text" data-edu="${id}" data-field="year" placeholder="e.g. 2023" oninput="updatePreview()" />
      </div>
      <div class="form-field">
        <label>Grade / GPA <span class="label-hint">(optional)</span></label>
        <input type="text" data-edu="${id}" data-field="grade" placeholder="e.g. First Class / 3.9 GPA" oninput="updatePreview()" />
      </div>
    </div>
  `;
  container.appendChild(card);
  updatePreview();
}

function removeEntry(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'all 0.2s';
    setTimeout(() => { el.remove(); updatePreview(); }, 200);
  }
}

// ==================== LIVE PREVIEW UPDATE ====================

function updatePreview() {
  // ---- Personal Info ----
  const name = val('fullName') || 'Your Name';
  const jobTitle = val('jobTitle') || 'Job Title';
  const summary = val('summary');

  document.getElementById('rp-name').textContent = name;
  document.getElementById('rp-title').textContent = jobTitle;

  // ---- Contact ----
  const email = val('email');
  const phone = val('phone');
  const location = val('location');
  const linkedin = val('linkedin');

  setText('rp-email-disp', email);
  setText('rp-phone-disp', phone);
  setText('rp-location-disp', location);
  setText('rp-linkedin-disp', linkedin);

  // ---- Summary ----
  const summarySection = document.getElementById('rp-summary-section');
  const summaryText = document.getElementById('rp-summary-text');
  if (summary) {
    summarySection.classList.remove('hidden');
    summaryText.textContent = summary;
  } else {
    summarySection.classList.add('hidden');
  }

  // ---- Skills ----
  const skillsSection = document.getElementById('rp-skills-section');
  const skillsWrap = document.getElementById('rp-skills-wrap');
  const skillsRaw = val('skills');
  if (skillsRaw) {
    const tags = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
    skillsWrap.innerHTML = tags.map(t =>
      `<span class="rp-skill-tag">${escapeHtml(t)}</span>`
    ).join('');
    skillsSection.classList.remove('hidden');
  } else {
    skillsSection.classList.add('hidden');
  }

  // ---- Experience ----
  const expSection = document.getElementById('rp-exp-section');
  const expList = document.getElementById('rp-exp-list');
  const expCards = document.querySelectorAll('[data-exp]');
  const expGroups = groupByKey(expCards, 'exp');

  let expHTML = '';
  for (const [id, fields] of Object.entries(expGroups)) {
    const title = fields['title'] || '';
    const company = fields['company'] || '';
    const start = fields['start'] || '';
    const end = fields['end'] || '';
    const desc = fields['desc'] || '';

    if (!title && !company) continue;

    const dateRange = [start, end].filter(Boolean).join(' – ');
    expHTML += `
      <div class="rp-exp-item">
        <div class="rp-item-header">
          <span class="rp-item-title">${escapeHtml(title)}</span>
          ${dateRange ? `<span class="rp-item-date">${escapeHtml(dateRange)}</span>` : ''}
        </div>
        ${company ? `<div class="rp-item-org">${escapeHtml(company)}</div>` : ''}
        ${desc ? `<div class="rp-item-desc">${escapeHtml(desc).replace(/\n/g, '<br/>')}</div>` : ''}
      </div>
    `;
  }

  if (expHTML) {
    expList.innerHTML = expHTML;
    expSection.classList.remove('hidden');
  } else {
    expSection.classList.add('hidden');
  }

  // ---- Education ----
  const eduSection = document.getElementById('rp-edu-section');
  const eduList = document.getElementById('rp-edu-list');
  const eduCards = document.querySelectorAll('[data-edu]');
  const eduGroups = groupByKey(eduCards, 'edu');

  let eduHTML = '';
  for (const [id, fields] of Object.entries(eduGroups)) {
    const degree = fields['degree'] || '';
    const school = fields['school'] || '';
    const year = fields['year'] || '';
    const grade = fields['grade'] || '';

    if (!degree && !school) continue;

    eduHTML += `
      <div class="rp-edu-item">
        <div class="rp-item-header">
          <span class="rp-item-title">${escapeHtml(degree)}</span>
          ${year ? `<span class="rp-item-date">${escapeHtml(year)}</span>` : ''}
        </div>
        ${school ? `<div class="rp-item-org">${escapeHtml(school)}</div>` : ''}
        ${grade ? `<div class="rp-item-desc">Grade: ${escapeHtml(grade)}</div>` : ''}
      </div>
    `;
  }

  if (eduHTML) {
    eduList.innerHTML = eduHTML;
    eduSection.classList.remove('hidden');
  } else {
    eduSection.classList.add('hidden');
  }
}

// ==================== PDF DOWNLOAD ====================

function downloadPDF() {
  const name = val('fullName') || 'resume';
  const filename = name.toLowerCase().replace(/\s+/g, '_') + '_resume.pdf';

  const element = document.getElementById('resumePreview').cloneNode(true);

  // Apply print-friendly inline styles for pdf
  element.style.fontFamily = "'DM Sans', 'Helvetica', sans-serif";
  element.style.background = '#ffffff';
  element.style.padding = '0';
  element.style.minHeight = 'unset';

  const opt = {
    margin: 0,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Show loading state
  const btn = document.querySelector('.btn-download');
  const btnHeader = document.querySelector('.btn-download-header');
  const btnSm = document.querySelector('.btn-download-sm');
  if (btn) { btn.innerHTML = '<span>Generating...</span>'; btn.disabled = true; }
  if (btnHeader) { btnHeader.textContent = '⏳ Generating...'; btnHeader.disabled = true; }
  if (btnSm) { btnSm.textContent = '⏳...'; btnSm.disabled = true; }

  html2pdf().set(opt).from(element).save().then(() => {
    if (btn) { btn.innerHTML = '<span>↓ Download PDF</span>'; btn.disabled = false; }
    if (btnHeader) { btnHeader.textContent = '↓ Download PDF'; btnHeader.disabled = false; }
    if (btnSm) { btnSm.textContent = '↓ PDF'; btnSm.disabled = false; }
  }).catch(err => {
    console.error('PDF error:', err);
    if (btn) { btn.innerHTML = '<span>↓ Download PDF</span>'; btn.disabled = false; }
    if (btnHeader) { btnHeader.textContent = '↓ Download PDF'; btnHeader.disabled = false; }
    if (btnSm) { btnSm.textContent = '↓ PDF'; btnSm.disabled = false; }
  });
}

// ==================== CLEAR ALL ====================

function clearAll() {
  if (!confirm('Clear all fields and start fresh?')) return;

  ['fullName','jobTitle','summary','email','phone','location','linkedin','skills'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  document.getElementById('experienceList').innerHTML = '';
  document.getElementById('educationList').innerHTML = '';
  expCount = 0;
  eduCount = 0;

  addExperience();
  addEducation();
  updatePreview();
}

// ==================== UTILITIES ====================

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function groupByKey(nodeList, dataKey) {
  const groups = {};
  nodeList.forEach(el => {
    const id = el.getAttribute(`data-${dataKey}`);
    const field = el.getAttribute('data-field');
    if (!groups[id]) groups[id] = {};
    groups[id][field] = el.value.trim();
  });
  return groups;
}
