# Admin Configuration System Documentation

## Overview

The Admin Configuration System allows administrators to manage all dropdown values and configuration fields dynamically from a centralized settings page without modifying code.

## Features

- **Centralized Management**: All dropdown configurations in one place
- **Real-time Updates**: Changes apply immediately across the application
- **Category Management**: Manage Story Categories, Durations, Styles, and Video Styles
- **Add/Edit/Remove**: Full CRUD operations for all configuration items
- **Database Backed**: All settings persisted in MongoDB

## File Structure

### API Routes

- **`/api/dropdownConfig`** (GET/POST)
  - GET: Fetches current configuration
  - POST: Updates configuration

### Models

- **`/model/dropdownConfig.js`**: MongoDB schema for storing dropdown configurations

### Hooks

- **`/hooks/useDropdownConfig.js`**: React hook to fetch and use dropdown configuration

### Components

- **`/components/NewOptions/DropdownOptions.jsx`**: Story categories dropdown (now uses centralized config)
- **`/components/NewOptions/DurationOption.jsx`**: Duration selector (now uses centralized config)
- **`/app/(Home)/settings/page.jsx`**: Admin settings page for managing configurations

### Navigation

Updated the Navbar component to include a Settings link for easy admin access.

## Configuration Structure

The configuration is stored with the following structure in MongoDB:

```javascript
{
  configName: "default",
  storyCategories: [
    { key: "custom", label: "Custom Prompt" },
    { key: "scary", label: "Scary Story" },
    // ... more categories
  ],
  durations: [
    { key: "10", label: "10 Seconds" },
    { key: "30", label: "30 Seconds" },
    // ... more durations
  ],
  styles: [
    { key: "realistic", label: "Realistic" },
    { key: "animated", label: "Animated" },
    // ... more styles
  ],
  videoStyles: [
    { key: "ugc", label: "UGC" },
    { key: "commercial", label: "Commercial" },
    // ... more video styles
  ],
  customFields: {} // For future extensibility
}
```

## How to Use

### 1. Access Admin Settings

- Click on the **Settings** button (⚙️) in the Navbar
- This will navigate to `/settings` page

### 2. Edit Configuration

On the admin settings page, you'll see four configuration cards:

#### Story Categories

- Edit existing categories by changing the Key or Label
- Add new categories with "+ Add Category" button
- Remove categories with "✕" button

#### Durations

- Manage video duration options
- Key: The internal identifier (e.g., "30")
- Label: The display text (e.g., "30 Seconds")

#### Styles

- Configure rendering styles
- Examples: "realistic", "animated", "cinematic", "sketch"

#### Video Styles

- Manage video category types
- Examples: "ugc", "commercial", "viral", "educational"

### 3. Save Changes

- Click "Save All Changes" button
- Configuration updates are applied immediately
- Use "Reset Changes" to discard unsaved changes

## Technical Details

### Default Configuration

If no configuration exists in the database, the system initializes with default values:

```javascript
{
  storyCategories: 7 default options,
  durations: 3 options (10s, 30s, 60s),
  styles: 4 options (realistic, animated, cinematic, sketch),
  videoStyles: 4 options (ugc, commercial, viral, educational)
}
```

### Component Integration

Components using the configuration:

1. **DropdownOptions.jsx**

   ```jsx
   const { config, loading, error } = useDropdownConfig();
   ```

   Fetches `config.storyCategories` and displays them

2. **DurationOption.jsx**
   ```jsx
   const { config, loading, error } = useDropdownConfig();
   ```
   Fetches `config.durations` and displays them

### API Endpoints

#### GET /api/dropdownConfig

Returns the current configuration or initializes default if not found.

**Response:**

```json
{
  "_id": "...",
  "configName": "default",
  "storyCategories": [...],
  "durations": [...],
  "styles": [...],
  "videoStyles": [...],
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### POST /api/dropdownConfig

Updates the configuration with provided values.

**Request Body:**

```json
{
  "storyCategories": [...],
  "durations": [...],
  "styles": [...],
  "videoStyles": [...]
}
```

**Response:**

```json
{
  "message": "Configuration updated successfully",
  "config": { ... }
}
```

## Best Practices

1. **Key Naming**: Use lowercase, dash-separated keys (e.g., "custom-prompt", "10-seconds")
2. **Labels**: Make labels user-friendly and descriptive
3. **Validation**: Keys should be unique within each category
4. **Backup**: Keep track of configuration changes
5. **Testing**: Test configuration changes in a development environment first

## Adding New Configuration Fields

To add new configuration fields:

1. Update the MongoDB schema in `/model/dropdownConfig.js`
2. Add the new field to the default configuration in `/api/dropdownConfig/route.js`
3. Add a new configuration card in `/app/(Home)/settings/page.jsx`
4. Create a hook or use the existing `useDropdownConfig` to fetch the data
5. Update components to use the new configuration

## Troubleshooting

### Configuration not loading

- Check database connection: `MONGOURL` environment variable
- Verify MongoDB is running
- Check Network tab in browser DevTools for API errors

### Changes not applying

- Click "Save All Changes" button
- Verify that the POST request succeeds (check Network tab)
- Check browser console for errors

### Components showing default values

- Ensure database connection is working
- Check if `/api/dropdownConfig` is returning data
- Verify components are using `useDropdownConfig` hook

## Future Enhancements

- Role-based access control (admin-only settings page)
- Configuration versioning and rollback
- Bulk import/export of configurations
- Configuration templates
- Audit logging for configuration changes
- Real-time configuration sync across all clients
