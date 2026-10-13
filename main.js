(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  let theme = 'light';
  try { theme = localStorage.getItem('chengkui-theme') || 'light'; } catch (_) {}
  function setTheme(value) {
    root.dataset.theme = value;
    if (toggle) toggle.setAttribute('aria-label', value === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#16251f' : '#f7f7ef');
  }
  setTheme(theme);
  toggle?.addEventListener('click', () => {
    theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('chengkui-theme', theme); } catch (_) {}
  });
  const cards = [...document.querySelectorAll('.note-card')];
  const filters = [...document.querySelectorAll('.filter')];
  const search = document.getElementById('note-search');
  let category = 'all';
  function filterNotes() {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matches = (category === 'all' || category === card.dataset.category) && card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    });
    const empty = document.getElementById('empty-state');
    if (empty) empty.hidden = visible !== 0;
    const status = document.getElementById('filter-status');
    if (status) status.textContent = `显示 ${visible} 篇笔记`;
  }
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    filterNotes();
  }));
  search?.addEventListener('input', filterNotes);
})();
