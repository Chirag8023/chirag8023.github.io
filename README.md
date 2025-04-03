# **📝 How to Add a New Blog Post**  

Follow these steps to properly add a new blog post:  

## **1️⃣ Create the Blog Folder**  
- Name the folder **using the actual blog title** in `posts` folder.  
- Use **lowercase letters**, **no symbols**, and **no spaces**.  
- Separate words with a **hyphen (`-`)**.  
- **Example:**  
  ```
  /posts/title-of-your-blog/
  ```

## **2️⃣ Add the Markdown File**  
- Inside the new folder, create a **Markdown file** named exactly:  
  ```
  README.md
  ```
- **Do NOT** include a **primary heading (`# Heading`)** in this file.  

## **3️⃣ Store Local Images & Assets**  
- If your blog post contains images or assets, store them **inside the same folder**.  
- **Example folder structure:**  
  ```
  /posts/title-of-your-blog/
      ├── README.md
      ├── image1.png
      ├── screenshot.jpg
  ```

## **4️⃣ Update `posts.json`**  
- Open the `posts.json` file (located in `/assets/`).  
- Add your post details **at the top** of the file.  

### **Example JSON Object:**  
```json
{
    "id": "1",
    "title": "Title of Your Blog",
    "date": "DD/MM/YYYY",
    "file": "/posts/title-of-your-blog/README.md",
    "tags": ["Tag1", "Tag2"]
},
```
- **`id`** → Put Id number here which you get by adding 1 to current top most json object's id.
- **`title`** → Write the main blog title (with spaces, CamelCase, or PascalCase).  
- **`date`** → Format as `DD/MM/YYYY`.  
- **`file`** → Path to the `README.md` file inside the blog folder.  
- **`tags`** → Add relevant tags inside an array `["Tag1", "Tag2"]`.  

## **✅ Important Notes:**  
- **Always place** the new JSON object **at the top** of `posts.json`.  
- Ensure the folder name in `file` matches the actual folder and path should start with `/`, ex. `/posts/....`.  
- Double-check for **correct JSON syntax** (no missing commas or brackets).  