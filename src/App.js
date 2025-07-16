import React, { useState, useEffect, useRef } from 'react';
// You can find more icons at https://lucide.dev/icons/
import { ShoppingCart, Menu, X, MessageSquare, Send, Copy, LogIn, LogOut } from 'lucide-react';

// --- MOCK DATA ---
const servicesForSale = [
  { id: 1, title: 'Video Screening', description: 'AI-powered video screening and analysis to identify key insights and patterns.', price: 8.00, coverUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop' },
  { id: 2, title: 'Project Answers', description: 'Get quick, accurate answers and solutions for your AI project questions and blockers.', price: 3.00, coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934&auto=format&fit=crop' },
  { id: 3, title: 'Project Management', description: 'Dedicated management for your AI projects, operating on a 35% share rate, billed weekly.', price: "35% Weekly", coverUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
];

// ... (The rest of the App.js code remains the same as the previous version)
// ... (All the components like Header, HeroSection, AboutSection, etc. are unchanged)
// ... (The LoginPage component is the only one with significant changes)

const LoginPage = ({ onLogin }) => {
    const [step, setStep] = useState(1); // 1 for username, 2 for OTP
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            setError('Telegram username cannot be empty.');
            return;
        }
        setError('');
        setIsLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
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
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Verification failed.');
            }
            
            // On successful verification, call the onLogin prop
            onLogin();

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
                        <p className="text-gray-300 mb-8">Authenticate with your Telegram account to proceed.</p>
                        <form onSubmit={handleUsernameSubmit}>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="@telegram_username"
                                className="w-full bg-gray-900 border border-green-500/50 p-3 text-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4"
                                disabled={isLoading}
                            />
                            <button type="submit" className="btn-hacker text-lg inline-flex items-center gap-3 w-full justify-center" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Request OTP'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="text-gray-300 mb-8">{message || 'An OTP has been sent to your Telegram account.'}</p>
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

// The rest of the App.js file (components like HeroSection, AboutSection, etc.) remains unchanged.
// For brevity, it is not repeated here but should be included in your final App.js file.
// You can copy it from the previous complete code block.

export default function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleNavigate = (page) => setCurrentPage(page);
    const handleLogin = () => {
        setIsLoggedIn(true);
        setCurrentPage('home');
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
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

