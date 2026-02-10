document.addEventListener('DOMContentLoaded', function() {
    
    function showTopAlert() {
        const alertElement = document.getElementById('topAlert');
        const progressBar = document.getElementById('progressBar');
        const closeBtn = document.getElementById('alertCloseBtn');
        
        
        alertElement.style.display = 'block';
        
        
        let width = 100;
        const interval = setInterval(() => {
            width -= (100 / 15000) * 100; 
            progressBar.style.width = width + '%';
            
            if (width <= 0) {
                clearInterval(interval);
                closeAlert();
            }
        }, 100);
        
        
        closeBtn.addEventListener('click', () => {
            clearInterval(interval);
            closeAlert();
        });
        
        function closeAlert() {
            alertElement.style.transition = 'all 0.5s ease';
            alertElement.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                alertElement.style.display = 'none';
                document.body.style.paddingTop = '0';
                document.querySelector('.header').style.top = '0';
            }, 500);
        }
        
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearInterval(interval);
                closeAlert();
            }
        });
    }
    
    
    setTimeout(showTopAlert, 1000);
    
    // BUTONLARI DEVRE DIŞI BIRAKMA
    function disableButtons() {
        // Tüm "yakında" butonları
        document.querySelectorAll('.kapali-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                
                try {
                    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
                    audio.play();
                } catch (err) {
                    console.log("Ses çalınamadı");
                }
                
                // Uyarı mesajı
                alert('Bu hizmet çok yakında aktif olacak!');
                return false;
            });
        });
        
        // Kapalı linkleri devre dışı 
        document.querySelectorAll('.kapali-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                alert('Yakında aktif olacak! Elimdeki Siparişleri bitirmem gerekiyor önce :)');
                return false;
            });
        });
    }
    
 
    const sliderYol = document.querySelector('.slider-yol');
    const sliderResimler = document.querySelectorAll('.slider-resim');
    const oncekiBtn = document.getElementById('oncekiBtn');
    const sonrakiBtn = document.getElementById('sonrakiBtn');
    const slider = document.getElementById('slider');
    const sliderNoktalar = document.getElementById('sliderNoktalar');
    
    let aktifResim = 0;
    let sliderInterval;
    const resimSuresi = 5000;
    const toplamResim = sliderResimler.length;
    
    function sliderBaslat() {
        noktaOlustur();
        resimGoster();
        otomatikGecisBaslat();
        
        oncekiBtn.addEventListener('click', oncekiResim);
        sonrakiBtn.addEventListener('click', sonrakiResim);
        
        slider.addEventListener('mouseenter', otomatikGecisDurdur);
        slider.addEventListener('mouseleave', otomatikGecisBaslat);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') oncekiResim();
            if (e.key === 'ArrowRight') sonrakiResim();
        });
    }
    
    function noktaOlustur() {
        for (let i = 0; i < toplamResim; i++) {
            const nokta = document.createElement('div');
            nokta.classList.add('slider-nokta');
            if (i === 0) nokta.classList.add('aktif');
            
            nokta.addEventListener('click', () => {
                resimSec(i);
            });
            
            sliderNoktalar.appendChild(nokta);
        }
    }
    
    function resimGoster() {
        sliderResimler.forEach(resim => {
            resim.classList.remove('aktif');
        });
        
        sliderResimler[aktifResim].classList.add('aktif');
        sliderYol.style.transform = `translateX(-${aktifResim * 100}%)`;
        
        const noktalar = document.querySelectorAll('.slider-nokta');
        noktalar.forEach((nokta, index) => {
            nokta.classList.toggle('aktif', index === aktifResim);
        });
    }
    
    function sonrakiResim() {
        aktifResim = (aktifResim + 1) % toplamResim;
        resimGoster();
        gecisSifirla();
    }
    
    function oncekiResim() {
        aktifResim = (aktifResim - 1 + toplamResim) % toplamResim;
        resimGoster();
        gecisSifirla();
    }
    
    function resimSec(index) {
        aktifResim = index;
        resimGoster();
        gecisSifirla();
    }
    
    function otomatikGecisBaslat() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(sonrakiResim, resimSuresi);
    }
    
    function otomatikGecisDurdur() {
        clearInterval(sliderInterval);
    }
    
    function gecisSifirla() {
        otomatikGecisDurdur();
        otomatikGecisBaslat();
    }
    
    
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 0, 0, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(255, 0, 0, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    });
    

    const menuToggle = document.getElementById('menuToggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
        menuToggle.innerHTML = menu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
   
    function liveVisitorCounter() {
        let count = Math.floor(Math.random() * 15) + 8; 
        
        const counterElement = document.getElementById('liveCounter');
        if (counterElement) {
            counterElement.textContent = count;
            
            setInterval(() => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const newCount = Math.max(5, count + change); 
                count = newCount;
                counterElement.textContent = count;
                
                if (change > 0) {
                    counterElement.style.color = '#00ff00';
                    setTimeout(() => counterElement.style.color = 'white', 500);
                }
            }, 12000); 
            
            setInterval(() => {
                if (Math.random() > 0.7) { 
                    count = Math.max(5, count - 1);
                    counterElement.textContent = count;
                    counterElement.style.color = '#ff4444';
                    setTimeout(() => counterElement.style.color = 'white', 500);
                }
            }, 9000);
            
            setInterval(() => {
                if (Math.random() > 0.6) { 
                    count += 1;
                    counterElement.textContent = count;
                    counterElement.style.color = '#00ff00';
                    setTimeout(() => counterElement.style.color = 'white', 500);
                }
            }, 11000);
        }
    }
    
 
    function setActiveMenu() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
 
    sliderBaslat();
    liveVisitorCounter();
    disableButtons();
    window.addEventListener('scroll', setActiveMenu);
});