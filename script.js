const CFG = window.UTM_CONFIG;

const EMAIL_KEY = 'utm_builder_email';
const toList = v => (Array.isArray(v) ? v : [v]);
// Элемент словаря: строка или { label: "человеческое значение", value: "код в метке" }
const asOption = v => (typeof v === 'object' ? v : { label: v, value: v });
const labelOf = key => (CFG.labels && CFG.labels[key]) || key;

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Очищает строку, возвращает null если строка пустая или мусорная
function slugify(text) {
    if (!text) return null;
    let clean = String(text).trim().toLowerCase();
    if (['', 'string', 'none', 'null'].includes(clean)) return null;
    clean = clean.replace(/[\s_]+/g, '-');
    clean = clean.replace(/[^a-z0-9-]/g, '');
    clean = clean.replace(/-+/g, '-');
    clean = clean.replace(/^-+|-+$/g, '');
    return clean || null;
}

// Аналог urllib.parse.quote_plus
function quotePlus(s) {
    return encodeURIComponent(s)
        .replace(/[!'()*~]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())
        .replace(/%20/g, '+');
}

function isAllowed(email) {
    if (!CFG.allowedUsers.length) return true;
    const e = (email || '').trim().toLowerCase();
    return CFG.allowedUsers.some(u => u.toLowerCase() === e);
}

function setLocked(locked) {
    document.getElementById('app-fields').disabled = locked;
    document.getElementById('unlock-btn').style.display = 'block';
    document.getElementById('unlock-btn').innerText = locked ? 'Войти' : 'Сменить e-mail';
}

function unlock() {
    const emailEl = document.getElementById('user_email');
    const fieldset = document.getElementById('app-fields');
    // повторное нажатие при открытой форме = выход
    if (!fieldset.disabled) {
        setLocked(true);
        document.getElementById('result-box').style.display = 'none';
        try { localStorage.removeItem(EMAIL_KEY); } catch (e) { /* ignore */ }
        emailEl.value = '';
        emailEl.focus();
        showStatus('Введите e-mail из списка разрешённых', 'info');
        return;
    }
    if (!isAllowed(emailEl.value)) {
        setLocked(true);
        showStatus('Доступ запрещён: e-mail не в списке разрешённых', 'error');
        return;
    }
    try { localStorage.setItem(EMAIL_KEY, emailEl.value.trim()); } catch (e) { /* ignore */ }
    setLocked(false);
    showStatus('Доступ открыт', 'success');
}

// ───────────── Потоки ─────────────

function findFlow(direction) {
    return CFG.flows.find(f => f.direction === direction) || null;
}
function findOption(flow, label) {
    return flow ? (flow.options.find(o => o.label === label) || null) : null;
}

function buildLink(data) {
    if (!isAllowed(data.user_email)) {
        throw new Error('Доступ запрещён: e-mail не в списке разрешённых');
    }

    const baseUrl = (data.base_url || '').trim();
    if (!/^https?:\/\/.+/.test(baseUrl) || baseUrl.length < 5) {
        throw new Error('Базовый URL должен начинаться с http:// или https://');
    }

    // utm_source / utm_medium / фиксированные сущности должны соответствовать выбранному потоку
    const flow = findFlow(data.direction);
    if (!flow) throw new Error(`Неизвестное направление: ${data.direction || '(пусто)'}`);
    const option = findOption(flow, data.flow_option);
    if (!option) throw new Error(`Не выбрано: ${flow.question}`);
    if (!toList(option.utm_source).includes(data.utm_source)) {
        throw new Error(`Недопустимый utm_source: ${data.utm_source || '(пусто)'}`);
    }
    if (!toList(option.utm_medium).includes(data.utm_medium)) {
        throw new Error(`Недопустимый utm_medium: ${data.utm_medium || '(пусто)'}`);
    }
    for (const [key, val] of Object.entries(option.fixed || {})) {
        if (data[key] !== val) throw new Error(`${labelOf(key)} для этого направления фиксирован: ${val}`);
    }

    const parts = [];
    for (const key of CFG.campaignParts) {
        const v = slugify(data[key]);
        if (CFG.required.includes(key)) {
            if (v === null) throw new Error(`Некорректное значение: ${labelOf(key)}`);
            parts.push(v);
        } else if (v) {
            const prefix = CFG.prefixes[key];
            parts.push(prefix ? `${prefix}-${v}` : v);
        }
    }
    const campaign = parts.join('_');

    const sep = baseUrl.includes('?') ? '&' : '?';

    // Медийка/Performance с рекламными макросами: utm_campaign/content/term берутся из шаблона площадки
    const macros = option.macros && CFG.macroTemplates && CFG.macroTemplates[option.macros];
    if (macros) {
        const head = `utm_source=${quotePlus(data.utm_source)}&utm_medium=${quotePlus(data.utm_medium)}`;
        return { final_url: `${baseUrl}${sep}${head}${macros}`, campaign_debug: campaign };
    }

    const params = [
        ['utm_source', data.utm_source],
        ['utm_medium', data.utm_medium],
        ['utm_campaign', campaign],
    ];
    const t = slugify(data.utm_term);
    if (t) params.push(['utm_term', t]);
    const c = slugify(data.utm_content);
    if (c) params.push(['utm_content', c]);

    const query = params.map(([k, v]) => `${quotePlus(k)}=${quotePlus(v)}`).join('&');
    return { final_url: `${baseUrl}${sep}${query}`, campaign_debug: campaign };
}

// ───────────── Отрисовка полей ─────────────

function fieldHtml({ id, label, required, values, freeText, disabledText }) {
    let input;
    if (values) {
        input = `<select id="${id}" class="input-field" style="background-color: white;">
            <option value="">${escapeHtml(disabledText || '-- Выберите --')}</option>
            ${values.map(v => {
                const o = asOption(v);
                return `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`;
            }).join('')}
        </select>`;
    } else if (freeText) {
        input = `<input type="text" id="${id}" class="input-field" placeholder="...">`;
    } else {
        input = `<input type="text" id="${id}" class="input-field" readonly placeholder="${escapeHtml(disabledText || '')}">`;
    }
    return `<label class="label-text field-label" for="${id}" style="${required ? 'color: #2563eb;' : ''}">
            <span>${escapeHtml(label)}${required ? ' ●' : ''}</span><span class="tag-auto">авто</span>
        </label>${input}`;
}

function addField(container, opts) {
    const div = document.createElement('div');
    div.className = 'field';
    div.id = `field-${opts.id}`;
    div.innerHTML = fieldHtml(opts);
    container.appendChild(div);
    return div;
}

function renderCampaignFields() {
    const req = document.getElementById('campaign-required-fields');
    const opt = document.getElementById('campaign-optional-fields');
    CFG.campaignParts.forEach(name => {
        const isRequired = CFG.required.includes(name);
        const isFreeText = CFG.freeText.includes(name);
        const values = CFG.dictionaries[name];
        const hasData = values && values.length > 0;
        addField(isRequired ? req : opt, {
            id: name, label: labelOf(name), required: isRequired,
            values: !isFreeText && hasData ? values : null,
            freeText: isFreeText || !hasData,
        });
    });
    const extra = document.getElementById('extra-utm-fields');
    CFG.extraUtms.forEach(name => addField(extra, { id: name, label: name, freeText: true }));
}

function renderDirection() {
    const box = document.getElementById('direction-field');
    addField(box, { id: 'direction', label: 'Направление', required: true, values: CFG.flows.map(f => f.direction) });
    document.getElementById('direction').addEventListener('change', onDirectionChange);
    renderOption(null);
}

// Второй вопрос потока (площадка / где размещается / тип рассылки)
function renderOption(flow) {
    const box = document.getElementById('option-field');
    box.innerHTML = '';
    if (!flow) { renderFlowUtm(null, null); return; }
    addField(box, { id: 'flow_option', label: flow.question, required: true, values: flow.options.map(o => o.label) });
    const sel = document.getElementById('flow_option');
    sel.addEventListener('change', () => applyOption(flow, findOption(flow, sel.value)));
    if (flow.options.length === 1) sel.value = flow.options[0].label;
    applyOption(flow, findOption(flow, sel.value));
}

// utm_source / utm_medium: одно значение — подставляется автоматом, несколько — выбор
function renderFlowUtm(flow, option) {
    const box = document.getElementById('flow-utm-fields');
    box.innerHTML = '';
    const defs = [
        { id: 'utm_source', label: 'utm_source' },
        { id: 'utm_medium', label: (flow && flow.mediumLabel) ? `${flow.mediumLabel} · utm_medium` : 'utm_medium' },
    ];
    defs.forEach(d => {
        const val = option ? option[d.id] : null;
        const list = val ? toList(val) : null;
        const multi = list && list.length > 1;
        const wrap = addField(box, {
            id: d.id, label: d.label, required: true,
            values: multi ? list : null,
            disabledText: option ? '-- Выберите --' : 'Сначала выберите направление',
        });
        const el = wrap.querySelector('.input-field');
        if (list && !multi) {
            el.value = list[0];
            el.classList.add('is-auto');
            wrap.classList.add('is-auto');
        }
    });
}

// Фиксированные сущности utm_campaign: предзаполняются и блокируются
function applyFixed(option) {
    const fixed = (option && option.fixed) || {};
    CFG.campaignParts.forEach(name => {
        const el = document.getElementById(name);
        const wrap = document.getElementById(`field-${name}`);
        if (!el || !wrap) return;
        if (name in fixed) {
            const v = fixed[name];
            if (el.tagName === 'SELECT' && ![...el.options].some(o => o.value === v)) {
                const known = (CFG.dictionaries[name] || []).map(asOption).find(o => o.value === v);
                el.add(new Option(known ? known.label : v, v));
            }
            el.value = v;
            el.disabled = true;
            el.dataset.auto = '1';
            wrap.classList.add('is-auto');
            const details = wrap.closest('details');
            if (details) details.open = true;
        } else if (el.dataset.auto === '1') {
            el.disabled = false;
            el.value = '';
            delete el.dataset.auto;
            wrap.classList.remove('is-auto');
        }
    });
    updateCounts();
}

// При макросах utm_content / utm_term задаёт шаблон площадки — скрываем поля и чистим значения
function toggleExtraUtms(hidden) {
    document.getElementById('extra-utm').style.display = hidden ? 'none' : '';
    if (hidden) {
        CFG.extraUtms.forEach(name => {
            const el = document.getElementById(name);
            if (el) el.value = '';
        });
        updateCounts();
    }
}

function applyOption(flow, option) {
    renderFlowUtm(flow, option);
    applyFixed(option);
    toggleExtraUtms(!!(option && option.macros));
}

function onDirectionChange() {
    renderOption(findFlow(document.getElementById('direction').value));
}

function updateCounts() {
    const count = ids => ids.filter(id => {
        const el = document.getElementById(id);
        return el && el.value.trim();
    }).length;
    const set = (elId, n) => {
        const el = document.getElementById(elId);
        el.textContent = n ? `заполнено: ${n}` : '';
        el.classList.toggle('has-value', n > 0);
    };
    set('campaign-optional-count', count(CFG.campaignParts.filter(n => !CFG.required.includes(n))));
    set('extra-utm-count', count(CFG.extraUtms));
}

// ───────────── Генерация статы ─────────────

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8VjyJZxaBdAhRT-DVJVcEmKaY2as2ROE6MKVINEmmdDhPI4as5phxDbi7p4NpVFEuUQ/exec';

function saveToGoogleSheets(payload, result) {
  const data = {
    email: payload.user_email.trim(),
    utm_source: payload.utm_source || '',
    utm_medium: payload.utm_medium || '',
    utm_campaign: result.campaign_debug || '',
    utm_content: payload.utm_content || '',
    utm_term: payload.utm_term || '',
    final_url: result.final_url
  };

  return fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(data)
  });
}


// ───────────── Отправка ─────────────

function sendData() {
    const emailEl = document.getElementById('user_email');
    const payload = { user_email: emailEl.value, base_url: document.getElementById('base_url').value };

    let hasError = false;
    const requiredIds = ['direction', 'flow_option', 'utm_source', 'utm_medium', ...CFG.required];
    requiredIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) { el.classList.add('input-error'); hasError = true; }
        else el.classList.remove('input-error');
    });
    if (hasError) {
        showFormMessage('Заполните все обязательные поля (отмечены синим)', 'error');
        return;
    }

    document.querySelectorAll('.input-field').forEach(el => {
        if (el.id && el.id !== 'user_email' && el.id !== 'base_url') payload[el.id] = el.value;
    });

    try {
        const result = buildLink(payload);
        console.log('Отправка в Google Sheets', payload, result);
        saveToGoogleSheets(payload, result);
        const box = document.getElementById('result-box');
        box.style.display = 'block';
        document.getElementById('final_url').value = result.final_url;
        document.getElementById('campaign_debug').value = result.campaign_debug;
        box.scrollIntoView({ behavior: 'smooth' });
        try { localStorage.setItem(EMAIL_KEY, emailEl.value.trim()); } catch (e) { /* file:// может блокировать */ }
        showFormMessage('Ссылка успешно сгенерирована', 'success');
    } catch (err) {
        showFormMessage(err.message, 'error');
    }
}

function copyToClipboard(id, btn) {
    const el = document.getElementById(id);
    el.select();
    const done = () => {
        const old = btn.innerText;
        btn.innerText = 'СКОПИРОВАНО';
        setTimeout(() => btn.innerText = old, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(el.value).then(done, () => { document.execCommand('copy'); done(); });
    } else {
        document.execCommand('copy'); // фолбэк для file://
        done();
    }
}

function showFormMessage(text, type) {
    showStatus(text, type, 'form-message');
    document.getElementById('form-message').style.display = 'block';
}

function showStatus(text, type, id = 'status-message') {
    const status = document.getElementById(id);
    status.innerText = text;
    if (type === 'error') { status.style.background = '#fef2f2'; status.style.color = '#991b1b'; }
    else if (type === 'success') { status.style.background = '#f0fdf4'; status.style.color = '#166534'; }
    else { status.style.background = '#eff6ff'; status.style.color = '#1e40af'; }
}

function init() {
    if (!CFG) {
        showStatus('Ошибка: не найден config.js', 'error');
        return;
    }
    renderDirection();
    renderCampaignFields();
    // счётчики заполненных полей в раскрывающихся блоках
    document.getElementById('app-fields').addEventListener('input', updateCounts);
    document.getElementById('app-fields').addEventListener('change', updateCounts);
    document.getElementById('user_email').addEventListener('keydown', e => {
        if (e.key === 'Enter' && document.getElementById('app-fields').disabled) unlock();
    });
    setLocked(true);
    showStatus('Введите e-mail из списка разрешённых', 'info');
    try {
        const saved = localStorage.getItem(EMAIL_KEY);
        if (saved && isAllowed(saved)) {
            document.getElementById('user_email').value = saved;
            unlock();
        }
    } catch (e) { /* ignore */ }
}

init();
