/* =========================================================================
   NutriFast AI 공통 레이아웃 (상단 메뉴 + 페이지 배너)
   - 메뉴 항목 추가/변경은 아래 PAGES 배열만 고치면 4개 페이지에 모두 반영됩니다.
   - 각 페이지는 <nav id="appNav">와 <div id="appBanner">를 두고
     NutriLayout.mount({...}) 로 페이지별 제목·설명·버튼만 넘깁니다.
   ========================================================================= */
(function () {
  var PAGES = [
    { key: 'index',    href: './index.html',    label: '1. 홈 대시보드' },
    { key: 'record',   href: './record.html',   label: '2. 식단 기록(API)' },
    { key: 'analysis', href: './analysis.html', label: '3. 분석·AI·목표' },
    { key: 'report',   href: './report.html',   label: '4. 월간 리포트' }
  ];

  // 배너 버튼 공통 스타일
  var BTN = {
    primary:   'bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-bold px-4 py-2.5 rounded-2xl text-xs shadow transition',
    secondary: 'bg-emerald-700 hover:bg-emerald-600 text-emerald-100 font-bold px-3.5 py-2.5 rounded-2xl text-xs transition'
  };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function todayLabel() {
    var d = new Date();
    return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  }

  // 링크 버튼 생성 (kind: 'primary' | 'secondary')
  function btn(kind, href, text) {
    return '<a href="' + esc(href) + '" class="' + (BTN[kind] || BTN.secondary) + '">' + esc(text) + '</a>';
  }

  function renderNav(page) {
    var links = PAGES.map(function (p) {
      var active = p.key === page;
      var cls = active
        ? 'bg-emerald-700 font-bold px-3 py-1.5 rounded-lg'
        : 'hover:bg-emerald-800 px-3 py-1.5 rounded-lg transition';
      return '<a href="' + p.href + '" class="' + cls + '"' + (active ? ' aria-current="page"' : '') + '>' + p.label + '</a>';
    }).join('');

    return '' +
      '<div class="max-w-5xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-2">' +
        '<div class="flex items-center gap-2">' +
          '<span class="bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg text-sm">N</span>' +
          '<span class="font-bold text-lg tracking-tight">NutriFast AI</span>' +
        '</div>' +
        '<div class="flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">' + links + '</div>' +
      '</div>';
  }

  function renderBanner(c) {
    var badge = '';
    if (c.badge) {
      var badgeText = c.badge.today ? todayLabel() : (c.badge.text || '');
      badge = '<span class="text-[11px] font-bold bg-emerald-600/80 px-2.5 py-0.5 rounded-full border border-emerald-400/30"' +
        (c.badge.id ? ' id="' + esc(c.badge.id) + '"' : '') + '>' + esc(badgeText) + '</span>';
    }
    var label = c.label ? '<span class="text-xs text-emerald-200">' + esc(c.label) + '</span>' : '';

    var subtitle = c.subtitle
      ? '<p class="text-xs text-emerald-100/90 mt-1"' + (c.subtitle.id ? ' id="' + esc(c.subtitle.id) + '"' : '') + '>' + esc(c.subtitle.text || '') + '</p>'
      : '';
    var meta = c.meta
      ? '<p class="text-xs font-bold text-emerald-200 mt-1.5"' + (c.meta.id ? ' id="' + esc(c.meta.id) + '"' : '') + '>' + esc(c.meta.text || '') + '</p>'
      : '';

    return '' +
      '<header class="bg-emerald-800 text-white rounded-3xl p-6 shadow-sm space-y-4">' +
        '<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">' +
          '<div>' +
            '<div class="flex items-center gap-2 flex-wrap">' + badge + label + '</div>' +
            '<h1 class="text-xl sm:text-2xl font-extrabold mt-1 tracking-tight">' + esc(c.title || '') + '</h1>' +
            subtitle + meta +
          '</div>' +
          '<div class="flex flex-wrap gap-2 shrink-0">' + (c.actions || '') + '</div>' +
        '</div>' +
        (c.extra || '') +
      '</header>';
  }

  function mount(c) {
    var nav = document.getElementById('appNav');
    if (nav) nav.innerHTML = renderNav(c.page);

    var banner = document.getElementById('appBanner');
    if (banner) banner.innerHTML = renderBanner(c);
  }

  window.NutriLayout = { mount: mount, btn: btn, BTN: BTN };
})();
