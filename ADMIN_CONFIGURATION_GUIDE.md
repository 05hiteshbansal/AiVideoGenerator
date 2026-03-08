# Admin Configuration System - Quick Start Guide

## 🎯 What Was Created

An **Admin Configuration Settings Page** that allows you to manage all dropdown and form field values from a single, user-friendly dashboard.

## 📁 Files Created/Modified

### New Files Created:

1. **`/src/model/dropdownConfig.js`** - MongoDB model for storing configurations
2. **`/src/app/api/dropdownConfig/route.js`** - API endpoints (GET/POST)
3. **`/src/app/(Home)/settings/page.jsx`** - Admin settings dashboard
4. **`/src/app/(Home)/settings/layout.js`** - Settings layout
5. **`/src/hooks/useDropdownConfig.js`** - React hook to fetch configurations
6. **`ADMIN_CONFIG_SYSTEM.md`** - Detailed documentation

### Files Modified:

1. **`/src/components/Navbar.jsx`** - Added Settings button
2. **`/src/components/NewOptions/DropdownOptions.jsx`** - Now uses centralized config
3. **`/src/components/NewOptions/DurationOption.jsx`** - Now uses centralized config

## 🚀 How to Access

1. **In the Navbar** - Click the **⚙️ Settings** button
2. **Direct URL** - Navigate to `/settings`

## 📋 Admin Features

### Four Configuration Sections:

#### 1️⃣ **Story Categories**

- Manage story/prompt categories
- Each has a Key (code value) and Label (display text)
- Add/Edit/Remove categories
- Default: 7 categories (Custom, Random AI Story, Scary, etc.)

#### 2️⃣ **Durations**

- Control video duration options
- Default: 3 options (10s, 30s, 60s)
- Customize names and values

#### 3️⃣ **Styles**

- Manage visual style options
- Default: Realistic, Animated, Cinematic, Sketch
- Easy to expand

#### 4️⃣ **Video Styles**

- Configure content types
- Default: UGC, Commercial, Viral, Educational
- Fully customizable

## ⚡ Key FeatureS

✅ **Add Items** - Click "+ Add [Category]" to add new options
✅ **Edit Items** - Click any field to edit Key or Label
✅ **Remove Items** - Click "✕" to delete items
✅ **Save Changes** - Click "Save All Changes" to persist to database
✅ **Reset** - Click "Reset Changes" to discard unsaved changes
✅ **Real-time** - Changes apply immediately across the app
✅ **Persistent** - All changes are saved to MongoDB

## 🔧 Technical Stack

| Component        | Technology         |
| ---------------- | ------------------ |
| Backend          | Next.js API Routes |
| Database         | MongoDB            |
| Frontend         | React + NextUI     |
| State Management | React Hooks        |
| HTTP Client      | Axios              |

## 📊 Data Flow

```
Admin Settings Page
        ↓
        ├→ Fetch Config (GET /api/dropdownConfig)
        ├→ Update Config (POST /api/dropdownConfig)
        ↓
   MongoDB Database
        ↓
   Stored Configuration
        ↓
Components fetch via useDropdownConfig Hook
        ↓
DropdownOptions & DurationOption display values
```

## 🎨 What Components Now Use This System

1. **DropdownOptions.jsx** - Story category selection
2. **DurationOption.jsx** - Video duration selection
3. **StyleOptions.jsx** (if used) - Style selection

Any component can use the configuration by importing:

```jsx
import { useDropdownConfig } from "@/hooks/useDropdownConfig";

const { config, loading, error } = useDropdownConfig();
```

## 🔄 Example Workflow

1. Go to Settings page (⚙️ button in navbar)
2. Scroll to "Story Categories" section
3. Click "+ Add Category"
4. Enter Key: `productivity` and Label: `Productivity Tips`
5. Click "Save All Changes"
6. Now this option appears everywhere DropdownOptions is used!

## 📦 Default Configuration

When first created, the system initializes with:

- **7 Story Categories** (Custom, Random AI Story, Scary, Historical Facts, Bed Time, Motivation, Fun Facts)
- **3 Durations** (10s, 30s, 60s)
- **4 Styles** (Realistic, Animated, Cinematic, Sketch)
- **4 Video Styles** (UGC, Commercial, Viral, Educational)

## ⚙️ Environment Requirements

Ensure your `.env` file has:

```
MONGOURL=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=your_api_base_url
```

## 🐛 Troubleshooting

| Issue                         | Solution                                              |
| ----------------------------- | ----------------------------------------------------- |
| Settings page blank           | Check MongoDB connection                              |
| Changes not saving            | Verify Save button actually saves (check Network tab) |
| Dropdowns still show defaults | Clear browser cache, restart dev server               |
| API errors                    | Check console for specific error messages             |

## 📈 Future Enhancements

- Add role-based access control (admin-only)
- Configuration versioning/history
- Import/Export configurations
- Real-time sync across clients
- Configuration templates
- Audit logging

## 💡 Tips

- Use clear, descriptive Labels for better UX
- Keep Keys lowercase and dash-separated (e.g., `custom-prompt`)
- Test configuration changes before deploying
- Backup important configurations
- Document custom fields you add

## 🎓 For Developers

To add admin configuration support to a new component:

1. Import the hook:

```jsx
import { useDropdownConfig } from "@/hooks/useDropdownConfig";
```

2. Use in component:

```jsx
const { config, loading, error } = useDropdownConfig();
const options = config.yourFieldName; // e.g., config.storyCategories
```

3. Add configuration section in admin page:

```jsx
{
  /* Your New Config Section */
}
<Card>{/* Similar structure to existing sections */}</Card>;
```

---

**Need Help?** Check `ADMIN_CONFIG_SYSTEM.md` for detailed documentation!
