const menu = document.querySelector('#menu');
const main = document.querySelector('#lesson');
const outline = document.querySelector('#outline');
const search = document.querySelector('#search');
const toggle = document.querySelector('#toggle');
const titles = ['FMCS 與環境','Galaxy 與物件','QuickScript','PLC 與通訊','通訊備援與圖控','告警與歷史資料','部署與維運','專題驗收'];
const number = index => String(index + 1).padStart(2, '0');
const anchor = index => '#' + number(index);
function appendLink(parent, label, href) {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  parent.append(link);
  return link;
}
function buildMenu(current) {
  menu.replaceChildren();
  const query = search.value.trim().toLowerCase();
  let matches = 0;
  titles.forEach((title, week) => {
    const group = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = '第 ' + (week + 1) + ' 週 · ' + title;
    group.append(summary);
    for (let index = week * 2; index < week * 2 + 2; index++) {
      const row = chapters[index];
      if (query && !row.flat().join(' ').toLowerCase().includes(query)) continue;
      matches++;
      const link = appendLink(group, number(index) + ' · ' + row[0], anchor(index));
      if (index === current) link.setAttribute('aria-current', 'page');
    }
    if (group.childElementCount > 1) {
      group.open = Boolean(query) || current === -1 || Math.floor(current / 2) === week;
      menu.append(group);
    }
  });
  if (!matches) menu.textContent = '找不到符合的章節。';
}
function render() {
  const match = /^#(\d{2})(?:\/.*)?$/.exec(location.hash);
  const selected = match ? Number(match[1]) - 1 : -1;
  const current = chapters[selected] ? selected : -1;
  buildMenu(current);
  outline.replaceChildren();
  main.replaceChildren();
  if (current < 0) {
    const h = document.createElement('h1');
    h.textContent = 'FMCS × AVEVA 教學中心';
    const intro = document.createElement('p');
    intro.textContent = '以 AHU 空調箱為案例，從設備與點位一路完成通訊、圖控、歷史趨勢和部署驗收。';
    const grid = document.createElement('ul');
    grid.className = 'cards';
    titles.forEach((title, week) => {
      const li = document.createElement('li');
      appendLink(li, '第 ' + (week + 1) + ' 週｜' + title, anchor(week * 2));
      grid.append(li);
    });
    main.append(h, intro, grid);
    return;
  }
  const [title, summary, steps, check, troubleshoot, practice, material] = chapters[current];
  const page = document.querySelector('#lesson-template').content.cloneNode(true);
  page.querySelector('.week').textContent = '第 ' + (Math.floor(current / 2) + 1) + ' 週 · 第 ' + number(current) + ' 章';
  page.querySelector('h1').textContent = title;
  page.querySelector('.summary').textContent = summary;
  for (const step of steps) {
    const li = document.createElement('li');
    li.textContent = step;
    page.querySelector('ol').append(li);
  }
  for (const [id, content] of Object.entries({check, troubleshoot, practice})) page.querySelector('#' + id + ' p').textContent = content;
  const li = document.createElement('li');
  appendLink(li, '查看圖文教材及現有演練', '../courses/' + material + '/index.html');
  page.querySelector('#materials ul').append(li);
  if (current > 0) appendLink(page.querySelector('.pager'), '← ' + chapters[current - 1][0], anchor(current - 1));
  if (current < chapters.length - 1) appendLink(page.querySelector('.pager'), chapters[current + 1][0] + ' →', anchor(current + 1));
  page.querySelectorAll('section').forEach(section => appendLink(outline, section.querySelector('h2').textContent, anchor(current) + '/' + section.id));
  main.append(page);
  const sectionId = location.hash.split('/')[1];
  if (sectionId) document.getElementById(sectionId)?.scrollIntoView();
  else window.scrollTo(0, 0);
}
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', menu.classList.toggle('open')));
menu.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
search.addEventListener('input', () => {
  const current = Number(location.hash.slice(1,3)) - 1;
  buildMenu(chapters[current] ? current : -1);
  if (getComputedStyle(toggle).display !== 'none' && search.value) {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
});
window.addEventListener('hashchange', render);
render();
