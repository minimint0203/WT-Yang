/* data/*.json 을 읽어오는 공통 도구.
   내용 수정은 Pages CMS(https://app.pagescms.org)에서 하면 data 폴더의 JSON 파일이 바뀝니다. */
window.SiteData = {
  load: function(name){
    return fetch('data/' + name + '.json', { cache: 'no-cache' })
      .then(function(r){ if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function(e){ console.error('data/' + name + '.json 을 불러오지 못했습니다', e); return []; });
  },
  esc: function(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  },
  // CMS가 저장한 경로("/images/news/a.jpg", "images/news/a.jpg")나 파일명만("a.jpg") 모두 처리
  img: function(v, dir){
    v = String(v || '').replace(/^\/+/, '');
    return v.indexOf('/') > -1 ? v : (dir || 'images/') + v;
  },
  byDateDesc: function(a, b){ return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
};
