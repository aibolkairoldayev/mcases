const parallax = document.getElementById('paralax');
if (!parallax) {
    console.log('Элемент #parallax не найден');
}

const children = Array.from(parallax ? parallax.children : []);

const start = () => {
    children.forEach((child, index) => {
        child.style.zIndex = index - children.length;

        const screenH = parallax.clientHeight;
        const blockH = child.offsetHeight;
        const diff = blockH - screenH;

        child.style.top = diff > 0 ? `-${diff}px` : '0';
    });
};

start();

if (parallax) {
    parallax.addEventListener('scroll', start);
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.mcase__wrapper');
  const items = Array.from(document.querySelectorAll('.mcase__sticky-block'));

  if (!wrapper || items.length < 2) return;

  let ticking = false;

  const checkCover = () => {
    const wrapperRect = wrapper.getBoundingClientRect();

    for (let i = 0; i < items.length; i++) {

      const current = items[i];
      const next = items[i + 1];

      const curRect = current.getBoundingClientRect();
      const curTopRel = curRect.top - wrapperRect.top;
      const curBottomRel = curRect.bottom - wrapperRect.top;
      const curHeight = Math.max(curRect.height, 1);

      // --- 1) Функционал COVERED ---
      if (next) {
        const nextRect = next.getBoundingClientRect();
        const nextTopRel = nextRect.top - wrapperRect.top;

        let overlap = curBottomRel - nextTopRel;
        if (overlap < 0) overlap = 0;

        const percent = overlap / curHeight;

        if (percent >= 0.3) {
          current.classList.add('covered');
        } else {
          current.classList.remove('covered');
        }
      }

      // --- 2) Функционал NOBORDER ---
      // Когда элемент подъезжает к top контейнера ближе чем на 100px
      if (curTopRel <= 100) {
        current.classList.add('noborder');
      } else {
        current.classList.remove('noborder');
      }

    }

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(checkCover);
    }
  };

  wrapper.addEventListener('scroll', onScroll, { passive: true });

  checkCover();
});
