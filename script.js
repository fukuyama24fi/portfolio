/**
 * Portfolio Interactive Scripts
 * Yoshika Fukuyama Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. スクロールヘッダー効果
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // ヘッダーのシャドウ
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // トップへ戻るボタンの表示・非表示
    if (scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // スキルバーのアニメーション発火
    triggerSkillBars();
  });

  // トップへ戻るクリック
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. モバイルナビゲーションの開閉
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // メニューリンクをクリックしたらメニューを閉じる
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

  // 4. スクロールリビール（フェードイン・浮き上がり）
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // 5. スキルバーのアニメーション
  let skillsAnimated = false;
  function triggerSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.75) {
      skillsAnimated = true;
      const progressBars = document.querySelectorAll('.progress');
      progressBars.forEach(bar => {
        const val = bar.style.getPropertyValue('--val');
        if (val) {
          bar.style.width = val;
        }
      });
    }
  }

  // 初回チェック
  triggerSkillBars();

  // 6. 制作実績のフィルタリング
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブクラスの切り替え
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      workCards.forEach(card => {
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

  // 7. ダークモード / ライトモード 切り替え
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

  // ローカルストレージまたはOS設定を読み込む
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    if (themeIcon) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');

      if (themeIcon) {
        if (isDark) {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
      }

      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // 8. お問い合わせフォーム送信シミュレーション
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const origBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>送信中...</span>';

      // 疑似送信演出（1.2秒後）
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnContent;

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> メッセージを送信しました！お問い合わせありがとうございます。';
          formAlert.style.display = 'block';

          // フォーム初期化
          contactForm.reset();

          // 5秒後にアラート非表示
          setTimeout(() => {
            formAlert.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }

  // 9. コピーライト年の更新
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
