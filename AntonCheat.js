// === CONFIGURATION ===
(function(){
  const CONFIG = {
    SOUND_67: 'https://www.myinstants.com/media/sounds/aye-67.mp3',
    NOTIFICATION_DURATION: 2500 // milliseconds
  };
  // =====================
  // Custom notification function
  function showNotification(message, playSound = false) {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0,0,0,0.95);
      color: #fff;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: system-ui;
      z-index: 10000;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      animation: slideIn 0.3s ease;
      font-size: 14px;
      max-width: 300px;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    // Play sound if requested
    if (playSound) {
      try {
        const audio = new Audio(CONFIG.SOUND_67);
        audio.volume = 0.7;
        audio.play().catch(err => console.log('Sound playback failed:', err));
      } catch (error) {
        console.error('Failed to play sound:', error);
      }
    }
    
    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, CONFIG.NOTIFICATION_DURATION);
  }
  
  // Add animations
  if (!document.getElementById('rc-animations')) {
    const style = document.createElement('style');
    style.id = 'rc-animations';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
      @keyframes fadeInScale {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Setup addCoins function
  if (!window.addCoins) {
    window.addCoins = function(a) {
      if (typeof log === 'undefined' || log === null) {
        showNotification('Log not found!');
        return;
      }
      return log.log({event: "adjustCoins", value: a});
    };
  }
  
  // Check if GUI already exists
  let d = document.querySelector('.rc-gui');
  if (d) {
    d.remove();
    return;
  }
  
  // Create GUI
  d = document.createElement('div');
  d.className = 'rc-gui';
  d.innerHTML = `
    <div id="rc-gui-container" style="position:fixed;bottom:20px;right:20px;background:rgba(0,0,0,.95);color:#fff;padding:16px;border-radius:12px;font-family:system-ui;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.4);min-width:220px;cursor:move;user-select:none;">
      <div id="rc-header" style="display:flex;justify-content:space-between;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.1);cursor:grab;">
        <b>sigma coins hack für anton</b>
        <button onclick="this.closest('.rc-gui').remove()" style="background:rgba(255,255,255,.1);border:0;color:#fff;width:28px;height:28px;border-radius:6px;cursor:pointer;font-size:18px">×</button>
      </div>
      <input type="number" id="rc-amt" placeholder="omg 67 coins 🥹" style="width:100%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px;border-radius:8px;font-size:16px;margin-bottom:10px;box-sizing:border-box;cursor:text;">
      <button id="rc-add-btn" style="width:100%;background:linear-gradient(135deg,#667eea,#764ba2);border:0;color:#fff;padding:12px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer">coins hinzufügen du sigma</button>
      <div style="text-align:center;margin-top:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,.1);font-size:11px;color:rgba(255,255,255,.6)">made by revin :D</div>
    </div>
  `;
  document.body.appendChild(d);
  
  // Make GUI draggable
  const container = document.getElementById('rc-gui-container');
  const header = document.getElementById('rc-header');
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  
  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  
  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === header || e.target.closest('#rc-header')) {
      isDragging = true;
      header.style.cursor = 'grabbing';
    }
  }
  
  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;
      
      container.style.transform = `translate(${currentX}px, ${currentY}px)`;
      container.style.bottom = 'auto';
      container.style.right = 'auto';
      container.style.top = '20px';
      container.style.left = '20px';
    }
  }
  
  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    header.style.cursor = 'grab';
  }
  
  // Add button click handler
  document.getElementById('rc-add-btn').onclick = function() {
    let amt = parseInt(document.getElementById('rc-amt').value) || 0;
    window.addCoins(amt);
    showNotification(`${amt} münzen wurden dein sigma arsch hinzugefügt`, amt === 67);
  };
})();
