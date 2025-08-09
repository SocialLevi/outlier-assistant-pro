import React, { useState, useEffect, useRef } from 'react';

// --- SVG Icon Components ---
const HomeIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ProjectIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
const ServicesIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const ReviewsIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const ContactIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const ChatIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const SendIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const CloseIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const MenuIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const StarIcon = ({ className, isFilled }) => <svg className={className} viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const ArrowRightIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const CartIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;

const GoogleIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>;
const MicrosoftIcon = ({ className }) => <svg className={className} viewBox="0 0 21 21" fill="currentColor"><path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path></svg>;
const MetaIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="#0062E0"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.08c-5.56 0-10.08-4.52-10.08-10.08S6.44 1.92 12 1.92s10.08 4.52 10.08 10.08-4.52 10.08-10.08 10.08z"/><path d="M12 7.13c-2.7 0-4.88 2.18-4.88 4.87s2.18 4.87 4.88 4.87 4.87-2.18 4.87-4.87-2.18-4.87-4.87-4.87zm0 8.24c-1.86 0-3.36-1.5-3.36-3.37s1.5-3.37 3.36-3.37 3.36 1.5 3.36 3.37-1.5 3.37-3.36 3.37z"/></svg>;
const GMIcon = ({ className }) => <svg className={className} viewBox="0 0 48 48" fill="none"><path d="M2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24Z" fill="#009DFF"></path><path d="M4 24h40" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"></path></svg>;
const OpenAIIcon = ({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M12.012 2.184a9.84 9.84 0 0 1 7.72 3.864l-1.344 1.344a7.824 7.824 0 0 0-12.752 0l-1.344-1.344a9.84 9.84 0 0 1 7.72-3.864zM2.844 8.7a9.84 9.84 0 0 1 16.968 0l1.344-1.344a11.808 11.808 0 0 0-19.656 0l1.344 1.344zM4.188 15.3a7.824 7.824 0 0 0 12.752 0l1.344 1.344a9.84 9.84 0 0 1-15.44 0l1.344-1.344zM12.012 21.816a9.84 9.84 0 0 1-7.72-3.864l1.344-1.344a7.824 7.824 0 0 0 12.752 0l1.344 1.344a9.84 9.84 0 0 1-7.72 3.864z" fill="#43A047"></path></svg>;
const TimeIcon = ({ className }) => <svg className={className} viewBox="0 0 100 30" fill="currentColor"><path d="M13.1,22.2V7.8h2.6v12.3h6.6v2.1H13.1z M32.9,7.8v16.4h-2.6V9.9h-6.6V7.8H32.9z M50,22.2V7.8h-2.6v16.4H50z M67.1,22.2V7.8h2.6v16.4H67.1z M86.9,22.2V9.9h-5.2V7.8h13.1v2.1h-5.2v12.3H86.9z"></path></svg>;

const Section = ({ id, children, setActivePage }) => {
    const ref = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActivePage(id);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [id, setActivePage]);

    return <section id={id} ref={ref}>{children}</section>;
};

const Toast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="toast fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg">
            {message}
        </div>
    );
};

const Home = ({ setActivePage }) => (
    <Section id="home" setActivePage={setActivePage}>
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center text-center p-8">
            <div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
                    The Future of AI is Human
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Welcome to the Outlier Help Center. We unite human expertise with artificial intelligence to build a smarter world.
                </p>
            </div>
        </div>
    </Section>
);

const ActiveProjects = ({ setActivePage, onApplyNow, projects }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800";
            case "Max Capacity": return "bg-yellow-100 text-yellow-800";
            case "Paused": return "bg-blue-100 text-blue-800";
            case "No Available Tasks": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    return (
        <Section id="active-projects" setActivePage={setActivePage}>
            <div className="py-20 px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">Our Active Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.name}
                            className="bg-white border border-gray-200/80 rounded-xl p-6 flex flex-col group shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(project.status)}`}>{project.status}</span>
                                </div>
                                <div className="text-center my-4">
                                    <div className="text-sm text-gray-500 mb-1">Available Tasks on Pool</div>
                                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                        {project.tasks.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={onApplyNow}
                                    className="w-full text-center text-purple-600 font-semibold py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600"
                                >
                                    Apply Now <ArrowRightIcon className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const Services = ({ setActivePage, projects, addToCart }) => {
    const [servicePrices, setServicePrices] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('US');

    const countries = [
        { name: 'United States', code: 'US' }, { name: 'United Kingdom', code: 'GB' }, { name: 'Canada', code: 'CA' },
        { name: 'Australia', code: 'AU' }, { name: 'Mexico', code: 'MX' }, { name: 'Germany', code: 'DE' },
        { name: 'France', code: 'FR' }, { name: 'Japan', code: 'JP' }, { name: 'India', code: 'IN' },
        { name: 'Brazil', code: 'BR' }, { name: 'South Africa', code: 'ZA' }
    ];

    const calculatePrice = (country) => {
        const expensiveCountries = ['US', 'GB', 'CA', 'AU', 'MX'];
        if (expensiveCountries.includes(country)) {
            return (Math.random() * 2 + 8).toFixed(2);
        }
        return (Math.random() * 5.5 + 2.5).toFixed(2);
    };

    useEffect(() => {
        const newPrices = {};
        projects.forEach(p => {
            newPrices[p.name] = calculatePrice(selectedCountry);
        });
        setServicePrices(newPrices);
    }, [selectedCountry, projects]);

    return (
        <Section id="services" setActivePage={setActivePage}>
            <div className="py-20 px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">Assessment Passing Services</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
                    Select your location to see pricing. We provide expert guidance to help you pass project assessments.
                </p>
                <div className="flex justify-center mb-12">
                     <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        {countries.map(country => (
                            <option key={country.code} value={country.code}>{country.name}</option>
                        ))}
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.name}
                            className="bg-white border border-gray-200/80 rounded-xl p-6 flex flex-col group shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">Assessment Passing Assistance</p>
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                                    ${servicePrices[project.name]}
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => addToCart({name: project.name, price: servicePrices[project.name]})}
                                    className="w-full text-center text-white font-semibold py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};


const Reviews = ({ setActivePage }) => {
    const testimonials = [
        { name: "Google", rating: 5, text: "Outlier's data was pivotal in fine-tuning our Gemini Pro model. The nuanced, high-quality datasets allowed us to increase our multi-modal reasoning accuracy by over 15%, a significant leap that directly impacts user experience across our products.", logo: <GoogleIcon className="h-10 w-10" /> },
        { name: "Microsoft", rating: 5, text: "Scaling the training for our Turing NLG models on Azure AI was a monumental task. Outlier's platform provided the diverse, high-quality data we needed, resulting in a 20% reduction in model hallucination and a measurable uplift in user satisfaction for Copilot features.", logo: <MicrosoftIcon className="h-10 w-10" /> },
        { name: "Meta", rating: 4, text: "Training Llama 3 required a dataset of unprecedented scale and quality. Outlier's expert annotators were crucial for our reinforcement learning with human feedback (RLHF) phase, helping us significantly improve the model's safety alignment and factual accuracy.", logo: <MetaIcon className="h-10 w-10" /> },
        { name: "General Motors", rating: 5, text: "The development of our autonomous vehicle perception systems is safety-critical. Outlier provided millions of meticulously annotated road scenarios, which helped us improve our object detection accuracy in adverse weather conditions by 30%, a critical step towards full self-driving.", logo: <GMIcon className="h-10 w-10" /> },
        { name: "OpenAI", rating: 5, text: "For training GPT-4, the quality of human feedback is paramount. Outlier's platform gave us access to a global network of experts, enabling us to conduct large-scale preference comparisons that were essential for enhancing the model's instruction-following capabilities and reducing harmful outputs.", logo: <OpenAIIcon className="h-10 w-10" /> },
        { name: "Time", rating: 4, text: "We utilized Outlier to train a custom generative model on our 100-year archive. The result was a powerful internal tool that has revolutionized how our journalists conduct research, increasing content discovery efficiency by over 50%.", logo: <TimeIcon className="h-8 w-16 text-gray-800" /> },
    ];
    return (
        <Section id="reviews" setActivePage={setActivePage}>
            <div className="py-20 px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">What our Big Client Companies Say</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((review, index) => (
                        <div 
                            key={index}
                            className="bg-white border border-gray-200/80 rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="h-20 flex items-center justify-center mb-4">
                                {review.logo}
                            </div>
                            <h3 className="font-bold text-gray-900 text-xl mb-2">{review.name}</h3>
                            <div className="flex justify-center mb-4 text-purple-500">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" isFilled={i < review.rating} />)}
                            </div>
                            <p className="text-gray-600 mb-6 flex-grow">"{review.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const ContactUs = ({ setActivePage, contactMessage, setContactMessage }) => {
    return (
        <Section id="contact-us" setActivePage={setActivePage}>
            <div className="py-20 px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">Get In Touch</h2>
                <form className="space-y-6 max-w-xl mx-auto bg-white border border-gray-200/80 rounded-xl p-8 shadow-lg">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea id="message" rows="4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="How can we help?"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-600">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </Section>
    );
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages]);
    useEffect(() => { if (isOpen) setMessages([{ sender: 'bot', text: "Hello! I'm the Outlier assistant. How can I help?" }]) }, [isOpen]);
    const getBotResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes("project")) return "We have many exciting projects like Space Camelid and Valkyrie. You can see them on our 'Active Projects' section.";
        if (lowerInput.includes("service")) return "We provide platforms for building AI with expert human input, connecting freelancers with next-gen AI projects.";
        if (lowerInput.includes("contact")) return "You can reach us through the form on our 'Contact Us' section. We'll get back to you shortly!";
        return "Sorry, I'm not sure. Try asking about 'projects', 'services', or 'contact'.";
    };
    const handleSend = (e) => {
        e.preventDefault(); if (!input.trim()) return;
        const newMessages = [...messages, { sender: 'user', text: input }]; setMessages(newMessages); setInput("");
        setTimeout(() => { const botResponse = getBotResponse(input); setMessages(prev => [...prev, { sender: 'bot', text: botResponse }])}, 1000);
    };
    return (
        <React.Fragment>
            {isOpen && (
                <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[70%] sm:h-[500px] bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl flex flex-col z-40">
                    <header className="p-4 border-b border-gray-200/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Outlier Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800"><CloseIcon className="w-6 h-6" /></button>
                    </header>
                    <div className="flex-grow p-4 overflow-y-auto">
                        <div className="space-y-4">{messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'bot' ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'}`}>{msg.text}</div>
                            </div>))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <form onSubmit={handleSend} className="p-4 border-t border-gray-200/50 flex items-center">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow bg-gray-100 text-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Ask something..." />
                        <button type="submit" className="ml-3 text-purple-500 hover:text-purple-400 p-2"><SendIcon className="w-6 h-6" /></button>
                    </form>
                </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-8 w-14 h-14 bg-gradient-to-tr from-purple-600 to-cyan-600 text-white rounded-full flex items-center justify-center shadow-lg z-50">
                {isOpen ? <CloseIcon className="w-7 h-7" /> : <ChatIcon className="w-7 h-7" />}
            </button>
        </React.Fragment>
    );
};

function App() {
    const [activePage, setActivePage] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [contactMessage, setContactMessage] = useState("");
    const [cart, setCart] = useState([]);
    const [toast, setToast] = useState({ show: false, message: "" });
    const [isScrolled, setIsScrolled] = useState(false);
    
    const initialProjects = [
        { name: "Space Camelid" }, { name: "Metro Silo" },
        { name: "Valkyrie" }, { name: "Stratus Drake Evals" },
        { name: "Rhind Evals" }, { name: "Bluberry Bagels" },
        { name: "Rubric Marimba" }, { name: "Pegasus Aether" },
        { name: "Hypno" }, { name: "Cracked Vault" },
        { name: "Expert Sturgeon" }, { name: "Apron Evals" },
        { name: "Dimple Coding" },
    ];
    
    const [projects, setProjects] = useState(initialProjects.map(p => ({...p, status: "Active", tasks: Math.floor(Math.random() * 5000) + 1000 })));

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 3000);
    };

    const addToCart = (item) => {
        setCart(prevCart => [...prevCart, item]);
        showToast(`${item.name} added to cart!`);
    };

    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        const handleKeyDown = (e) => { if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) e.preventDefault() };
        document.addEventListener('contextmenu', handleContextMenu); document.addEventListener('keydown', handleKeyDown);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        return () => { 
            document.removeEventListener('contextmenu', handleContextMenu); 
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleApplyNow = () => {
        window.open("https://app.outlier.ai/en/expert/opportunities?_gl=1*1spgoso*_gcl_au*MTE2ODgxNjY2Mi4xNzU0NzEzMzUw&location=All&type=All", "_blank");
    };

    const NavLink = ({ page, id, icon: Icon, isMobile = false }) => (
        <button
            onClick={() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                if (isMobile) setIsMenuOpen(false);
            }}
            className={`relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 w-full text-left ${
                activePage === id ? 'text-gray-800' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
            }`}
        >
            {activePage === id && !isMobile && (
                <div className="absolute inset-0 bg-gray-100 rounded-lg" />
            )}
            <Icon className="w-5 h-5 mr-3" />
            <span className="relative z-10">{page}</span>
        </button>
    );
    
    const navItems = [
        { page: 'Home', id: 'home', icon: HomeIcon },
        { page: 'Projects', id: 'active-projects', icon: ProjectIcon },
        { page: 'Services', id: 'services', icon: ServicesIcon },
        { page: 'Reviews', id: 'reviews', icon: ReviewsIcon },
        { page: 'Contact', id: 'contact-us', icon: ContactIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
            <div id="grid-pattern" className="fixed top-0 left-0 w-full h-full z-[-1]"></div>
            
            <header className={`sticky top-0 bg-white/70 backdrop-blur-xl z-30 transition-shadow duration-300 ${isScrolled ? 'shadow-md border-b border-gray-200/80' : ''}`}>
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <span className="text-gray-800 text-2xl font-bold">Outlier</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-2">
                                {navItems.map(item => <NavLink key={item.id} page={item.page} id={item.id} icon={item.icon} />)}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="relative mr-4">
                                <CartIcon className="w-6 h-6 text-gray-600" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                            <div className="md:hidden">
                                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                    {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map(item => <NavLink key={item.id} page={item.page} id={item.id} icon={item.icon} isMobile={true} />)}
                        </div>
                    </div>
                )}
            </header>
            
            <main className="relative z-10">
                <Home setActivePage={setActivePage} />
                <ActiveProjects setActivePage={setActivePage} onApplyNow={handleApplyNow} projects={projects} />
                <Services setActivePage={setActivePage} projects={initialProjects} addToCart={addToCart} />
                <Reviews setActivePage={setActivePage} />
                <ContactUs setActivePage={setActivePage} contactMessage={contactMessage} setContactMessage={setContactMessage} />
            </main>

            <Chatbot />
            <Toast message={toast.message} show={toast.show} />

            <footer className="bg-white/50 border-t border-gray-200/80 relative z-10">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>&copy; 2024 Outlier Help Center. All Rights Reserved.</p>
                    <p className="mt-2 text-sm">123 Innovation Drive, Silicon Valley, CA 94043, United States</p>
                </div>
            </footer>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
    </script>
</body>
</html>
