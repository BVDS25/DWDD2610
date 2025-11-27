/* Hamburger toggle and read more */
document.addEventListener('DOMContentLoaded', function(){
  // Force video autoplay
  const video = document.querySelector('.hero video');
  if(video){
    video.play().catch(function(err){
      console.log('Autoplay blocked:', err);
    });
  }

  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(btn){
    btn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      // animate bars -> X
      this.classList.toggle('open');
    });
  }

  // read more toggle
  const readBtn = document.querySelector('.read-more');
  if(readBtn){
    readBtn.addEventListener('click', function(e){
      e.preventDefault();
      const extra = document.querySelector('.hero .more');
      extra.classList.toggle('show');
      this.textContent = extra.classList.contains('show')? 'Read less' : 'Read more';
    });
  }

  // Make flip cards accessible on tap (touch devices)
  document.querySelectorAll('.speaker').forEach(function(card){
    card.addEventListener('click', function(){
      this.querySelector('.speaker-inner').classList.toggle('flipped');
    });
  });
});
