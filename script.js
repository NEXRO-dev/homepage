// ナビゲーションバーのスクロール効果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = 'var(--white)';
    }
});

// ハンバーガーメニュー
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// スクロール時にメニューを閉じる
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('active')) {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// フォーム送信処理
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // ここでフォームデータをサーバーに送信する処理を実装
        console.log('送信されたデータ:', data);
        
        // 送信完了メッセージ
        alert('お問い合わせありがとうございます。内容を確認次第、ご連絡させていただきます。');
        this.reset();
    });
}

// アニメーション用のCSSを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 8vh;
        right: 0;
        height: 92vh;
        background-color: var(--white);
        width: 50%;
        padding: 2rem;
        box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(style);

// テスティモニアルスライダー
const testimonialSlider = document.querySelector('.testimonial-slider');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');

let currentIndex = 0;
const cardWidth = testimonialCards[0].offsetWidth;
const cardMargin = parseInt(window.getComputedStyle(testimonialCards[0]).marginLeft) * 2;

function updateSlider() {
    const offset = -(currentIndex * (cardWidth + cardMargin));
    testimonialSlider.style.transform = `translateX(${offset}px)`;
}

function showNextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    updateSlider();
}

function showPrevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateSlider();
}

// ボタンクリックイベント
prevButton.addEventListener('click', showPrevTestimonial);
nextButton.addEventListener('click', showNextTestimonial);

// 自動スライド
let slideInterval = setInterval(showNextTestimonial, 5000);

// ホバー時に自動スライドを停止
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(showNextTestimonial, 5000);
});

// タッチスワイプ対応
let touchStartX = 0;
let touchEndX = 0;

testimonialSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

testimonialSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            showPrevTestimonial();
        } else {
            showNextTestimonial();
        }
    }
}

// スクロールアニメーション
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// パララックス効果
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        element.style.transform = `translateY(${rate}px)`;
    });
});

// ヘッダーのスクロール効果
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// フォームアニメーション
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// カウンターアニメーション
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 1);
    } else {
        counter.innerText = target;
    }
}

function startCounterAnimation() {
    counters.forEach(counter => {
        const counterPosition = counter.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (counterPosition < screenPosition) {
            animateCounter(counter);
        }
    });
}

window.addEventListener('scroll', startCounterAnimation);
window.addEventListener('load', startCounterAnimation);

// ホバーエフェクト
const serviceCards = document.querySelectorAll('.service-card');
const workCards = document.querySelectorAll('.work-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('img').style.transform = 'scale(1)';
    });
});

// スクロールインジケーター
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの要素を取得
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // ハンバーガーメニューのクリックイベント
    burger.addEventListener('click', function() {
        // ハンバーガーメニューのトグル
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ナビゲーションリンクのクリックイベント
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            // モバイルメニューを閉じる
            burger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // スクロール時のヘッダー制御
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // スクロールアニメーション
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
}); 