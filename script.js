document.documentElement.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
const revealEls = document.querySelectorAll('.reveal, .card, .process-step, .photo-frame, .gallery-item');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); } });
  }, {threshold:.12});
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

document.querySelectorAll('[data-count]').forEach(el => {
  let done = false;
  const target = parseInt(el.dataset.count, 10);
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !done){
        done = true;
        let current = 0;
        const step = Math.max(1, Math.ceil(target/50));
        const timer = setInterval(() => {
          current += step;
          if(current >= target){ current = target; clearInterval(timer); }
          el.textContent = current + (el.dataset.suffix || '');
        }, 24);
        countObs.disconnect();
      }
    })
  }, {threshold:.4});
  countObs.observe(el);
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button aria-label="Cerrar">×</button><img alt="">';
document.body.appendChild(lightbox);
const lbImg = lightbox.querySelector('img');
lightbox.querySelector('button').addEventListener('click',()=>lightbox.classList.remove('open'));
lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) lightbox.classList.remove('open') });
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => { lbImg.src = img.src; lbImg.alt = img.alt; lightbox.classList.add('open'); });
});
