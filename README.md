# 🎯 React User Management App

## 📋 Project Description
A simple static React application for managing users (add, view, delete). Data is stored locally in the browser for the time being, Soon I will build the backend, where data will be stored in an SQL database. I will connect this to Azure for a static web app project using Terraform (IaC) I am currently working on. Afterwards, I will work on creating a dynamic web app. 

## Current Features

### **Data Management**: Browser localStorage
- ✅ Add new users (name, email, phone)
- ✅ Delete users with confirmation
- ✅ Data persists between browser sessions
- ✅ Email duplicate checking
- ✅ Form validation

## 🚀 How to Run

```bash
cd first-react-app
npm start
```

Opens on http://localhost:3000

## 💾 Data Storage

**Current**: Browser localStorage (temporary solution)
**Location**: Browser's localStorage with key `'users'`
**Format**: JSON array of user objects

**Sample Data**:
```json
[
  {
    "id": 1672531200000,
    "name": "Bob Bobbert",
    "email": "bobbert@bobmail.com", 
    "phone": "+1-555-0123",
    "created_at": "2025-10-15T10:00:00Z"
  }
]
```


## 🌐 TO-DO: Connecting the static web app to Azure using GitHub Actions 

Under construction 🚧

## 🎨 App Screenshot

So far, this is the web app UI. 

![Web App UI](images/web-app-screenshot.png)

