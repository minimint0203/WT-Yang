/* 강의 · 상담 — data/courses.json, data/office.json 을 읽어 그림 */
(function(){
  var D = window.SiteData, esc = D.esc;
  var $ = function(id){ return document.getElementById(id); };

  D.load('courses').then(function(rows){
    $('course-rows').innerHTML = rows.map(function(r){
      return '<tr><td><b>'+esc(r.name)+'</b>'
        + (r.description ? '<span class="agency">'+esc(r.description)+'</span>' : '')+'</td>'
        + '<td>'+esc(r.semester)+'</td></tr>';
    }).join('') || '<tr><td colspan="2" class="empty-cell">강의 목록 준비 중입니다.</td></tr>';
  });

  D.load('office').then(function(o){
    var rows = [
      ['면담 시간', o.hours],
      ['장소', o.place],
      ['신청 방법', o.how],
      ['참고', o.note]
    ].filter(function(r){ return r[1]; });
    $('office-info').innerHTML = rows.map(function(r){
      return '<div class="office-row"><span>'+r[0]+'</span><p>'+esc(r[1])+'</p></div>';
    }).join('') || '<p class="empty-note">면담 안내 준비 중입니다.</p>';
  });
})();
