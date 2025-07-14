# Y150 - Multi-Omics Platform

A comprehensive Vue3-based platform for multi-omics data analysis and target discovery.

## 🚀 Technology Stack

- **Vue 3.4** - Progressive JavaScript framework with Composition API
- **Vite 5.0** - Fast build tool and development server
- **Element Plus 2.4** - Enterprise-class UI library
- **Vue Router 4.2** - Official router for Vue.js
- **Pinia 2.1** - Intuitive Vue state management
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Axios 1.6** - HTTP client library

## 📁 Project Structure

```
y150/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── AppHeader.vue     # Navigation header
│   │       ├── AppFooter.vue     # Footer component
│   │       └── Layout.vue        # Main layout wrapper
│   ├── views/                    # Page components
│   │   ├── Home.vue             # Landing page with search
│   │   ├── Login.vue            # Authentication
│   │   ├── SignUp.vue           # User registration
│   │   ├── Upload.vue           # Data upload interface
│   │   ├── DataManager.vue      # Data management dashboard
│   │   ├── Summary.vue          # Overview dashboard
│   │   ├── TargetId.vue         # Target identification
│   │   ├── Knowledge.vue        # Knowledge graph & chat
│   │   ├── Manual.vue           # User documentation
│   │   └── PDFReport.vue        # Report viewer
│   ├── stores/
│   │   └── user.js              # User state management
│   ├── router/
│   │   └── index.js             # Route configuration
│   └── api/                     # API services
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js              # Vite build configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#83a594` - Main brand color
- **Secondary**: `#519294` - Accent and highlights  
- **Neutral**: `#7f9eb0` - Supporting elements
- **Dark**: `#58798c` - Text and headings
- **Light**: `#5da3af` - Subtle accents
- **Accent**: `#becbd3` - Background tints

### Key Features
- Responsive design with mobile-first approach
- Modern glassmorphism and subtle shadows
- Consistent spacing and typography
- Accessible color contrasts
- Custom animations and transitions

## 🔧 Development Setup

### Prerequisites
- Node.js >=16.0.0
- npm >=8.0.0

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌟 Key Features

### 1. Multi-Omics Data Upload
- Support for bulk transcriptomics, single-cell RNA-seq, proteomics, and methylation data
- Drag-and-drop file uploads with validation
- Metadata capture and platform selection

### 2. Data Management Dashboard  
- **LLM Reports**: AI-generated analysis reports with viewing, editing, and deletion
- **Datasets**: Comprehensive dataset browser with metadata
- **Gene Sets**: Custom gene list management and editing

### 3. Analysis Tools
- **Target Identification**: AI-powered target discovery from multi-omics data
- **Knowledge Graph**: Interactive visualization of gene-disease-drug relationships
- **Summary Dashboard**: Overview of platform usage and recent activity

### 4. User Experience
- Modern, intuitive interface design
- Comprehensive search functionality
- Real-time notifications and feedback
- Responsive design for all devices

## 🚦 Available Routes

- `/` - Home page with global search
- `/login` - User authentication
- `/signup` - User registration  
- `/upload` - Data upload interface
- `/manager` - Data management dashboard
- `/summary` - Platform overview
- `/target-id` - Target identification tool
- `/knowledge` - Knowledge graph and AI chat
- `/manual` - User documentation
- `/plan` - Current subscription plan
- `/subscription` - Subscription management

## 📊 Page Components

### Home Page (`/`)
- Hero section with search functionality
- Feature cards highlighting platform capabilities
- Global search with categorized results (diseases, genes, datasets)

### Data Manager (`/manager`)
- Tabbed interface for different data types
- Interactive tables with CRUD operations
- Modal dialogs for detailed views and editing

### Upload Interface (`/upload`)
- Type selection cards for different omics data
- Form-based metadata capture
- File upload with progress tracking

## 🎯 Future Enhancements

- [ ] Real API integration
- [ ] Advanced visualization components
- [ ] Collaborative features
- [ ] Export functionality
- [ ] Offline capabilities
- [ ] Advanced search filters

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, contact: support@y150.com
