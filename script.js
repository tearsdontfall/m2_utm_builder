const CFG = window.UTM_CONFIG;

const MAIN_UTMS = ['utm_source', 'utm_medium'];
const EXTRA_UTMS = ['utm_content', 'utm_term'];
const CAMPAIGN_REQUIRED = ['agency', 'campaign_type', 'funnel_stage', 'product', 'target_audience', 'sub_type'];
const OPTIONAL_ORDER = ['region', 'event', 'device', 'placements', 'ad_type', 'flight', 'creative_pack', 'free_text'];
const EMAIL_KEY = 'utm_builder_email';

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

function buildLink(data) {
    if (!isAllowed(data.user_email)) {
        throw new Error('Доступ запрещён: e-mail не в списке разрешённых');
    }

    const baseUrl = (data.base_url || '').trim();
    if (!/^https?:\/\/.+/.test(baseUrl) || baseUrl.length < 5) {
        throw new Error('Базовый URL должен начинаться с http:// или https://');
    }

    for (const key of CFG.strictDictionary) {
        const list = CFG.dictionaries[key] || [];
        if (!list.includes(data[key])) {
            throw new Error(`Недопустимый ${key}: ${data[key] || '(пусто)'}`);
        }
    }

    const parts = [];
    for (const key of CAMPAIGN_REQUIRED) {
        const v = slugify(data[key]);
        if (v === null) throw new Error(`Некорректное значение ${key}`);
        parts.push(v);
    }
    for (const key of OPTIONAL_ORDER) {
        const v = slugify(data[key]);
        if (v) {
            const prefix = CFG.prefixes[key];
            parts.push(prefix ? `${prefix}-${v}` : v);
        }
    }
    const campaign = parts.join('_');

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
    const sep = baseUrl.includes('?') ? '&' : '?';
    return { final_url: `${baseUrl}${sep}${query}`, campaign_debug: campaign };
}

function renderBlock(fieldList, containerId) {
    const container = document.getElementById(containerId);
    fieldList.forEach(name => {
        const isRequired = CFG.required.includes(name);
        const isFreeText = CFG.freeText.includes(name);
        const values = CFG.dictionaries[name];
        const hasData = values && values.length > 0;

        const div = document.createElement('div');
        div.style.marginBottom = '16px';

        let inputHtml;
        if (!isFreeText && hasData) {
            inputHtml = `
                <select id="${name}" class="input-field" style="background-color: white;">
                    <option value="">-- Выберите --</option>
                    ${values.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join('')}
                </select>`;
        } else {
            inputHtml = `<input type="text" id="${name}" class="input-field" placeholder="...">`;
        }

        div.innerHTML = `
            <label class="label-text" style="${isRequired ? 'color: #2563eb;' : ''}">
                ${name} ${isRequired ? '●' : ''}
            </label>
            ${inputHtml}`;
        container.appendChild(div);
    });
}

function sendData() {
    const emailEl = document.getElementById('user_email');
    const payload = { user_email: emailEl.value, base_url: document.getElementById('base_url').value };

    let hasError = false;
    CFG.required.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!el.value.trim()) { el.classList.add('input-error'); hasError = true; }
        else el.classList.remove('input-error');
    });
    if (hasError) {
        showStatus('Заполните все обязательные поля (отмечены синим)', 'error');
        return;
    }

    document.querySelectorAll('.input-field').forEach(el => {
        if (el.id && el.id !== 'user_email' && el.id !== 'base_url') payload[el.id] = el.value;
    });

    try {
        const result = buildLink(payload);
        const box = document.getElementById('result-box');
        box.style.display = 'block';
        document.getElementById('final_url').value = result.final_url;
        document.getElementById('campaign_debug').value = result.campaign_debug;
        box.scrollIntoView({ behavior: 'smooth' });
        try { localStorage.setItem(EMAIL_KEY, emailEl.value.trim()); } catch (e) { /* file:// может блокировать */ }
        showStatus('Ссылка успешно сгенерирована', 'success');
    } catch (err) {
        showStatus(err.message, 'error');
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

function showStatus(text, type) {
    const status = document.getElementById('status-message');
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
    renderBlock(MAIN_UTMS, 'main-utm-fields');
    renderBlock(CFG.campaignParts, 'campaign-fields');
    renderBlock(EXTRA_UTMS, 'extra-utm-fields');
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
