const toast = (msg) => {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2200);
};
let balance = 2450;
const updateBalance = () => document.getElementById('topBalance').textContent = balance.toLocaleString();

document.querySelectorAll('[data-target]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.dataset.target;
    const map = {dashboard:'.dashboard-screen',watch:'.three-col',leaderboard:'.bottom-grid',profile:'.bottom-grid',wallet:'.bottom-grid'};
    document.querySelector(map[target] || '.dashboard-screen')?.scrollIntoView({behavior:'smooth',block:'start'});
    if(target==='watch') toast('Watch & Earn section opened');
    if(target==='profile') toast('Profile section opened');
    if(target==='wallet') toast('Wallet section opened');
  });
});
document.querySelectorAll('.watch-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const reward = Number(btn.dataset.ad || 20);
    document.getElementById('flowReward').textContent = '+'+reward+' VE';
    document.querySelector('.three-col').scrollIntoView({behavior:'smooth'});
    toast('Ad started — please complete the timer');
  });
});
let t = 25;
let timerId = null;
document.getElementById('completeBtn').addEventListener('click', ()=>{
  if(timerId) return;
  t=25;
  timerId=setInterval(()=>{
    t--;
    document.getElementById('timer').textContent='00:'+String(t).padStart(2,'0');
    document.getElementById('timerProgress').style.width=((25-t)/25*100)+'%';
    document.getElementById('watchPct').textContent=Math.round((25-t)/25*100)+'%';
    if(t<=0){
      clearInterval(timerId); timerId=null;
      const reward = Number(document.getElementById('flowReward').textContent.replace(/\D/g,'')) || 20;
      balance += reward; updateBalance();
      toast('🎉 Reward added: +'+reward+' VE');
      document.querySelector('.success').style.boxShadow='0 0 35px #9b35ff';
    }
  },1000);
});
document.getElementById('bonusBtn').addEventListener('click',()=>{
  balance+=25; updateBalance(); toast('🎁 Daily bonus claimed: +25 VE');
});
document.getElementById('plusBtn').addEventListener('click',()=>toast('VE balance details opened'));
document.getElementById('giftBtn').addEventListener('click',()=>toast('✅ Gift entry created successfully!'));
document.querySelectorAll('.redeem-grid button').forEach(b=>b.addEventListener('click',()=>toast('Redeem request selected')));
document.querySelectorAll('.close').forEach(b=>b.addEventListener('click',()=>b.parentElement.style.display='none'));
updateBalance();
