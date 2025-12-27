// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// 移动端下拉菜单切换
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    if (item.querySelector('.dropdown-menu')) {
        const link = item.querySelector('.nav-link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                e.stopPropagation();
                
                // 切换当前下拉菜单
                const dropdown = item.querySelector('.dropdown-menu');
                dropdown.classList.toggle('active');
                
                // 旋转箭头图标
                const arrow = link.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('rotated');
                }
                
                // 关闭其他打开的下拉菜单
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.querySelector('.dropdown-menu');
                        if (otherDropdown && otherDropdown.classList.contains('active')) {
                            otherDropdown.classList.remove('active');
                            const otherArrow = otherItem.querySelector('.dropdown-arrow');
                            if (otherArrow) {
                                otherArrow.classList.remove('rotated');
                            }
                        }
                    }
                });
            }
        });
    }
});

// 点击页面其他地方关闭移动菜单和下拉菜单
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
        // 如果点击的不是导航容器
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            
            // 关闭所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 重置所有箭头
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.classList.remove('rotated');
            });
        }
    }
});

// 回到顶部功能
const toggleBtn = document.querySelector('.toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 页面加载时检查滚动位置
window.addEventListener('load', function() {
    if (window.scrollY > 50) {
        document.querySelector('.header').classList.add('scrolled');
    }
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // 如果不是锚点链接或链接是#，则不处理
        if (href === '#' || !href.startsWith('#')) return;
        
        // 如果是移动端菜单，先关闭菜单
        if (window.innerWidth <= 992) {
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            
            // 关闭所有下拉菜单
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 重置所有箭头
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.classList.remove('rotated');
            });
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 添加旋转箭头的CSS样式
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-arrow.rotated {
            transform: rotate(180deg) !important;
        }
        
        @media (max-width: 992px) {
            .dropdown-arrow.rotated {
                transform: translateY(-50%) rotate(180deg) !important;
            }
        }
    `;
    document.head.appendChild(style);
});