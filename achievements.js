/* 연구 성과 — data/papers.json, patents.json, projects.json 을 읽어 그림.
   홈 화면에서는 최근 논문 3편과 통계 숫자만 채움 (있는 요소만 그림). */
(function(){
  var D = window.SiteData, esc = D.esc;
  var $ = function(id){ return document.getElementById(id); };
  var ME = /Won[\s\-‐]?Tae Yang|양원태/i;   // 교수님 이름은 굵은 검정으로
  function set(id, v){ var el = $(id); if (el) el.textContent = v; }
  function empty(msg, cols){ return cols ? '<tr><td colspan="'+cols+'" class="empty-cell">'+msg+'</td></tr>' : '<p class="empty-note">'+msg+'</p>'; }

  function paper(p){
    var title = p.doi
      ? '<a href="https://doi.org/'+esc(p.doi)+'" target="_blank" rel="noopener">'+esc(p.title)+'</a>'
      : esc(p.title);
    var authors = String(p.authors || '').split(/\s*,\s*/).map(function(a){
      return ME.test(a) ? '<b>'+esc(a)+'</b>' : esc(a);
    }).join(', ');
    return '<li><div class="pub-body">'
      + (p.category ? '<div class="meta"><span class="badge">'+esc(p.category)+'</span></div>' : '')
      + '<div class="ptitle">'+title+'</div>'
      + '<div class="meta authors">'+authors+'</div>'
      + '<div class="meta journal"><i>'+esc(p.journal)+'</i>'+(p.year ? ' · '+esc(p.year) : '')+'</div></div></li>';
  }

  D.load('papers').then(function(papers){
    set('n-papers', papers.length);
    set('stat-papers', papers.length);
    papers.sort(function(a, b){ return b.year - a.year; });

    if ($('recent-papers')) $('recent-papers').innerHTML = papers.slice(0, 3).map(paper).join('');

    if ($('paper-list')) {
      var years = {};
      papers.forEach(function(p){ (years[p.year] = years[p.year] || []).push(p); });
      $('paper-list').innerHTML = Object.keys(years).sort(function(a, b){ return b - a; }).map(function(y){
        return '<h3 class="pub-year">'+esc(y)+'</h3><ul class="pubs">' + years[y].map(paper).join('') + '</ul>';
      }).join('') || empty('등록된 논문이 없습니다.');
    }
  });

  D.load('patents').then(function(rows){
    set('n-patents', rows.length);
    set('stat-patents', rows.length);
    if (!$('patent-rows')) return;
    rows.sort(function(a, b){ return b.year - a.year; });
    $('patent-rows').innerHTML = rows.map(function(r){
      return '<tr><td>'+esc(r.year)+'</td><td>'+esc(r.title)+'</td></tr>';
    }).join('') || empty('등록된 특허가 없습니다.', 2);
  });

  D.load('projects').then(function(rows){
    set('n-projects', rows.length);
    if (!$('project-rows')) return;
    rows.sort(function(a, b){ return String(b.start).localeCompare(String(a.start)); });
    $('project-rows').innerHTML = rows.map(function(r){
      return '<tr><td>'+esc(r.start)+'–'+esc(r.end || '현재')+'</td><td>'+esc(r.title)
        + (r.lead ? ' <span class="badge">주관</span>' : '')
        + (r.agency ? '<span class="agency">'+esc(r.agency)+'</span>' : '')+'</td></tr>';
    }).join('') || empty('등록된 연구과제가 없습니다.', 2);
  });
})();
