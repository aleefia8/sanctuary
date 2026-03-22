/* ============================================
   SanctuaryOS — Application Logic
   Premium Health & Wellness Platform
   ============================================ */

(() => {
  'use strict';

  // ─── State ───────────────────────────────────
  const state = {
    preferences: new Set(),
    healthScore: 62,
    coins: 247,
    earnedToday: 12,
    streak: 5,
    level: 4,
    xp: 380,
    xpMax: 500,
    missionsCompleted: 0,
    totalMissions: 4,
    missionsDone: new Set(),
    tier: 'free',
    steps: 4230,
    sleep: 6.5,
    mood: 'Good',
  };

  // ─── AI Responses ────────────────────────────
  const aiResponses = {
    'why am i tired?': `Based on your recent patterns, here are some factors that might be contributing:\n\n🌙 **Sleep Duration** — You've been averaging 6.5 hours. Your body may need 7.5–8 hours for optimal recovery.\n\n📉 **Activity Dip** — Your step count dropped 20% this week. Light movement actually boosts energy levels.\n\n💧 **Hydration** — You haven't logged water intake recently. Even mild dehydration causes fatigue.\n\n**Suggestion:** Try a 10-minute walk and a full glass of water right now. Small actions compound.`,

    'how can i sleep better?': `Here are evidence-based tips tailored to your lifestyle:\n\n🌡️ **Temperature** — Keep your room at 65-68°F (18-20°C). Your body needs to cool down to fall asleep.\n\n📱 **Screen Curfew** — Try stopping screens 30 min before bed. Blue light suppresses melatonin.\n\n⏰ **Consistent Schedule** — Your data shows irregular sleep times. Pick one bedtime and stick to it.\n\n🧘 **Wind Down Ritual** — 5 minutes of deep breathing signals your nervous system to relax.\n\n**New Mission Added:** "Sleep before 11pm" — Complete it for 4 M Coins!`,

    'give me today\'s summary': `Here's your daily health brief:\n\n📊 **Health Score:** 62/100 (↑3 from last week)\n👟 **Steps:** 4,230 / 6,000 (70%)\n🌙 **Sleep:** 6.5h last night\n😊 **Mood:** Good\n🪙 **Earned:** +12 M Coins\n🔥 **Streak:** 5 days (x2 multiplier active!)\n\n**Focus Area:** Your sleep score has the most room for improvement. Even 30 extra minutes tonight could boost your overall score by 3-5 points.\n\nKeep going — you're building great momentum! 💪`,

    'what should i eat?': `Based on your activity and recovery needs today:\n\n🥗 **Recovery Bowl** (Lunch)\nQuinoa + grilled chicken + avocado + leafy greens\n→ Anti-inflammatory, supports muscle recovery\n\n🫐 **Brain Boost Smoothie** (Snack)\nBlueberries + spinach + walnuts + almond milk\n→ Antioxidants for mental clarity\n\n🍣 **Omega-3 Dinner**\nSalmon + sweet potato + steamed broccoli\n→ Supports heart health and sleep quality\n\n💧 Aim for 8 glasses of water throughout the day.\n\n**Pro tip:** Eating your last meal 2-3 hours before bedtime can improve sleep quality.`,

    default: `That's a great question! Based on your health profile, here are a few thoughts:\n\n📊 Your current health score is **62**, which means there's good room for improvement.\n\n🎯 I'd recommend focusing on your **top priorities** — small consistent actions create the biggest impact.\n\n**Quick suggestions:**\n• Take a 10-min walk to boost your energy\n• Drink a glass of water right now\n• Log your mood to track emotional patterns\n\nWould you like me to go deeper on any of these topics? I'm here to help you optimize your wellness journey! 🧬`
  };

  // ─── DOM Elements ────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── Smooth Screen Transitions ───────────────
  function transitionToScreen(hideId, showId) {
    const hideEl = $(`#${hideId}`);
    const showEl = $(`#${showId}`);
    
    hideEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    hideEl.style.opacity = '0';
    hideEl.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      hideEl.classList.remove('active');
      hideEl.style.cssText = '';
      showEl.classList.add('active');
      showEl.style.opacity = '0';
      showEl.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        showEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        showEl.style.opacity = '1';
        showEl.style.transform = 'translateY(0)';
      });
    }, 350);
  }

  function showApp() {
    $$('.onboarding-screen').forEach(s => {
      s.style.transition = 'opacity 0.5s ease';
      s.style.opacity = '0';
    });
    
    setTimeout(() => {
      $$('.onboarding-screen').forEach(s => s.classList.remove('active'));
      const appShell = $('#app-shell');
      appShell.classList.remove('hidden');
      appShell.style.opacity = '0';
      
      requestAnimationFrame(() => {
        appShell.style.transition = 'opacity 0.6s ease';
        appShell.style.opacity = '1';
      });
      
      setTimeout(animateDashboard, 300);
    }, 450);
  }

  // ─── Number Counter Animation ─────────────────
  function animateNumber(el, target, duration = 1200, prefix = '', suffix = '') {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * easedProgress);
      el.textContent = prefix + current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ─── Score Ring Animation ─────────────────────
  function animateScoreRing(arcEl, score, maxDash) {
    const offset = maxDash - (score / 100) * maxDash;
    arcEl.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    arcEl.style.strokeDashoffset = offset;
  }

  // ─── Onboarding: Screen 1 → 2 ────────────────
  $('#btn-start').addEventListener('click', () => {
    transitionToScreen('screen-hook', 'screen-preferences');
  });

  // ─── Onboarding: Preferences ──────────────────
  $$('.pref-row-card').forEach(card => {
    card.addEventListener('click', () => {
      const pref = card.dataset.pref;
      card.classList.toggle('selected');
      
      // Bounce animation
      card.style.transform = 'translateX(8px)';
      setTimeout(() => { card.style.transform = ''; }, 150);
      
      if (state.preferences.has(pref)) {
        state.preferences.delete(pref);
      } else {
        state.preferences.add(pref);
      }
      
      $('#btn-prefs-next').disabled = state.preferences.size === 0;
    });
  });

  $('#btn-prefs-next').addEventListener('click', () => {
    transitionToScreen('screen-preferences', 'screen-mood');
  });

  // ─── Onboarding: Mood Slider ──────────────────
  const moodSlider = $('#mood-slider');
  const moodEmoji = $('#mood-slider-emoji');
  if (moodSlider) {
    moodSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (val < 33) {
        moodEmoji.textContent = '😴';
        moodEmoji.style.transform = 'scale(0.9)';
      } else if (val < 66) {
        moodEmoji.textContent = '😐';
        moodEmoji.style.transform = 'scale(1)';
      } else {
        moodEmoji.textContent = '⚡';
        moodEmoji.style.transform = 'scale(1.1)';
      }
    });
  }

  $('#btn-mood-next').addEventListener('click', () => {
    transitionToScreen('screen-mood', 'screen-score');
    
    // Animate score after transition
    setTimeout(() => {
      animateNumber($('#score-number'), state.healthScore, 1500);
      animateScoreRing($('#score-arc'), state.healthScore, 553);
    }, 600);
  });

  // ─── Onboarding: Score Reveal ─────────────────
  $('#btn-score-enter').addEventListener('click', () => {
    showApp();
  });

  $('#btn-score-unlock').addEventListener('click', () => {
    state.tier = 'pro';
    showApp();
    setTimeout(() => {
      $('#upgrade-modal').classList.add('show');
    }, 800);
  });

  // ─── Dashboard Animation ──────────────────────
  function animateDashboard() {
    // Health score ring
    animateNumber($('#dash-score'), state.healthScore, 1400);
    animateScoreRing($('#dash-score-arc'), state.healthScore, 377);
    
    // Coin count header
    animateNumber($('#coin-count'), state.coins, 1000);
    
    // Animate stat bars with stagger
    $$('.hs-bar-fill').forEach((bar, i) => {
      const targetWidth = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.width = targetWidth;
      }, 200 + i * 150);
    });
    
    // Animate weekly chart bars
    $$('.wc-bar').forEach((bar, i) => {
      const targetHeight = bar.style.height;
      bar.style.height = '0%';
      setTimeout(() => {
        bar.style.transition = 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        bar.style.height = targetHeight;
      }, 100 + i * 80);
    });

    updateMissionsBadge();
  }

  // ─── Bottom Navigation ────────────────────────
  $$('.nav-item').forEach(navBtn => {
    navBtn.addEventListener('click', () => {
      const tab = navBtn.dataset.tab;
      
      // Update nav active state
      $$('.nav-item').forEach(n => n.classList.remove('active'));
      navBtn.classList.add('active');
      
      // Smooth tab transition
      const activePanel = $('.tab-panel.active');
      const nextPanel = $(`#tab-${tab}`);
      
      if (activePanel === nextPanel) return;
      
      activePanel.style.transition = 'opacity 0.2s ease';
      activePanel.style.opacity = '0';
      
      setTimeout(() => {
        activePanel.classList.remove('active');
        activePanel.style.opacity = '';
        nextPanel.classList.add('active');
        nextPanel.style.opacity = '0';
        
        requestAnimationFrame(() => {
          nextPanel.style.transition = 'opacity 0.3s ease';
          nextPanel.style.opacity = '1';
        });
        
        // Re-animate dashboard elements when switching back to home
        if (tab === 'home') {
          animateDashboard();
        }
      }, 200);
    });
  });

  // ─── Profile icon → profile tab ───────────────
  $('#btn-profile-icon').addEventListener('click', () => {
    const profNav = $('[data-tab="profile"]');
    profNav.click();
  });

  // ─── Mission Completion ───────────────────────
  $$('.mission-card').forEach(card => {
    card.addEventListener('click', () => {
      const mission = card.dataset.mission;
      if (state.missionsDone.has(mission)) return;
      
      state.missionsDone.add(mission);
      state.missionsCompleted++;
      
      // Visual completion
      card.classList.add('completed');
      
      // Update check icon to filled
      const checkSvg = card.querySelector('.mission-check svg');
      checkSvg.innerHTML = '<circle cx="12" cy="12" r="10" fill="#34D399" stroke="#34D399" stroke-width="2"/><path d="M8 12l2.5 2.5L16 9" stroke="#0c0f14" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      
      // Coin reward
      const coins = parseInt(card.dataset.coins);
      const multiplier = getMultiplier();
      const reward = coins * multiplier;
      state.coins += reward;
      state.earnedToday += reward;
      state.xp += reward * 5;
      
      // Animate coin pop
      showCoinPop(card, `+${reward}`);
      
      // Update displays
      animateNumber($('#coin-count'), state.coins, 600);
      $('#earned-today').textContent = `+${state.earnedToday}`;
      $('#wallet-balance').textContent = state.coins;
      $('#w-today').textContent = `+${state.earnedToday}`;
      $('#p-coins').textContent = state.coins;
      
      updateMissionsBadge();
      updateLevel();
      showToast(`+${reward} M Coins earned! 🪙`);
    });
  });

  function getMultiplier() {
    if (state.streak >= 7) return 3;
    if (state.streak >= 4) return 2;
    return 1;
  }

  function updateMissionsBadge() {
    const badge = $('#missions-done');
    badge.textContent = `${state.missionsCompleted}/${state.totalMissions} Complete`;
  }

  function updateLevel() {
    if (state.xp >= state.xpMax) {
      state.level++;
      state.xp -= state.xpMax;
      state.xpMax = Math.round(state.xpMax * 1.3);
      showToast(`🎉 Level Up! You're now Level ${state.level}!`);
    }
    
    const pct = (state.xp / state.xpMax) * 100;
    $('#user-level').textContent = `Lv ${state.level}`;
    $('#level-fill').style.width = `${pct}%`;
    $('#gam-level').textContent = state.level;
    $('#gam-xp').textContent = state.xp;
    $('#gam-xp-fill').style.width = `${pct}%`;
    $('#p-level').textContent = state.level;
    $('#p-missions').textContent = state.missionsCompleted + 23;
  }

  // ─── Coin Pop Animation ───────────────────────
  function showCoinPop(el, text) {
    const rect = el.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.className = 'coin-pop';
    pop.textContent = `🪙 ${text}`;
    pop.style.left = `${rect.right - 60}px`;
    pop.style.top = `${rect.top}px`;
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1000);
  }

  // ─── Toast Notification ───────────────────────
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ─── AI Concierge Chat ────────────────────────
  function sendMessage(text) {
    if (!text.trim()) return;
    
    // Add user message
    addChatMessage(text, 'user');
    $('#chat-input').value = '';
    
    // Hide suggestions after first use
    const suggestions = $('#chat-suggestions');
    if (suggestions) {
      suggestions.style.transition = 'opacity 0.3s ease, height 0.3s ease';
      suggestions.style.opacity = '0';
      suggestions.style.height = '0';
      suggestions.style.padding = '0';
      suggestions.style.overflow = 'hidden';
    }
    
    // Show typing indicator
    const typing = addTypingIndicator();
    
    // Simulate AI response delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      typing.remove();
      const response = getAIResponse(text);
      addChatMessage(response, 'bot');
    }, delay);
  }

  function addChatMessage(text, type) {
    const container = $('#chat-messages');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    
    // Convert markdown-style bold to HTML
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    
    msg.innerHTML = `
      <div class="chat-bubble">${formattedText}</div>
      <div class="chat-time">Just now</div>
    `;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function addTypingIndicator() {
    const container = $('#chat-messages');
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.innerHTML = `<div class="chat-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  function getAIResponse(input) {
    const lower = input.toLowerCase().trim();
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== 'default' && lower.includes(key.replace('?', ''))) {
        return response;
      }
    }
    
    // Check for keywords
    if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('energy')) {
      return aiResponses['why am i tired?'];
    }
    if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('rest')) {
      return aiResponses['how can i sleep better?'];
    }
    if (lower.includes('eat') || lower.includes('food') || lower.includes('meal') || lower.includes('diet') || lower.includes('nutrition')) {
      return aiResponses['what should i eat?'];
    }
    if (lower.includes('summary') || lower.includes('today') || lower.includes('stats') || lower.includes('progress')) {
      return aiResponses["give me today's summary"];
    }
    
    return aiResponses.default;
  }

  // Chat event listeners
  $('#btn-send').addEventListener('click', () => {
    sendMessage($('#chat-input').value);
  });

  $('#chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage($('#chat-input').value);
    }
  });

  $$('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sendMessage(chip.dataset.msg);
    });
  });

  // ─── Mood Selector ───────────────────────────
  $$('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.mood-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Bounce
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => { btn.style.transform = 'scale(1.1)'; }, 200);
      
      const label = btn.dataset.label;
      state.mood = label;
      $('#track-mood').textContent = label;
      showToast(`Mood logged: ${btn.dataset.mood} ${label}`);
    });
  });

  // ─── Quick Action Modals ─────────────────────
  const logModal = $('#log-modal');
  const logModalTitle = $('#log-modal-title');
  const logModalBody = $('#log-modal-body');

  const logForms = {
    mood: {
      title: 'Log Your Mood',
      body: `
        <div class="log-field">
          <label>How are you feeling right now?</label>
          <div class="mood-selector" style="justify-content:center;padding:16px 0">
            <button class="mood-btn log-mood-btn" data-mood="😫" data-label="Awful" style="width:48px;height:48px;font-size:1.5rem">😫</button>
            <button class="mood-btn log-mood-btn" data-mood="😐" data-label="Meh" style="width:48px;height:48px;font-size:1.5rem">😐</button>
            <button class="mood-btn log-mood-btn active" data-mood="😊" data-label="Good" style="width:48px;height:48px;font-size:1.5rem">😊</button>
            <button class="mood-btn log-mood-btn" data-mood="😄" data-label="Great" style="width:48px;height:48px;font-size:1.5rem">😄</button>
            <button class="mood-btn log-mood-btn" data-mood="🤩" data-label="Amazing" style="width:48px;height:48px;font-size:1.5rem">🤩</button>
          </div>
        </div>
        <div class="log-field">
          <label>Any notes? (optional)</label>
          <input type="text" placeholder="What's influencing your mood..." />
        </div>
      `
    },
    sleep: {
      title: 'Log Sleep',
      body: `
        <div class="log-field">
          <label>Hours of sleep last night</label>
          <input type="number" id="log-sleep-hours" value="7" min="0" max="14" step="0.5" />
        </div>
        <div class="log-field">
          <label>Sleep quality</label>
          <select>
            <option>Poor</option>
            <option>Fair</option>
            <option selected>Good</option>
            <option>Great</option>
            <option>Excellent</option>
          </select>
        </div>
      `
    },
    meal: {
      title: 'Log Meal',
      body: `
        <div class="log-field">
          <label>Meal type</label>
          <select>
            <option>Breakfast</option>
            <option selected>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>
        <div class="log-field">
          <label>What did you eat?</label>
          <input type="text" placeholder="e.g. Grilled chicken salad" />
        </div>
        <div class="log-field">
          <label>Was it a clean meal?</label>
          <select>
            <option selected>Yes — mostly whole foods</option>
            <option>Somewhat — a mix</option>
            <option>No — mostly processed</option>
          </select>
        </div>
      `
    },
    steps: {
      title: 'Log Steps',
      body: `
        <div class="log-field">
          <label>Steps taken today</label>
          <input type="number" id="log-steps-val" value="4230" min="0" max="99999" step="100" />
        </div>
        <div class="log-field">
          <label>Did you exercise today?</label>
          <select>
            <option>No exercise</option>
            <option selected>Light activity (walking)</option>
            <option>Moderate (jogging, yoga)</option>
            <option>Intense (gym, running)</option>
          </select>
        </div>
      `
    }
  };

  function openLogModal(type) {
    const form = logForms[type];
    if (!form) return;
    
    logModalTitle.textContent = form.title;
    logModalBody.innerHTML = form.body;
    logModal.classList.add('show');
    
    // Re-bind mood buttons in modal
    if (type === 'mood') {
      logModalBody.querySelectorAll('.log-mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          logModalBody.querySelectorAll('.log-mood-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          btn.style.transform = 'scale(1.2)';
          setTimeout(() => { btn.style.transform = 'scale(1.1)'; }, 200);
        });
      });
    }
  }

  $('#qa-mood').addEventListener('click', () => openLogModal('mood'));
  $('#qa-sleep').addEventListener('click', () => openLogModal('sleep'));
  $('#qa-meal').addEventListener('click', () => openLogModal('meal'));
  $('#qa-steps').addEventListener('click', () => openLogModal('steps'));

  $('#log-modal-close').addEventListener('click', () => {
    logModal.classList.remove('show');
  });

  $('#log-modal-save').addEventListener('click', () => {
    logModal.classList.remove('show');
    state.coins += 2;
    animateNumber($('#coin-count'), state.coins, 600);
    showToast('Entry logged! +2 M Coins 🪙');
  });

  // ─── Upgrade Modal ───────────────────────────
  $('#btn-upgrade-health').addEventListener('click', () => {
    $('#upgrade-modal').classList.add('show');
  });

  $('#btn-upgrade-profile').addEventListener('click', () => {
    $('#upgrade-modal').classList.add('show');
  });

  $('#modal-close').addEventListener('click', () => {
    $('#upgrade-modal').classList.remove('show');
  });

  $('#modal-skip').addEventListener('click', () => {
    $('#upgrade-modal').classList.remove('show');
  });

  // Close modals on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });

  // ─── Doctor Match Buttons ─────────────────────
  $$('.btn-match').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.tier === 'free') {
        $('#upgrade-modal').classList.add('show');
      } else {
        btn.textContent = 'Matched ✓';
        btn.style.background = 'rgba(0, 229, 160, 0.15)';
        btn.style.borderColor = 'var(--accent-green)';
        showToast('Doctor match request sent! 👩‍⚕️');
      }
    });
  });

  // ─── Upgrade Modal CTA ────────────────────────
  $('.modal-cta').addEventListener('click', () => {
    state.tier = 'pro';
    $('#upgrade-modal').classList.remove('show');
    $('#profile-tier').textContent = 'Warrior • Pro Tier';
    showToast('🎉 Welcome to Sanctuary Pro!');
    
    // Unlock tier 2 items
    $$('.locked-overlay').forEach(item => {
      item.classList.remove('locked-overlay');
      item.querySelector('.t2-lock').style.display = 'none';
    });
  });

  // ─── Intersection Observer for animations ─────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    // Observe cards for scroll-reveal effect
    setTimeout(() => {
      $$('.glass-card, .doctor-card, .earn-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      });
    }, 100);
  }

  // ─── Phase 4: Doctor Match & Food ─────────────────
  const btnActionDoctor = $('#btn-action-doctor');
  if (btnActionDoctor) {
    btnActionDoctor.addEventListener('click', () => {
      transitionToScreen('app-dashboard', 'screen-doctor');
    });
  }

  const btnActionFood = $('#btn-action-food');
  if (btnActionFood) {
    btnActionFood.addEventListener('click', () => {
      transitionToScreen('app-dashboard', 'screen-food');
    });
  }

  // Doctor Match Logic
  const doctorCard = $('#doctor-card');
  const btnSwipeLeft = $('#btn-swipe-left');
  const btnSwipeRight = $('#btn-swipe-right');
  const btnBackDoctor = $('#btn-back-doctor');
  const btnBackFood = $('#btn-back-food');

  const resetDoctorCard = () => {
    setTimeout(() => {
      if (doctorCard) {
        doctorCard.style.transform = '';
        doctorCard.style.opacity = '1';
      }
    }, 500);
  };

  if (btnSwipeLeft && doctorCard) {
    btnSwipeLeft.addEventListener('click', () => {
      doctorCard.style.transform = 'translateX(-150%) rotate(-15deg)';
      doctorCard.style.opacity = '0';
      resetDoctorCard();
    });
  }

  if (btnSwipeRight && doctorCard) {
    btnSwipeRight.addEventListener('click', () => {
      doctorCard.style.transform = 'translateX(150%) rotate(15deg)';
      doctorCard.style.opacity = '0';
      setTimeout(() => {
        transitionToScreen('screen-doctor', 'screen-match');
      }, 300);
    });
  }

  if (btnBackDoctor) {
    btnBackDoctor.addEventListener('click', () => {
      transitionToScreen('screen-doctor', 'app-dashboard');
    });
  }
  
  if (btnBackFood) {
    btnBackFood.addEventListener('click', () => {
      transitionToScreen('screen-food', 'app-dashboard');
    });
  }

  // Match Success logic
  const btnBookCall = $('#btn-book-call');
  const btnMatchLater = $('#btn-match-later');
  if (btnBookCall) {
    btnBookCall.addEventListener('click', () => {
      alert("Booking system integration coming soon!");
      transitionToScreen('screen-match', 'app-dashboard');
      resetDoctorCard();
    });
  }
  if (btnMatchLater) {
    btnMatchLater.addEventListener('click', () => {
      transitionToScreen('screen-match', 'app-dashboard');
      resetDoctorCard();
    });
  }

})();
