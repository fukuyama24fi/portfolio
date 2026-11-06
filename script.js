/**
 * Ancient Egyptian Mural Portfolio Scripts
 * Yoshika Fukuyama - Digital Scribe & Wayfarer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. スクロールヘッダー＆トップへ戻るボタン
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // ヘッダー効果
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // トップへ戻るボタン（オベリスクの頂へ）
    if (scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // スキルメーターのアニメーション
    triggerMeters();
  });

  // トップへ戻るクリック
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. モバイル神殿扉（ナビゲーション）の開閉
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. ナビゲーションのアクティブ連動（Intersection Observer）
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35
  });

  sections.forEach(sec => navObserver.observe(sec));

  // 4. スクロールリビール（壁画の浮き彫り出現アニメーション）
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // 5. スキルメーターのアニメーション
  let metersAnimated = false;
  function triggerMeters() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || metersAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      metersAnimated = true;
      const meterFills = document.querySelectorAll('.meter-fill');
      meterFills.forEach(fill => {
        const val = fill.style.getPropertyValue('--val');
        if (val) {
          fill.style.width = val;
        }
      });
    }
  }

  triggerMeters();

  // 6. 制作物（石板レリーフ）のフィルタリング
  const filterTabs = document.querySelectorAll('.filter-tab');
  const reliefCards = document.querySelectorAll('.relief-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      reliefCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. 昼夜の儀式（テーマ切り替え: ラーの陽光 ⇄ 玄室の松明夜）
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  const savedTheme = localStorage.getItem('egypt-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');

      if (themeIcon) {
        if (isDark) {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
      }

      localStorage.setItem('egypt-theme', isDark ? 'dark' : 'light');
    });
  }

  // 8. 伝令フォーム送信演出
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>𓆃 ナイルの風が伝令を運んでいます... 𓆃</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '☥ 言の葉は無事に書記官へ託されました。心より感謝を捧げます（Ankh, Udjat, Seneb）。';
          formAlert.style.display = 'block';

          contactForm.reset();

          setTimeout(() => {
            formAlert.style.display = 'none';
          }, 6500);
        }
      }, 1300);
    });
  }

  // 9. 年の更新
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
