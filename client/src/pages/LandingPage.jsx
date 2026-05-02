import { useState, useEffect, useRef } from "react";

const UNSPLASH_HERO = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800&q=90&fit=crop";
const UNSPLASH_2 = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80&fit=crop";
const UNSPLASH_3 = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&fit=crop";
const UNSPLASH_4 = "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=80&fit=crop";
const UNSPLASH_5 = "https://images.unsplash.com/photo-1627556704302-624286467c65?w=900&q=80&fit=crop";

const stats = [
  { value: "12,000+", label: "Alumni Worldwide" },
  { value: "450+", label: "Partner Companies" },
  { value: "200+", label: "Events Annually" },
  { value: "₹18L", label: "Avg. Package" },
];

const testimonials = [
  {
    name: "Priya Reddy",
    batch: "CSE · Batch 2019",
    company: "Google, Hyderabad",
    quote: "AlumniConnect helped me land my dream role. A senior alumnus referred me internally within 3 days of connecting.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&fit=crop&crop=face",
  },
  {
    name: "Aryan Joshi",
    batch: "MBA · Batch 2018",
    company: "McKinsey, Mumbai",
    quote: "The mentorship I received from alumni changed my career trajectory entirely. This network is gold.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop&crop=face",
  },
  {
    name: "Sneha Patel",
    batch: "CSE · Batch 2020",
    company: "NVIDIA, Pune",
    quote: "From the job board to reunion events — this platform keeps me connected to my roots no matter where I am.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80&fit=crop&crop=face",
  },
];

export default function LandingPage({ navigate }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", background: "#0a0a0f" }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 48px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #c9a84c, #f0d080)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "1.1rem", color: "#0a0a0f"
          }}>A</div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            color: "white", fontWeight: 700, fontSize: "1.15rem"
          }}>AlumniConnect</span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["About", "Network", "Jobs", "Events"].map(item => (
            <button key={item} style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.65)", fontSize: "0.9rem",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500
            }}
              onMouseOver={e => e.target.style.color = "white"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            >{item}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("login")} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white", padding: "9px 22px", borderRadius: 8,
            cursor: "pointer", fontSize: "0.88rem", fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif"
          }}>Log in</button>
          <button onClick={() => navigate("register")} style={{
            background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
            border: "none", color: "#0a0a0f",
            padding: "9px 22px", borderRadius: 8,
            cursor: "pointer", fontSize: "0.88rem", fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 20px rgba(201,168,76,0.35)"
          }}>Join Network</button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        position: "relative", height: "100vh", minHeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: "-10%",
          backgroundImage: `url(${UNSPLASH_HERO})`,
          backgroundSize: "cover", backgroundPosition: "center top",
          transform: `translateY(${parallaxOffset}px)`,
          filter: "brightness(0.38)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.1) 40%, rgba(10,10,15,0.9) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }} />

        <div style={{
          position: "relative", zIndex: 2, textAlign: "center",
          padding: "0 24px", maxWidth: 860, margin: "0 auto"
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.35)",
            borderRadius: 30, padding: "7px 20px", marginBottom: 32,
            animation: "fadeUp 0.8s ease 0.1s both"
          }}>
            <span style={{ fontSize: "0.7rem" }}>🎓</span>
            <span style={{ color: "#e8c96a", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.12em" }}>
              OFFICIAL ALUMNI NETWORK · EST. 2010
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            fontWeight: 900, color: "white", lineHeight: 1.05,
            marginBottom: 28, letterSpacing: "-0.02em",
            animation: "fadeUp 0.8s ease 0.25s both",
          }}>
            Your College Bond,<br />
            <span style={{
              background: "linear-gradient(135deg, #c9a84c, #f0d080, #c9a84c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Forever Strong.
            </span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.6)", fontSize: "1.15rem",
            maxWidth: 560, margin: "0 auto 44px",
            lineHeight: 1.8, animation: "fadeUp 0.8s ease 0.4s both"
          }}>
            Reconnect with batchmates, discover alumni-exclusive jobs, attend reunions and grow your career through the most trusted college alumni network.
          </p>

          <div style={{
            display: "flex", gap: 14, justifyContent: "center",
            flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.55s both"
          }}>
            <button onClick={() => navigate("register")} style={{
              background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
              border: "none", color: "#0a0a0f",
              padding: "16px 44px", borderRadius: 10,
              fontWeight: 800, cursor: "pointer", fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 32px rgba(201,168,76,0.4)"
            }}>Get Started Free →</button>
            <button onClick={() => navigate("login")} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white", padding: "16px 44px", borderRadius: 10,
              fontWeight: 600, cursor: "pointer", fontSize: "1rem",
              fontFamily: "'DM Sans', sans-serif", backdropFilter: "blur(8px)"
            }}>Sign In</button>
          </div>

          {/* Avatar stack */}
          <div style={{
            marginTop: 52, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12,
            animation: "fadeUp 0.8s ease 0.7s both"
          }}>
            <div style={{ display: "flex" }}>
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&q=80&fit=crop&crop=face",
              ].map((src, i) => (
                <img key={i} src={src} alt="" style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "2px solid #0a0a0f", objectFit: "cover",
                  marginLeft: i > 0 ? -10 : 0,
                }} />
              ))}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "2px solid #0a0a0f",
                background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.55rem", fontWeight: 800, color: "#0a0a0f",
                marginLeft: -10
              }}>+12K</div>
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
              Join <strong style={{ color: "white" }}>12,000+ alumni</strong> already on the platform
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "bounce 2s infinite"
        }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)" }} />
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section style={{
        background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
        padding: "36px 60px",
        display: "flex", justifyContent: "center", gap: 80, flexWrap: "wrap"
      }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 900, color: "#0a0a0f" }}>{s.value}</div>
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "rgba(10,10,15,0.6)", marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── PHOTO GRID + TEXT ─── */}
      <section style={{ background: "#0e0e16", padding: "100px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ position: "relative", height: 500 }}>
              <img src={UNSPLASH_2} alt="campus" style={{
                position: "absolute", top: 0, left: 0, width: "68%", height: "65%",
                objectFit: "cover", borderRadius: 20,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
              }} />
              <img src={UNSPLASH_3} alt="networking" style={{
                position: "absolute", bottom: 0, right: 0, width: "58%", height: "55%",
                objectFit: "cover", borderRadius: 20,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5)"
              }} />
              <div style={{
                position: "absolute", bottom: "36%", left: "36%",
                background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
                borderRadius: 16, padding: "16px 20px",
                boxShadow: "0 12px 40px rgba(201,168,76,0.4)", zIndex: 2
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.6rem", color: "#0a0a0f", lineHeight: 1 }}>98%</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(10,10,15,0.65)", marginTop: 4 }}>SATISFACTION</div>
              </div>
            </div>

            <div>
              <div style={{
                display: "inline-block", background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20,
                padding: "5px 16px", marginBottom: 24,
                color: "#c9a84c", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em"
              }}>WHY ALUMNI LOVE US</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "2.8rem",
                fontWeight: 900, color: "white", lineHeight: 1.15, marginBottom: 24
              }}>
                More than a network —<br />it's your <span style={{ color: "#c9a84c" }}>community.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.9, fontSize: "0.95rem", marginBottom: 36 }}>
                From your first job referral to your 25-year reunion, AlumniConnect grows with you. Built by alumni, for alumni.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { icon: "🤝", title: "1-click Connect", desc: "Find and message any alumnus from any batch instantly" },
                  { icon: "💼", title: "Insider Job Referrals", desc: "Jobs posted exclusively by alumni at top companies" },
                  { icon: "🎓", title: "Mentorship Program", desc: "Get matched with mentors in your target industry" },
                ].map(f => (
                  <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: "rgba(201,168,76,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem"
                    }}>{f.icon}</div>
                    <div>
                      <div style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", marginBottom: 4 }}>{f.title}</div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FULLWIDTH QUOTE PHOTO ─── */}
      <section style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <img src={UNSPLASH_4} alt="conference" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", filter: "brightness(0.3)"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(10,10,15,0.96) 40%, transparent)"
        }} />
        <div style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 80px", maxWidth: 680
        }}>
          <div style={{ fontSize: "4rem", color: "#c9a84c", lineHeight: 1, marginBottom: 16, fontFamily: "serif" }}>"</div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.55rem", color: "white", lineHeight: 1.65, fontStyle: "italic", marginBottom: 28
          }}>
            The alumni network opened doors I didn't even know existed. One message changed my entire career path.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={testimonials[0].img} alt="" style={{
              width: 48, height: 48, borderRadius: "50%", objectFit: "cover",
              border: "2px solid #c9a84c"
            }} />
            <div>
              <div style={{ color: "white", fontWeight: 700 }}>{testimonials[0].name}</div>
              <div style={{ color: "#c9a84c", fontSize: "0.82rem" }}>{testimonials[0].company}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ background: "#0a0a0f", padding: "100px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", color: "white", marginBottom: 12 }}>
              Alumni Success Stories
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Real people. Real growth. Real connections.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)} style={{
                background: i === activeTestimonial ? "rgba(201,168,76,0.08)" : "rgba(255,255,255,0.03)",
                border: i === activeTestimonial ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20, padding: "28px 26px", cursor: "pointer",
                transition: "all 0.5s ease",
                transform: i === activeTestimonial ? "translateY(-6px)" : "none"
              }}>
                <div style={{ fontSize: "1.5rem", color: "#c9a84c", marginBottom: 16 }}>"</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.img} alt={t.name} style={{
                    width: 44, height: 44, borderRadius: "50%", objectFit: "cover",
                    border: "2px solid rgba(201,168,76,0.5)"
                  }} />
                  <div>
                    <div style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>{t.name}</div>
                    <div style={{ color: "#c9a84c", fontSize: "0.75rem" }}>{t.company}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{t.batch}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                width: i === activeTestimonial ? 28 : 8, height: 8, borderRadius: 4,
                background: i === activeTestimonial ? "#c9a84c" : "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", transition: "all 0.3s ease"
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES PHOTO GRID ─── */}
      <section style={{ background: "#0e0e16", padding: "100px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", color: "white", marginBottom: 12 }}>
              Everything in One Place
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {[
              { img: UNSPLASH_2, title: "Alumni Directory", desc: "Search 12,000+ graduates by batch, department, company, or skill.", tag: "CONNECT" },
              { img: UNSPLASH_5, title: "Exclusive Job Board", desc: "Access jobs posted only for our alumni — referrals, insider openings, startup roles.", tag: "CAREERS" },
              { img: UNSPLASH_3, title: "Events & Reunions", desc: "From campus reunions to city meetups and global webinars.", tag: "EVENTS" },
              { img: UNSPLASH_4, title: "Mentorship & Growth", desc: "One-on-one mentorship from seniors who've been where you want to go.", tag: "MENTOR" },
            ].map(f => (
              <div key={f.title} style={{
                borderRadius: 20, overflow: "hidden", position: "relative", height: 280,
                cursor: "pointer", transition: "transform 0.3s"
              }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <img src={f.img} alt={f.title} style={{
                  width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.38)"
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,15,0.95) 0%, transparent 60%)",
                }} />
                <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                  <div style={{
                    display: "inline-block", background: "rgba(201,168,76,0.2)",
                    border: "1px solid rgba(201,168,76,0.4)", borderRadius: 6,
                    padding: "3px 10px", color: "#c9a84c", fontSize: "0.68rem",
                    fontWeight: 700, letterSpacing: "0.12em", marginBottom: 10
                  }}>{f.tag}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.3rem", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.83rem", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1200 50%, #0a0a0f 100%)",
        padding: "120px 60px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 300, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.15), transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20
          }}>
            Your Batchmates<br />Are Waiting.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.05rem", marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
            Join the network. Build your legacy. Give back to the next generation.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("register")} style={{
              background: "linear-gradient(135deg, #c9a84c, #e8c96a)",
              border: "none", color: "#0a0a0f", padding: "18px 52px", borderRadius: 12,
              fontWeight: 800, cursor: "pointer", fontSize: "1.05rem",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 8px 40px rgba(201,168,76,0.45)"
            }}>Create Free Account →</button>
            <button onClick={() => navigate("login")} style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)", padding: "18px 52px", borderRadius: 12,
              fontWeight: 600, cursor: "pointer", fontSize: "1.05rem",
              fontFamily: "'DM Sans', sans-serif"
            }}>I Already Have an Account</button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        background: "#060609", borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "36px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #c9a84c, #f0d080)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "0.9rem", color: "#0a0a0f"
          }}>A</div>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
            AlumniConnect · © 2025 · All Rights Reserved
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Contact", "Help"].map(l => (
            <button key={l} style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.3)", fontSize: "0.83rem",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
            }}>{l}</button>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
