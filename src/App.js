import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input'
// You can find more icons at https://lucide.dev/icons/
import { ShoppingCart, Menu, X, MessageSquare, Send, Copy, LogIn, LogOut } from 'lucide-react';

// --- MOCK DATA ---
const servicesForSale = [
  { id: 1, title: 'Video Screening', description: 'AI-powered video screening and analysis to identify key insights and patterns.', price: 8.00, coverUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop' },
  { id: 2, title: 'Project Answers', description: 'Get quick, accurate answers and solutions for your AI project questions and blockers.', price: 3.00, coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934&auto=format&fit=crop' },
  { id: 3, title: 'Project Management', description: 'Dedicated management for your AI projects, operating on a 35% share rate, billed weekly.', price: "35% Weekly", coverUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
];

const testimonials = [
    { name: 'Priya S.', country: 'India', flag: '🇮🇳', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1887&auto=format&fit=crop', review: 'Absolutely saved me on the Expert Sturgeon project. The explanation was clear and I passed with flying colors. Highly recommend!' },
    { name: 'John D.', country: 'USA', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', review: "I was struggling with the Mathematics skill assessment, but their guidance was a game-changer. I passed easily and got matched with a great project right after!" },
];

// --- HELPER HOOKS & COMPONENTS ---
const useInView = (options) => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                if (options?.triggerOnce) {
                    observer.unobserve(entry.target);
                }
            }
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.disconnect(); };
    }, [ref, options]);
    return [ref, inView];
};

const useTypewriter = (text, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, speed);
            return () => clearInterval(typingInterval);
        }
    }, [inView, text, speed]);

    return [ref, displayText];
};

const Section = ({ id, children, className = '' }) => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
    return (
        <section id={id} ref={ref} className={`py-20 md:py-32 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0 translate-y-5'} ${className}`}>
            {children}
        </section>
    );
};

// --- MAIN COMPONENTS ---
const Header = ({ onCartClick, cartCount, onNavigate, isLoggedIn, onLogout, username }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Expertise', href: '#expertise' },
        { name: 'Services', href: '#store' },
        { name: 'Reviews', href: '#testimonials' },
    ];

    return (
        <header className="bg-black/80 backdrop-blur-md sticky top-0 z-50 border-b border-green-500/30">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={() => onNavigate('home')} className="text-2xl font-bold text-green-400 hover:text-cyan-400 transition-colors duration-300 glitch-text" data-text="OutlierHelp">
                    OutlierHelp
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-green-400 hover:text-cyan-400 transition-colors duration-300">
                           [{link.name}]
                        </a>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    {isLoggedIn && (
                        <span className="text-cyan-400 hidden sm:block">Welcome, {username}</span>
                    )}
                    <button onClick={onCartClick} className="relative text-green-400 hover:text-cyan-400">
                        <ShoppingCart className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </button>
                    {isLoggedIn ? (
                        <button onClick={onLogout} className="btn-hacker-secondary flex items-center gap-2"><LogOut size={16}/> Logout</button>
                    ) : (
                         <button onClick={() => onNavigate('login')} className="btn-hacker flex items-center gap-2"><LogIn size={16}/> Login</button>
                    )}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-green-400">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 border-t border-green-500/30">
                    <nav className="flex flex-col items-center space-y-4 p-4">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-green-400 hover:text-cyan-400" onClick={() => {onNavigate('home'); setIsMenuOpen(false);}}>
                                [{link.name}]
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

const HeroSection = () => {
    const [titleRef, displayedTitle] = useTypewriter("Changing the future of AI ", 50);

    return (
        <section id="home" className="min-h-screen flex items-center pt-24 md:pt-0">
            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
                <div className="md:w-7/12 text-center md:text-left">
                    <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-green-400 h-32 md:h-48">
                        {displayedTitle}
                        <span className="led-text">across the globe</span>
                        <span className="animate-ping">_</span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto md:mx-0 text-gray-300">
                        // Work from home, on your own schedule.
                    </p>
                    <a href="#contact" className="btn-hacker text-lg">Get Started</a>
                </div>
                <div className="md:w-5/12 flex justify-center md:justify-end">
                    <div className="relative">
                         <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop" alt="Developer working" className="w-full h-auto shadow-lg shadow-cyan-500/20 rounded-lg" style={{ filter: 'grayscale(80%) contrast(1.2) brightness(0.8)' }}/>
                         <div className="absolute inset-0 bg-green-900/20 mix-blend-hard-light rounded-lg"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ... (All other components like AboutSection, ServicesSection, etc. remain the same)
// ... (For brevity, they are not repeated here but should be included in your final App.js file)

export default function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleNavigate = (page) => setCurrentPage(page);
    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUsername(user);
        setCurrentPage('home');
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setCurrentPage('login');
    };

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (productId, quantity) => {
        if (isNaN(quantity) || quantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const handleRemoveItem = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleContextmenu = (e) => e.preventDefault();
        const handleKeydown = (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
            }
        };
        document.addEventListener('contextmenu', handleContextmenu);
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('contextmenu', handleContextmenu);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <div className="bg-black text-green-400 font-mono antialiased scroll-smooth">
            {isLoggedIn ? (
                <>
                    <Header 
                        cartCount={cartCount} 
                        onCartClick={() => setIsCartOpen(true)}
                        onNavigate={handleNavigate}
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                        username={username}
                    />
                    <main>
                        <HeroSection />
                        <AboutSection />
                        <ExpertiseSection />
                        <ServicesSection onAddToCart={handleAddToCart} />
                        <TestimonialsSection />
                        <ContactSection />
                    </main>
                    <Footer />
                    <CartModal 
                        cart={cart} 
                        isOpen={isCartOpen} 
                        onClose={() => setIsCartOpen(false)}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                    />
                    <ChatBot />
                </>
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
}

const LoginPage = ({ onLogin }) => {
    const [step, setStep] = useState(1); // 1 for phone number, 2 for OTP
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            setError('Phone number is required.');
            return;
        }
        setError('');
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/send-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send OTP.');
            }

            setMessage(data.message);
            setStep(2);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const res = await fetch('/api/verify-sms-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Verification failed.');
            }
            
            onLogin(data.user.phone);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-black border border-green-500/50 p-8 shadow-lg shadow-cyan-500/20 w-full max-w-md text-center rounded-lg">
                <h2 className="text-4xl font-bold mb-4 led-text">System Access</h2>
                
                {step === 1 ? (
                    <>
                        <p className="text-gray-300 mb-8">Enter your phone number to receive a login code.</p>
                        <form onSubmit={handlePhoneSubmit}>
                            <div className="bg-gray-900 border border-green-500/50 p-3 rounded-md focus-within:ring-2 focus-within:ring-cyan-500 mb-4">
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={phoneNumber}
                                    onChange={setPhoneNumber}
                                    className="w-full bg-transparent text-green-400"
                                />
                            </div>
                            <button type="submit" className="btn-hacker text-lg inline-flex items-center gap-3 w-full justify-center" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Code'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="text-gray-300 mb-8">{message || `Enter the code sent to ${phoneNumber}`}</p>
                         <form onSubmit={handleOtpSubmit}>
                            <input 
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="6-digit OTP"
                                maxLength="6"
                                className="w-full bg-gray-900 border border-green-500/50 p-3 text-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4 tracking-[1em] text-center"
                                disabled={isLoading}
                            />
                            <button type="submit" className="btn-hacker text-lg inline-flex items-center gap-3 w-full justify-center" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify & Enter'}
                            </button>
                        </form>
                    </>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}
