import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortal } from '../../context/PortalContext';
import { SubscriptionApi } from '../../Api/SubscriptionApi';
import { Check, Loader2, LogOut, Sparkles } from 'lucide-react';
import './PlanSelectionPage.css';

export const PlanSelectionPage = () => {
  const navigate = useNavigate();
  const { currentUser, login, logout } = usePortal();

  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Fetch Real-time Plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const res = await SubscriptionApi.getAvailablePlans();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Sort: Basic -> Standard/Pro -> Premium/Enterprise
          const sorted = [...res.data].sort((a, b) => (a.price || 0) - (b.price || 0));
          setPlans(sorted);
        } else {
          // Fallback realistic defaults if API response is empty
          setPlans([
            {
              _id: 'plan_basic',
              name: 'Basic',
              planType: 'Basic',
              price: 199,
              billingCycle: 'Monthly',
              maxBranches: 3,
              maxActiveJobs: 3,
              features: [
                'Up to 3 Active Branches',
                '3 Active Job Postings',
                'Basic Candidate Matching',
                'Standard Notifications',
                'Basic Audit Logs',
              ],
            },
            {
              _id: 'plan_standard',
              name: 'Pro',
              planType: 'Standard',
              price: 399,
              billingCycle: 'Monthly',
              maxBranches: 5,
              maxActiveJobs: 15,
              isPopular: true,
              features: [
                'Up to 5 Active Branches',
                '15 Active Job Postings',
                'Automated AI Screenings',
                'Multiple Interview Rounds & Panels',
                '+ Basic plan features',
              ],
            },
            {
              _id: 'plan_premium',
              name: 'Enterprise',
              planType: 'Premium',
              price: 899,
              billingCycle: 'Monthly',
              maxBranches: 20,
              maxActiveJobs: 50,
              features: [
                'Up to 20 Active Branches',
                '50 Active Job Postings',
                'Advanced Audit Logs & Security',
                'Custom Recruitment Stages & SLA',
                '+ Pro plan features',
              ],
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // 2. Handle Plan Selection & Activation
  const handleSelectPlan = async (plan) => {
    setSelectedPlanId(plan._id || plan.planId);
    setIsSubmitting(true);

    try {
      const companyId =
        currentUser?.company?.companyId ||
        currentUser?.companyId ||
        currentUser?.company?.id ||
        null;

      const res = await SubscriptionApi.chooseInitialPlan({
        planId: plan._id || plan.planId,
        planName: plan.name || plan.planType,
        companyId,
      });

      if (res && res.success) {
        showToast(`🎉 ${plan.name} Plan activated successfully! Redirecting to Dashboard...`, 'success');

        // Update local session state
        const updatedUser = {
          ...currentUser,
          hasActivePlan: true,
          subscriptionPlan: plan.name,
          company: {
            ...(currentUser?.company || {}),
            hasActivePlan: true,
            subscriptionPlan: plan.name,
            maxBranches: plan.maxBranches || 3,
          },
        };

        if (login) {
          login(updatedUser);
        } else {
          localStorage.setItem('hr_portal_user', JSON.stringify(updatedUser));
        }

        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1200);
      } else {
        showToast(res?.message || 'Failed to activate plan. Please try again.', 'error');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Plan activation error:', err);
      showToast('An unexpected error occurred while activating the plan.', 'error');
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login', { replace: true });
  };

  // Card theme helper
  const getThemeClass = (plan, index) => {
    const name = String(plan.name || plan.planType || '').toLowerCase();
    if (name.includes('premium') || name.includes('enterprise') || index === 2) return 'theme-enterprise';
    if (name.includes('pro') || name.includes('standard') || plan.isPopular || index === 1) return 'theme-pro';
    return 'theme-basic';
  };

  return (
    <div className="pricing-page-wrapper">
      {/* Toast Notification */}
      {toast && (
        <div className={`pricing-toast ${toast.type}`}>
          {toast.type === 'success' && <Sparkles size={18} className="toast-icon" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Confetti Elements (matching the reference design) */}
      <div className="confetti-container" aria-hidden="true">
        <span className="confetti-item c-pink-sq" style={{ top: '12%', left: '8%' }}></span>
        <span className="confetti-item c-purple-poly" style={{ top: '22%', left: '34%' }}></span>
        <span className="confetti-item c-cyan-diam" style={{ top: '5%', left: '83%' }}></span>
        <span className="confetti-item c-blue-dot" style={{ top: '16%', right: '11%' }}></span>
        <span className="confetti-item c-pink-dot" style={{ top: '30%', left: '19%' }}></span>
        <span className="confetti-item c-purple-dot" style={{ top: '22%', right: '37%' }}></span>
        <span className="confetti-item c-cyan-sq" style={{ top: '18%', right: '22%' }}></span>
      </div>

      {/* Top Navigation Bar with Company / User & Logout */}
      <header className="pricing-header-nav">
        <div className="brand-badge">
          <span className="brand-dot"></span>
          <span>
            {currentUser?.company?.name || currentUser?.name || 'Company Portal'} &nbsp;•&nbsp; <strong>Plan Setup</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="btn-pricing-logout"
          title="Sign out of this session"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </header>

      {/* Hero Header Section */}
      <section className="pricing-hero-section">
        <h1 className="pricing-main-title">Simple, Transparent Pricing.</h1>
        <p className="pricing-subtitle">
          Choose the ideal recruitment tier for your team. Scale up active jobs, branches, and AI matching as your organization expands.
        </p>
      </section>

      {/* Pricing Cards Grid */}
      <main className="pricing-cards-container">
        {isLoading ? (
          <div className="pricing-loader-box">
            <Loader2 size={38} className="animate-spin text-primary" />
            <p>Loading real-time plans from server...</p>
          </div>
        ) : (
          <div className="pricing-grid">
            {plans.map((plan, idx) => {
              const theme = getThemeClass(plan, idx);
              const isPro = theme === 'theme-pro';
              const isCurrentSubmitting = isSubmitting && selectedPlanId === (plan._id || plan.planId);

              // Standardized features
              const rawFeatures = Array.isArray(plan.features) && plan.features.length > 0
                ? plan.features.slice(0, 5)
                : [
                    `Up to ${plan.maxBranches || 3} Active Branches`,
                    `${plan.maxActiveJobs || 3} Active Job Postings`,
                    'Candidate Matching & Alerts',
                    'Recruitment Overview & Reports',
                    isPro ? '+ Basic plan features' : 'Standard In-app Support',
                  ];

              return (
                <div
                  key={plan._id || plan.planId || idx}
                  className={`pricing-card ${theme} ${isPro ? 'is-elevated' : ''}`}
                >
                  {/* Top Minimalist Line-Art Artwork */}
                  <div className="card-artwork-box">
                    {theme === 'theme-basic' && (
                      <svg
                        className="card-line-art"
                        viewBox="0 0 160 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Minimalist Swing Illustration */}
                        <line x1="45" y1="5" x2="55" y2="90" stroke="#cbd5e1" strokeWidth="1.8" />
                        <line x1="115" y1="5" x2="105" y2="90" stroke="#cbd5e1" strokeWidth="1.8" />
                        <path
                          d="M48 90 C 70 87, 90 87, 112 90 L 115 98 C 90 95, 70 95, 45 98 Z"
                          fill="#f8fafc"
                          stroke="#94a3b8"
                          strokeWidth="1.6"
                        />
                      </svg>
                    )}

                    {theme === 'theme-pro' && (
                      <svg
                        className="card-line-art"
                        viewBox="0 0 160 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Minimalist Hanging Pod / Bubble Chair Illustration */}
                        <line x1="80" y1="5" x2="80" y2="40" stroke="#cbd5e1" strokeWidth="1.8" />
                        <ellipse cx="80" cy="72" rx="36" ry="42" stroke="#94a3b8" strokeWidth="1.8" fill="#f8fafc" />
                        <path
                          d="M58 84 C 65 95, 95 95, 102 84 C 98 76, 62 76, 58 84 Z"
                          fill="#ede9fe"
                          stroke="#8b5cf6"
                          strokeWidth="1.5"
                        />
                        <path d="M52 70 C 60 55, 100 55, 108 70" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />
                      </svg>
                    )}

                    {theme === 'theme-enterprise' && (
                      <svg
                        className="card-line-art"
                        viewBox="0 0 160 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Minimalist Observation Capsule / Ferris Wheel Cabin Illustration */}
                        <line x1="60" y1="5" x2="72" y2="48" stroke="#cbd5e1" strokeWidth="1.6" />
                        <line x1="100" y1="5" x2="88" y2="48" stroke="#cbd5e1" strokeWidth="1.6" />
                        <circle cx="80" cy="70" r="34" stroke="#94a3b8" strokeWidth="1.8" fill="#f0fdfa" />
                        <rect x="62" y="60" width="36" height="20" rx="4" stroke="#06b6d4" strokeWidth="1.5" fill="#ffffff" />
                        <line x1="80" y1="60" x2="80" y2="80" stroke="#06b6d4" strokeWidth="1.2" />
                      </svg>
                    )}
                  </div>

                  {/* Plan Name & Color Accent Line */}
                  <div className="card-plan-header">
                    <h2 className="plan-name-title">
                      {(plan.name || plan.planType || 'PLAN').toUpperCase()}
                    </h2>
                    <span className="plan-accent-bar"></span>
                  </div>

                  {/* Price Section */}
                  <div className="card-price-section">
                    <div className="price-wrapper">
                      <span className="price-currency">$</span>
                      <span className="price-amount">
                        {plan.price !== undefined && plan.price !== null
                          ? plan.price === 0
                            ? '0'
                            : plan.price
                          : theme === 'theme-basic'
                          ? '199'
                          : isPro
                          ? '399'
                          : '899'}
                      </span>
                    </div>
                    <span className="price-cycle">per month</span>
                  </div>

                  {/* Features List */}
                  <ul className="card-features-list">
                    {rawFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-item">
                        {feat.startsWith('+') ? (
                          <span className="feature-plus-icon">+</span>
                        ) : (
                          <Check size={16} className="feature-check-icon" />
                        )}
                        <span className="feature-text">{feat.replace(/^\+\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Fluid Wave Gradient & Floating Button */}
                  <div className="card-wave-bottom">
                    <svg
                      className="wave-svg"
                      viewBox="0 0 320 120"
                      preserveAspectRatio="none"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {theme === 'theme-basic' && (
                        <>
                          <path
                            d="M0,60 C80,35 160,85 240,55 C280,40 300,50 320,60 L320,120 L0,120 Z"
                            fill="rgba(255, 117, 140, 0.45)"
                          />
                          <path
                            d="M0,75 C90,60 170,95 250,70 C290,60 310,65 320,75 L320,120 L0,120 Z"
                            fill="#ff708e"
                          />
                        </>
                      )}

                      {theme === 'theme-pro' && (
                        <>
                          <path
                            d="M0,55 C90,30 170,80 250,50 C290,35 310,45 320,55 L320,120 L0,120 Z"
                            fill="rgba(124, 58, 237, 0.45)"
                          />
                          <path
                            d="M0,70 C80,50 160,90 240,65 C280,55 300,60 320,70 L320,120 L0,120 Z"
                            fill="#6d28d9"
                          />
                        </>
                      )}

                      {theme === 'theme-enterprise' && (
                        <>
                          <path
                            d="M0,55 C90,30 170,80 250,50 C290,35 310,45 320,55 L320,120 L0,120 Z"
                            fill="rgba(6, 182, 212, 0.45)"
                          />
                          <path
                            d="M0,70 C80,50 160,90 240,65 C280,55 300,60 320,70 L320,120 L0,120 Z"
                            fill="#0d9488"
                          />
                        </>
                      )}
                    </svg>

                    {/* Floating Pill Choose Button */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleSelectPlan(plan)}
                      className={`btn-choose-plan ${isCurrentSubmitting ? 'is-loading' : ''}`}
                    >
                      {isCurrentSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>ACTIVATING...</span>
                        </>
                      ) : (
                        <span>CHOOSE &nbsp;&gt;</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer subtle text */}
      <footer className="pricing-footer">
        <p>
          Need a tailored enterprise agreement with custom branch allocations?{' '}
          <a href="mailto:support@hrms.com" className="support-link">
            Contact Super Admin
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PlanSelectionPage;
