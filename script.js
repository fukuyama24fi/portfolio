/**
 * Ancient Egyptian Mural Portfolio Scripts
 * Yossy - Digital Scribe & Wayfarer
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
      submitBtn.innerHTML = '<span>𓆃 メッセージを送信しています... 𓆃</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;

        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '☥ お問い合わせありがとうございます。メッセージを正常に送信いたしました。';
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

  // 10. 松明の火の粉・金の砂塵パーティクル（Canvas）
  function initMuralParticles() {
    const canvas = document.getElementById('mural-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      'rgba(212,175,55,',   // ゴールド
      'rgba(248,215,100,',  // 淡い黄金
      'rgba(13,148,136,',   // ターコイズ
      'rgba(220,160,60,',   // 琥珀
    ];

    const particles = [];
    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.65 + 0.18),
        alpha: Math.random() * 0.6 + 0.1,
        fadeSpeed: Math.random() * 0.004 + 0.002,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.fadeSpeed;
        if (p.alpha <= 0 || p.y < -5) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.alpha = Math.random() * 0.5 + 0.25;
          p.vy = -(Math.random() * 0.65 + 0.18);
          p.vx = (Math.random() - 0.5) * 0.35;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
  initMuralParticles();

  // 11. 古代エジプト風BGM（Web Audio API）
  let bgmCtx = null;
  let bgmNodes = [];
  let bgmPlaying = false;

  /**
   * ハープ風アルペジオ・ドローン・ゆらぎを生成する
   */
  function createEgyptBGM(audioCtx) {
    const nodes = [];

    // マスターゲイン
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.16;
    masterGain.connect(audioCtx.destination);

    // ---- ハープ風アルペジオ ----
    // ミクソリディアン＋ペンタトニックで古代中東風音階
    const harpFreqs = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

    function playHarpNote(freq, startTime, velocity) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(velocity * 0.28, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + 2.3);
      return osc;
    }

    let arpTimer = null;
    function scheduleArpeggio() {
      if (!bgmPlaying) return;
      const now = audioCtx.currentTime;
      // ランダムにフレーズを選ぶ
      const pattern = [0, 2, 4, 5, 7].map(i => harpFreqs[i % harpFreqs.length]);
      const startNote = Math.floor(Math.random() * 3);
      pattern.slice(startNote).forEach((freq, i) => {
        playHarpNote(freq, now + i * 0.3, 0.6 + Math.random() * 0.4);
      });
      // 低音ハープ（オクターブ下）
      playHarpNote(pattern[0] / 2, now, 0.4);

      arpTimer = setTimeout(scheduleArpeggio, 3800 + Math.random() * 800);
    }
    nodes.push({ type: 'arptimer', ref: () => { clearTimeout(arpTimer); } });
    scheduleArpeggio();

    // ---- 低音ドローン（タンブーラ風） ----
    function createDrone(freq, gainVal, type = 'sine') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      // ゆらぎLFO
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 0.12 + Math.random() * 0.08;
      lfoGain.gain.value = freq * 0.004;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = gainVal;
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      nodes.push({ type: 'osc', ref: osc });
      nodes.push({ type: 'osc', ref: lfo });
    }

    createDrone(65.41, 0.09, 'sine');      // C2 基音
    createDrone(130.81, 0.045, 'sine');    // C3 オクターブ
    createDrone(98.00, 0.055, 'sine');     // G2 5度

    // ---- パーカッション風リズム（ドフ・タンブリン） ----
    const drumPatterns = [0, 0, 1, 0, 0, 1, 0, 1]; // 0=弱 1=強
    let drumStep = 0;
    let drumTimer = null;

    function playDrumBeat(time, strong) {
      const bufferSize = audioCtx.sampleRate * 0.08;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.015));
      }
      const src = audioCtx.createBufferSource();
      src.buffer = buffer;
      const gain = audioCtx.createGain();
      gain.gain.value = strong ? 0.07 : 0.035;

      // ローパスフィルターで打楽器らしく
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = strong ? 220 : 160;

      src.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      src.start(time);
    }

    function scheduleDrum() {
      if (!bgmPlaying) return;
      const now = audioCtx.currentTime;
      const strong = drumPatterns[drumStep % drumPatterns.length] === 1;
      playDrumBeat(now, strong);
      drumStep++;
      drumTimer = setTimeout(scheduleDrum, 620);
    }
    nodes.push({ type: 'arptimer', ref: () => { clearTimeout(drumTimer); } });
    scheduleDrum();

    return nodes;
  }

  function stopEgyptBGM() {
    bgmNodes.forEach(n => {
      if (n.type === 'osc') {
        try { n.ref.stop(); } catch (e) {}
      }
      if (n.type === 'arptimer' && typeof n.ref === 'function') {
        n.ref();
      }
    });
    bgmNodes = [];
    if (bgmCtx) {
      bgmCtx.close().catch(() => {});
      bgmCtx = null;
    }
  }

  // 12. BGMボタンのイベントリスナー
  const bgmToggle = document.getElementById('bgm-toggle');
  const bgmIcon = document.getElementById('bgm-icon');

  if (bgmToggle) {
    bgmToggle.addEventListener('click', () => {
      if (!bgmPlaying) {
        bgmCtx = new (window.AudioContext || window.webkitAudioContext)();
        // モバイル等でサスペンド状態の場合に再開
        if (bgmCtx.state === 'suspended') {
          bgmCtx.resume();
        }
        bgmPlaying = true;
        bgmNodes = createEgyptBGM(bgmCtx);
        bgmToggle.classList.add('playing');
        if (bgmIcon) {
          bgmIcon.className = 'fa-solid fa-volume-high';
        }
      } else {
        stopEgyptBGM();
        bgmPlaying = false;
        bgmToggle.classList.remove('playing');
        if (bgmIcon) {
          bgmIcon.className = 'fa-solid fa-volume-xmark';
        }
      }
    });
  }
});
