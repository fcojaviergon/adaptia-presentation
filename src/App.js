import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Login from './Login';

const AdaptiaPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem('adaptia_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const slides = [
    {
      id: 1,
      title: "🚀 Adaptia MVP",
      component: <TitleSlide />
    },
    {
      id: 2,
      title: "🎯 Objetivo y Alcance",
      component: <ObjectiveSlide />
    },
    {
      id: 3,
      title: "🔄 Flujo de Usuario",
      component: <UserFlowSlide />
    },
    {
      id: 4,
      title: "💰 Estructura de Precios",
      component: <PricingSlide />
    },
    {
      id: 5,
      title: "📊 Dashboard Cliente",
      component: <DashboardSlide />
    },
    {
      id: 6,
      title: "📅 Estimación de Desarrollo",
      component: <TimelineSlide />
    },
    {
      id: 7,
      title: "💻 Infraestructura y Costos",
      component: <InfrastructureSlide />
    },
    {
      id: 8,
      title: "⚙️ Stack Tecnológico",
      component: <TechStackSlide />
    },
    {
      id: 9,
      title: "💰 Propuesta Final",
      component: <FinalPriceSlide />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  const handleLogout = () => {
    localStorage.removeItem('adaptia_auth');
    localStorage.removeItem('adaptia_user');
    setIsAuthenticated(false);
  };

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="presentation-container">
      {/* Navigation Controls */}
      <div className="nav-controls">
        <button
          onClick={handleLogout}
          className="nav-button"
          title="Cerrar sesión"
        >
          🚪
        </button>
        <button
          onClick={() => setIsAutoplay(!isAutoplay)}
          className="nav-button"
        >
          {isAutoplay ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={prevSlide}
          className="nav-button"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </span>
        <button
          onClick={nextSlide}
          className="nav-button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Container */}
      <div className="slide-container">
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide">
              <div className="slide-content">
                <div className="slide-card animate-fadeIn">
                  {slide.component}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>


    </div>
  );
};

const TitleSlide = () => (
  <div style={{textAlign: 'center'}}>
    <h1 className="title-main">
      🚀 Adaptia MVP
    </h1>
    <p className="title-secondary">Plan de Desarrollo de Producto</p>
    <p className="title-tertiary">Plataforma SaaS de Análisis de Sostenibilidad</p>
    <div className="alert-box">
      <h3 className="alert-title">Agosto 2025</h3>
      <p className="alert-text">
        Automatización de análisis de sostenibilidad empresarial con IA, integración de pagos y revisión experta (HITL)
      </p>
    </div>
  </div>
);

const ObjectiveSlide = () => (
  <div>
    <h2 className="section-title">
      🎯 Objetivo y Alcance del MVP
    </h2>
    
    <div className="info-card mb-8">
      <h3>Objetivo</h3>
      <p>
        Lanzar una plataforma SaaS que automatiza análisis de sostenibilidad para empresas, 
        integrando pagos online, generación de informes con IA, revisión experta (HITL), 
        dashboards de usuario y staff, y soporte a varios países.
      </p>
    </div>

    <div className="grid grid-cols-1 grid-md-cols-3 gap-6 mb-8">
      <StatBox number="30" label="Clientes objetivo piloto" />
      <StatBox number="24h" label="Tiempo de entrega" />
      <StatBox number="10%" label="Margen de error actual" />
    </div>

    <div className="alert-box">
      <p className="alert-text">
        <strong>Alcance:</strong> MVP funcional para al menos 30 clientes, preparado para escalar, 
        con costos controlados y monitoreo básico.
      </p>
    </div>
  </div>
);

const UserFlowSlide = () => (
  <div>
    <h2 className="section-title">
      🔄 Flujo de Usuario
    </h2>
    
    <div className="grid grid-cols-1 grid-md-cols-2 gap-6">
      <FeatureCard
        icon="1"
        title="Landing Site + Formulario"
        features={[
          "7 campos: nombre, apellido, email, teléfono",
          "Título, organización, website",
          "Número empleados (dropdown)",
          "Industria (dropdown)",
          "Adjuntar 1 documento de referencia (PDF o WORD)"
        ]}
      />
      
      <FeatureCard
        icon="2"
        title="Pago Diferenciado"
        features={[
          "Integración Flow (Chile) o Stripe (México)",
          "Monto según tamaño empresa",
          "Confirmación automática"
        ]}
      />
      
      <FeatureCard
        icon="3"
        title="Automatización IA"
        features={[
          "Proceso con prompts validados",
          "7 bases de datos Excel de referencia",
          "Análisis 100% automatizado",
          "Dashboard power user para validación"
        ]}
      />
      
      <FeatureCard
        icon="4"
        title="Entrega en 24 horas"
        features={[
          "Revisión por equipo Adaptia",
          "Publicación en cuenta cliente",
          "Notificación por email",
          "Acceso a dashboard multiempresa"
        ]}
      />
    </div>
  </div>
);

const PricingSlide = () => {
  const pricingTiers = [
    { tier: "Empresa Micro", price: "$200 USD" },
    { tier: "Empresa Pequeña", price: "$400 USD" },
    { tier: "Empresa Mediana", price: "$800 USD" },
    { tier: "Empresa Nacional Grande", price: "$1,200 USD" },
    { tier: "Empresa Regional", price: "$1,400 USD" },
    { tier: "Empresa Internacional", price: "$1,600 USD" },
    { tier: "Empresa Multinacional", price: "$2,000 USD" }
  ];

  return (
    <div>
      <h2 className="section-title">
        💰 Estructura de Precios
      </h2>
      
      <div className="grid grid-cols-2 grid-md-cols-3 grid-lg-cols-4 gap-4 mb-8">
        {pricingTiers.map((tier, index) => (
          <div key={index} style={{background: 'white', border: '2px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center', transition: 'border-color 0.2s'}}>
            <h4 style={{fontWeight: '600', color: '#374151', marginBottom: '0.5rem'}}>{tier.tier}</h4>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669'}}>{tier.price}</div>
          </div>
        ))}
      </div>

      <div className="alert-box">
        <h3 className="alert-title">Funcionalidad de Pagos* Definir uno para MVP</h3>
        <p className="alert-text mb-2"><strong>Chile:</strong> Integración con Flow</p>
        <p className="alert-text mb-2"><strong>México:</strong> Integración con Stripe</p>
      </div>
    </div>
  );
};

const DashboardSlide = () => (
  <div>
    <h2 className="section-title">
      📊 Dashboard Cliente
    </h2>
    
    <div className="info-card mb-8">
      <h3>Funcionalidad Multiempresa</h3>
      <p>
        Un usuario puede gestionar varias organizaciones (ej: director de holding con 5 empresas, 
        fondo de inversión con 10 startups)
      </p>
    </div>

    <div className="grid grid-cols-1 grid-md-cols-2 gap-6 mb-6">
      <FeatureCard
        icon="📋"
        title="Menú por Organización"
        features={[
          "Contexto de la organización",
          "Matriz de materialidad",
          "Métricas SASB",
          "Métricas GRI",
          "Regulaciones nacionales",
          "Resumen Ejecutivo (PDF descargable)"
        ]}
      />
      
      <FeatureCard
        icon="🔐"
        title="Gestión de Cuenta"
        features={[
          "Registro con email/contraseña",
          "Activación por email",
          "Recuperación de contraseña",
          "2FA opcional",
          "Login social (Google) - no prioritario"
        ]}
      />
    </div>

    <div className="alert-box">
      <p className="alert-text">
        <strong>Matriz de Materialidad:</strong> Tabla simple en MVP, evolución a heatmap visual en futuras iteraciones
      </p>
    </div>
  </div>
);

const TimelineSlide = () => {
  const timelineData = [
    { module: "Landing + Formulario", description: "UI + validaciones + adjunto + API", days: "1.5" },
    { module: "Pagos Online", description: "Stripe, Flow, lógicas de monto", days: "3" },
    { module: "Registro/Login", description: "Email/password + activación + recovery + seguridad", days: "1" },
    { module: "Dashboard Cliente", description: "Multiempresa, menú, PDF", days: "3" },
    { module: "Automatización IA", description: "Pipeline prompts + adjuntos + logs + excel ref.", days: "3" },
    { module: "Panel Power User (HITL)", description: "Dashboard staff + edición + reproceso + publicar", days: "3" },
    { module: "Backoffice + Otros", description: "Admin, notificaciones, EVALS, visualizaciones", days: "5" },
    { module: "Infraestructura/QA", description: "Docker + deploy + monitoreo + backups + testing", days: "3" }
  ];

  return (
    <div>
      <h2 className="section-title">
        📅 Estimación de Desarrollo
      </h2>
      
      <div className="data-table">
        <table style={{width: '100%'}}>
          <thead>
            <tr className="table-header">
              <th>Módulo</th>
              <th>Descripción</th>
              <th>Días Hábiles</th>
            </tr>
          </thead>
          <tbody>
            {timelineData.map((item, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell module">{item.module}</td>
                <td className="table-cell description">{item.description}</td>
                <td className="table-cell days">{item.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="alert-box">
        <h3 className="alert-title">⏱️ Total: 25 días hábiles</h3>
        <p className="alert-text mb-2"><strong>Equipo:</strong> 1 AI Engineer senior + 1 FE/BE mid</p>
        <p className="alert-text">Incluye integración, QA básico y buffers para pruebas piloto</p>
      </div>
    </div>
  );
};

const FinalPriceSlide = () => (
  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
    <h1 style={{
      fontSize: '8rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #059669, #10b981)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '2rem',
      textShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      $7,000 USD
    </h1>
    
    <div style={{
      background: 'linear-gradient(to right, #dbeafe, #bfdbfe)',
      borderRadius: '1.5rem',
      padding: '3rem',
      maxWidth: '600px',
      width: '100%'
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1e40af',
        marginBottom: '1.5rem'
      }}>
        💼 Propuesta de Desarrollo MVP
      </h2>
      
      <div style={{fontSize: '1.25rem', color: '#1d4ed8', lineHeight: '1.8'}}>
        <p style={{marginBottom: '1rem'}}>
          <strong>✅ Desarrollo completo en 25 días hábiles</strong>
        </p>
        <p style={{marginBottom: '1rem'}}>
          <strong>✅ Equipo senior especializado</strong>
        </p>
        <p style={{marginBottom: '1rem'}}>
          <strong>✅ Stack tecnológico moderno</strong>
        </p>
        <p>
          <strong>✅ Listo para 30+ clientes piloto</strong>
        </p>
      </div>
    </div>
    
    <div style={{
      marginTop: '2rem',
      fontSize: '1.125rem',
      color: '#6b7280',
      fontStyle: 'italic'
    }}>
      Inversión total para MVP funcional y escalable
    </div>
  </div>
);

const TechStackSlide = () => {
  const frontendTech = [
    "React (SPA para clientes y power users)",
    "TypeScript",
    "Chakra UI (UI accesible, responsive)",
    "React Hook Form (formularios)",
    "TanStack Query (gestión de datos/API)",
    "TanStack Router o React Router"
    ];

  const backendTech = [
    "FastAPI (Python)",
    "SQLModel (ORM sobre SQLAlchemy)",
    "Celery (tareas asíncronas: IA, envío mails)",
    "Redis (broker para Celery y cache)",
    "Alembic (migraciones DB)",
    "pytest (testing backend)"
  ];

  const databaseTech = [
    "PostgreSQL (usuarios, organizaciones, análisis, logs, EVALS)"
  ];

  const aiTech = [
    "OpenAI API (modelos LLM para análisis)",
    "WeasyPrint (PDFs)"
  ];

  const outOfScope = [
    "Login social",
    "Soporte posterior",
    "Matriz visual avanzada (heatmap interactivo)",
    "Historial de versiones y trazabilidad avanzada",
    "Internacionalización",
    "Soporte 24/7"
  ];

  return (
    <div>
      <h2 className="section-title">
        ⚙️ Stack Tecnológico Adaptia MVP
      </h2>
      
      <div className="grid grid-cols-1 grid-md-cols-2 gap-6 mb-8">
        <FeatureCard
          icon="⚛️"
          title="Frontend"
          features={frontendTech}
        />
        
        <FeatureCard
          icon="🔧"
          title="Backend"
          features={backendTech}
        />
        
        <FeatureCard
          icon="🗄️"
          title="Base de Datos"
          features={databaseTech}
        />
        
        <FeatureCard
          icon="🤖"
          title="IA y Automatización"
          features={aiTech}
        />
      </div>

      <div className="alert-box">
        <h3 className="alert-title">❌ Fuera del Alcance Inicial (MVP Adaptia)</h3>
        <div className="grid grid-cols-1 grid-md-cols-2 gap-4" style={{marginTop: '1rem'}}>
          {outOfScope.map((item, index) => (
            <div key={index} className="feature-item">
              <span className="feature-check" style={{color: '#ef4444'}}>✗</span>
              <span className="feature-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfrastructureSlide = () => {
  const techStack = [
    "Docker Compose", "VM GCP e2-standard-4", "4vCPU, 16GB RAM, 200GB SSD", 
    "SSL Let's Encrypt", "SendGrid", "OpenAI API"
  ];

  const costs = [
    { item: "VM e2-standard-4", cost: "$60-80 USD" },
    { item: "Backup/Storage extra", cost: "$5-10 USD" },
    { item: "SendGrid (emails)", cost: "$15 USD" },
    { item: "OpenAI API (incluye iteraciones +20%)", cost: "$40-70$ USD" },
    { item: "Tráfico/transferencias", cost: "$10 USD" },
    { item: "TOTAL MENSUAL", cost: "$120-200 USD", isTotal: true }
  ];

  return (
    <div>
      <h2 className="section-title">
        💻 Infraestructura y Costos
      </h2>
      
      <div className="tech-stack">
        {techStack.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="cost-card">
        <h3 className="cost-title">💸 Costos Mensuales (GCP / Azure / AWS - Agosto 2025)</h3>
        {costs.map((cost, index) => (
          <div 
            key={index} 
            className={`cost-item ${cost.isTotal ? 'total' : ''}`}
          >
            <span>{cost.item}</span>
            <span>{cost.cost}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 grid-md-cols-2 gap-6">
        <FeatureCard
          icon="🎯"
          title="Estrategia de Piloto"
          features={[
            "MVP funcional para 30 clientes",
            "Financiado con capital CORFO",
            "Validación de modelo de negocio",
            "Sin soporte 24/7 inicial"
          ]}
        />
        
        <FeatureCard
          icon="📈"
          title="Preparado para Escalar"
          features={[
            "Escalamiento horizontal",
            "Scripts de mantenimiento",
            "Backups automáticos diarios",
            "Monitoreo básico y alertas"
          ]}
        />
      </div>
    </div>
  );
};

const StatBox = ({ number, label }) => (
  <div className="stat-box">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, features }) => (
  <div className="feature-card">
    <div className="feature-header">
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
    </div>
    <ul className="feature-list">
      {features.map((feature, index) => (
        <li key={index} className="feature-item">
          <span className="feature-check">✓</span>
          <span className="feature-text">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default AdaptiaPresentation;
