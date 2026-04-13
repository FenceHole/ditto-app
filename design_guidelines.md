# Cat Content Creator App - Design Guidelines

## Design Approach
**System-Based Approach**: This SaaS dashboard application prioritizes utility, data clarity, and professional workflows. Drawing from Material Design and modern dashboard patterns (Linear, Notion) for productivity-focused interfaces.

## Core Design Principles
1. **Data-First Design**: Clear hierarchy for metrics and statistics
2. **Professional Polish**: Clean, modern interface suitable for business use
3. **Action-Oriented**: Prominent CTAs with gradient treatments
4. **Dual-Mode Ready**: Fully specified light and dark mode support

---

## Typography
**Font Family**: Inter (Google Fonts)
- **Headings**: 
  - Page titles: 2xl (24px), font-semibold
  - Section headers: xl (20px), font-semibold
  - Card titles: lg (18px), font-medium
- **Body Text**: 
  - Primary: base (16px), font-normal
  - Secondary/metadata: sm (14px), font-normal
  - Stats/numbers: 2xl-4xl (24-36px), font-bold

---

## Color System

### Light Mode
- Background: #FAFBFC
- Card background: #FFFFFF
- Primary text: #1C1C1E
- Secondary text: #6D6D72
- Border: #E5E7EB

### Dark Mode
- Background: #121212
- Card background: #1E1E1E
- Primary text: #FAFAFA
- Secondary text: #9CA3AF
- Border: #404040

### Accent Colors
- Primary gradient: Purple (#8B5CF6) to Pink (#EC4899)
- Success: #10B981 (green)
- Warning: #F59E0B (orange)
- Platform colors: Instagram pink, TikTok black, YouTube red

---

## Layout System

### Spacing Units
Primary spacing scale: **8, 16, 24, 32, 48px** (Tailwind: 2, 4, 6, 8, 12)
- Component padding: 24px (p-6)
- Section margins: 32px (my-8)
- Card padding: 24px (p-6)
- Main content padding: 32px (p-8)

### Fixed Structure
- **Header**: 64px height, fixed top, full width
- **Sidebar**: 256px width, fixed left, full height
- **Main Content**: max-width 1280px, centered with 32px padding

### Grid Layouts
- Stat cards: 4-column grid (grid-cols-4)
- Feature cards: 3-column grid (grid-cols-3)
- Two-column layouts for detail pages
- Responsive: collapse to single column on mobile

---

## Component Library

### Cards
- White background (#FFFFFF) in light, #1E1E1E in dark
- Border radius: 12px (rounded-xl)
- Border: 1px solid #E5E7EB (light) / #404040 (dark)
- Shadow: subtle (shadow-sm)
- Padding: 24px (p-6)

### Stat Cards
- Icon in colored circle background (48px diameter)
- Large number: 2xl-3xl, font-bold
- Label: sm, secondary color
- Trend indicator: small text, green/red with percentage

### Buttons
**Primary (Gradient)**:
- Purple-to-pink gradient background
- White text, font-medium
- Padding: px-6 py-3
- Rounded: lg (rounded-lg)
- Icon + text combinations
- Hover: slight brightness increase

**Secondary**:
- Border: 1px, purple color
- Purple text
- Transparent background
- Same padding/rounding as primary

### Navigation
**Sidebar Items**:
- Icon + text horizontal layout
- Padding: py-3 px-4
- Active: purple background, white text
- Hover: light purple background (#F3E8FF)
- Rounded: md (rounded-md)

### Input Fields
- Height: 44px
- Border: 1px solid #E5E7EB
- Rounded: lg (rounded-lg)
- Padding: px-4
- Icon placement: left side with spacing
- Focus: purple border, subtle glow

### Badges/Pills
- Small rounded pills (rounded-full)
- Purple background, white text
- Padding: px-3 py-1
- Text: xs (12px)

---

## Feature-Specific Layouts

### Dashboard
- 4-column stat card grid at top
- Below: two-column layout (Activity feed left, Quick actions right)
- Timeline list with icons and timestamps
- Prominent gradient action buttons (3 buttons stacked)

### Media Kit Generator
- Input section: 3-column grid for social handles
- Generate button: full-width gradient with sparkle icon
- Stats display: 3-column grid for platform cards
- Preview layout: 2-column (Media kit left 60%, Rate card right 40%)
- Download button: purple, top-right of preview

### Platform Stat Cards
- Platform icon/logo in header
- Grid display of metrics (2-column within card)
- Large numbers with small labels below
- Green percentage indicators for engagement

---

## Icons
**Library**: Lucide React icons
- Consistent stroke width
- 20-24px size for navigation
- 16-20px size for inline/buttons
- Colored icon backgrounds: 40-48px circles

---

## Special Treatments
- **Gradients**: Use purple-to-pink for all primary CTAs
- **Engagement metrics**: Always green color
- **Revenue/earnings**: Use dollar sign icon with green color
- **Loading states**: Disabled button with "Generating..." text
- **Empty states**: Centered with icon and descriptive text

---

## Images
**No hero images required** - This is a dashboard application focused on data and functionality. Use icons and illustrated empty states where needed.