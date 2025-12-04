# Hygraph CMS Setup Guide for Shinobi Blog

This guide walks you through setting up Hygraph CMS to power your blog with content.

## Step 1: Create a Hygraph Account

1. Go to [https://hygraph.com](https://hygraph.com)
2. Click **"Start for Free"** or **"Sign Up"**
3. Create an account (you can use GitHub, Google, or email)
4. Verify your email if required

## Step 2: Create a New Project

1. Once logged in, click **"Create Project"**
2. Choose a project name (e.g., "Shinobi Blog")
3. Select a region closest to your users
4. Click **"Create"**

## Step 3: Set Up Content Models

### 3.1 Create the Author Model

1. In the left sidebar, click **"Schema"**
2. Click **"+ Create Model"**
3. Configure the model:
   - **Display Name**: `Author`
   - **API ID**: `Author` (auto-generated)
   - **Plural API ID**: `authors`
4. Click **"Create"**

### 3.2 Add Fields to Author Model

Click on the **Author** model you just created, then add these fields:

#### Field 1: Name
- Click **"+ Add field"** → **"Single line text"**
- **Display Name**: `Name`
- **API ID**: `name`
- **Required**: ✓ (check this)
- Click **"Create"**

#### Field 2: Bio
- Click **"+ Add field"** → **"Multi line text"**
- **Display Name**: `Bio`
- **API ID**: `bio`
- **Required**: Leave unchecked
- Click **"Create"**

#### Field 3: Avatar
- Click **"+ Add field"** → **"Asset"**
- **Display Name**: `Avatar`
- **API ID**: `avatar`
- **Required**: Leave unchecked
- **Allow multiple values**: Leave unchecked
- Click **"Create"**

### 3.3 Create the Post Model

1. Go back to **"Schema"**
2. Click **"+ Create Model"**
3. Configure the model:
   - **Display Name**: `Post`
   - **API ID**: `Post`
   - **Plural API ID**: `posts`
4. Click **"Create"**

### 3.4 Add Fields to Post Model

Click on the **Post** model, then add these fields:

#### Field 1: Title
- Click **"+ Add field"** → **"Single line text"**
- **Display Name**: `Title`
- **API ID**: `title`
- **Required**: ✓
- Click **"Create"**

#### Field 2: Slug
- Click **"+ Add field"** → **"Single line text"**
- **Display Name**: `Slug`
- **API ID**: `slug`
- **Required**: ✓
- **Unique**: ✓ (check this - important!)
- **Description**: "URL-friendly version of the title (e.g., 'my-first-post')"
- Click **"Create"**

#### Field 3: Excerpt
- Click **"+ Add field"** → **"Multi line text"**
- **Display Name**: `Excerpt`
- **API ID**: `excerpt`
- **Required**: ✓
- **Description**: "Short summary shown on blog listing page"
- Click **"Create"**

#### Field 4: Content
- Click **"+ Add field"** → **"Rich Text"**
- **Display Name**: `Content`
- **API ID**: `content`
- **Required**: ✓
- **Embeds**: You can enable images, videos, etc. as needed
- Click **"Create"**

#### Field 5: Cover Image
- Click **"+ Add field"** → **"Asset"**
- **Display Name**: `Cover Image`
- **API ID**: `coverImage`
- **Required**: Leave unchecked
- **Allow multiple values**: Leave unchecked
- Click **"Create"**

#### Field 6: Author (Reference)
- Click **"+ Add field"** → **"Reference"**
- **Display Name**: `Author`
- **API ID**: `author`
- **Required**: ✓
- **Reference Model**: Select `Author`
- **Cardinality**: "One to Many" (One author can have many posts)
- **Allow multiple values**: Leave unchecked
- Click **"Create"**

#### Field 7: Published At
- Click **"+ Add field"** → **"Date and time"**
- **Display Name**: `Published At`
- **API ID**: `publishedAt`
- **Required**: ✓
- Click **"Create"**

#### Field 8: Tags
- Click **"+ Add field"** → **"Single line text"**
- **Display Name**: `Tags`
- **API ID**: `tags`
- **Required**: Leave unchecked
- **Allow multiple values**: ✓ (check this - important!)
- **Description**: "Topics/categories for the post"
- Click **"Create"**

## Step 4: Configure API Access

1. Click **"Settings"** in the left sidebar (gear icon at bottom)
2. Click **"API Access"**
3. Find the **"Content API"** section
4. Under **"High Performance Content API"**, copy the endpoint URL
   - It looks like: `https://api-region.hygraph.com/v2/xxxxxxxxx/master`
5. Paste this URL into your `.env.local` file:
   ```
   HYGRAPH_ENDPOINT=https://api-region.hygraph.com/v2/xxxxxxxxx/master
   ```

### 4.1 Set API Permissions

1. Scroll down to **"Public Content API Permissions"**
2. Click **"Yes, initialize defaults"** if prompted
3. Make sure the following permissions are enabled for the **Public** role:
   - **Post**: ✓ Read
   - **Author**: ✓ Read
   - **Asset**: ✓ Read
4. Click **"Save"**

## Step 5: Create Your First Author

1. Click **"Content"** in the left sidebar
2. Select **"Authors"**
3. Click **"+ Create entry"**
4. Fill in:
   - **Name**: Your name (e.g., "John Doe")
   - **Bio**: A short bio (e.g., "Software developer and tech blogger")
   - **Avatar**: Upload a profile picture (optional)
5. Click **"Save"**
6. Click **"Publish"** in the top right

## Step 6: Create Your First Blog Post

1. Click **"Content"** in the left sidebar
2. Select **"Posts"**
3. Click **"+ Create entry"**
4. Fill in:
   - **Title**: "Welcome to My Blog"
   - **Slug**: "welcome-to-my-blog" (must be lowercase, use hyphens)
   - **Excerpt**: "This is my first blog post. Welcome to my journey!"
   - **Content**: Write your blog post content using the rich text editor
   - **Cover Image**: Upload an image (optional)
   - **Author**: Select the author you created
   - **Published At**: Select today's date
   - **Tags**: Add tags like "introduction", "welcome", "first-post"
5. Click **"Save"**
6. Click **"Publish"** in the top right

## Step 7: Test Your Blog

1. Make sure your `.env.local` file has the correct endpoint
2. Restart your Next.js dev server:
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```
3. Visit `http://localhost:3000/blog` (or whatever port your app is running on)
4. You should see your blog post appear!

## Tips and Best Practices

### Creating Good Slugs
- Use lowercase letters only
- Use hyphens (-) instead of spaces
- Keep them short and descriptive
- Examples: "my-first-post", "react-hooks-guide", "2024-year-review"

### Writing Excerpts
- Keep them under 160 characters for best display
- Make them engaging - they're the first thing readers see
- Summarize the main point of your post

### Choosing Tags
- Use 3-5 tags per post
- Be consistent with tag names (e.g., always use "JavaScript" not "javascript" or "JS")
- Use general categories like "Tutorial", "Opinion", "Guide", etc.

### Adding Images
- Recommended cover image size: 1200x630 pixels
- Use JPG or PNG format
- Compress images before uploading for better performance

## Troubleshooting

### "No blog posts found" Error
- Check that your `HYGRAPH_ENDPOINT` is correct in `.env.local`
- Make sure you've **published** your posts (not just saved them)
- Verify API permissions are set to allow public read access
- Restart your dev server after changing `.env.local`

### Posts Not Appearing
- Ensure the post status is "Published" not "Draft"
- Check that all required fields are filled in
- Verify the publishedAt date is not in the future

### Images Not Loading
- Make sure Asset permissions are enabled in API Access
- Check that images are published along with the post
- Verify the image URLs are accessible

## Next Steps

Now that your blog is set up:
1. Create more blog posts
2. Add more authors if you have multiple contributors
3. Experiment with rich text formatting in your content
4. Use tags to organize your posts by topic
5. Consider setting up webhooks for automatic revalidation

---

For more information, visit the [Hygraph Documentation](https://hygraph.com/docs)
