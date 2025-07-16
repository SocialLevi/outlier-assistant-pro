import React, { useState, useEffect, useRef } from 'react';
// You can find more icons at https://lucide.dev/icons/
import { ShoppingCart, Menu, X, MessageSquare, Send, Copy } from 'lucide-react';

// --- MOCK DATA ---
const servicesForSale = [
  { id: 1, title: 'Video Screening', description: 'AI-powered video screening and analysis to identify key insights and patterns.', price: 8.00, coverUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop' },
  { id: 2, title: 'Project Answers', description: 'Get quick, accurate answers and solutions for your AI project questions and blockers.', price: 3.00, coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1934&auto=format&fit=crop' },
  { id: 3, title: 'Project Management', description: 'Dedicated management for your AI projects, operating on a 35% share rate, billed weekly.', price: "35% Weekly", coverUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
];

const testimonials = [
    { name: 'Priya S.', country: 'India', flag: '🇮🇳', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1887&auto=format&fit=crop', review: 'Absolutely saved me on the Expert Sturgeon project. The explanation was clear and I passed with flying colors. Highly recommend!' },
    { name: 'John D.', country: 'USA', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop', review: "I was struggling with the Mathematics skill assessment, but their guidance was a game-changer. I passed easily and got matched with a great project right after!" },
    { name: 'Emily C.', country: 'UK', flag: '🇬🇧', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop', review: 'Brilliant help with the Engine Room V2 project. Professional, fast, and the quality of work was exceptional. Thank you so much!' },
    { name: 'Michael B.', country: 'USA', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop', review: 'Passed the Onyx Hammer project thanks to them. I was completely stuck before reaching out. Worth every penny.' },
    { name: 'Chloe R.', country: 'USA', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop', review: 'My Calculus project was a nightmare, but they handled it so professionally. I got a great grade and finally understood the concepts.' },
    { name: 'Rohan K.', country: 'India', flag: '🇮🇳', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop', review: 'The service for the Generalist path is unmatched. Fast, reliable, and always high quality. A must for any Outlier student.' }
];

const programmingSkills = [ { name: 'Python', percentage: 98 }, { name: 'JavaScript', percentage: 96 }, { name: 'TypeScript', percentage: 95 }, { name: 'Java', percentage: 94 }, { name: 'C++', percentage: 92 }, { name: 'Go', percentage: 90 }, ];
const stemSkills = [ { name: 'Maths', percentage: 99 }, { name: 'Physics', percentage: 97 }, { name: 'Biology', percentage: 96 }, { name: 'Chemistry', percentage: 95 } ];


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


// --- THEME-AWARE COMPONENTS ---

const Header = ({ onCartClick, cartCount }) => {
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
                <a href="#home" className="text-2xl font-bold text-green-400 hover:text-cyan-400 transition-colors duration-300 glitch-text" data-text="OutlierHelp">
                    OutlierHelp
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-green-400 hover:text-cyan-400 transition-colors duration-300">
                           {'>'} {link.name}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <button onClick={onCartClick} className="relative text-green-400 hover:text-cyan-400">
                        <ShoppingCart className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                    </button>
                    <a href="#contact" className="hidden sm:inline-block btn-hacker">
                        Contact Us
                    </a>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-green-400">
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-black/95 border-t border-green-500/30">
                    <nav className="flex flex-col items-center space-y-4 p-4">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-green-400 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>
                                {'>'} {link.name}
                            </a>
                        ))}
                        <a href="#contact" className="w-full text-center btn-hacker mt-4" onClick={() => setIsMenuOpen(false)}>
                            Contact Us
                        </a>
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
                        {'>'} Work from home, on your own schedule.
                    </p>
                    <a href="#contact" className="btn-hacker text-lg">Get Started</a>
                </div>
                <div className="md:w-5/12 flex justify-center md:justify-end">
                    <div className="relative">
                         <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop" alt="Developer working" className="w-full h-auto shadow-lg shadow-cyan-500/20" style={{ filter: 'grayscale(80%) contrast(1.2) brightness(0.8)' }}/>
                         <div className="absolute inset-0 bg-green-900/20 mix-blend-hard-light"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => (
    <Section id="about" className="bg-gray-900/50">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 led-text">{'>'}{'>'} Why Choose Us?</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3 flex justify-center">
                    <img loading="lazy" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop" alt="Expertise" className="w-48 h-48 rounded-full object-cover border-4 border-cyan-500/50" style={{ filter: 'grayscale(50%) contrast(1.2)' }}/>
                </div>
                <div className="md:w-2/3 text-lg space-y-4 text-gray-300">
                    <p>We specialize in providing premier assistance for Outlier AI projects. Our mission is to help you navigate your toughest assessments with confidence, delivering high-quality, expert support to ensure you pass successfully.</p>
                    <p>We are your dedicated partners, offering deep expertise in a range of subjects to help you overcome any challenge and achieve your learning goals on the Outlier platform.</p>
                </div>
            </div>
        </div>
    </Section>
);

const SkillChart = ({ skill }) => {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const radius = 60;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const offset = inView ? circumference - (skill.percentage / 100) * circumference : circumference;

    return (
        <div ref={ref} className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-green-400">{skill.percentage}%</span>
                <span className="text-cyan-400">{skill.name}</span>
            </div>
            <svg className="w-full h-full transform -rotate-90">
                <circle className="text-gray-700" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx="75" cy="75" />
                <circle className="text-green-500" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={radius} cx="75" cy="75" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
            </svg>
        </div>
    );
};

const ExpertiseSection = () => (
    <Section id="expertise" className="bg-black">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 led-text">{'>'}{'>'} Our Expertise</h2>
            <div>
                <h3 className="text-2xl font-semibold text-center mb-10 text-cyan-400">// Programming_Languages</h3>
                <div className="flex flex-wrap justify-center gap-8">
                    {programmingSkills.map(skill => <SkillChart key={skill.name} skill={skill} />)}
                </div>
            </div>
            <div className="mt-20">
                <h3 className="text-2xl font-semibold text-center mb-10 text-cyan-400">// STEM_Subjects</h3>
                <div className="flex flex-wrap justify-center gap-8">
                    {stemSkills.map(skill => <SkillChart key={skill.name} skill={skill} />)}
                </div>
            </div>
        </div>
    </Section>
);

const ServiceCard = ({ service, onAddToCart }) => (
    <div className="bg-gray-900/50 border border-green-500/30 overflow-hidden transform hover:border-cyan-400 transition-all duration-300 group flex flex-col">
        <img src={service.coverUrl} alt={`Cover for ${service.title}`} className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity" style={{ filter: 'grayscale(50%) contrast(1.2)' }} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/cccccc/FFFFFF?text=Image+Not+Found'; }} />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-green-400 mb-2">{service.title}</h3>
            <p className="text-gray-300 text-sm mb-4 flex-grow">{service.description}</p>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <span className="text-xl font-extrabold text-cyan-400">
                    {typeof service.price === 'number' ? `$${service.price.toFixed(2)}` : service.price}
                </span>
                <button onClick={() => onAddToCart(service)} className="btn-hacker w-full sm:w-auto flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
);

const ServicesSection = ({ onAddToCart }) => (
    <Section id="store" className="bg-gray-900/50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold led-text">{'>'}{'>'} Our Services</h2>
                <p className="text-lg text-gray-300 mt-2">// Book a session or get project help from our experts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesForSale.map(service => (
                    <ServiceCard key={service.id} service={service} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
    </Section>
);

const TestimonialsSection = () => (
    <Section id="testimonials" className="bg-black overflow-hidden">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 led-text">{'>'}{'>'} What Our Clients Say</h2>
        </div>
        <div className="relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex animate-[marquee_60s_linear_infinite]">
                {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="flex-shrink-0 w-[350px] bg-gray-900/50 border border-green-500/30 p-6 mx-4">
                        <p className="mb-4 flex-grow text-gray-300">"{t.review}"</p>
                        <div className="flex items-center mt-auto pt-4 border-t border-green-500/30">
                            <img loading="lazy" src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" />
                            <div className="ml-4">
                                <span className="font-bold text-lg text-green-400">{t.name}</span>
                                <span className="ml-2">{t.flag}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const ContactSection = () => (
    <Section id="contact" className="bg-gray-900/50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-center mb-8 led-text">{'>'}{'>'} Contact Us</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">Ready to pass? Send a message on Telegram to discuss your project and get started right away.</p>
            <a href="https://t.me/Ask_me_and_I_will_help" target="_blank" rel="noopener noreferrer" className="btn-hacker text-lg inline-flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23a.68.68 0 0 0-.14-.58l-3.39-3.4a.68.68 0 0 1 .2-1.1l4.42-1.62a.68.68 0 0 0 .5-.17l2.16-3.9a.68.68 0 0 1 1.2 0l2.16 3.9a.68.68 0 0 0 .5.17l4.42 1.62a.68.68 0 0 1 .2 1.1l-3.39 3.4a.68.68 0 0 0-.14.58l.28 4.23a.68.68 0 0 1-1 .72l-4.1-2.11a.68.68 0 0 0-.64 0l-4.1 2.11a.68.68 0 0 1-1-.72z"></path></svg>
                Message on Telegram
            </a>
        </div>
    </Section>
);

const Footer = () => (
    <footer className="py-8 mt-16 border-t text-center bg-black border-green-500/30">
        <div className="container mx-auto px-6 text-gray-400">
            <p className="font-bold text-green-400">Outlier Assistant</p>
            <p className="text-sm">Suite 404, 1021 West Hastings Street</p>
            <p className="text-sm">Vancouver, BC, Canada</p>
            <p className="mt-4 text-xs opacity-50">© {new Date().getFullYear()} Outlier Assistant. All Rights Reserved.</p>
        </div>
    </footer>
);

const CartModal = ({ cart, isOpen, onClose, onUpdateQuantity, onRemoveItem }) => {
    const [checkoutStep, setCheckoutStep] = useState('cart');
    const [copySuccess, setCopySuccess] = useState('');
    
    const subtotal = cart.filter(item => typeof item.price === 'number').reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const generateOrderMessage = () => {
        let message = "Hello OutlierHelp, I'd like to place an order for the following items:\n\n";
        let localSubtotal = 0;
        cart.forEach(item => {
            if (typeof item.price === 'number') {
                const itemTotal = item.price * item.quantity;
                message += `* ${item.title} (x${item.quantity}) - $${itemTotal.toFixed(2)}\n`;
                localSubtotal += itemTotal;
            } else {
                 message += `* ${item.title} (x${item.quantity}) - Price: ${item.price}\n`;
            }
        });
        message += `\n*Subtotal (for fixed-price items): $${localSubtotal.toFixed(2)}*\n\nI'm ready to proceed. Thank you!`;
        return message;
    };

    const handleCheckoutClick = () => {
        if (cart.length > 0) setCheckoutStep('instructions');
    };

    const handleCopyToClipboard = () => {
        const orderText = generateOrderMessage();
        navigator.clipboard.writeText(orderText).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy.');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };
    
    const handleBackToCart = () => {
        setCheckoutStep('cart');
        setCopySuccess('');
    };
    
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setCheckoutStep('cart');
                setCopySuccess('');
            }, 300);
        }
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 bg-black/80 z-[100] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div className="bg-black border border-green-500/50 shadow-lg shadow-cyan-500/20 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-green-500/30 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-green-400">{checkoutStep === 'cart' ? 'Your Cart' : 'Checkout Instructions'}</h2>
                    <button onClick={onClose}><X className="text-gray-500 hover:text-green-400" /></button>
                </div>
                
                {checkoutStep === 'cart' ? (
                    <>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            {cart.length === 0 ? (
                                <p className="text-gray-400">{'>'} Cart is empty...</p>
                            ) : (
                                <ul className="divide-y divide-green-500/30">
                                    {cart.map(item => (
                                        <li key={item.id} className="py-4 flex items-center">
                                            <img src={item.coverUrl} alt={item.title} className="w-16 h-20 object-cover border-2 border-green-500/50" />
                                            <div className="ml-4 flex-grow">
                                                <h3 className="font-semibold text-green-400">{item.title}</h3>
                                                <p className="text-sm text-cyan-400">
                                                    {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="number" value={item.quantity} onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))} className="w-16 text-center bg-gray-900 border border-green-500/50 text-green-400" min="1" />
                                                <button onClick={() => onRemoveItem(item.id)} className="ml-4 text-red-500 hover:text-red-400">Remove</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="p-6 border-t border-green-500/30">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span className="text-green-400">Subtotal:</span>
                                <span className="text-cyan-400">${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Note: Custom priced services are not included in the subtotal.</p>
                            <button onClick={handleCheckoutClick} disabled={cart.length === 0} className="w-full mt-4 btn-hacker">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="p-6">
                        <p className="text-gray-300 mb-4">Please copy your order details and send them to us on Telegram.</p>
                        <textarea readOnly value={generateOrderMessage()} className="w-full h-40 p-2 border bg-black border-green-500/50 text-green-400 text-sm mb-4"></textarea>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={handleCopyToClipboard} className="flex-1 btn-hacker-secondary">
                                <Copy size={18} /> {copySuccess || 'Copy Order'}
                            </button>
                            <a href="https://t.me/Ask_me_and_I_will_help" target="_blank" rel="noopener noreferrer" className="flex-1 btn-hacker">
                                Contact on Telegram
                            </a>
                        </div>
                        <button onClick={handleBackToCart} className="w-full mt-4 text-sm text-gray-400 hover:underline">Back to Cart</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ text: "Hi, I am Festus. How can I help you today!", sender: 'bot' }]);
        }
    }, [isOpen]);

    const getBotResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        
        if (lowerCaseInput.includes('apply') || lowerCaseInput.includes('join') || lowerCaseInput.includes('how to')) {
            return "You can apply for projects on the official Outlier platform. Here is the link: www.app.outlier.ai. We wish you the best of luck!";
        }
        if (lowerCaseInput.includes('task') || lowerCaseInput.includes('project') || lowerCaseInput.includes('available') || lowerCaseInput.includes('skill')) {
            return "Currently, Outlier.ai has tasks available in the Coding domain, specifically for those with Frontend skills.";
        }
        if (lowerCaseInput.includes('service') || lowerCaseInput.includes('help') || lowerCaseInput.includes('offer')) {
             return "We offer expert assistance for Video Screening ($8), Project Answers ($3), and full Project Management (35% weekly share rate). You can see a full list in the 'Services' section of our website.";
        }
         if (lowerCaseInput.includes('price') || lowerCaseInput.includes('cost') || lowerCaseInput.includes('how much')) {
            return "Our pricing is listed with each service. 'Video Screening' is $8, 'Project Answers' is $3, and 'Project Management' is a 35% weekly share rate. For detailed quotes, please contact us on Telegram.";
        }
        if (lowerCaseInput.includes('contact') || lowerCaseInput.includes('telegram')) {
            return "The best way to get a quote or discuss a project is via Telegram. You can find the button in the 'Contact Us' section or in the cart after adding services.";
        }
        if (lowerCaseInput.includes('hi') || lowerCaseInput.includes('hello') || lowerCaseInput.includes('hey')) {
            return "Hello there! How can I assist you today?";
        }

        return "I'm sorry, I'm not sure how to answer that. Could you try rephrasing? You can ask me about our services, pricing, or about applying to Outlier.ai.";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (userMessage === "" || isLoading) return;

        const newMessages = [...messages, { text: userMessage, sender: 'user' }];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);
        
        setTimeout(() => {
            const botResponseText = getBotResponse(userMessage);
            setMessages(prev => [...prev, { text: botResponseText, sender: 'bot' }]);
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="fixed bottom-5 right-5 z-[99]">
            <div className={`transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-[350px] max-w-[calc(100vw-40px)] h-[70vh] max-h-[500px] bg-black border-2 border-green-500/50 rounded-none shadow-lg shadow-cyan-500/20 flex flex-col">
                    <div className="p-4 border-b border-green-500/30">
                        <h3 className="font-bold text-lg text-green-400">Festus</h3>
                        <p className="text-sm text-cyan-400">AI Assistant</p>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-cyan-300'}`}>
                                    {isLoading && index === messages.length -1 ? (
                                        <div className="flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-0"></span>
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></span>
                                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></span>
                                        </div>
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-green-500/30 flex items-center gap-2">
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder={isLoading ? "Please wait..." : "Ask a question..."} disabled={isLoading} className="flex-grow bg-black border-green-500/50 border rounded-none p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-green-300"/>
                        <button type="submit" disabled={isLoading} className="bg-green-500 text-black rounded-none p-2 hover:bg-green-400 transition-colors disabled:opacity-50">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="btn-hacker w-16 h-16 flex items-center justify-center mt-4 text-3xl">
                {isOpen ? <X /> : "/>"}
            </button>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

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
            <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
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
        </div>
    );
}
